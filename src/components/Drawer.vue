<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="dtc-drawer-fixed z-40 h-screen p-4 overflow-y-auto bg-slate-50 w-2/5 dtc-modal"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <button
        @click="closeModal"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dtc-button text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="grid grid-cols-1 gap-4">
        <div class="w-full sm:px-4 sm:py-2">
          <ColorTable />
        </div>
        <div class="w-full sm:px-4 ">
          <button
            @click="addNewItem"
            type="button"
            class="dtc-button float-right text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Добавить приоритет
          </button>
        </div>
        <div class="flex justify-between w-full sm:px-4 sm:py-2">
          <button
            @click="closeModal"
            type="button"
            class="dtc-button text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
          >
            Закрыть
          </button>
          <button
            @click="handleSave"
            type="button"
            class="dtc-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Drawer } from "flowbite";
import { useSettings } from "../compostions/useSettings";
import { onMounted, ref } from "vue";
import ColorTable from "./ColorTable.vue";

const { saveSettings, settings } = useSettings();

const drawerInstance = ref(null); // Create a ref for the drawer instance

const props = defineProps({
  subdomainId: Number,
});

const emit = defineEmits(["close-drawer"]);

function addNewItem() {
  settings.value.push({ name: null, color: null });
}

async function handleSave() {
  await saveSettings(props.subdomainId);
//   closeModal();
//   if (drawerInstance.value) {
//     drawerInstance.value.hide(); // Hide the drawer after saving
//   }
}

function closeModal() {
  drawerInstance.value.hide();
  emit("close-drawer");
}

onMounted(async () => {
  const $targetEl = document.getElementById("drawer-example");
  const options = {
    placement: "right",
    backdrop: false,
    bodyScrolling: false,
    edge: false,
    edgeOffset: "",
    onHide: () => {
      emit("close-drawer");
    },
    onShow: () => {},
    onToggle: () => {},
  };

  if ($targetEl) {
    drawerInstance.value = new Drawer($targetEl, options); // Assign the drawer instance to the ref
    // Show the drawer initially
    drawerInstance.value.show();
  }
});
</script>
