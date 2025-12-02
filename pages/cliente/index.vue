<template>
  <div class="clientePage">
    <div class="misProyectos">
      <div class="titleSection">
        Mis Proyectos
      </div>
      <div class="lineDivider"></div>
      <div class="projectsCont overflow-auto">
        <proyectCard 
          v-for="(element, index) in proyectos"
          :key="index"
          :infoProyecto="element"
          tabindex="0"
          :style="{ background: element.colorCard }"
          @click="selectProject(element)"
          @deleteProject="deleteProject(index, element.name)"
        />
      </div>
      <button
        class="btnAddP group cursor-pointer outline-none hover:rotate-90 duration-300"
        title="Crear nuevo proyecto"
        @click="showFormProj = true"
      >
        <svg
          class="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
          viewBox="0 0 24 24"
          height="50px"
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-width="1.5"
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          ></path>
          <path stroke-width="1.5" d="M8 12H16"></path>
          <path stroke-width="1.5" d="M12 16V8"></path>
        </svg>
      </button>
      <newProject
        :visibleNewProj="showFormProj" 
        @close="showFormProj = false" 
        @addNewProject="addProyectoElm"
      />
    </div>
    <div class="misEncuestas">
      <div class="titleSection">
        Mis Encuestas > <span class="text-blue-600">{{ nameSelProj }}</span>
      </div>
      <div class="lineDivider"></div>
      <div class="encsCont">
        <div v-if="loading" class="text-center py-8">
          <p>Cargando encuestas...</p>
        </div>
        <div v-else-if="selectedProject && selectedProject.encuestas.length > 0" class="tableCont">
          <tableEncuestas
            :encuestas="selectedProject.encuestas"
            @deleteEncuesta="deleteEncuestaFromProj"
            @selected-encuestas="handleSelectedEncuestas"
          />
        </div>
        <div v-else-if="selectedProject" class="text-center py-8">
          <p>No hay encuestas para este proyecto.</p>
        </div>
        <div v-else clsss="text-center py-8">
          <p>Selecciona un proyecto para ver sus encuestas.</p>
        </div>
        <div v-if="selectedEncuestas.length > 1" class="flex space-x-4 mt-4">
          <button
            class="bg-red-500 text-white px-4 py-2 rounded"
            @click="deleteSelectedEncuestas"
          >
            Eliminar seleccionadas
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded"
            @click="downloadSelectedEncuestas"
          >
            Descargar seleccionadas
          </button>
        </div>
        <button
          v-if="selectedProject"
          class="btnAddEnc group cursor-pointer outline-none hover:rotate-90 duration-300"
          title="Agregar nueva encuesta"
          @click="showFormEnc = true"
        >
          <svg
            class="stroke-amber-500 fill-none group-hover:fill-amber-800 group-active:stroke-amber-200 group-active:fill-amber-600 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="50px"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-width="1.5"
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            ></path>
            <path stroke-width="1.5" d="M8 12H16"></path>
            <path stroke-width="1.5" d="M12 16V8"></path>
          </svg>
        </button>
        <newEncuesta 
          :visibleNewEnc="showFormEnc" 
          :nameProject="nameSelProj"
          :startDate="strDateP"
          :endDate="endDateP"
          @close="showFormEnc = false" 
          @addNewEncuesta="addEncuestaToProject"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import proyectCard from '@/components/proyectCard.vue'
  import tableEncuestas from '~/components/tableEncuestas.vue'
  import newProject from '~/components/newProject.vue'
  import newEncuesta from '~/components/newEncuesta.vue'

  definePageMeta({
    layout: 'cliente'
  })

  const {
    proyectos,
    loading: loadingProyectos,
    fetchProyectos,
    createProyecto,
    deleteProyecto,
    addEncuestaToProyecto,
    deleteEncuestaFromProyecto
  } = useProyectos()

  const {
    loading: loadingEncuestas,
    error: errorEncuestas,
    fetchEncuestasByProyecto,
    createEncuesta,
    deleteEncuesta
  } = useEncuestas()

  // info inicial (proveniente de la API)
  /**
  const rawProyectos = ref([
    {
      name: "Proyecto 1",
      dateInit: "2024-01-20",
      dateEnd: "2024-06-06",
      encuestas: [
        {
          id: "Ld3403", 
          icon: "delete", 
          date: "2024-08-15"
        },
        {
          id: "KVJ095", 
          icon: "delete", 
          date: "2024-12-01"
        },
        {
          id: "JFD79", 
          icon: "delete", 
          date: "2023-12-17"
        },
        {
          id: "fvck", 
          icon: "delete", 
          date: "2023-12-17"
        }
      ]
    },
    {
      name: "Proyecto 2",
      dateInit: "2024-04-25",
      dateEnd: "2026-12-08",
      encuestas: [
        {
          id: "GT589", 
          icon: "delete", 
          date: "2004-12-21"
        }
      ]
    },
    {
      name: "Proyecto 3",
      dateInit: "2023-12-12",
      dateEnd: "2024-09-30",
      encuestas: [
        {
          id: "JFD79", 
          icon: "delete", 
          date: "2023-12-21"
        },
        {
          id: "RG3403", 
          icon: "delete", 
          date: "2021-10-08"
        }
      ]
    },
    {
      name: "Proyecto 4",
      dateInit: "2024-05-18",
      dateEnd: "2024-07-08",
      encuestas: []
    },
    {
      name: "Proyecto 5",
      dateInit: "2024-05-18",
      dateEnd: "2025-07-08",
      encuestas: [
        {
          id: "prueba de encuesta larga", 
          icon: "delete", 
          date: "2024-06-12"
        },
        {
          id: "corta", 
          icon: "delete", 
          date: "2025-04-12"
        }
      ]
    }
  ])
  */

  const selectedProject = ref(null)
  const nameSelProj = ref("")
  const strDateP = ref("")
  const endDateP = ref("")
  const showFormProj = ref(false)
  const showFormEnc = ref(false)
  const selectedEncuestas = ref([])

  // cargar proyectos al montar el componente
  onMounted(async () => {
    try {
      await fetchProyectos()

      if (proyectos.value.length > 0) {
        await selectProject(proyectos.value[0])
      }
      
    } catch (err) {
      console.error("Error al cargar los proyectos: ", err)
    }
  })

  watch(selectedProject, async (newVal) => {
    if (newVal) {
      await loadEncuestas(newVal.id)
    }
  })

  const loadEncuestas = async (proyectoID) => {
    try {
      const encuestas = await fetchEncuestasByProyecto(proyectoID)
      if (selectedProject.value) {
        selectedProject.value.encuestas = encuestas
      }
    } catch (err) {
      console.error("Error al cargar las encuestas: ", err)
    }
  }

  const selectProject = async (myProject) => {
    selectedProject.value = {
      ...myProject,
      name: myProject.nombreID || myProject.name,
      encuestas: myProject.encuestas || []
    }

    console.log("Proyecto seleccionado: ", selectedProject.value)

    nameSelProj.value = selectedProject.value.name
    strDateP.value = selectedProject.value.dateInit
    endDateP.value = selectedProject.value.dateEnd
  }

  async function addProyectoElm(newProj) {
    try {
      await createProyecto(newProj)
      showFormProj.value = false
    } catch (err) {
      alert(err)
    }
  }
  
  const addEncuestaToProject = async (newEncuestaData, nameProject) => {
    try {
      const proyecto = proyectos.value.find(p => p.name === nameProject)
      
      if (!proyecto) throw new Error("Proyecto no encontrado")

      const encuesta = await createEncuesta(proyecto.id, newEncuestaData)
      
      if (selectedProject.value?.id === proyecto.id) {
        selectedProject.value.encuestas = [
          ...selectedProject.value.encuestas,
          encuesta
        ]
      }

      showFormEnc.value = false
    } catch (err) {
      console.error("Error al agregar la encuesta: ", err)
      alert(err.message || "Ocurrio un error al agregar la encuesta")
    }
  }

  const deleteEncuestaFromProj = async (encuesta) => {
    const confirmDelete = window.confirm(`Estas seguro de que desea eliminar la encuesta ${encuesta.nombreID} ?`)
    if (!confirmDelete || !selectedProject.value) return

    try {
      await deleteEncuesta(selectedProject.value.id, encuesta.id)
      selectedProject.value.encuestas = selectedProject.value.encuestas.filter(
        e => e.id !== encuesta.id
      )
      selectedEncuestas.value = selectedEncuestas.value.filter(
        e => e.id !== encuesta.id
      )
    } catch (err) {
      console.error("Error eliminando encuesta", err)
      alert(err.message || "Ocurrio un error al eliminar la encuesta")
    }
  }

  async function deleteProject(index, name) {
    try {
      const confirmDelete = window.confirm(`Estas seguro de que desea eliminar el proyecto ${name} ?`)
      if (!confirmDelete) return

      const proyecto = proyectos.value[index]
      if (!proyecto) {
        throw new Error("Proyecto no encontrado")
      }

      const loading = ref(true)

      await deleteProyecto(proyecto.id)
    } catch (err) {
      console.error("Error al eliminar el proyecto: ", err)
      alert(err.message || "Ocurrio un error al eliminar el proyecto")
    }
  }

  function handleSelectedEncuestas(encuestas) {
    selectedEncuestas.value = encuestas
  }

  async function deleteSelectedEncuestas() {
    const confirmDelete = window.confirm(`Estas seguro de que deseas eliminar las ${selectedEncuestas.value.length} encuestas seleccionadas?`)

    if (confirmDelete && selectedProject.value) {
      try {
        for (const encuesta of selectedEncuestas.value) {
          await deleteEncuestaFromProyecto(selectedProject.value.is, encuesta.id)
        }
        selectedEncuestas.value = []
      } catch (err) {
        alert(err)
      }
    }
  }

  function downloadSelectedEncuestas() {
    console.log("Descargando encuestas seleccionadas: ", selectedEncuestas.value)
  }

</script>

<style scoped>
.clientePage {
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  margin-top: 1.4em;
  background-color: #ebebf5;
  padding: 1.2em 1.6em;
  min-height: 82vh;
}
.lineDivider {
  width: 100%;
  height: 1px;
  background-color: #cfcfcf;
  margin-bottom: 1em;
}
.titleSection {
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 1.1em;
  margin-bottom: 2px
}
.projectsCont {
  display: flex;
  flex-direction: row;
}
.btnAddP {
  margin-left: 96%;
  margin-right: 0;
}
.misEncuestas {
  margin-top: 1em;
}
.btnAddEnc {
  position: fixed;
  bottom: 6em;
  right: 5em;
  z-index: 1000;
}
</style>