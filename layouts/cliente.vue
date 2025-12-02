<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="parentCont">
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="-translate-x-full">
                <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                  <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 sm:-mr-10 sm:pl-4">
                      <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                        <span class="absolute -inset-2.5" />
                        <span class="sr-only">Cerrar menu</span>
                        <XMarkIcon class="size-6" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                      <DialogTitle class="text-base font-semibold text-gray-900">Menú de navegación.</DialogTitle>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <div class="menuCont">
                        <div class="infoPerfil">
                          <div class="titleProject">
                            <img src="./../assets/images/escudo-png.png" alt="Logotipo" class="logo">
                            <p class="nameProject">
                              CuantiNutri
                            </p>
                          </div>
                          <div class="userID">
                            <span class="siluetaUser material-symbols-outlined">account_circle</span>
                            <p class="userName">
                              Carlos Eduardo
                            </p>
                          </div>
                        </div>
                        <div class="lineDivider"></div>
                        <div class="navigationSection">
                          <NuxtLink v-for="page in pagesCliente" :key="page.titulo" :to="page.path" class="btnNav" active-class="btnAct font-semibold text-white" @click="open = false">
                            <span class="material-symbols-outlined">{{ page.icono }}</span>
                            <span class="textBtnNav">{{ page.titulo }}</span>
                          </NuxtLink>
                        </div>
                        <div class="lineDivider"></div>
                        <div class="logOutSection" @click="handleLogout">
                          <span class="logOutIcon material-symbols-outlined">logout</span>
                          <span class="logOutTxt">Salir</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="pageCont">
      <div class="headTitle">
        <button
          type="submit"
          class="textMenu flex justify-center gap-2 items-center shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-yellow-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          @click="open = true"
        >
          Menú
          <svg
            class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              class="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
        <p class="pageTitle">
          Panel de control principal
        </p>
      </div>
      <div class="mainPanel">
        <slot />
      </div>
    </div>
  </div>
  
</template>

<script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'

  const { logout } = useAuth()

  const open = ref(false)

  const pagesCliente = [
    {
      icono: 'home',
      titulo: 'Panel',
      path: '/cliente'
    },
    {
      icono: 'calculate',
      titulo: 'Isoflavonas',
      path: '/cliente/isoflavonas'
    },
    {
      icono: 'person',
      titulo: 'Perfil',
      path: '/cliente/perfil'
    }
  ]

  const handleLogout = async () => {
    await logout()
  }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.parentCont {
  font-family: 'Roboto';
}
.menuCont {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titleProject {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1.4em;
}
.logo {
  height: 4em;
}
.nameProject {
  color: #06254f;
  font-size: 1.8em;
  font-weight: 600;
  letter-spacing: 1px;
  margin-left: .6em;
}
.userID {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.4em;
  margin-bottom: 2.2em;
}
.userName {
  font-size: 1.2em;
  font-weight: 400;
  margin-top: .2em;
}
.siluetaUser {
  font-size: 4em;
  color: #3d3d3d;
}
.lineDivider {
  height: 2px;
  width: 70%;
  background-color: #cfcfcf;
  margin: 1.2em 0;
}
.navigationSection {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.btnNav {
  padding: 10px 22px;
  margin: 12px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: .4s;
  font-size: 1em;
  border: 1px solid #cfcfcf;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.btnNav:hover {
  color: white;
  background-color: #f2ce4d;
  font-weight: 600;
}
.btnAct {
  background-color: #f2ce4d;
}
.textBtnNav {
  margin-left: .8em;
}
.logOutSection {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 22px;
  color: black;
  transition: .5s;
  margin-top: 2em;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1.2em;
}
.logOutSection:hover {
  background-color: black;
  color: white;
}
.logOutIcon {
  font-size: 1.2em;
}
.logOutTxt {
  margin-left: .4em;
}
.pageCont {
  margin: 2.2em 2.8em;
}
.headTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.textMenu {
  font-weight: 400;
}
.pageTitle {
  margin-left: 1.2em;
  font-size: 1.6em;
  font-weight: 600;
  color: #06254f;
}
</style>