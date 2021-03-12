<template>
  <!-- <v-card
    height="1500"
    width="256"
    class="mx-auto"
    offset-xs0
  > -->
  <v-navigation-drawer permanent dark app clipped class="pt-12">
    <!-- <v-flex v-if="$store.state.user.isAdmin"> -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Dashboard </v-list-item-title>
        <v-list-item-subtitle> Admin Actions </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>label</v-icon>
        </v-list-item-icon>
        <v-list-item-content @click="navigateTo({ name: 'Product-Create' })">
          <v-list-item-title>Add Product</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- </v-flex> -->

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Category </v-list-item-title>
        <v-list-item-subtitle> Search 3D Models </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>tag</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- </v-card> -->
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "All" },
        { title: "Tag1" },
        { title: "Tag2" },
        { title: "Tag3" },
      ],
      right: null,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
