<template >
  <v-layout v-if="!this.tag.isDeleted">
    <v-flex >
      <v-card>
        <v-card-title primary-title>
          <v-text-field
            label="Name"
            v-model="tag.name"
            required
            :rules="rules"
            @change="checkNewName"
          ></v-text-field>
          <v-btn :dark="!isEdited" @click="save" :disabled="isEdited">Save</v-btn>
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
import TagsService from "@/services/TagsService";
export default {
  data() {
    return {
      rules: [(v) => !!v || "Required"],
      error: "",
      tag: {
        id: this.id,
        name: this.name,
        relevance: this.relevance,
        isDeleted: this.isDeleted,
      },
      tempName: this.name,
      isEdited:true
    };
  },
  methods: {
    async save() {
      this.error = null;
      
      //check if fields are filled to continue
      if (!this.tag.name) {
        this.error = "Fill in all the fields";
        return;
      }
      try {
        //update tag with new values
        await TagsService.putTag(this.tag);
        this.isEdited = true
      } catch (err) {
        console.log("Save Tag: " + err);
      }
    },
    async remove() {
      try {
        //update tag as deleted
        this.tag.isDeleted = true;
        await TagsService.putTag(this.tag);
      } catch (err) {
        console.log("Delete Product: " + err);
      }
    },
    checkNewName(){
      if(this.tempName != this.tag.name){
        this.isEdited = false
      }
    }
  },
  props: ["id", "name", "relevance", "isDeleted"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
