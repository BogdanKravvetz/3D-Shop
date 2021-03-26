<template>
  <v-layout>
    <v-flex xs4 offset-xs4>
      <div class="white elevation-2">
        <v-toolbar text dense dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div>
          <form name="register-form" autocomplete="off">
            <br />
            <v-text-field label="Email" v-model="email"></v-text-field>
            <br />
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              autocomplete="new-password"
            ></v-text-field>
            <br />
            <v-text-field label="First Name" v-model="firstName"></v-text-field>
            <br />
            <v-text-field label="Last Name" v-model="lastName"></v-text-field>
            <br />
            <vue-tel-input-vuetify v-model="phone"></vue-tel-input-vuetify>
            <br />
          </form>
          <div class="error" v-html="error"></div>
          <br />
          <v-btn @click="register" dark>Register</v-btn>
          <hr />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import {VueTelInputVuetify} from "vue-tel-input-vuetify";
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
    };
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
