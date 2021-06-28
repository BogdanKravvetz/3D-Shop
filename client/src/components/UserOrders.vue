<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card elevation="5">
        <h1 class="display-3">Your Orders</h1>
        <br>
        <v-flex>
          <v-card>
            <table width="100%">
              <tr>
                <td class="text-left" width="50%"><h2>Order Number</h2></td>
                <td class="text-left"><h2>Type</h2></td>
                <td class="text-right"><h2 class="pr-16">Status</h2></td>
              </tr>
            </table>
          </v-card>
          <br />
        </v-flex>
        <v-flex v-for="order in userOrders" :key="order.id">
          <order-view
            :id="order.id"
            :isDelivery="order.isDelivery"
            :status="order.status"
          ></order-view>
        </v-flex>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import OrderView from "./OrderView";
import OrdersService from "@/services/OrdersService";
import CartItemsService from "@/services/CartItemsService";
export default {
  data() {
    return {
      userOrders: null,
    };
  },
  async mounted() {
    this.userOrders = (
      await OrdersService.getAllOrdersOfUser(this.$store.state.user.id)
    ).data;
    console.log(this.userOrders);
  },

  components: {
    OrderView,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
