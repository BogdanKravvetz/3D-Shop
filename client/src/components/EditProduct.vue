<template>
  <v-container>
    <v-form ref="form" lazy-validation>
      <v-text-field
        label="Name"
        v-model="product.name"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="Description"
        v-model="product.description"
        required
        :rules="rules"
      ></v-text-field>
      <h3>TODO: Upload file to the server, instead</h3>
      <p>./tassets/Shack.glb</p>
      <v-text-field
        label="FilePath"
        v-model="product.filePath"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="Price"
        v-model="product.price"
        required
        :rules="rules"
        type="number"
      ></v-text-field>
      <div class="error" v-if="error">{{ error }}</div>
      <v-btn @click="remove" class="red" dark>Delete</v-btn>
      <v-btn @click="save" dark>Save</v-btn>

    </v-form>
  </v-container>
</template>

<script>
import ProductService from "@/services/ProductsService";
export default {
  data() {
    return {
      product: {
        name: null,
        description: null,
        filePath: null,
        price: null,
        isDeleted: true,
      },
      error: null,
      rules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    async save() {
      this.error = null;
      const formFilled = Object.keys(this.product).every(
        (key) => !!this.product[key]
      );
      if (!formFilled) {
        this.error = "Fill in all the fields";
        return;
      }
      try {
        this.product.isDeleted = false
        await ProductService.putProduct(this.product)
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        console.log("Save Product: " + err);
      }
    },
      async remove() {
      try {
        this.product.isDeleted = true
        await ProductService.putProduct(this.product)
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        console.log("Delete Product: " + err);
      }
    }
  },
  async mounted() {
    try {
      const productId = this.$store.state.route.params.productId;
      this.product = (await ProductService.getProduct(productId)).data;
      this.product.isDeleted = true
    } catch (err) {
      console.log("Edit Product: " + err);
    }
  },
};
</script>

<style scoped>
</style>
