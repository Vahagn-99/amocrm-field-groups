define(['./app.js?cache=' + Date.now()], function (App) {

    const Widget = function () {
        const self = this;
        const _amocrm = window.APP;
        self.system = this.system();
        self.langs = this.langs;

        /** @private */
        this.callbacks = {
            async render() {
                try {
                    await App.default.render(_amocrm, self);
                    return true
                } catch (error) {
                    throw error
                }
            },
            async init() {
                try {
                    await App.default.init(_amocrm, self);
                    return true
                } catch (error) {
                    throw error
                }
            },
            async bind_actions() {
                try {
                    await App.default.bind_actions(_amocrm, self);
                } catch (error) {
                    throw error
                }
            },
            async settings($settings_body) {
                try {
                    await App.default.settings(_amocrm, $settings_body, self);
                } catch (error) {
                    throw error
                }
            },
            async advancedSettings() {
                $settings_body = document.getElementById('list_page_holder');
                try {
                    await App.default.advancedSettings(_amocrm, $settings_body, self);
                } catch (error) {
                    throw error
                }
            },
            async onSave() {
                try {
                    await App.default.onSave(_amocrm, self);
                    return true;
                } catch (error) {
                    throw error
                }
            },
            async destroy() {
                try {
                    await App.default.destroy(_amocrm, self);
                    return true;
                } catch (error) {
                    throw error
                }
            },
            contacts: {
                async selected() {
                    try {
                        await App.default.contacts_selected(_amocrm, self);
                        return true;
                    } catch (error) {
                        throw error
                    }
                }
            },
            leads: {
                async selected() {
                    try {
                        await App.default.leads_selected(_amocrm, self);
                        return true;
                    } catch (error) {
                        throw error
                    }
                }
            },
            tasks: {
                async selected() {
                    try {
                        await App.default.tasks_selected(_amocrm, self);
                        return true;
                    } catch (error) {
                        throw error
                    }
                }
            }
        };

        return this;
    };

    return Widget;
});