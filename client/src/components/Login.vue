<template>
  <v-layout>
    <v-flex xs4 offset-xs4>
      <div class="white elevation-2">
        <v-card dark>
          <v-card-title class="justify-center">Login</v-card-title>
        </v-card>
          <div>
            <br />
            <v-text-field label="Email" v-model="email" class="pl-12 pr-12"></v-text-field>
            <br />
            <v-text-field label="Password" v-model="password" type="password" class="pl-12 pr-12"></v-text-field>
            <br />
            <div class="error" v-html="error"></div>
            <br />
            <v-btn @click="login" dark>Login</v-btn>
            <p class="myColor">.</p>
          </div>
      </div>
      <model-viewer  v-if="isMounted" :src="filePath" auto-rotate camera-orbit="40deg 55deg 4.5m"></model-viewer>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import ConfigApi from "@/services/ConfigApi";
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null,
      isMounted: false,
      filePath: ConfigApi.connection.link +
        ":" +
        ConfigApi.connection.port +
        "/products/cube.glb"
    }
  },
    async mounted() {
    this.loadComponent();
    this.isMounted = true;
  },
  computed: {
    loadComponent() {
      return () => import("@google/model-viewer");
    },
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('shop');
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
model-viewer {
  height: 400px;
  width: 795px;
  max-width: 100%;
  /* background-color: rgb(63, 63, 63); */
}
.error {
  color: red;
}
.myColor {
  color: white;
}
</style>
