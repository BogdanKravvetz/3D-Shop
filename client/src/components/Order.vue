<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card elevation="5">
        <h1 class="display-3">Your Products</h1>
        <table v-if="!isEmpty" width="100%" class="pl-4 pr-4">
          <tr>
            <td width="40%" class="text-left"><h2>Product</h2></td>
            <td width="10%" class="text-right"><h3>Color</h3></td>
            <td width="10%" class="text-right"><h3>Quantity</h3></td>
            <td width="30%" class="text-right"><h3>Price</h3></td>
          </tr>
        </table>
        <v-flex v-for="cartItem in cartItems" :key="cartItem.id">
          <v-card v-if="isMounted">
            <v-card-title primary-title>
              <table width="100%">
                <tr>
                  <td width="40%" class="text-left">
                    <h3>{{ cartItem.product.name }}</h3>
                  </td>
                  <td width="10%" class="text-right">
                    <span :style="cssVars(cartItem.color.hex)"></span>
                  </td>
                  <td width="10%" class="text-right">
                    <h3 class="pl-10 pr-10">{{ cartItem.quantity }}</h3>
                  </td>
                  <td width="30%" class="text-right">
                    <h4 class="pl-6">
                      {{ cartItem.product.price * cartItem.quantity }} €
                    </h4>
                  </td>
                </tr>
              </table>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-card>
          <v-card-title primary-title>
            <h2>Total</h2>
            <v-spacer></v-spacer>
            <h2>{{ total }}</h2>
          </v-card-title>
        </v-card>
        <div class="my-container">
          <v-checkbox v-model="order.isDelivery" label="Delivery"></v-checkbox>
        </div>
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
        <v-btn dark v-if="!isEmpty" @click="createOrder">Finalize Order</v-btn>
        <p class="white">.</p>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import CartItem from "./CartItem";
import CartItemsService from "@/services/CartItemsService";
import OrdersService from "@/services/OrdersService";
import ColorsService from "@/services/ColorsService";
import ProductsService from "@/services/ProductsService";
import ProductTagsService from "@/services/ProductTagsService"
import TagsService from "@/services/TagsService"

export default {
  data() {
    return {
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
      isMounted: false,
      cartItems: null,
      isEmpty: true,
      rules: [(v) => !!v || "Required"],
      total: 0,
    };
  },
  async mounted() {
    this.cartItems = (
      await CartItemsService.getAllCartItemsOfUser(this.$store.state.user.id)
    ).data;
    for (const cartItem of this.cartItems) {
      cartItem.product = (
        await ProductsService.getProduct(cartItem.ProductId)
      ).data;
      cartItem.color = (await ColorsService.getColor(cartItem.ColorId)).data;
      console.log(cartItem.product);
    }
    if (this.cartItems.length > 0) {
      this.isEmpty = false;
    }
    this.isMounted = true;
    this.cartItems.forEach((cartItem) => {
      this.total = this.total + cartItem.product.price * cartItem.quantity;
    });
  },
  methods: {
    async createOrder() {
      this.order.UserId = this.$store.state.user.id;
      const dbOrder = (await OrdersService.createOrder(this.order)).data;

      for (const cartItem of this.cartItems) {
        cartItem.OrderId = dbOrder.id;
        console.log(dbOrder.id);
        await CartItemsService.putCartItem(cartItem);
        const prodTags = (await ProductTagsService.getProductTags(cartItem.ProductId)).data
        console.log("TAGS? : " + prodTags)
        for (const prodTag of prodTags){
          const tag = (await TagsService.getTag(prodTag.TagId)).data
          tag.relevance = tag.relevance + 1
          await TagsService.putTag(tag)
        }
      }

      this.$router.push({
        name: "UserOrders",
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
.border {
  width: 18px;
  border: 3px solid black;
}
span {
  height: var(--height);
  width: var(--width);
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  display: var(--display);
  border: 1px solid black;
}
.white {
  color: white;
}
.my-container {
  display: inline-block;
}
</style>
