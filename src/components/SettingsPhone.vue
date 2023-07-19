<template>
  <div
    class="dtc-activate__wrapper h-full rounded-lg box-border bg-[#e3edf6]"
    :class="classObj"
  >
    <div v-if="loading" class="flex items-center">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="dtc-activate__body" v-else>
      <div class="dtc-activate__info-wrapper">
        <div class="dtc-activate__info-body flex start items-center">
          <div class="dtc-activate__icon">
            <svg
              v-if="hasPhone"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[3rem] h-[3rem] mx-2 text-green-500"
            >
              <path
                fill-rule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-if="!hasPhone"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[3rem] h-[3rem] mx-2 text-red-500"
            >
              <path
                fill-rule="evenodd"
                d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <div class="dtc-activate__title text-[15px] text-[#343434]">
              Статус клиента
              <span class="text-[#00ad71]" v-if="hasPhone">
                : Телефон подтвержден</span
              >
            </div>
            <div class="dtc-activate__description text-[15px] text-black">
              Подтвердите телефон и получите виджет в подарок
            </div>
          </div>
        </div>
      </div>
      <div
        class="dtc-activate__controls-wrapper"
        style="pointer-events: all; opacity: 1"
      >
        <div class="dtc-activate__controls dtc-activate__controls-dtc">
          <div class="dtc-activate__controls">
            <div class="dtc-activate__phone w-full">
              <label>
                <div class="intl-tel-input">
                  <Input
                    id="dtc-activation-phone"
                    label=""
                    type="tel"
                    name="dtc-phone__activation"
                    v-model="currentCountryCode"
                    placeholder="Номер телефона"
                    :pattern="[currentCountryMask]"
                  />
                  <div class="flag-dropdown" @click="toggleCountryList">
                    <div class="flex items-center pr-[5px]">
                      <div class="selected-flag" title="Russia (Россия): +7">
                        <div class="flag" :class="currentCountryFlag">
                          <div class="arrow"></div>
                        </div>
                      </div>
                    </div>
                    <ul class="country-list" v-if="openCountryList">
                      <template
                        v-for="country in countries"
                        :key="country.code"
                      >
                        <li
                          @click="
                            handleCountryCode(
                              country.code,
                              country.iso.toLowerCase(),
                              country.mask
                            )
                          "
                          class="country"
                          :data-dial-code="country.iso"
                          :data-country-code="country.code.toLowerCase()"
                        >
                          <div
                            :class="'flag ' + country.iso.toLowerCase()"
                          ></div>
                          <span class="country-name">{{ country.name }}</span
                          ><span class="dial-code">{{ country.code }}</span>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </label>
            </div>
            <div class="dtc-activate__button">
              <button
                @click="handlePhone"
                type="button"
                class="button-input"
                :class="{ 'button-input-disabled': !userAgreed }"
                id="dtc-activation-button"
              >
                <span class="button-input-inner"
                  ><span class="button-input-inner__text"
                    >Подтвердить</span
                  ></span
                >
              </button>
            </div>
          </div>
          <div class="dtc-activate__politics">
            <label class="control-checkbox control-checkbox_small">
              <div class="control-checkbox__body">
                <input
                  type="checkbox"
                  name="dtc-politics"
                  v-bind:checked="hasPhone"
                  v-model="userAgreed"
                />
                <span class="control-checkbox__helper"></span>
              </div>
            </label>
            <span class="dtc-activate__policits-text">
              Я ознакомлен с
              <a
                href="https://dicitech.com/license-agreement "
                target="_blank"
                class="dtc-tab__activation_user_agreement_link"
                >пользовательским соглашением</a
              >
              и
              <a
                href="https://dicitech.com/work_info "
                target="_blank"
                class="dtc-tab__activation_politics_link"
                >политикой конфиденциальности</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useSelect } from "../compostions/useSelect";
import Input from "./Input.vue";
import { useSubdomain } from "../compostions/useSubdomain";

const { hasPhone, addPhone, subdomain, asyncSubdomain } = useSubdomain();

const props = defineProps({
  isMain: Boolean,
  loading: Boolean,
});

const classObj = computed(() => ({
  "flex items-center justify-center": props.loading,
}));

const { getCountries, countries } = useSelect();
const openCountryList = ref(false);
const userAgreed = ref(false);
const currentCountryCode = ref("+7");
const currentCountryFlag = ref("ru");
const currentCountryMask = ref("+7(###)###-##-##");

async function handlePhone() {
  const data = {
    phone: currentCountryCode.value,
    country: currentCountryFlag.value,
    mask: currentCountryMask.value,
  };
  await addPhone(data);
}

function handleCountryCode(code, flag, mask) {
  currentCountryCode.value = code;
  currentCountryFlag.value = flag;
  currentCountryMask.value = code + mask;
  toggleCountryList()
}

function toggleCountryList() {
  openCountryList.value = !openCountryList.value;
}

onMounted(async () => {
  await asyncSubdomain();
  await getCountries();
  currentCountryCode.value = subdomain.value?.phone ?? "+7";
  currentCountryFlag.value = subdomain.value?.country ?? "ru";
  currentCountryMask.value = subdomain.value?.phone_mask ?? "+7(###)###-##-##";
});
</script>
