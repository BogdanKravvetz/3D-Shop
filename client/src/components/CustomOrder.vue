<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card elevation="5">
        <h1 class="display-3">Custom Order</h1>
        <br />
        <v-form
          ref="form"
          lazy-validation
          enctype="multipart/form-data"
          method="POST"
        >
          <v-flex>
            <h3 v-if="!file" class="display-1">Upload 3D Model</h3>
            <h3 v-if="file" class="display-1">{{ file.name }}</h3>
            <v-btn dark x-large>
              <label>
                <div>
                  <span class="material-icons"> file_upload </span>
                  <div>Choose a .STL file</div>
                </div>
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                  class="file-input"
                  accept=".stl"
                />
              </label>
            </v-btn>
            <v-select
              v-if="isMounted"
              :items="colors"
              label="Color"
              item-text="name"
              item-value="hex"
              v-model="color"
              class="pl-12 pr-12"
            ></v-select>
            <v-text-field
              label="Quantity"
              v-model="quantity"
              required
              :rules="rules"
              type="number"
              @change="verify"
              class="pl-12 pr-12"
            ></v-text-field>
          </v-flex>
          <table width="100%">
            <tr>
              <th></th>
              <th class="text-xs-center">
                <div class="my-container">
                  <v-checkbox
                    v-model="order.isDelivery"
                    label="Delivery"
                    class="align-center justify-center"
                  ></v-checkbox>
                </div>
              </th>
              <th></th>
            </tr>
          </table>
          <v-flex v-if="order.isDelivery">
            <v-text-field
              label="Country*"
              v-model="order.country"
              required
              :rules="rules"
              class="pl-12 pr-12"
            ></v-text-field>
            <v-text-field
              label="City*"
              v-model="order.city"
              required
              :rules="rules"
              class="pl-12 pr-12"
            ></v-text-field>
            <v-text-field
              label="Street*"
              v-model="order.street"
              required
              :rules="rules"
              class="pl-12 pr-12"
            ></v-text-field>
            <v-text-field
              label="Number*"
              v-model="order.number"
              required
              :rules="rules"
              class="pl-12 pr-12"
            ></v-text-field>
          </v-flex>
          <v-text-field
            label="Comment"
            v-model="order.comment"
            class="pl-12 pr-12"
          ></v-text-field>
          <br />
          <div class="error" v-if="error">{{ error }}</div>
          <br />
          <v-btn @click="placeOrder" dark>Order</v-btn>
          <p class="myColor">.</p>
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import ProductService from "@/services/ProductsService";
import ColorsService from "@/services/ColorsService";
import CartItem from "./CartItem";
import CartItemsService from "@/services/CartItemsService";
import OrdersService from "@/services/OrdersService";
export default {
  data() {
    return {
      isMounted: false,
      error: null,
      file: null,
      quantity: 1,
      order: {
        status: "Active",
        isDelivery: false,
        country: null,
        city: null,
        street: null,
        number: null,
        comment: null,
        isDeleted: false,
        UserId: null,
      },
      product: {
        name: null,
        description: null,
        //just the name of the file, not the actual path
        filePath: "null",
        price: null,
        isCustom: false,
        isDeleted: false,
        //selected tag ids for this product
        tagIds: [],
      },
      colors: null,
      color: null,
      rules: [(v) => !!v || "Required"],
    };
  },
  async mounted() {
    this.colors = (await ColorsService.getAllColors()).data;
    this.color = this.colors[0].hex;
    this.isMounted = true;
  },
  methods: {
    async placeOrder() {
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
        const res = await ProductService.uploadStl(formData);
        this.product.filePath = res.data.file.filename;
        this.product.name = "Custom: " + res.data.file.filename;
        this.product.description = res.data.file.filename;
        this.product.price = 0.5;
        this.product.isCustom = true;
        //send all product data to server
        const dbProduct = (await ProductService.createProduct(this.product))
          .data;
        console.log("dbProduct : " + JSON.stringify(dbProduct))
        this.order.UserId = this.$store.state.user.id;
        const dbOrder = (await OrdersService.createOrder(this.order)).data;
        if (dbProduct) {
          const dbCartItem = (
            await CartItemsService.createCartItem({
              UserId: this.$store.state.user.id,
              ProductId: dbProduct.id,
              ColorId: this.color.id,
              OrderId: dbOrder.id,
              quantity: this.quantity,
              isDeleted: false,
            })
          ).data;
        }
        //reset values and redirect to shop
        this.file = "";
        this.$router.push({
          name: "Shop",
        });
      } catch (err) {
        this.error = err.res.data.error;
      }
    },
    async verify() {
      if (this.quantity <= 0) {
        this.quantity = 1;
      }
    },
    handleFileUpload() {
      this.error = null;
      this.file = this.$refs.file.files[0];
    },
    formCheck() {
      if (!this.file) {
        return false;
      }
      if (this.isDelivery) {
        //search all filed of object and check if keys have a value
        const fileds = Object.keys(this.order).every((key) => {
          if (
            key == "country" ||
            key == "city" ||
            key == "street" ||
            key == "number"
          ) {
            if (!this.order[key]) {
              return false;
            }
          }
          return true;
        });
        if (!fileds) {
          return false;
        }
      }

      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none;
}
.myColor {
  color: white;
}
.my-container {
  display: inline-block;
}
</style>
