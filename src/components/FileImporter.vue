<template>
  <div class="container">
    <div>
      <label>Fichiers d'imports </label>
      <br />
      <br />
      <label>Attention : L'import peut prendre plusieurs minutes </label>
      <br />
      <br />
      <input type="file" multiple @change="handleFileUploads($event)" />
      <br />
      <br />
      <button v-on:click="submitFiles()">Importer</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FileImporter",
  data() {
    return {
      files: "",
    };
  },
  methods: {
    handleFileUploads: function (event) {
      this.files = event.target.files;
    },
    submitFiles: function () {
      let formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }
      axios
        .post("http://localhost/convention/uploadData.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log("SUCCESS!!");
          console.log(response);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
