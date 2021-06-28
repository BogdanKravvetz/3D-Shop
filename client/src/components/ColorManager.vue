<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <v-card elevation="5">
        <h1 class="display-3">Colors Manager</h1>
        <br />
        <v-text-field label="Search Colors" v-model="search" class="pl-12 pr-12"></v-text-field>
        <br />
        <v-btn large dark fab @click="add">
          <span class="material-icons"> add_circle </span>
        </v-btn>
        <br />
        <br />
        <v-flex v-if="dataIsHere">
          <v-flex v-for="color in filteredList" :key="color.id">
            <color
              :id="color.id"
              :name="color.name"
              :hex="color.hex"
              :isDeleted="color.isDeleted"
              class="pl-12 pr-12"
            ></color>
            <br />
          </v-flex>
        </v-flex>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import ColorsService from "@/services/ColorsService";
import Color from "./Color.vue";
export default {
  data() {
    return {
      colors: null,
      hexColor: null,
      color: {
        name: "New Color",
        hex: "#000000",
        isDeleted: false,
      },
      search: "",
      dataIsHere: false,
    };
  },
  async mounted() {
    //fetch all available colors from the server
    this.colors = (await ColorsService.getAllColors()).data;
    this.dataIsHere = true;
  },
  methods: {
    async add() {
      try {
        // send all color data to server
        const responseColor = await ColorsService.createColor(this.color);
        if (responseColor) {
          this.colors.unshift(responseColor.data);
        }
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
  components: {
    Color,
  },
  computed: {
    filteredList() {
      return this.colors.filter((color) => {
        return color.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
