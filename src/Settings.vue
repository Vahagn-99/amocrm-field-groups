<template>
  <div class="view-integration-modal__activation">
    <div class="activation-main-wrapper">
      <div class="dtc-activation-page">
        <div class="dtc-send-phone-block">
          <div>
            <SettingsPhone :isMain="false" :loading="phoneLoading" />
          </div>
          <button
            type="button"
            @click="goToAdvancedSettings"
            class="w-full justify-center mt-4 mb-4 dtc-button setting-btn text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2"
          >
            Активировать и перейти к инструкции виджета
          </button>
          <div>
            <Support :isMain="false">
              <template v-slot:text>
                <div class="dtc-feedback__text">
                  <strong class="text-[15px] text-[#343434]"
                    >Техническая поддержка</strong
                  ><br />
                  <p class="text-[15px] text-black">
                    Мы всегда готовы помочь удобном для вас способом
                  </p>
                </div>
              </template>
            </Support>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 10px" class="float-right"></div>
  </div>
  <notifications position="top right" width="400px" :duration="5000" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import SettingsPhone from "./components/SettingsPhone.vue";
import Support from "./components/Support.vue";
import { useSubdomain } from "./compostions/useSubdomain";

const { asyncSubdomain, checkHasPhone, subdomain } = useSubdomain();

const phoneLoading = ref(true);

const goToAdvancedSettings = async () => {
  // Get the original button element by its id
  let button = $("#save_dct_group_field");
  button.click();
  window.location.href = `https://${subdomain.value.domain}/settings/widgets/dct_group_field`;
};

onMounted(async () => {
  await asyncSubdomain();
  await checkHasPhone();
  phoneLoading.value = false;
});
</script>
