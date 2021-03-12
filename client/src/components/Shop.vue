<template>
  <v-container fluid grid-list-md align-content-start>
    <sidebar></sidebar>
    <h1>Wellcome!</h1>
    <v-layout row wrap>
    <v-flex v-for="product in products" :key="product.id">
      <product :id="product.id" :name="product.name" :description="product.description" :price="product.price" :filePath="modelPath+product.filePath"></product>
    </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Product from "./Product.vue";
import Sidebar from "./Sidebar.vue";
import ProductsService from '@/services/ProductsService'
export default {
  components: { Product, Sidebar },
  name: "Shop",
  data() {
    return {
      isMounted: false,
      products: null,
      modelPath: 'http://192.168.0.47:8081/products/'
    };
  },
  async mounted() {
    this.products = (await ProductsService.getAllProducts()).data
    // this.modelPath = (await ProductsService.getProductModel(products[0].filePath)).data
    // console.log(modelPath)
    // products.forEach(product => {
    //   this.modelPath = (await ProductsService.getProductModel(product.filePath)).data
    //   product.filePath = this.modelPath
    // });
    
  },
  component: {
    Product,
    Sidebar
  },
};
</script>

<style scoped>

</style>
