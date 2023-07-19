<template>
  <div :class="classObjMain">
    <div class="feedback-block dtc-feedback-modal-dtc mt-4 rounded-lg">
      <slot name="text"></slot>
      <div class="dtc-feedback__buttons" data-btns="dtc">
        <div class="flex items-center" :class="classObj">
          <button class="dtc-feedback__button" data-feedback="whatsapp">
            <a href="https://web.whatsapp.com/send?phone=79655932646">
              <span>Написать в Whatsapp</span>
            </a>
          </button>
          <button class="dtc-feedback__button" data-feedback="telegram">
            <a href="https://t.me/dici_tech_bot">
              <span>Написать в Telegram</span>
            </a>
          </button>
          <button class="dtc-feedback__button" data-feedback="email">
            <a href="mailto:help@dicitech.com">
              <span>help@dicitech.com</span>
            </a>
          </button>
          <button class="dtc-feedback__button" data-feedback="call">
            <span> <a href="tel:+74992132608"></a> +7 499 213 26 08</span>
          </button>
          <button
            class="dtc-feedback__button"
            data-feedback="bug"
            @click="showModal2"
          >
            <span>Сообщить о ошибке</span>
          </button>
          <button
            class="dtc-feedback__button"
            data-feedback="wishes"
            @click="showModal"
          >
            <span>Предложить новый функционал </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mymodal">
    <Modal :size="sm" v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">Предложить новый функционал</div>
      </template>
      <template #body>
        <div class="px-4">
          <p>
            Вам бы хотелось чтобы виджет умел делать то, что не умеет сейчас?
            Опишите Вашу идею, мы обязательно рассмотрим её и возможно реализуем
            в следующей версии виджета.
          </p>
          <form class="space-y-6 mt-4" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><b>Имя</b></label
              >
              <input
                type="text"
                name="name"
                id="name_1"
                v-model="user.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Имя"
                required
              />
            </div>
            <div>
              <label
                for="tel"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><b>Номер телефона</b></label
              >
              <input
                type="tel"
                name="tel"
                id="tel"
                v-model="user.login"
                placeholder="Номер телефона"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label
                for="tel"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><b>Описание</b></label
              >
              <textarea
                rows="4"
                class="p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 dark:text-white dark:placeholder-gray-400"
                required
              ></textarea>
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <div class="w-full p-4">
          <button
            @click="handleSave"
            type="button"
            class="w-full text-white bg-[#4285F4] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Отправить
          </button>
        </div>
      </template>
    </Modal>
  </div>

  <div class="mymodal">
    <Modal :size="sm" v-if="isShowModal2" @close="closeModal2">
      <template #header>
        <div class="flex items-center text-lg">Сообщить о ошибке</div>
      </template>
      <template #body>
        <div class="px-4">
          <p>
            Обнаружили ошибку в работе виджета? Опишите проблему и по
            возможности прикрепите скриншоты ссылками. Наши специалисты
            постараются решить её в ближайшее время.
          </p>
          <form class="space-y-6 mt-4" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><b>Имя</b></label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="user.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Имя"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><b>Эл. адрес</b></label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model="user.login"
                placeholder="Эл. адрес"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <textarea
                rows="4"
                class="p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 dark:text-white dark:placeholder-gray-400"
              ></textarea>
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <div class="w-full p-4">
          <button
            @click="handleSave2"
            type="button"
            class="w-full text-white bg-[#4285F4] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Отправить
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { Modal } from "flowbite-vue";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";

const amocrm = inject("amocrm");
const user = amocrm.constant("user");

const props = defineProps({
  isMain: Boolean,
});

const classObj = computed(() => ({
  "dtc-fixed-item-1": props.isMain,
  "flex-wrap": !props.isMain,
}));

const classObjMain = computed(() => ({
  "dtc-feedback-modal-dtc-settings": !props.isMain,
}));

const isShowModal = ref(false);
const isShowModal2 = ref(false);

function handleSave2() {
  closeModal2();
  notify({
    type: "success",
    title: "Заявка отправлена",
    text: "Наши специалисты свяжутся с вами",
  });
}

function handleSave() {
  closeModal();
  notify({
    type: "success",
    title: "Заявка отправлена",
    text: "Наши специалисты свяжутся с вами",
  });
}

function closeModal() {
  isShowModal.value = false;
}

function closeModal2() {
  isShowModal2.value = false;
}

function showModal() {
  isShowModal.value = true;
}

function showModal2() {
  isShowModal2.value = true;
}
</script>
