<template>
  <v-container>
    <h2 v-if="isEmpty">Your cart is empty, visit the shop!</h2>
    <v-card v-if="!isEmpty">
        <v-card-title primary-title>
          <h3>Product</h3>
          <v-spacer></v-spacer>
          <!-- <v-color-input class="border" v-model="color.hex" :label="color.name" hideCanvas hideInputs hideSliders/> -->
          <h4 class="pl-6">Color</h4>
          <h4 class="pl-6">Price</h4>
          <h4 class="pl-6">Quantity</h4>
<!--     
          <v-btn class="red" @click="remove" 
            ><div class="material-icons"> close </div></v-btn
          > -->
        </v-card-title>
      </v-card>
      <br>
    <v-flex v-for="cartItem in cartItems" :key="cartItem.id">
      <cart-item
        :id="cartItem.id"
        :userId="cartItem.UserId"
        :productId="cartItem.ProductId"
        :colorId="cartItem.ColorId"
        :quantity="cartItem.quantity"
        :isDeleted="cartItem.isDeleted"
      ></cart-item>
    </v-flex>
    <v-btn dark v-if="!isEmpty" @click="navigateTo({ name: 'Order' })"
      >Finalize Order></v-btn
    >
  </v-container>
</template>

<script>
import CartItem from "./CartItem";
import CartItemsService from "@/services/CartItemsService";
export default {
  data() {
    return {
      cartItems: null,
      isEmpty: true,
    };
  },
  async mounted() {
    this.cartItems = (
      await CartItemsService.getAllCartItemsOfUser(this.$store.state.user.id)
    ).data;
    if (this.cartItems.length > 0) {
      this.isEmpty = false;
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  components: {
    CartItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
