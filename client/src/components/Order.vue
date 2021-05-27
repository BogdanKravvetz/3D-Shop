<template>
  <v-container>
    <h1>Your Products</h1>
    <v-flex v-for="cartItem in cartItems" :key="cartItem.id" xs6 offset-xs3>
      <v-card v-if="isMounted">
        <v-card-title primary-title>
          <h3>{{cartItem.product.name}}</h3>
          <v-spacer></v-spacer>
          <h3 class="pl-10 pr-10">x{{cartItem.quantity}}</h3>
          <span :style="cssVars(cartItem.color.hex)"></span>
          <h4 class="pl-6">{{cartItem.product.price*cartItem.quantity}} €</h4>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-checkbox v-model="order.isDelivery" label="Delivery"></v-checkbox>
    <v-flex v-if="order.isDelivery">
      <v-text-field
        label="Country*"
        v-model="order.country"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="City*"
        v-model="order.city"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="Street*"
        v-model="order.street"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="Number*"
        v-model="order.number"
        required
        :rules="rules"
      ></v-text-field>
    </v-flex>
    <v-text-field label="Comment" v-model="order.comment"></v-text-field>
    <v-btn dark v-if="!isEmpty" @click="createOrder">Finalize Order</v-btn>
  </v-container>
</template>

<script>
import CartItem from "./CartItem";
import CartItemsService from "@/services/CartItemsService";
import OrdersService from "@/services/OrdersService";
import ColorsService from "@/services/ColorsService";
import ProductsService from "@/services/ProductsService";

export default {
  data() {
    return {
      order: {
        status: "active",
        isDelivery: false,
        country: null,
        city: null,
        street: null,
        number: null,
        comment: null,
        isDeleted: false,
        UserId: null,
      },
      isMounted: false,
      cartItems: null,
      isEmpty: true,
      rules: [(v) => !!v || "Required"],
    };
  },
  async mounted() {
    this.cartItems = (
      await CartItemsService.getAllCartItemsOfUser(this.$store.state.user.id)
    ).data;
     for (const cartItem of this.cartItems) {
        cartItem.product = (await ProductsService.getProduct(cartItem.ProductId)).data
        cartItem.color = (await ColorsService.getColor(cartItem.ColorId)).data
        console.log(cartItem.product);
      }
    if (this.cartItems.length > 0) {
      this.isEmpty = false;
    }
    this.isMounted = true
  },
  methods: {
    async createOrder() {
      this.order.UserId = this.$store.state.user.id;
      const dbOrder = (await OrdersService.createOrder(this.order)).data;

      for (const cartItem of this.cartItems) {
        cartItem.OrderId = dbOrder.id;
        console.log(dbOrder.id);
        await CartItemsService.putCartItem(cartItem);
      }

      this.$router.push({
        name: "UserOrders",
      });
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
.border{
  width: 18px;
  border: 3px solid black;
}
span {
  height: var(--height);
  width: var(--width);
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  display: var(--display);
  border:1px solid black;
}
</style>
