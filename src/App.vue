<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* Global Styles */
button {
  font-size: 16px;
  padding: 8px;
  border-radius: 3px;
  margin: 5px 10px 5px 0px;
  cursor: pointer;
}
button:disabled {
  cursor: auto;
}
button.selected {
  cursor: auto;
  color: black;
  border-color: black;
  border-width: 2px;
}
.clickable {
  cursor: pointer;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 2px;
  border: 1px solid #555;
  position: relative;
  vertical-align: middle;
  padding: 10px;
}
input[type='checkbox'].partial-check {
  background: #abc;
}
input[type='checkbox']:checked {
  background: #679;
}
.mb-0 {
  margin-bottom: 0;
}
</style>
