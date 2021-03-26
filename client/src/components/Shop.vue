<template>
  <v-container fluid grid-list-md align-content-start>
    <sidebar></sidebar>
    <h1>Wellcome!</h1>
    <v-text-field label="Search Products" v-model="search"></v-text-field>
    <v-layout row wrap v-if="dataIsHere">
      <v-flex v-for="product in filteredList" :key="product.id">
        <product
          :id="product.id"
          :name="product.name"
          :description="product.description"
          :price="product.price"
          :filePath="modelPath + product.filePath"
        ></product>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Product from "./Product.vue";
import Sidebar from "./Sidebar.vue";
import ProductsService from "@/services/ProductsService";
import ConfigApi from "@/services/ConfigApi";

export default {
  components: { Product, Sidebar },
  name: "Shop",
  data() {
    return {
      isMounted: false,
      products: null,
      //actual link to the uploaded file on the server
      modelPath:
        ConfigApi.connection.link +
        ":" +
        ConfigApi.connection.port +
        "/products/",
      search: "",
      dataIsHere: false
    };
  },
  async mounted() {
    //fetch all available products from the server
    this.products = (await ProductsService.getAllProducts()).data;
    this.dataIsHere = true
  },
  component: {
    Product,
    Sidebar,
  },
  computed: {
    filteredList() {
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  // watch: {
  //   search(value) {
  //     const route = {
  //       path: "Shop",
  //     };
  //     if (this.search !== "") {
  //       route.query = {
  //         search: this.search,
  //       };
  //     }
  //     this.$router.push(route);
  //     console.log(value);
  //   },
  //   "$route.query.search": {
  //     immediate: true,
  //     handler(value) {
  //       this.search = value;
  //     },
  //   },
  // },
};
</script>

<style scoped>
</style>
