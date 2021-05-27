<template>
  <v-layout v-if="!isDeleted">
    <v-flex>
      <v-card v-if="isMounted">
        <v-card-title primary-title>
          <h3>{{product.name}}</h3>
          <v-spacer></v-spacer>
          <!-- <v-color-input class="border" v-model="color.hex" :label="color.name" hideCanvas hideInputs hideSliders/> -->
          <span :style="cssVars"></span>
          <h4 class="pl-6">{{finalPrice}}</h4>
          <v-text-field
            label="Quantity"
            v-model="quantity"
            required
            :rules="rules"
            type="number"
            class="pr-6 pl-6 qty"
            @change="verify"
          ></v-text-field>
          <v-btn class="red" @click="remove" 
            ><div class="material-icons"> close </div></v-btn
          >
        </v-card-title>
        <!-- <v-card-actions>
          <div class="error">{{ error }}</div>
        </v-card-actions> -->
      </v-card>
      <br>
    </v-flex>
  </v-layout>
</template>

<script>
import VColorInput from "vuetify-color-input";
import ProductsService from "@/services/ProductsService";
import ColorsService from "@/services/ColorsService";
import CartItemsService from "@/services/CartItemsService"
export default {
  data() {
    return {
      // quantity: 0,
      rules: [(v) => !!v || "Required"],
      isMounted: false,
      color: null,
      product: null,
      finalPrice: 0
    };
  },
  props: ["id", "userId", "productId", "colorId", "orderId", "quantity", "isDeleted"],
  async mounted() {
    this.color = (await ColorsService.getColor(this.colorId)).data;
    this.product = (await ProductsService.getProduct(this.productId)).data;
    this.finalPrice = this.product.price * this.quantity
    this.isMounted = true;
  },
  
  methods: {
    async verify(){
      if(this.quantity<=0){
        this.quantity = 1
      }
      try {
        const updatedCartItem = {
          id:this.id,
          UserId: this.userId,
          ProductId: this.ProductId,
          ColorId: this.colorId,
          OrderId: this.orderId,
          quantity: this.quantity,
          isDeleted: this.isDeleted
        }
        await CartItemsService.putCartItem(updatedCartItem)
      } catch (error) {
        console.log("Verify Cart Item: " + error)
      }
      this.finalPrice = this.product.price * this.quantity
    },
    async remove(){
      try {
        this.isDeleted = true
        await CartItemsService.deleteCartItem(this.id)
      } catch (error) {
        console.log("Delete Cart Item: " + error)
      }
    }
  },
  components: {
    VColorInput,
  },
  computed: {
    cssVars(){
      return {
        '--bg-color': this.color.hex,
        '--height': '25px',
        '--width': '25px',
        '--border-radius': '50%',
        '--display': 'inline-block',
        
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qty{
  width: 10px;
  max-width: 100%;

}
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
.v-input .v-input__control .v-input__slot .v-text-field__slot input::-webkit-outer-spin-button,
.v-input .v-input__control .v-input__slot .v-text-field__slot input::-webkit-inner-spin-button
{
-webkit-appearance: none;
margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
