<template>
  <v-layout>
    <v-flex xs4 offset-xs4>
      <div class="white elevation-2">
        <v-card text dense dark>
          <v-card-title class="justify-center">Register</v-card-title>
        </v-card>
        <div>
          <form name="register-form" autocomplete="off">
            <v-text-field label="Email" v-model="email" class="pl-12 pr-12"></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              class="pl-12 pr-12"
            ></v-text-field>
            <v-text-field label="First Name" v-model="firstName" class="pl-12 pr-12"></v-text-field>
            <v-text-field label="Last Name" v-model="lastName" class="pl-12 pr-12"></v-text-field>
            <vue-tel-input-vuetify v-model="phone" class="pl-12 pr-12"></vue-tel-input-vuetify>
          </form>
          <div class="error" v-html="error"></div>
          <v-btn @click="register" dark>Register</v-btn>
          <p class="myColor">.</p>
        </div>
      </div>
      <model-viewer class="test" v-if="isMounted" :src="filePath" auto-rotate camera-orbit="40deg 55deg 4.5m"></model-viewer>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import {VueTelInputVuetify} from "vue-tel-input-vuetify";
import ConfigApi from "@/services/ConfigApi";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: null,
      isVerified: false,
      isAdmin: false,
      isDeleted: false,
      error: null,
      isMounted: false,
      filePath: ConfigApi.connection.link +
        ":" +
        ConfigApi.connection.port +
        "/products/cube.glb"
    };
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
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          isVerified: this.isVerified,
          isAdmin: this.isAdmin,
          isDeleted: this.isDeleted,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push("shop");
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  components: {
    VueTelInputVuetify
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="vuetify/dist/vuetify.min.css">


.error {
  color: red;
}

</style>
<style scoped>
model-viewer {
  height: 400px;
  width: 795px;
  max-width: 100%;
  /* background-color: rgb(63, 63, 63); */
}
.myColor {
  color: white;
}
</style>
