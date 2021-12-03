<template>
  <div class="container-fluid">
    <div class="row justify-content-center pad">
      <h4>Elève</h4>
      <table>
        <tr>
          <th>Nom</th>
          <th>Prenom</th>
        </tr>
        <tr>
          <td>{{ stageData.nomEleve }}</td>
          <td>{{ stageData.prenomEleve }}</td>
        </tr>
      </table>
    </div>
    <div class="row justify-content-center pad">
      <h4>Entreprise</h4>
      <table>
        <tr>
          <th>Raison sociale</th>
          <th>Adresse</th>
          <th>Activite</th>
          <th>Numéro de fixe</th>
          <th>Numéro de fax</th>
        </tr>
        <tr>
          <td>{{ stageData.raisonSociale }}</td>
          <td>{{ stageData.adresse }} {{ stageData.adresse2 }}</td>
          <td>{{ stageData.activite }}</td>
          <td>{{ stageData.numTel }}</td>
          <td>{{ stageData.numFax }}</td>
        </tr>
      </table>
    </div>
    <div class="row justify-content-center pad">
      <h4>Responsable</h4>
      <table>
        <tr>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Fonction</th>
          <th>Tel. Fixe</th>
          <th>Tel. Port.</th>
          <th>Mail</th>
        </tr>
        <tr>
          <td>{{ stageData.nom }}</td>
          <td>{{ stageData.prenom }}</td>
          <td>{{ stageData.fonction }}</td>
          <td>{{ stageData.telFixe }}</td>
          <td>{{ stageData.telPortable }}</td>
          <td>{{ stageData.mail }}</td>
        </tr>
      </table>
    </div>
    <div class="row justify-content-center pad">
      <h4 class="col">
        Valider ?
      </h4>
      <input
        v-model="validated"
        class="col"
        type="checkbox"
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Stage",
  props: {
    stageData: {
      type: Object,
      required: true
    },
    validated: Boolean,
  },
  watch: {
    validated: function () {
      let dateVal = new Date(Date.now()).toISOString().substring(0, 10);
      if (this.validated == false) {
        dateVal = "cancel";
      }
      axios
        .get("http://localhost/convention/checkStage.php", {
          params: { idStage: this.stageData.idStage, dateVal: dateVal },
        })
        .then(function () {})
        .catch(function () {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border: 1px solid;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.pad {
  margin: 20px 10%;
}
</style>
