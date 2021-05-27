<template>
  <v-flex>
    <v-card @click="showItems">
      <v-card-title primary-title>
        <h3>#{{ id }}</h3>

        <v-spacer></v-spacer>
        <h3 class="pl-10 pr-10" v-if="!isDelivery">Pick Up</h3>
        <h3 class="pl-10 pr-10" v-if="isDelivery">Delivery</h3>
        <h4 class="pl-6">{{ status }}</h4>
      </v-card-title>
    </v-card>
    <v-flex v-for="item in orderItems" :key="item.id" xs8 offset-xs2>
      <v-card v-if="isShowing && isMounted">
        <v-card-title primary-title>
          <h3>{{item.product.name}}</h3>

          <v-spacer></v-spacer>
          <h3 class="pl-10 pr-10">x{{item.quantity}}</h3>
          <span :style="cssVars(item.color.hex)"></span>
          <h4 class="pl-6">{{item.product.price*item.quantity}} €</h4>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-flex>
</template>

<script>
import CartItem from "./CartItem"
import CartItemsService from "@/services/CartItemsService";
// import OrdersService from "@/services/OrdersService";
import ColorsService from "@/services/ColorsService";
import ProductsService from "@/services/ProductsService";
export default {
  data() {
    return {
      orderItems: null,
      isShowing: false,
      isMounted: false
    };
  },
  props: ["id", "isDelivery", "status"],
  methods: {
    async showItems() {
      if(!this.isShowing){
        this.isShowing=true
      } else if(this.isShowing){
        this.isShowing= false
      }
      this.orderItems = (
        await CartItemsService.getAllCartItemsOfOrder(this.id)
      ).data;
      for (const cartItem of this.orderItems) {
        cartItem.product = (await ProductsService.getProduct(cartItem.ProductId)).data
        cartItem.color = (await ColorsService.getColor(cartItem.ColorId)).data
      }
      console.log(this.orderItems);
      this.isMounted = true
    },
    cssVars(hex){
      return {
        '--bg-color': hex,
        '--height': '25px',
        '--width': '25px',
        '--border-radius': '50%',
        '--display': 'inline-block'
      }
    }
  },
  components: {
    CartItem
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
  border:1px solid black;
}
</style>
