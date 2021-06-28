<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card elevation="5">
        <h1 class="display-3">Create A New Product</h1>
        <v-form
          ref="form"
          lazy-validation
          enctype="multipart/form-data"
          method="POST"
        >
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
          <v-flex>
            <h3 v-if="!file" class="display-1">Upload 3D Model</h3>
            <h3 v-if="file" class="display-1">{{ file.name }}</h3>
            <v-btn dark x-large>
              <label>
                <div>
                  <span class="material-icons"> file_upload </span>
                  <div>Choose a .GLB file</div>
                </div>
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                  class="file-input"
                  accept=".glb"
                />
              </label>
            </v-btn>
            <br />
            <br />
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
          </v-flex>
          <br />
          <v-row justify="center">
            <v-col cols="12" sm="7" md="6" lg="5">
              <v-sheet elevation="10" rounded="xl">
                <v-sheet dark rounded="t-xl">
                  <h3>Selected Tags</h3>
                </v-sheet>
                <div class="pa-4">
                  <v-flex v-if="dataIsHere">
                    <v-chip-group column>
                      <v-chip
                        v-for="tag in productTags"
                        :key="tag.id"
                        dark
                        @click="removeTag(tag)"
                        >{{ tag.name }}</v-chip
                      >
                    </v-chip-group>
                  </v-flex>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
          <br/>
          <div class="error" v-if="error">{{ error }}</div>
          <br />
          <v-btn @click="add" dark>Add Product</v-btn>
          <p class="myColor">.</p>
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import ProductService from "@/services/ProductsService";
import TagsService from "@/services/TagsService";
export default {
  data() {
    return {
      product: {
        name: null,
        description: null,
        //just the name of the file, not the actual path
        filePath: "null",
        price: null,
        isDeleted: false,
        isCustom: false,
        //selected tag ids for this product
        tagIds: [],
      },
      //selected tags for this product, shown on page
      productTags: [],
      //all tags from server
      tags: null,
      //the glb file from upload
      file: null,
      error: null,
      rules: [(v) => !!v || "Required"],
      dataIsHere: false,
    };
  },
  async mounted() {
    //fetch all available tags from the server
    this.tags = (await TagsService.getAllTags()).data;
    this.dataIsHere = true;
  },
  methods: {
    async add() {
      this.error = null;
      //upload data
      const formData = new FormData();
      formData.append("file", this.file);
      //check if everything is filled
      const formFilled = this.formCheck();
      if (!formFilled) {
        this.error = "Fill in all the fields and upload file!";
        return;
      }
      try {
        //send file data to server
        const res = await ProductService.upload(formData);
        this.product.filePath = res.data.file.filename;
        //send all product data to server
        await ProductService.createProduct(this.product);
        //reset values and redirect to shop
        this.file = "";
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        this.error = err.res.data.error;
      }
    },
    //get file from form
    handleFileUpload() {
      this.error = null;
      this.file = this.$refs.file.files[0];
    },
    tagClick(tag) {
      const tagExists = this.productTags.some((prodTag) => prodTag === tag);
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
      if (!this.file) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.myColor {
  color: white;
}
</style>
