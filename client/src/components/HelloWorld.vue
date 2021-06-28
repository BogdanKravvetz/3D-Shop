<template>
  <div class="hello">
    <h1 class="display-4 justify-center">{{ msg }}</h1>
    <br/>
    <br/>
    <v-btn v-if="!$store.state.isUserLoggedIn"  @click="navigateTo({ name: 'Login' })" dark x-large>LogIn</v-btn>
    <p></p>
    <v-btn v-if="!$store.state.isUserLoggedIn"  @click="navigateTo({ name: 'Register' })" dark x-large>Register</v-btn>
    <v-btn v-if="$store.state.isUserLoggedIn" @click="navigateTo({ name: 'Shop' })" dark x-large>Shop</v-btn>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to 3D Printer'
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
