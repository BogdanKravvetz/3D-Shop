<template>
  <v-layout>
    <v-flex d-flex xs12 md12>
      <v-card>
        <model-viewer
          :id="id"
          refs="model"
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
            <h3 class="headline mb-0">{{ name }}</h3>
            <div class="description">{{ description }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <div>
            <h2>{{ price }}</h2>
          </div>

          <v-spacer></v-spacer>
          <v-btn
            v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin"
            dark
            @click="
              navigateTo({ name: 'Product-Edit', params: { productId: id } })
            "
            >Edit</v-btn
          >
          <v-btn dark @click="navigateTo({ name: 'Shop' })">Add To Cart</v-btn>
          <!-- <v-btn dark @click="test">test</v-btn> -->
          <br />

          <!-- <div class="controls" ,="" id="color-controls">
            <button data-color="1,0,0,1">Red</button>
            <button data-color="0,1,0,1">Green</button>
            <button data-color="0,0,1,1">Blue</button>
          </div> -->
        </v-card-actions>
        <v-card-actions>
          <v-select
            v-if="isMounted"
            :items="colors"
            label="Color"
            item-text="name"
            item-value="hex"
            v-model="hexColor"
            v-on:change="test"
          ></v-select>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ColorsService from "@/services/ColorsService";
export default {
  data() {
    return {
      isMounted: false,
      modelPath: "",
      modelViewer: null,
      colors: null,
      hexColor: "#FFFFFF",
    };
  },
  async mounted() {
    this.loadComponent();
    this.colors = (await ColorsService.getAllColors()).data;
    this.isMounted = true;
  },
  computed: {
    loadComponent() {
      return () => import("@google/model-viewer");
    },
  },
  props: ["id", "name", "description", "price", "filePath"],
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
          }
        : null;
    },
    test() {
      if (this.isMounted) {
        const modelViewerColor = document.getElementById(this.id);
        // console.log(this.hexColor);
        const rgbColor = this.hexToRgb(this.hexColor);
        const colorString =
          rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ",1";
        const color = colorString
          .split(",")
          .map((numberString) => parseFloat(numberString));

        // console.log("Changing color to: ", color);
        const [material] = modelViewerColor.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(color);
      }
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

