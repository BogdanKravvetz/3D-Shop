<template>
  <v-navigation-drawer permanent dark app clipped class="pt-12">
    <v-flex v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin">
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
            <v-list-item-title>Add Model</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>label</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="navigateTo({ name: 'Tag-Edit' })">
            <v-list-item-title>Tags</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>label</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="navigateTo({ name: 'Color-Edit' })">
            <v-list-item-title>Colors</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>label</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="navigateTo({ name: 'OrdersAdmin' })">
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>

    <v-flex>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Category </v-list-item-title>
          <v-list-item-subtitle> Search 3D Models </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>tag</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="showAllProducts">
            <v-list-item-title>All</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.id" link>
          <v-list-item-icon>
            <v-icon>tag</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="showProductsWithTag(item)">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-navigation-drawer>
</template>

<script>
import TagsService from "@/services/TagsService";
import Shop from "./Shop";
export default {
  data() {
    return {
      items: null,
    };
  },

  async mounted() {
    //fetch all available tags from the server
    this.items = (await TagsService.getAllTags()).data;
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    showAllProducts() {
      this.$root.$refs.Shop.showAllProducts();
    },
    showProductsWithTag(obj) {
      this.$root.$refs.Shop.showProductsWithTag(obj);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
