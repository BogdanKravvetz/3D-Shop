<template>
  <v-app-bar fixed text dense dark>
    <v-app-bar-title class="mr-4"> <span class="home" @click="navigateTo({name:'HelloWorld'})">3D PRINTER</span></v-app-bar-title>
    <v-toolbar-items>
      <v-btn text dark @click="navigateTo({name:'Shop'})">Shop</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
          
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="navigateTo2({name:'Cart'})"><v-badge
        :value="isNew"
        class="pt-1"
        bordered
        color="pink"
        dot
        left
        overlap
      ><span class="material-icons">
shopping_cart
</span></v-badge>Cart</v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="navigateTo({name:'CustomOrder'})">Custom Order</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="navigateTo({name:'UserOrders'})">{{$store.state.user.firstName +' '+ $store.state.user.lastName}}</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark @click="navigateTo({name:'Login'})">Login</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark @click="navigateTo({name:'Register'})">Sign Up</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout">Log Out</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isNew: false,
    };
  },
  created() {
    this.$root.$refs.Header = this;
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    navigateTo2 (route) {
      this.$router.push(route)
      this.isNew = false
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'HelloWorld'
      })
    },
    setNew(value){
      this.isNew = value
    }
  }
}
</script>
<style scoped>
.home{
    cursor: pointer;
}
</style>
