<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card >
        <v-card-title primary-title>
          <h3>Order Number</h3>
          <v-spacer></v-spacer>
          <h3 class="pl-10 pr-10">Type</h3>
          <h4 class="pl-6">Status</h4>
        </v-card-title>
      </v-card>
      <br>
    </v-flex>
    <v-flex v-for="order in userOrders" :key="order.id" xs6 offset-xs3>
      <order-view :id="order.id" :isDelivery="order.isDelivery" :status="order.status"></order-view>
      <br>
    </v-flex>
  </v-container>
</template>

<script>
import OrderView from "./OrderView"
import OrdersService from "@/services/OrdersService";
import CartItemsService from "@/services/CartItemsService";
export default {
  data() {
    return {
      userOrders: null
    };
  },
  async mounted() {
    this.userOrders = (
      await OrdersService.getAllOrdersOfUser(this.$store.state.user.id)
    ).data;
    console.log(this.userOrders)
  },

  components: {
    OrderView
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
