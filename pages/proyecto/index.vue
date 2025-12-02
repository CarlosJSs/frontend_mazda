<template>
  <div>
    Proyectos
    <div class="tablaContainer">
      <projectsTable />
    </div>
  </div>
</template>

<script setup>
  import projectsTable from '~/components/projectsTable.vue';

  definePageMeta({
    layout: 'proyecto'
  })
</script>

<style scoped>
.tablaContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>