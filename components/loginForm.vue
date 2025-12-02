<template>
  <div class="form shadow-2xl">
    <img src="./../assets/images/mazda_logo.png" alt="LogoPoryecto" class="logoCarro">
    <div class="flex-column labelLogin">
      <label>Usuario</label>
    </div>
    <div class="inputForm">
      <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
        <g id="Layer_3" data-name="Layer 3">
          <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
        </g>
      </svg>
      <input v-model="usuarioInfo.usuario" type="text" class="input" placeholder="00000">
    </div>
    <div class="flex-column labelLogin">
      <label>Contraseña</label>
    </div>
    <div class="inputForm">
      <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
      </svg>
      <input v-model="usuarioInfo.contrasena" :type="showPass ? 'text' : 'password'" class="input" placeholder="Ingresa tu contraseña">
      <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;" @click="toggleShowPass">
        <path
          v-if="!showPass"
          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
        />
        <path
          v-else
          d="M573.16,241.91c-15.44-36.8-47.18-90.6-95.27-134.8C423.78,68.74,360.69,32,288,32c-73,0-136.1,37-189.78,78.8C48.26,155.2,16.53,209,1.09,245.7a31.84,31.84,0,0,0,0,20.6c15.44,36.8,47.18,90.6,95.27,134.8C152.22,443.26,215.31,480,288,480c73,0,136.1-37,189.78-78.8,48.09-44.2,79.82-98,95.27-134.8A31.84,31.84,0,0,0,573.16,241.91ZM288,400a112,112,0,1,1,112-112A112,112,0,0,1,288,400Z"
        />
      </svg>
    </div>
    <button class="button-submit" @click="sendUsuario">
      Ingresar
    </button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        usuarioInfo: {
          usuario: '',
          contrasena: ''
        },
        showPass: false
      }
    },
    methods: {
      sendUsuario () {
        if (this.usuarioInfo.usuario && this.usuarioInfo.contrasena) {
          this.$emit('loginEvent', {
            ...this.usuarioInfo
          })

          this.usuarioInfo = {
            usuario: '',
            contrasena: ''
          }
        } else {
          alert('Todos los campos son requeridos.')
        }
      },
      toggleShowPass () {
        this.showPass = !this.showPass
      }
    }
  }
</script>

<style scoped>
.logoCarro {
  margin-bottom: 1em;
  width: 100%;
  padding: 0 3em;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 450px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.form button {
  align-self: flex-end;
}
.flex-column > label {
  color: #151717;
  font-weight: 600;
}
.labelLogin {
  display: flex;
  flex-direction: row;
}
.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}
.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 85%;
  height: 100%;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row > div > label {
  font-size: 14px;
  color: black;
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

.button-submit {
  margin: 26px 0 10px 0;
  background-color: #3563e3;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #2929da;
}

.p {
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn:hover {
  border: 1px solid #2d79f3;
  ;
}

svg {
  cursor: pointer;
  transition: fill 0.2s;
}

svg:hover {
  fill: #2d79f3;
}
</style>