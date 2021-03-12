<template>
  <v-container>
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
      ></v-text-field>
      <v-text-field
        label="Description"
        v-model="product.description"
        required
        :rules="rules"
      ></v-text-field>
      <h3>TODO: Upload file to the server, instead</h3>
      <p>./tassets/Shack.glb</p>
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
      <!-- <v-text-field
        label="FilePath"
        v-model="product.filePath"
        required
        :rules="rules"
      ></v-text-field> -->
      <v-text-field
        label="Price"
        v-model="product.price"
        required
        :rules="rules"
        type="number"
      ></v-text-field>
      <div class="error" v-if="error">{{ error }}</div>
      <v-btn @click="add" dark>Add Product</v-btn>
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
        filePath: 'null',
        price: null,
        isDeleted: true,
      },
      file: '',
      error: null,
      rules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    async add() {
      this.error = null;
      const formData = new FormData();
      formData.append("file", this.file);
      const formFilled = Object.keys(this.product).every(
        (key) => !!this.product[key]
      );
      if (!formFilled) {
        this.error = "Fill in all the fields";
        return;
      }
      try {
        this.product.isDeleted = false;       
        const res = await ProductService.upload(formData);
        this.product.filePath =  res.data.file.filename
        await ProductService.createProduct(this.product);
        this.file = ''
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        this.error = err.response.data.error
        console.log(err);
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      // const allowedTypes = ['*/glb', '*/gltf', 'application/octet-stream']
      // console.log("name "+ propFile.name)
      // console.log("type" + propFile.type)
      // if(allowedTypes.includes(propFile.type)){
      //   this.file = propFile
      //   this.error = ""
      // }else{
      //   this.error = "Only .GLTF or .GLB files"
      // }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
