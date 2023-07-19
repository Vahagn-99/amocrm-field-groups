<template>
  <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Error! </strong>
    <span class="block sm:inline">{{ error.message }}</span>
    <pre class="mt-2 text-sm">{{ error.stack }}</pre>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const error = inject('error') // inject the error provided by the parent component
</script>