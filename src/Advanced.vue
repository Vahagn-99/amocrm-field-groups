<template>
  <div class="h-screen relative">
    <nav class="dtc-nav bg-white border-gray-200 dark:bg-gray-900">
      <div class="px-6 py-3 mx-auto mb-4">
        <div class="flex items-center justify-between">
          <ul
            class="dtc-ul dtc-ul-general flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm"
          >
            <li
              @click="switchNav('info')"
              :class="{
                'dtc-active': showNav('info'),
              }"
            >
              <a
                href="#"
                class="dtc-a flex items-center py-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>

                <span class="ml-3">Инфо</span>
              </a>
            </li>
            <li
              @click="switchNav('doc')"
              :class="{
                'dtc-active': showNav('doc'),
              }"
            >
              <a
                href="#"
                class="dtc-a flex items-center py-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="ml-3">Инструкция</span>
              </a>
            </li>
          </ul>
          <div class="mt-[-50px]">
            <InfoCard
              :value="isLicensed"
              :isLicensed="true"
              :isFirst="false"
              :loading="isLoading('license')"
            >
              <template #title>
                <span class="text-[#343434]">Статус лицензии:</span>

                <strong v-if="isLicensed" class="text-[#00af70] ml-[8px]">
                  Активировано</strong
                >
                <strong v-if="!isLicensed" class="text-[#f45050] ml-[8px]"
                  >Просрочено</strong
                ></template
              >
            </InfoCard>
          </div>
        </div>
      </div>
    </nav>
    <div class="mx-6">
      <div class="border-gray-200 rounded-lg dark:border-gray-700">
        <NavItem v-if="showNav('info')">
          <div class="flex response-items">
            <div class="w-[50%] resp-item">
              <InfoCard
                :value="isRegistred"
                @click="handleAmoAuth"
                :isFirst="true"
                :isLicensed="false"
                :loading="isLoading('registred')"
              >
                <template #title> Авторизация </template>
                <template #trueValue>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 mx-2 text-green-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                <template #falseValue>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 mx-2 text-red-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                <template v-if="isRegistred" #content
                  >Аккаунт авторизован</template
                >
                <template v-else #content
                  >Шаг 1. Кликните для авторизации
                </template>
              </InfoCard>
              <InfoCard
                :value="hasPhone"
                :isFirst="false"
                :isLicensed="false"
                :loading="isLoading('hasPhone')"
              >
                <template #title> Статус клиента </template>
                <template #trueValue>
                  <svg
                    class="w-6 h-6 mr-2 text-xl text-green-500 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </template>
                <template #falseValue>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 mx-2 text-red-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                <template #content>
                  <span v-if="hasPhone">Телефон подтвержден</span>
                  <span v-if="!hasPhone">Шаг 2. Подтвердите телефон</span>
                </template>
              </InfoCard>
            </div>
            <div class="w-[50%] ml-6 resp-item">
              <div class="view-integration-modal__activation h-full">
                <div class="activation-main-wrapper h-full">
                  <div class="dtc-activation-page h-full">
                    <div class="dtc-send-phone-block h-full">
                      <SettingsPhone
                        :isMain="true"
                        :value="clientStatusActive"
                        :loading="isLoading('hasPhone')"
                      >
                        <template #trueValue></template>
                        <template #falseValue></template>
                      </SettingsPhone>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <Support :isMain="true" />
          </div>
        </NavItem>
        <NavItem v-if="showNav('settings')">
          <WidgetSettings />
          <div class="mt-6">
            <Support :isMain="true" />
          </div>
        </NavItem>
        <NavItem v-if="showNav('doc')">
          <div class="flex">
            <WidgetDoc />
          </div>
        </NavItem>
      </div>
    </div>
  </div>
  <notifications position="top right" width="400px" :duration="5000" />
</template>

<script setup>
import NavItem from "./components/NavItem.vue";
import InfoCard from "./components/InfoCard.vue";
import WidgetDoc from "./components/WidgetDoc.vue";
import { onMounted, ref } from "vue";
import { oauthModal } from "./helpers/helpers";
import { useSubdomain } from "./compostions/useSubdomain";
import SettingsPhone from "./components/SettingsPhone.vue";
import Support from "./components/Support.vue";

const {
  subdomainId,
  subdomain,
  isRegistred,
  isLicensed,
  hasPhone,
  checkIsRegistred,
  checkIsLicensed,
  checkHasPhone,
  asyncSubdomain,
} = useSubdomain();

const currentNav = ref("info");

const clientStatusActive = ref(false);

function switchNav(next) {
  currentNav.value = next;
}
function showNav(is) {
  return currentNav.value === is;
}
async function handleAmoAuth() {
  await oauthModal(
    `${window.Host}amo-auth/${subdomainId.value}?client_id=${subdomain.value.integration_id}`
  ).then(async (e) => {
    await checkIsRegistred();
  });
}

const loadables = ref(["widget", "registred", "license", "status", "hasPhone"]);
function isLoading(element) {
  return loadables.value.includes(element);
}
function loaded(element) {
  loadables.value = loadables.value.filter((item) => item !== element);
}

onMounted(async () => {
  await asyncSubdomain();
  loaded("widget");
  loaded("status");
  await checkIsRegistred();
  loaded("registred");
  await checkIsLicensed();
  loaded("license");
  await checkHasPhone();
  loaded("hasPhone");
});
</script>
