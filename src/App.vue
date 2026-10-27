<script setup lang="ts">
import { RouterView } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <div class="container">
    <RouterView />
    <footer class="mt-3 text-center">
      <span>&copy; {{year}} - Interakcija ovek racunar</span><br>
      <span>Univerzitet Singidunum</span>
    </footer>
  </div>
</template>