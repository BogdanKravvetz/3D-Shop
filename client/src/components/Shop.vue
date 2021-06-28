<template>
  <v-container fluid grid-list-md align-content-start>
    <sidebar></sidebar>
    <h1 v-if="productsWithTag">Popular Category {{popularCategory}}</h1>
    <!-- <v-card flat max-width="85%"> -->
    <v-sheet class="mx-auto mt-5" :max-width="myWidth" elevation="8" v-if="dataIsHere">
      <v-slide-group multiple show-arrows v-if="dataIsHere" ref="slideGroup">
        <template v-slot:next>
          <v-icon large>east</v-icon>
        </template>
        <template v-slot:prev>
          <v-icon large>west</v-icon>
        </template>
        <v-slide-item v-for="product in popularProducts" :key="product.id" class="ma-1">
          <recomprod
            :id="product.id"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :filePath="modelPath + product.filePath"
          ></recomprod>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <!-- </v-card> -->
    <br />
    <h1>Shop Models</h1>
    <v-text-field label="Search" v-model="search"></v-text-field>
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
import Recomprod from "./Recomprod.vue";
import Sidebar from "./Sidebar.vue";
import ProductsService from "@/services/ProductsService";
import ProductTagsService from "@/services/ProductTagsService";
import ConfigApi from "@/services/ConfigApi";
import TagsService from "@/services/TagsService";

export default {
  components: { Product, Sidebar, Recomprod },
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
      dataIsHere: false,
      model: null,
      popularProducts: null,
      popularCategory: null,
      tags: [],
      productsWithTag: null,
      myWidth: "0%"
    };
  },
  created() {
    this.$root.$refs.Shop = this;
    
  },
  async mounted() {
    //fetch all available products from the server
    this.products = (await ProductsService.getAllProducts()).data;
    //get the tags and find out which is the most popular
    this.tags = (await TagsService.getAllTags()).data;
    this.tags = this.tags.sort((a,b) => (a.relevance < b.relevance) ? 1 : ((b.relevance < a.relevance) ? -1 : 0))
    this.popularCategory = this.tags[0].name
    //show the products with the most popular tag
    this.productsWithTag = (await ProductTagsService.getProductsWithTag(this.tags[0].id))
      .data;
    this.popularProducts = (await ProductsService.getAllProducts()).data;
    this.popularProducts = this.popularProducts.filter((product) => {
      return this.productsWithTag.some((prodTag) => {
        return prodTag.ProductId === product.id;
      });
    });
    this.dataIsHere = true;
    this.activate()
  },
  computed: {
    filteredList() {
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    compare(a, b) {
      if (a.relevance < b.relevance) {
        return -1;
      }
      if (a.relevance > b.relevance) {
        return 1;
      }
      return 0;
    },
    test(){
      this.myWidth = "85%"
    },
    activate() {
      setTimeout(() => this.myWidth = "85%", 2000);
    },
    async showAllProducts() {
      this.products = (await ProductsService.getAllProducts()).data;
    },
    async showProductsWithTag(tag) {
      const productsWithTag = (
        await ProductTagsService.getProductsWithTag(tag.id)
      ).data;
      this.products = (await ProductsService.getAllProducts()).data;
      this.products = this.products.filter((product) => {
        return productsWithTag.some((prodTag) => {
          return prodTag.ProductId === product.id;
        });
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
