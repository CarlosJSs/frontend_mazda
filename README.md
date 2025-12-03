
# Shinotsu Project - Frontend

Interfaz de usuario para el sistema de gestión de proyectos "Shinotsu", desarrollada con **Nuxt 3**. Esta aplicación permite a los usuarios gestionar proyectos según su rol (Planeador, Supervisor, Aprobador), visualizando información en tiempo real y generando reportes.

## Requisitos Previos

* **Node.js** (v16.10.0 o superior recomendado para Nuxt 3)
* **NPM**

## Tecnologías Utilizadas

* **Nuxt 3 (Vue 3)**: Framework principal.
* **Tailwind CSS**: Estilos y diseño responsivo.
* **Axios**: Cliente HTTP para comunicación con el Backend.
* **SheetJS (xlsx)**: Para la generación y descarga de reportes en Excel.
* **SweetAlert2**: Alertas y confirmaciones interactivas.
* **Headless UI / Heroicons**: Componentes de interfaz e iconos.

## Configuración e Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/CarlosJSs/frontend_mazda
    cd frontend_mazda
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configuración del Backend:**
    Por defecto, la aplicación espera que el backend se esté ejecutando localmente en el puerto `1906`.
    
    * **URL Base API:** `http://localhost:1906/api`
    

## Ejecución

### Servidor de Desarrollo
Para iniciar la aplicación en modo de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000.

### Producción

Para ejecutar la aplicacion sin avisos para desarrollador:
```Bash
npm run build
npm run preview
```