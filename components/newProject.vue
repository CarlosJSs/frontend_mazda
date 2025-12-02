<template>
  <div class="formAddProyecto" v-if="visibleNewProj">
    <div class="AddPcontainer">
      <form ref="formProj">
        <div class="space-y-6">
          
          <div class="border-b border-gray-900/10 pb-4">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Registrar un nuevo proyecto</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">Complete la información técnica y asigne los responsables.</p>
          </div>

          <div class="border-b border-gray-900/10 pb-8">
            <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium leading-6 text-gray-900">Título del Proyecto</label>
                <div class="mt-2">
                  <input
                    type="text"
                    v-model="projectData.titulo"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Ej. Optimización de Línea 3"
                  />
                  <p v-if="errors.titulo" class="text-red-500 text-xs mt-1">{{ errors.titulo }}</p>
                </div>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-medium leading-6 text-gray-900">Área</label>
                <div class="mt-2">
                  <select
                    v-model="projectData.area"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Seleccione un área</option>
                    <option v-for="area in areasDisponibles" :key="area" :value="area">
                      {{ area }}
                    </option>
                  </select>
                  <p v-if="errors.area" class="text-red-500 text-xs mt-1">{{ errors.area }}</p>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                <div class="mt-2">
                  <textarea
                    v-model="projectData.descripcion"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Breve descripción del proyecto..."
                  ></textarea>
                  <p v-if="errors.descripcion" class="text-red-500 text-xs mt-1">{{ errors.descripcion }}</p>
                </div>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-medium leading-6 text-gray-900">Encargado</label>
                <div class="mt-2">
                  <select
                    v-model="projectData.id_encargado"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Seleccione un encargado</option>
                    <option v-for="user in listaEncargados" :key="user.id" :value="user.id">
                      {{ user.nombre }}
                    </option>
                  </select>
                  <p v-if="errors.id_encargado" class="text-red-500 text-xs mt-1">{{ errors.id_encargado }}</p>
                </div>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-medium leading-6 text-gray-900">Supervisor (Automático)</label>
                <div class="mt-2">
                  <input
                    type="text"
                    :value="supervisorNombre"
                    disabled
                    class="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 cursor-not-allowed"
                    placeholder="Se define por el encargado"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium leading-6 text-gray-900">Aprobador</label>
                <div class="mt-2">
                  <select
                    v-model="projectData.id_aprobador"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Seleccione el aprobador</option>
                    <option v-for="user in listaAprobadores" :key="user.id" :value="user.id">
                      {{ user.nombre }}
                    </option>
                  </select>
                  <p v-if="errors.id_aprobador" class="text-red-500 text-xs mt-1">{{ errors.id_aprobador }}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button @click="cancelProj" type="button" class="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
            Cancelar
          </button>
          <button 
            @click="validateAndAddProject" 
            type="button" 
            class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Crear Proyecto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps(['visibleNewProj'])
const emit = defineEmits(["addNewProject", "close"])

//traemos los usuario (para los select)
const { usuarios, fetchUsuarios } = useUsuarios()

// satos del formulario
const projectData = ref({
  area: '',
  titulo: '',
  descripcion: '',
  id_encargado: '',
  id_supervisor: '', // automatico
  id_aprobador: ''
})

//para cambiar el supervisor
const supervisorNombre = ref('')

const errors = ref({
  area: null,
  titulo: null,
  descripcion: null,
  id_encargado: null,
  id_aprobador: null
})

const areasDisponibles = [
  "Calidad", "Finanzas", "Logistica", "Sistemas", "Produccion", "Manufactura"
]

onMounted(async () => {
  if (usuarios.value.length === 0) {
    await fetchUsuarios()
  }
})

const listaEncargados = computed(() => {
  return usuarios.value.filter(u => u.rol === 'Planeador')
})

const listaAprobadores = computed(() => {
  return usuarios.value.filter(u => u.rol === 'Aprobador')
})

// definir el supervisor por el encargado
watch(() => projectData.value.id_encargado, (newId) => {
  if(!newId) {
    projectData.value.id_supervisor = ''
    supervisorNombre.value = ''
    return
  }

  const encargadoSeleccionado = usuarios.value.find(u => u.id === newId)

	console.log(encargadoSeleccionado.value)

  if(encargadoSeleccionado) {
    projectData.value.id_supervisor = encargadoSeleccionado.id_supervisor
    supervisorNombre.value = encargadoSeleccionado.id_supervisor
  }
})

const validateForm = () => {
  let valid = true
  Object.keys(errors.value).forEach(key => errors.value[key] = null)

  if (!projectData.value.titulo) {
    errors.value.titulo = 'El título es obligatorio.'
    valid = false
  }
  if (!projectData.value.area) {
    errors.value.area = 'Seleccione un área.'
    valid = false
  }
  if (!projectData.value.descripcion) {
    errors.value.descripcion = 'La descripción es obligatoria.'
    valid = false
  }
  if (!projectData.value.id_encargado) {
    errors.value.id_encargado = 'Seleccione un encargado.'
    valid = false
  }
  if (!projectData.value.id_aprobador) {
    errors.value.id_aprobador = 'Seleccione un aprobador.'
    valid = false
  }

  return valid
}

const validateAndAddProject = () => {
  if (validateForm()) {
    emit("addNewProject", { ...projectData.value })
    resetForm()
  }
}

const resetForm = () => {
  projectData.value = {
    area: '',
    titulo: '',
    descripcion: '',
    id_encargado: '',
    id_supervisor: '',
    id_aprobador: ''
  }
  supervisorNombre.value = ''
  Object.keys(errors.value).forEach(key => errors.value[key] = null)
}

const cancelProj = () => {
  resetForm()
  emit("close")
}
</script>

<style scoped>
	.formAddProyecto {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.AddPcontainer {
		background: white;
		width: 42vw;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>
