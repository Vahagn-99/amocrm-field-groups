import "./style.css"
import { createApp } from 'vue'
import store from './store'
import Settings from './Settings.vue'
import Advanced from './Advanced.vue'
import ErrorHendler from './ErrorHendler.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
import apiClient from "../apiClient"

window.Host = "https://widgets-api.dicitech.com/api/";

async function async(amocrm) {
    const account = amocrm.constant('account')
    const user = amocrm.constant('user')
    const usersDataV2 = await $.get('/api/v2/account?with=users');
    const usersDataV4 = await $.get('/api/v4/users');

    const handledV2 = Object.values(usersDataV2._embedded.users);
    const handledV4 = usersDataV4._embedded.users.map(user => {
        return {
            id: user.id
            , email: user.email
            , is_admin: user.rights.is_admin
            , is_free: user.rights.is_free
            , is_active: user.rights.is_active
        };
    });
    const users = handledV2.map(user => {
        const find = handledV4.find(item => item.id === user.id);
        return {
              id: user.id
            , name: user.name
            , phone: user.phone_number
            , email: find['email']
            , is_admin: find['is_admin']
            , is_free: find['is_free']
            , is_active: find['is_active']
        }
    })



    const data = {
        name: user.name,
        phone: user.personal_mobile,
        email: user.login,
        amocrm_id: account.id,
        subdomain: account.subdomain,
        country: account.country,
        currency: account.currency,
        paid_from: account.paid_from,
        paid_till: account.paid_till,
        pay_type: account.pay_type,
        tariff: account.tariffName,
    }
    data.users = users;
    try {
        const { data: { data: { id: subdomainId } } } = await apiClient.post(`subdomains`, data, { byWidgetId: true });
        return subdomainId;
    } catch (error) {
        return;
    }
}


function makeFiledItem(data) {
    $('[id^="cf_field_' + data.id + '_"]').addClass('dtc-default-element')
}
async function makeFiledAsGroup(data, level = "TITLE_CUSTOM") {
    console.log(data.id, data.name)
    $('[id^="cf_field_' + data.id + '_"]').addClass('dtc-color-main')
    $('[id^="cf_field_' + data.id + '_"]').find('.cf-field-wrapper__body').addClass('dtc-group-color')
    $('[id^="cf_field_' + data.id + '_"]').find('.cf-field-view__value').text('Заголовок')

    var formatedData = {
        "id": data.id,
        "name": data.name,
        "triggers": [level]
    };
    fetch("/api/v4/".concat(AMOCRM.data.current_entity, "/custom_fields/").concat(formatedData.id), {
        method: "PATCH",
        body: JSON.stringify(formatedData),
        headers: {
            "Content-Type": "application/json"
        }
    })
};

async function getCustomFields(amocrm) {
    const response = await $.get("/api/v4/" + amocrm.data.current_entity + "/custom_fields")

    let customFields = response._embedded.custom_fields;

    return customFields.filter((field) => field.triggers.length > 0);
}

async function getAllCustomFields(amocrm) {
    const response = await $.get("/api/v4/" + amocrm.data.current_entity + "/custom_fields")

    return response._embedded.custom_fields;
}

const Widget = {

    render: async (amocrm) => {
        const cfs = await getCustomFields(amocrm);
        const ids = cfs.map(item => item.id);


        window.toggleSelect = function (event) {
            let i = $(event.target)
            if ($(i).hasClass('dct_custom_field_group')) {
                i = $(event.target);
            } else {
                i = $(event.target).closest('.dct_custom_field_group')
            }
            $(i).toggleClass('dct_angle_bottom')
            $(i).toggleClass('dct_angle_top')
            let el = $(i);
            let item = $(el).next()
            let out = 0;
            console.log(el, item)
            while ((!$(item).hasClass('dct_custom_field_group') && !$(item).hasClass('linked-form__field ')) && out < 30) {
                // console.log(item.hasClass('dct_custom_field_group'),!item.next().hasClass('linked-form__field '))
                if ($(item).closest('.linked-form__multiple-container').length > 0) {
                    $(item).closest('.linked-form__multiple-container').toggleClass('dtc-elem-hidden');
                } else {
                    $(item).toggleClass('dtc-elem-hidden');
                }
                item = $(item).next();
                out++;
            }
        }


        ids.forEach(id => {
            $('.linked-form__field[data-id="' + id + '"]').addClass('dct_custom_field_group').addClass('dct_angle_bottom').attr('onclick', 'toggleSelect(event)')
            $('.linked-form__field[data-id="' + id + '"]').find('.linked-form__field__value').remove();
        });

        var check = false;
        $('.card-entity-form__fields').first().find('.linked-form__field').each(function (index, elem) {
            var $elem = $(elem);
            if ($elem.hasClass('dct_custom_field_group')) {
                check = true;
            }
            if (check) {
                if (!$elem.hasClass('dct_custom_field_group')) {
                    if ($elem.closest('.linked-form__multiple-container').length > 0) {
                        $elem.closest('.linked-form__multiple-container').toggleClass('dtc-elem-hidden');
                    } else {
                        $elem.addClass('dtc-elem-hidden');
                    }
                }
            }
        });

        return true;
    },
    init: async (amocrm, self) => {
        return true
    },
    bind_actions: async (amocrm, self) => {
        window.colorChange = function (event) {
            const disabled = setInterval(() => {
                if ($('.cf-field-wrapper__body').length > 0) {
                    $('.cf-field-edit__body-top').addClass('dct-group-disabled')
                    $('.cf-field-edit__type-select').addClass('dct-group-disabled')
                    $('.cf-field-wrapper__body_no-id').addClass('dct-group-modal')
                    $('.modal-body__actions__save').addClass('dct-group-button')
                    clearInterval(disabled)
                }
            }, 50);
        };

        $('#linked_context_settings,.js-card-tab[data-id="settings"]').on('click', async function (e) {

            const cfs = await getCustomFields(amocrm);
            const ids = cfs.map(item => item.id);

            const interval = setInterval(() => {
                if ($('.cf-field-add').length > 0) {
                    $('.cf-field-wrapper').each(function (index, elem) {
                        if ($(elem).attr('id')) {
                            let number = parseInt($(elem).attr('id').match(/\d+/)[0].trim());
                            if (!ids.includes(number)) {
                                $(elem).addClass('dtc-default-element')
                            } else {
                                $(elem).addClass('dtc-color-main').attr('onclick', 'colorChange(event)')
                                $(elem).find('.cf-field-wrapper__body').addClass('dtc-group-color');
                                $(elem).find('.cf-field-view__value').text('Заголовок')
                            }
                        }
                    });

                    var addFieldButton = document.querySelector('.cf-field-add');
                    addFieldButton.addEventListener('click', function () {

                        const disabled = setInterval(() => {
                            if ($('.cf-field-edit__type-select').length > 0) {
                                var modalWindow = document.querySelector('.cf-field-wrapper__body_no-id');
                                modalWindow.querySelector('.button-input').addEventListener('click', function () {
                                    if (!modalWindow.querySelector('.button-input').classList.contains('dct-group-button')) {
                                        setTimeout(async function (settings) {
                                            const cfs = await getAllCustomFields(amocrm);
                                            var keys = Object.keys(cfs);
                                            var lastKey = keys[keys.length - 1];
                                            var lastElement = cfs[lastKey];
                                            makeFiledItem(lastElement);
                                        }, 1500);
                                    }
                                });
                                clearInterval(disabled)
                            }
                        }, 100);
                    });
                    var titleButton = addFieldButton.cloneNode(true);
                    console.log(titleButton)
                    titleButton.style.marginLeft = '2px';
                    titleButton.classList.add('title_button_custom');
                    titleButton.classList.remove('js-card-cf-add-field');
                    titleButton.childNodes[1].nodeValue = 'Добавить заголовок';
                    addFieldButton.parentNode.appendChild(titleButton);
                    titleButton.addEventListener('click', function () {
                        addFieldButton.click();
                        const disabled = setInterval(() => {
                            console.log(1)
                            if ($('.cf-field-edit__type-select').length > 0) {
                                $('.cf-field-edit__body-top').addClass('dct-group-disabled')
                                $('.cf-field-edit__type-select').addClass('dct-group-disabled')
                                $('.cf-field-wrapper__body_no-id').addClass('dct-group-modal')
                                $('.modal-body__actions__save').addClass('dct-group-button')
                                var modalWindow = document.querySelector('.cf-field-wrapper__body_no-id');
                                modalWindow.querySelector('.button-input').addEventListener('click', function () {
                                    setTimeout(async function (settings) {
                                        const cfs = await getAllCustomFields(amocrm);
                                        var keys = Object.keys(cfs);
                                        var lastKey = keys[keys.length - 1];
                                        var lastElement = cfs[lastKey];
                                        await makeFiledAsGroup(lastElement);
                                    }, 2000);
                                });
                                clearInterval(disabled)
                            }
                        }, 100)
                    });
                    clearInterval(interval)
                }
            }, 200);


        });

        return true
    },
    destroy: async (amocrm, self) => true,
    onSave: async function (amocrm, self) {
        try {
            await async(amocrm);
            return true
        } catch (error) {
            return true
        }
    },
    settings: async function (amocrm, appElement, self) {
        document.querySelector('.widget_settings_block__descr').style.display = 'none'; // hide this element
        $(appElement[0]).append('<div id="vue-app-dispatch"></div>'); // add new div here and set id vue-app-dispatch
        try {
            const subdomainId = await async(amocrm);
            // Check if subdomain exists
            if (subdomainId) {
                // Get subdomainId from the server
                const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });

                if (isInstalled) {
                    const app = createApp(Settings);
                    app.provide('amocrm', amocrm);
                    app.use(Notifications)
                    app.directive("maska", vMaska)
                    app.use(store);
                    app.mount('#vue-app-dispatch');
                }
            }
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.provide('error', error);
            errorHandler.mount('#vue-app-dispatch');
        }
    },
    advancedSettings: async function (amocrm, appElement, self) {
        appElement.classList.add('dtc-settings-app'); // Add the class to the element
        try {
            const subdomainId = await async(amocrm);
            const app = createApp(Advanced);
            app.provide('amocrm', amocrm);
            app.use(Notifications)
            app.directive("maska", vMaska)
            app.use(store);
            app.mount('.dtc-settings-app');
        } catch (error) {
            const errorHandler = createApp(ErrorHendler);
            errorHandler.provide('error', error);
            errorHandler.mount('.dtc-settings-app');
        }
    },
}

export default Widget;