<template>
  <v-container>
    <h1 class="display-4">Tags Manager</h1>
    <br />
    <v-text-field label="Search Tags" v-model="search"></v-text-field>
    <br />
    <v-btn large dark fab @click="add">
      <span class="material-icons"> add_circle </span>
    </v-btn>
    <br />
    <br />
    <v-flex v-if="dataIsHere">
      <v-flex v-for="tag in filteredList" :key="tag.id">
        <tag
          :id="tag.id"
          :name="tag.name"
          :relevance="tag.relevance"
          :isDeleted="tag.isDeleted"
        ></tag>
        <br />
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import TagsService from "@/services/TagsService";
import Tag from "./Tag.vue";
export default {
  data() {
    return {
      tags: null,
      tag: {
        name: "New Tag",
        relevance: 0,
        isDeleted: false,
      },
      search: "",
      dataIsHere: false,
    };
  },
  async mounted() {
    //fetch all available tags from the server
    this.tags = (await TagsService.getAllTags()).data;
    this.dataIsHere = true;
  },
  methods: {
    async add() {
      try {
        //send all tag data to server
        const responseTag = await TagsService.createTag(this.tag);
        if (responseTag) {
          this.tags.unshift(responseTag.data);
        }
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
  components: {
    Tag,
  },
  computed: {
    filteredList() {
      return this.tags.filter((tag) => {
        return tag.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
