<template >
  <v-layout v-if="!this.color.isDeleted">
    <v-flex>
      <v-card>
        <v-color-input class="colsize" v-model="color.hex" noAlpha @input="checkNewColor"/>
        <v-card-title primary-title>
          <v-text-field
            label="Color"
            v-model="color.name"
            required
            :rules="rules"
            @change="checkNewName"
          ></v-text-field>
          <v-btn :dark="!isEdited" @click="save" :disabled="isEdited"
            >Save</v-btn
          >
          <v-btn class="red" @click="remove">Delete</v-btn>
        </v-card-title>
        <v-card-actions>
          <div class="error">{{ error }}</div>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VColorInput from "vuetify-color-input";
import ColorsService from "@/services/ColorsService";
export default {
  data() {
    return {
      rules: [(v) => !!v || "Required"],
      error: "",
      color: {
        id: this.id,
        name: this.name,
        hex: this.hex,
        isDeleted: this.isDeleted,
      },
      tempName: this.name,
      tempHexColor: this.hex,
      isEdited: true,
    };
  },
  methods: {
    async save() {
      this.error = null;
      //check if fields are filled to continue
      if (!this.color.name) {
        this.error = "Fill in all the fields";
        return;
      }
      try {
        //update color with new values
        await ColorsService.putColor(this.color);
        this.isEdited = true;
      } catch (err) {
        console.log("Save Color: " + err);
      }
    },
    async remove() {
      try {
        //update color as deleted
        this.color.isDeleted = true;
        await ColorsService.putColor(this.color);
      } catch (err) {
        console.log("Delete Color: " + err);
      }
    },
    checkNewName() {
      if (this.tempName != this.color.name) {
        this.isEdited = false;
      }
    },
    checkNewColor() {
      if (this.tempHexColor != this.color.hex) {
        this.isEdited = false;
      }
    },
  },
  props: ["id", "name", "hex", "isDeleted"],
  components: {
    VColorInput,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.colsize{
  width: 1px;
  max-width: 100%;
}
</style>
