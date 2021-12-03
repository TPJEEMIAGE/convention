<template>
  <div class="export">
    <div>
      <label>Exporter depuis cette date :</label>
      <input
        v-model="critere.date"
        type="date"
      >
    </div>
    <div>
      <label>Inclure les stages non-validés ?</label>
      <input
        v-model="critere.nonValid"
        type="checkbox"
      >
    </div>
    <div>
      <label>Inclure les stages déja exportés ?</label>
      <input
        v-model="critere.alryExport"
        type="checkbox"
      >
    </div>
    <div>
      <label>Inclure les stages dont la convention entreprise est déjà signée ?</label>
      <input
        v-model="critere.convEntre"
        type="checkbox"
      >
    </div>
    <input
      type="button"
      value="Exporter"
      @click="doExport"
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ExportStage",
  data(){
    return{
      critere:{
        date: new Date(Date.now()).toISOString().substring(0, 10),
        nonValid: false,
        alryExport: false,
        convEntre: false
      }
    }
  },
  methods: {
    doExport: function () {
      if(this.critere.date){
      axios
        .post("http://localhost/convention/exportStage.php",this.critere)
        .then(function (response) {
          console.log(response);
          axios.get("http://localhost/convention/export.csv")
          .then(function (responseFile){
            var fileURL = window.URL.createObjectURL(new Blob([responseFile.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'export.csv');
            document.body.appendChild(fileLink);

            fileLink.click();
          })
          .catch(function () {})
        })
        .catch(function () {});
    }
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
