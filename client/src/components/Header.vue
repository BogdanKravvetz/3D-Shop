<template>
  <v-app-bar fixed text dense dark>
    <v-app-bar-title class="mr-4"> <span class="home" @click="navigateTo({name:'HelloWorld'})">3D PRINTER</span></v-app-bar-title>
    <v-toolbar-items>
      <v-btn text dark @click="navigateTo({name:'Shop'})">Shop</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="$store.state.isUserLoggedIn" text dark>{{$store.state.user.firstName +' '+ $store.state.user.lastName}}</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark @click="navigateTo({name:'Login'})">Login</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark @click="navigateTo({name:'Register'})">Sign Up</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout">Log Out</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'HelloWorld'
      })
    }
  }
}
</script>
<style scoped>
.home{
    cursor: pointer;
}
</style>
