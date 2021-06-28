<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card elevation="5">
        <h1 class="display-3">Edit This Product</h1>
        <v-form ref="form" lazy-validation>
          <v-text-field
            label="Name"
            v-model="product.name"
            required
            :rules="rules"
            class="pl-12 pr-12"
          ></v-text-field>
          <v-text-field
            label="Description"
            v-model="product.description"
            required
            :rules="rules"
            class="pl-12 pr-12"
          ></v-text-field>
          <v-text-field
            label="Price"
            v-model="product.price"
            required
            :rules="rules"
            type="number"
            class="pl-12 pr-12"
          ></v-text-field>
          <v-text-field
            label="File Name"
            v-model="product.filePath"
            readonly
            disabled
            class="pl-12 pr-12"
          ></v-text-field>
          <v-row justify="center">
            <v-col cols="12" sm="7" md="6" lg="5">
              <v-sheet elevation="10" rounded="xl">
                <v-sheet dark rounded="t-xl">
                  <h3>Choose tags for this product</h3>
                </v-sheet>
                <div class="pa-4">
                  <v-flex v-if="dataIsHere">
                    <v-chip-group column>
                      <v-chip
                        v-for="tag in tags"
                        :key="tag.id"
                        @click="tagClick(tag)"
                        >{{ tag.name }}</v-chip
                      >
                    </v-chip-group>
                  </v-flex>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="7" md="6" lg="5">
              <v-sheet elevation="10" rounded="xl">
                <v-sheet dark rounded="t-xl">
                  <h3>Product Tags</h3>
                </v-sheet>
                <div class="pa-4">
                  <v-chip-group column>
                    <v-chip
                      v-for="tag in productTags"
                      :key="tag.id"
                      dark
                      @click="removeTag(tag)"
                      >{{ tag.name }}</v-chip
                    >
                  </v-chip-group>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
          <br />
          <div class="error" v-if="error">{{ error }}</div>
          <br />
          <v-btn @click="remove" class="red" dark>Delete</v-btn>
          <span class="white">________________</span>
          <v-btn @click="save" dark offset-xs3>Save</v-btn>
          <p class="white">.</p>
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import ProductService from "@/services/ProductsService";
import TagsService from "@/services/TagsService";
import ProductTagsService from "@/services/ProductTagsService";
export default {
  data() {
    return {
      product: {
        id: null,
        name: null,
        description: null,
        filePath: null,
        price: null,
        isDeleted: false,
        isCustom: false,
        tagIds: [],
      },
      productTags: [],
      tags: null,
      error: null,
      rules: [(v) => !!v || "Required"],
      dataIsHere: false,
    };
  },
  methods: {
    async save() {
      this.error = null;
      //check if fields are filled to continue
      const formFilled = this.formCheck();
      if (!formFilled) {
        this.error = "Fill in all the fields";
        return;
      }
      try {
        //update product with new values and redirect to shop
        await ProductService.putProduct(this.product);
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        console.log("Save Product: " + err);
      }
    },
    async remove() {
      try {
        //update product as deleted
        this.product.isDeleted = true;
        await ProductService.putProduct(this.product);
        //redirect to shop
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        console.log("Delete Product: " + err);
      }
    },
    tagClick(tag) {
      const tagExists = this.productTags.some(
        (prodTag) => prodTag.id === tag.id
      );
      if (!tagExists) {
        this.productTags.push(tag);
        this.product.tagIds.push(tag.id);
      }
    },
    removeTag(tag) {
      this.productTags = this.productTags.filter((item) => item !== tag);
      this.product.tagIds = this.product.tagIds.filter(
        (item) => item !== tag.id
      );
    },
    formCheck() {
      //search all filed of object and check if keys have a value
      const fileds = Object.keys(this.product).every((key) => {
        if (key == "name" || key == "description" || key == "price") {
          if (!this.product[key]) {
            return false;
          }
        }
        return true;
      });
      if (!fileds) {
        return false;
      }
      return true;
    },
  },
  async mounted() {
    try {
      //request product data from server when page loads
      const productId = this.$store.state.route.params.productId;
      const auxProduct = (await ProductService.getProduct(productId)).data;
      this.product.id = auxProduct.id;
      this.product.name = auxProduct.name;
      this.product.description = auxProduct.description;
      this.product.filePath = auxProduct.filePath;
      this.product.price = auxProduct.price;
      this.product.isDeleted = auxProduct.isDeleted;

      //fetch all available tags from the server
      this.tags = (await TagsService.getAllTags()).data;
      const tagProdPair = (
        await ProductTagsService.getProductTags(this.product.id)
      ).data;
      for (let index = 0; index < tagProdPair.length; index++) {
        const element = tagProdPair[index].TagId;
        this.productTags.push((await TagsService.getTag(element)).data);
        this.product.tagIds.push(element);
      }
      this.dataIsHere = true;
    } catch (err) {
      console.log("Edit Product: " + err);
    }
  },
};
</script>

<style scoped>
.white {
  color: white;
}
</style>
