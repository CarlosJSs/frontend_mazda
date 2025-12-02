<template>
	<div class="formAddProyecto" v-if="visibleNewProj">
		<div class="AddPcontainer">

			<form ref="formProj">
				<div class="space-y-8">

					<div class="border-b border-gray-900/10 pb-4">
						<h2 class="text-base font-semibold leading-7 text-gray-900">Crear un Nuevo Proyecto.</h2>
						<p class="mt-1 text-sm leading-6 text-gray-600">Por favor, rellene los siguientes campos para continuar.</p>
					</div>

					<div class="border-b border-gray-900/10 pb-12">
						<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

							<div class="sm:col-span-8">
								<label for="ProjName" class="block text-sm font-medium leading-6 text-gray-900">Nombre del proyecto</label>
								<div class="mt-2">
									<input
										type="text"
										id="name"
										name="name"
										v-model="projectData.nombre"
										:class="{'ring-red-500': errors.nombre}"
										class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
										placeholder="ID3312"
									/>
									<p v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</p>
								</div>
							</div>

							<div class="sm:col-span-4">
								<label for="dateInit" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Inicio</label>
								<div class="mt-2">
									<input
										type="date"
										id="dateInit"
										name="dateInit"
										v-model="projectData.fechaInicio"
										:class="{'ring-red-500': errors.fechaInicio}"
										class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
									/>
									<p v-if="errors.fechaInicio" class="text-red-500 text-sm mt-1">{{ errors.fechaInicio }}</p>
								</div>
							</div>

							<div class="sm:col-span-4">
								<label for="dateEnd" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Fin</label>
								<div class="mt-2">
									<input
										type="date"
										id="dateEnd"
										name="dateEnd"
										v-model="projectData.fechaFin"
										:disabled="!projectData.fechaInicio"
										:class="{'ring-red-500': errors.fechaFin}"
										class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
									/>
									<p v-if="errors.fechaFin" class="text-red-500 text-sm mt-1">{{ errors.fechaFin }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-6 flex items-center justify-end gap-x-6">
					<button @click="cancelProj" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
					<button @click="validateAndAddProject" type="button" class="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">Crear</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { ref, defineComponent } from 'vue'

	export default defineComponent({
		name: 'FormNewProj',
		props: ['visibleNewProj'],
		emits: ["addNewProject", "close"],

		setup(props, { emit }) {
			const formProj = ref(null)

			const projectData = ref({
				nombre: '',
				fechaInicio: '',
				fechaFin: ''
			})

			const errors = ref({
				nombre: null,
				fechaInicio: null,
				fechaFin: null
			})

			const validateForm = () => {
				let valid = true

				// validar el nombre
				if (!projectData.value.nombre) {
					errors.value.nombre = 'El nombre es obligatorio.'
					valid = false
				} else if (!/^[a-zA-Z0-9_]+$/.test(projectData.value.nombre)) {
					errors.value.nombre = 'Solo se permiten letras, números y guion bajo.'
					valid = false
				} else {
					errors.value.nombre = null
				}

				// validar la fecha de inicio
				if (!projectData.value.fechaInicio) {
					errors.value.fechaInicio = 'La fecha de inicio es obligatoria.'
					valid = false
				} else {
					errors.value.fechaInicio = null
				}

				// validar la fecha de fin
				if (!projectData.value.fechaFin) {
					errors.value.fechaFin = 'La fecha de fin es obligatoria.'
					valid = false
				} else if (projectData.value.fechaFin < projectData.value.fechaInicio) {
					errors.value.fechaFin = 'La fecha de fin no puede ser anterior a la fecha de inicio.'
					valid = false
				} else {
					errors.value.fechaFin = null
				}

				return valid
			}

			const validateAndAddProject = () => {
				if (validateForm()) {
					addProject();
				}
			}

			const addProject = () => {
				const formularioProj = formProj.value
				const NewProjData = new FormData(formularioProj)
				const objNewProj = {}

				NewProjData.forEach((valor, clave) => {
					objNewProj[clave] = valor
				})

				objNewProj.encuestas = []

				emit("addNewProject", objNewProj)
				resetFormProj()
				emit("close")
			}

			const resetFormProj = () => {
				projectData.value.nombre = ''
				projectData.value.fechaInicio = ''
				projectData.value.fechaFin = ''
				
				if (formProj.value) {
					formProj.value.reset()
				}

				errors.value = {
					nombre: null,
					fechaInicio: null,
					fechaFin: null
				}
			}

			const cancelProj = () => {
				resetFormProj()
				emit("close")
			}

			return { props, formProj, projectData, errors, validateAndAddProject, cancelProj }
		}
	})
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
		width: 30vw;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>
