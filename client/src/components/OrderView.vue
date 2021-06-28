<template>
  <v-container>
    <v-card>
      <table width="100%">
        <tr>
          <td class="text-left" width="43%">
            <h2 @click="showItems">#{{ id }}</h2>
          </td>
          <td class="text-left" width="30%">
            <h2 class="pl-10 pr-10" v-if="!isDelivery" @click="showItems">
              Pick Up
            </h2>
            <h2 class="pl-10 pr-10" v-if="isDelivery" @click="showItems">
              Delivery
            </h2>
          </td>
          <td class="pl-12" width="27%">
            <v-select
              style="width: 70%"
              v-if="$store.state.user.isAdmin"
              :items="statusArray"
              label="Status"
              item-text="Status"
              item-value="hex"
              v-model="status"
              v-on:change="changeStatus"
            ></v-select>
            <h4 @click="showItems" v-if="!$store.state.user.isAdmin">
              {{ status }}
            </h4>
          </td>
        </tr>
      </table>
    </v-card>
    <v-card>
      <!-- <br /> -->
      <table v-if="isShowing" width="100%" class="pl-6 pr-6">
        <tr>
          <td width="50%"><h2>Product</h2></td>
          <td width="10%"><h3>Quantity</h3></td>
          <td width="15%"><h3>Color</h3></td>
          <td width="30%"><h3>Price</h3></td>
          <td width="20%" class="pr-11" v-show="$store.state.user.isAdmin"><h3>Download</h3></td>
        </tr>
      </table>
      <v-flex v-for="item in orderItems" :key="item.id" xs10 offset-xs1>
        <v-card v-if="isShowing && isMounted">
          <v-card-title primary-title>
            <table width="100%">
              <tr>
                <td width="50%" class="text-left">
                  <h3>{{ item.product.name }}</h3>
                </td>
                <td width="10%">
                  <h4>x{{ item.quantity }}</h4>
                </td>
                <td width="10%">
                  <span :style="cssVars(item.color.hex)"></span>
                </td>
                <td width="30%">
                  <h4 class="pl-16" v-if="!item.product.isCustom">
                    {{ item.product.price * item.quantity }} €
                  </h4>
                  <h4 class="pl-16" v-if="item.product.isCustom">
                    {{ item.product.price * item.quantity }} € / 100g
                  </h4>
                </td>
                <td width="20%" v-show="$store.state.user.isAdmin ">
                  <v-btn class="green" @click="download(item.product)"
                    ><div class="material-icons">file_download</div></v-btn
                  >
                </td>
              </tr>
            </table>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs10 offset-xs1 v-if="isShowing">
        <v-card>
          <v-card-title primary-title>
            <h2 class="text-left">Total</h2>
            <v-spacer></v-spacer>
            <h2 class="text-right pr-16">{{ total }} €</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
import CartItem from "./CartItem";
import CartItemsService from "@/services/CartItemsService";
import OrdersService from "@/services/OrdersService";
import ColorsService from "@/services/ColorsService";
import ProductsService from "@/services/ProductsService";
import axios from "axios";
import ConfigApi from "../services/ConfigApi";
export default {
  data() {
    return {
      orderItems: null,
      isShowing: false,
      isMounted: false,
      statusArray: ["Active", "Printed", "Delivered"],
      dropStatus: this.status,
      total: 0,
    };
  },
  props: ["id", "isDelivery", "status"],
  methods: {
    mounted() {
      componentName();
    },
    async download(product) {
      axios({
        url:
          ConfigApi.connection.link +
          ":" +
          ConfigApi.connection.port +
          "/download/" +
          product.filePath,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", product.filePath);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
      // const downloadedFile = await ProductsService.download(product);
      // console.log(downloadedFile)
      // var fileURL = window.URL.createObjectURL(new Blob([downloadedFile.data]));
      // var fileLink = document.createElement("a");

      // fileLink.href = fileURL;
      // fileLink.setAttribute("download", product.filePath);
      // document.body.appendChild(fileLink);

      // fileLink.click();
    },
    async changeStatus() {
      const order = {
        id: this.id,
        status: this.status,
      };
      await OrdersService.putOrder(order);
    },
    async showItems() {
      if (!this.isShowing) {
        this.isShowing = true;
      } else if (this.isShowing) {
        this.isShowing = false;
      }
      this.orderItems = (
        await CartItemsService.getAllCartItemsOfOrder(this.id)
      ).data;
      for (const cartItem of this.orderItems) {
        cartItem.product = (
          await ProductsService.getProduct(cartItem.ProductId)
        ).data;
        cartItem.color = (await ColorsService.getColor(cartItem.ColorId)).data;
      }
      console.log(this.orderItems);
      this.isMounted = true;
      this.orderItems.forEach((orderItem) => {
        this.total = this.total + orderItem.product.price * orderItem.quantity;
      });
    },
    cssVars(hex) {
      return {
        "--bg-color": hex,
        "--height": "25px",
        "--width": "25px",
        "--border-radius": "50%",
        "--display": "inline-block",
      };
    },
    componentName() {
      console.log(this.$parent.$options.name);
      if (this.$parent.$options.name == "OrdersAdmin") {
        return true;
      }
      return false;
    },
  },
  components: {
    CartItem,
  },
  computed: {
    // cssVars(){
    //   return {
    //     '--bg-color': "white",
    //     '--height': '25px',
    //     '--width': '25px',
    //     '--border-radius': '50%',
    //     '--display': 'inline-block'
    //   }
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  height: var(--height);
  width: var(--width);
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  display: var(--display);
  border: 1px solid black;
}
</style>
