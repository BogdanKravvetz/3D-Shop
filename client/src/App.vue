<template>
  <v-app>
    <page-header />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<!--<template>
  <div id="app">
    <p>TEST</p>   
    <model-viewer v-if="isMounted"  src="./tassets/CHAHIN_BOTTLE_OF_SODA.gltf" camera-controls></model-viewer>
  </div>
</template>

<script>
export default {
  name: 'App',
   data() {
    return {
      isMounted: false,
      src: '../public/tassets/CHAHIN_BOTTLE_OF_SODA.gltf',
      image: require("../public/tassets/flower.jpg")
    }
  },
  mounted() {
    this.isMounted = true;
    this.loadComponent();
  },
  computed: {
    loadComponent() {
      return () =>  import('@google/model-viewer'); 
    }
  }
};
</script>

<style scoped>

</style>-->
