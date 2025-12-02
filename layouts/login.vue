<template>
  <div align="center" justify="center" class="indexBackground">
    <div class="formCont">
      <slot />
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.indexBackground {
  font-family: 'Roboto' !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  color: black;
  margin: 0;
  padding: 0;
}
.formCont {
  width: 52%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>