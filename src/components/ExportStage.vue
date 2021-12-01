<template>
  <div class="export">
    <input type="button" value="Exporter" @click="doExport" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ExportStage",
  methods: {
    doExport: function () {
      axios
        .get("http://localhost/convention/exportStage.php")
        .then(function () {})
        .catch(function () {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
