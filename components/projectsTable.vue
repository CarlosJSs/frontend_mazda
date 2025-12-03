<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <div v-if="!proyectos.length" class="p-5 text-center text-gray-500">
            No hay proyectos registrados.
          </div>

          <table v-else class="min-w-full rounded-xl">
            <thead>
              <tr class="bg-gray-50">
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Código </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Área </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Título </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Descripción </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Estatus </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Encargado </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Supervisor </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize"> Aprobador </th>
                <th scope="col" class="p-5 text-left text-base leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Acciones </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr v-for="proyecto in proyectos" :key="proyecto.id" class="bg-white transition-all duration-500 hover:bg-gray-100">
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{{ proyecto.codigo }}</td>
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">{{ proyecto.area }}</td>
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">{{ proyecto.titulo }}</td>
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 truncate max-w-xs" :title="proyecto.descripcion">
                  {{ proyecto.descripcion }}
                </td>
								<td class="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                  <span class="px-2 py-1 rounded-full text-xs font-semibold"
                    :class="getStatusClass(proyecto.estatus)"
                  >
                    {{ proyecto.estatus }}
                  </span>
                </td>
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">{{ getNombreUsuario(proyecto.id_encargado) }}</td>
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">{{ getNombreUsuario(proyecto.id_supervisor) }}</td>
                <td class="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">{{ getNombreUsuario(proyecto.id_aprobador) }}</td>
                
								<td class="p-5">
                  <div class="flex items-center gap-1">
										<button 
											v-if="showApprove(proyecto)"
											@click="handleAction(proyecto, 'aprobar')"
											class="p-2 rounded-full group transition-all duration-500 flex item-center hover:bg-green-100" 
											title="Aprobar">
												<svg class="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd" clip-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" class="fill-green-600"></path>
												</svg>
										</button>
										<button 
											v-if="showReject(proyecto)"
											@click="handleAction(proyecto, 'rechazar')"
											class="p-2 rounded-full group transition-all duration-500 flex item-center hover:bg-orange-100" 
											title="Rechazar">
											<svg class="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" class="fill-orange-600"></path>
											</svg>
										</button>
										<button 
											v-if="showDelete(proyecto)"
											@click="handleDelete(proyecto)"
											class="p-2 rounded-full  group transition-all duration-500  flex item-center hover:bg-red-200" 
											title="Eliminar">
											<svg class="cursor-pointer" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-red-600"/>
                      </svg>
										</button>
                  </div>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
	const props = defineProps({
		proyectos: {
			type: Array,
			default: () => []
		},
		usuarios: {
			type: Array,
			default: () => []
		},
		userRol: {
			type: String,
			default: ''
		}
	})

	const { updateEstadoPry, deleteProyecto } = useProjects()

	const getNombreUsuario = (id) => {
		if (!id) return 'N/A'
		const usuarioEncontrado = props.usuarios.find(user => user.id === id)
		return usuarioEncontrado ? usuarioEncontrado.nombre : 'Desconocido'
	}

	//color del estatus
	const getStatusClass = (status) => {
		switch (status) {
			case 'Aceptado': return 'bg-green-100 text-green-800'
			case 'Cancelado':
			case 'Rechazado por el supervisor': return 'bg-red-100 text-red-800'
			case 'Revisado por supervisor': return 'bg-blue-100 text-blue-800'
			default: return 'bg-yellow-100 text-yellow-800' // nuevo u otros
		}
	}

	const showApprove = (proyecto) => {
		if(props.userRol === 'Supervisor' && proyecto.estatus === 'Nuevo') return true
		if(props.userRol === 'Aprobador' && proyecto.estatus === 'Revisado por supervisor') return true

		return false
	}

	const showReject = (proyecto) => {
		if(props.userRol === 'Supervisor' && proyecto.estatus === 'Nuevo') return true
		if(props.userRol === 'Aprobador' && proyecto.estatus === 'Revisado por supervisor') return true

		return false
	}

	const showDelete = (proyecto) => {
		if(props.userRol !== 'Planeador') return false
		return ['Nuevo', 'Rechazado por el supervisor', 'Cancelado'].includes(proyecto.estatus)
	}

	const handleAction = async (proyecto, accion) => {
		let nuevoEstatus = ''

		if(props.userRol === 'Supervisor') {
			nuevoEstatus = accion === 'aprobar' ? 'Revisado por supervisor' : 'Rechazado por el supervisor'
		} else if (props.userRol === 'Aprobador') {
			nuevoEstatus = accion === 'aprobar' ? 'Aceptado' : 'Cancelado'
		}

		if(nuevoEstatus) {
			const confirm = window.confirm(`¿Está seguro de cambiar el estatus a: ${nuevoEstatus}?`)
			if(confirm) {
				await updateEstadoPry(proyecto.id, nuevoEstatus)
			}
		}
	}

	const handleDelete = async (proyecto) => {
		const confirm = window.confirm(`¿Seguro que desea ELIMINAR el proyecto ${proyecto.titulo}? Esta acción no se puede deshacer.`)
		if(confirm) {
			await deleteProyecto(proyecto.id)
		}
	}

</script>