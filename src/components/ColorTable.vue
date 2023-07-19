<template>
  <div>
    <table
      class="dtc-table dtc-table-color w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead class="text-gray-900 font-bold">
        <tr>
          <td scope="col" class="py-3 w-[60%]">Название приоритета</td>
          <td scope="col" class="py-3">Цвет приоритета</td>
          <td></td>
        </tr>
      </thead>
      <tbody class="border-b">
        <template v-for="setting in settings">
          <ColorTablelItem :item="setting" :id="key" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useSettings } from "../compostions/useSettings";
import ColorTablelItem from "./ColorTablelItem.vue";
import draggable from "vuedraggable";

const { settings } = useSettings();
console.log(settings.value);
</script>
