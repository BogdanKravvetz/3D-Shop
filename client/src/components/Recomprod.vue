<template>
  <v-layout class="pr-1">
    <v-flex d-flex xs12 md12>
      <v-card v-if="isMounted" elevation="5">
        <model-viewer
          :id="id + 'a'"
          refs="model"
          v-if="isMounted"
          :src="filePath"
          auto-rotate
          camera-controls
          allow-when-focused
          exposure="0.4"
          interaction-prompt="none"
          ar
          @load="getDimentions"
          @mouseover="setVisible"
          @mouseleave="setInvisible"
        >
          <button
            slot="hotspot-dot+X-Y+Z2"
            class="dot2"
            data-position="1 -1 1"
            data-normal="1 0 0"
          ></button>
          <button
            slot="hotspot-dim+X-Y2"
            class="dim2"
            data-position="1 -1 0"
            data-normal="1 0 0"
          ></button>
          <button
            slot="hotspot-dot+X-Y-Z2"
            class="dot2"
            data-position="1 -1 -1"
            data-normal="1 0 0"
          ></button>
          <button
            slot="hotspot-dim+X-Z2"
            class="dim2"
            data-position="1 0 -1"
            data-normal="1 0 0"
          ></button>
          <button
            slot="hotspot-dot+X+Y-Z2"
            class="dot2 show2"
            data-position="1 1 -1"
            data-normal="0 1 0"
          ></button>
          <button
            slot="hotspot-dim+Y-Z2"
            class="dim2 show2"
            data-position="0 -1 -1"
            data-normal="0 1 0"
          ></button>
          <button
            slot="hotspot-dot-X+Y-Z2"
            class="dot2 show2"
            data-position="-1 1 -1"
            data-normal="0 1 0"
          ></button>
          <button
            slot="hotspot-dim-X-Z2"
            class="dim2"
            data-position="-1 0 -1"
            data-normal="-1 0 0"
          ></button>
          <button
            slot="hotspot-dot-X-Y-Z2"
            class="dot2"
            data-position="-1 -1 -1"
            data-normal="-1 0 0"
          ></button>
          <button
            slot="hotspot-dim-X-Y2"
            class="dim2"
            data-position="-1 -1 0"
            data-normal="-1 0 0"
          ></button>
          <button
            slot="hotspot-dot-X-Y+Z2"
            class="dot2"
            data-position="-1 -1 1"
            data-normal="-1 0 0"
          ></button>
        </model-viewer>
        <!-- <v-card-title primary-title>
          <div>
            <h5 class="headline mb-0">{{ name }}</h5>
            <div class="description">{{ description }}</div>
          </div>
        </v-card-title> -->
        <v-card-actions>
          <div>
            <h4>{{ price }} €</h4>
          </div>
          <v-spacer></v-spacer>
          <!-- <v-btn
            class="green"
            @click="download"
            v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin"
            ><div class="material-icons">file_download</div></v-btn
          >
          <v-btn
            v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin"
            dark
            @click="
              navigateTo({ name: 'Product-Edit', params: { productId: id } })
            "
            >Edit</v-btn
          > -->
          <v-btn
            @click="addToCart"
            :dark="$store.state.isUserLoggedIn"
            :disabled="!$store.state.isUserLoggedIn"
            >Add To Cart</v-btn
          >
          <!-- <v-btn dark @click="test">test</v-btn> -->
          <br />
        </v-card-actions>
        <v-card-actions>
          <v-select
            v-if="isMounted"
            :items="colors"
            label="Color"
            item-text="name"
            item-value="hex"
            v-model="color"
            v-on:change="changeColor"
            @load="changeColor"
          ></v-select>
          <!-- <v-select
            v-if="isMounted"
            :items="colors"
            label="Material"
            item-text="name"
            item-value="hex"
            v-model="color"
            v-on:change="changeColor"
            @load="changeColor"
          ></v-select> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ColorsService from "@/services/ColorsService";
import CartItemsService from "@/services/CartItemsService";
export default {
  data() {
    return {
      isMounted: false,
      modelPath: "",
      modelViewer: null,
      colors: null,
      color: null,
      hexColor: "#FFFFFF",
    };
  },
  async mounted() {
    this.loadComponent();
    this.colors = (await ColorsService.getAllColors()).data;
    this.color = this.colors[0].hex;
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
    // async download() {
    //   let modelViewer = document.getElementById(this.id);
    //   const glTF = await modelViewer.exportScene();
    //   var file = new File([glTF], this.filePath );
    //   var link = document.createElement("a");
    //   link.download = file.name;
    //   link.href = URL.createObjectURL(file);
    //   link.click();
    // },
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
    changeColor() {
      if (this.isMounted) {
        const modelViewerColor = document.getElementById(this.id+"a");
        const rgbColor = this.hexToRgb(this.color);
        const colorString =
          rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ",1";
        const color = colorString
          .split(",")
          .map((numberString) => parseFloat(numberString));
        const [material] = modelViewerColor.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(color);
      }
    },
    getDimentions() {
      const modelViewer = document.getElementById(this.id+"a");
      if (!modelViewer) {
        return;
      }
      this.changeColor();
      const center = modelViewer.getCameraTarget();
      const size = modelViewer.getDimensions();
      const x2 = size.x / 2;
      const y2 = size.y / 2;
      const z2 = size.z / 2;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X-Y+Z2",
        position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+X-Y2",
        position: `${center.x + x2} ${center.y - y2} ${center.z}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+X-Y2"]'
      ).textContent = `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X-Y-Z2",
        position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+X-Z2",
        position: `${center.x + x2} ${center.y} ${center.z - z2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+X-Z2"]'
      ).textContent = `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X+Y-Z2",
        position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+Y-Z2",
        position: `${center.x} ${center.y + y2} ${center.z - z2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+Y-Z2"]'
      ).textContent = `${(size.x * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X+Y-Z2",
        position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim-X-Z2",
        position: `${center.x - x2} ${center.y} ${center.z - z2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim-X-Z2"]'
      ).textContent = `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X-Y-Z2",
        position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim-X-Y2",
        position: `${center.x - x2} ${center.y - y2} ${center.z}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim-X-Y2"]'
      ).textContent = `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X-Y+Z2",
        position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`,
      });
      this.setInvisible();
    },
    setVisible() {
      const modelViewer = document.getElementById(this.id+"a");
      if (!modelViewer) {
        return;
      }
      modelViewer.querySelectorAll("button").forEach((hotspot) => {
        hotspot.classList.remove("hide2");
      });
    },
    setInvisible() {
      const modelViewer = document.getElementById(this.id+"a");
      if (!modelViewer) {
        return;
      }
      modelViewer.querySelectorAll("button").forEach((hotspot) => {
        hotspot.classList.add("hide2");
      });
    },
    async addToCart() {
      var auxColorId = null;
      this.colors.forEach((myColor) => {
        if (myColor.hex === this.color) {
          auxColorId = myColor.id;
        }
      });
      const cartItem = {
        UserId: this.$store.state.user.id,
        ProductId: this.id,
        ColorId: auxColorId,
        OrderId: null,
        quantity: 1,
        isDeleted: false,
      };
      await CartItemsService.createCartItem(cartItem);
      this.$root.$refs.Header.setNew(true);
    },
  },
};
</script>
<style scoped>
/* model-viewer {
  height: 500px;
  width: 795px;
  max-width: 100%;
  background-color: rgb(63, 63, 63);
} */
model-viewer {
  height: 200px;
  width: 400px;
  max-width: 100%;
  background-color: rgb(63, 63, 63);
}
.description {
  font-size: 14px;
}

#controls2 {
  position: absolute;
  bottom: 16px;
  left: 16px;
  max-width: unset;
  transform: unset;
}

.dot2 {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(97, 96, 96, 0.25);
  background: rgb(0, 0, 0);
  --min-hotspot-opacity: 0;
}

.dim2 {
  background: rgb(31, 31, 31);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(97, 97, 97, 0.25);
  color: rgba(255, 255, 255, 0.8);
  display: block;
  font-family: Futura, Helvetica Neue, sans-serif;
  font-size: 12px;
  font-weight: 700;
  max-width: 128px;
  overflow-wrap: break-word;
  padding: 0.5em 1em;
  position: absolute;
  width: max-content;
  height: max-content;
  transform: translate3d(-50%, -50%, 0);
  --min-hotspot-opacity: 0;
}

.show2 {
  --min-hotspot-opacity: 1;
}

.hide2 {
  display: none;
}
/* This keeps child nodes hidden while the element loads */
:not(:defined) > * {
  display: none;
}
</style>

