<template>
  <v-layout>
    <v-flex d-flex xs12 md12>
      <v-card>
        <model-viewer
          v-if="isMounted"
          :src="filePath"
          auto-rotate
          camera-controls
          allow-when-focused
          interaction-prompt="none"
          ar
        ></model-viewer>
        
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{name}}</h3>
            <div class="description">{{description}}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <div><h2>{{price}}</h2></div>
          <v-spacer></v-spacer>
          <v-btn dark @click="navigateTo({name:'Product-Edit', params: { productId: id}})">Edit</v-btn>
          <v-btn dark @click="navigateTo({name:'Shop'})">Add To Cart</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  data() {
    return {
      isMounted: false,
      modelPath: "",
    };
  },
  mounted() {
    //this.modelPath = (await ProductsService.getProductModel(model)).data
    console.log(this.modelPath)
    this.isMounted = true;
    this.loadComponent();
  },
  computed: {
    loadComponent() {
      return () => import("@google/model-viewer");
    },
  },
  props: [
    'id',
    'name',
    'description',
    'price',
    'filePath'
  ],
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
model-viewer {
  height: 700px;
  width: 795px;
  max-width: 100%;
}
.description {
  font-size: 14px;
}
</style>

