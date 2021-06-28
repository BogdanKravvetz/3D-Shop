<template>
  <v-container>
    <v-flex xs8 offset-xs2>
      <v-card elevation="5">
        <h2 v-if="isEmpty">Your cart is empty, visit the shop!</h2>
        <h1 v-if="!isEmpty" class="display-3">Your items</h1>
        <table v-if="!isEmpty" width="100%" class="pl-6 pr-6">
          <tr>
            <td width="30%"><h2>Product</h2></td>
            <td width="10%"><h3>Color</h3></td>
            <td width="10%"><h3>Price</h3></td>
            <td width="30%"><h3>Quantity</h3></td>
            <td width="20%"><h3>Remove</h3></td>
          </tr>
        </table>
        <v-card
          v-for="cartItem in cartItems"
          :key="cartItem.id"
          
        >
          <cart-item
            :id="cartItem.id"
            :userId="cartItem.UserId"
            :productId="cartItem.ProductId"
            :colorId="cartItem.ColorId"
            :quantity="cartItem.quantity"
            :isDeleted="cartItem.isDeleted"
            class="pl-6 pr-6"
          ></cart-item>
        </v-card>
        <br />
        <v-btn dark v-if="!isEmpty" @click="navigateTo({ name: 'Order' })"
          >Finalize Order</v-btn
        >
        <p class="myColor">.</p>
      </v-card>
    </v-flex>
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
.myColor {
  color: white;
}

</style>
