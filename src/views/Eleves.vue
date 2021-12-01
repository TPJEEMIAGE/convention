<template>
  <div class="eleves">
    <div>
      <label>Eleve</label>
      <vue-infinite-autocomplete
        :data-source="elevesOptions"
        @select="handleSelectEleve"
      ></vue-infinite-autocomplete>
    </div>
    <div v-if="selectedEleve != null">
      <label>Période</label>
      <select v-model="selectedPeriodeId">
        <option
          v-for="periode in periodes"
          :key="periode.idPeriode"
          :value="periode.idPeriode"
        >
          {{ periode.dateDebut }} - {{ periode.dateFin }}
        </option>
      </select>
    </div>
    <div v-if="selectedEleve != null">
      <label>Entreprise</label>
      <vue-infinite-autocomplete
        :data-source="entrepriseOptions"
        @select="handleSelectEntre"
      ></vue-infinite-autocomplete>
      <div>
        <span>Vous ne trouvez pas votre entreprise ?</span
        ><input type="button" value="Ajouter" />
      </div>
    </div>
    <div v-if="selectedEntreprise != null">
      <label>Responsable</label>
      <vue-infinite-autocomplete
        :data-source="responsableOptions"
        @select="handleSelectResp"
      ></vue-infinite-autocomplete>
      <div>
        <span>Vous ne trouvez pas le responsable ?</span
        ><input type="button" value="Ajouter" />
      </div>
    </div>
    <div v-if="selectedResponsable != null">
      <input type="button" value="Créer" @click="createStage()" />
    </div>
  </div>
</template>

<script>
import VueInfiniteAutocomplete from "vue-infinite-autocomplete";
import axios from "axios";

export default {
  name: "Eleves",
  data() {
    return {
      eleveId: null,
      elevesOptions: null,
      elevesData: null,
      selectedEleve: null,
      entrepriseData: null,
      selectedEntreprise: null,
      entrepriseOptions: null,
      entrepriseId: null,
      responsableData: null,
      responsableId: null,
      selectedResponsable: null,
      responsableOptions: null,
      selectedPeriode: null,
      selectedPeriodeId: null,
      periodes: null,
    };
  },
  components: {
    "vue-infinite-autocomplete": VueInfiniteAutocomplete,
  },
  methods: {
    handleSelectEleve(selectedValue) {
      console.log("selected Eleve: ", selectedValue);
      this.eleveId = selectedValue.id;
    },
    handleSelectEntre(selectedValue) {
      console.log("selected Entreprise: ", selectedValue);
      this.entrepriseId = selectedValue.id;
    },
    handleSelectLieu(selectedValue) {
      console.log("selected Lieu: ", selectedValue);
      this.lieuId = selectedValue.id;
    },
    handleSelectResp(selectedValue) {
      console.log("selected Resp: ", selectedValue);
      this.responsableId = selectedValue.id;
    },
    createStage() {
      let stage = {
        typeStage: "En entreprise",
        dateDebutEffective: this.selectedPeriode.dateDebut,
        dateFinEffective: this.selectedPeriode.dateFin,
        convEleve: 1,
        convEntre: 0,
        description: "",
        codeSection: this.selectedEleve.codeSection,
        annee: "2021-2022",
        idEleve: this.selectedEleve.idEleve,
        idEntreprise: this.selectedEntreprise.idEntreprise,
        idPeriode: this.selectedPeriodeId,
        idResponsable: this.selectedResponsable.idResponsable,
      };
      console.log(stage);
      axios
        .post("http://localhost/convention/createStage.php", stage)
        .then((response) => {
          console.log(response);
        });
    },
  },
  mounted() {
    console.log("launch");
    axios
      .get("http://localhost/convention/getElevesList.php")
      .then((response) => {
        this.elevesData = response.data;
        this.elevesOptions = [];
        this.elevesData.forEach((element) => {
          let option = {
            text: element.nom + " " + element.prenom,
            id: element.idEleve,
          };
          this.elevesOptions.push(option);
        });
      })
      .catch(function (response) {
        console.log("FAILURE!!");
        console.log(response);
      });
  },
  watch: {
    eleveId: function () {
      this.elevesData.forEach((element) => {
        if (element.idEleve == this.eleveId) {
          this.selectedEleve = element;
        }
      });
      axios
        .get("http://localhost/convention/getPeriodes.php", {
          params: {
            codeSection: this.selectedEleve.codeSection,
          },
        })
        .then((response) => {
          console.log(response);
          this.periodes = response.data;
        })
        .catch(function (response) {
          console.log("FAILURE!!");
          console.log(response);
        });
      axios
        .get("http://localhost/convention/getEntrepriseList.php")
        .then((response) => {
          this.entrepriseData = response.data;
          this.entrepriseOptions = [];
          this.entrepriseData.forEach((element) => {
            let option = {
              text:
                element.raisonSociale +
                " - " +
                element.adresse +
                " " +
                element.adresse2,
              id: element.idEntreprise,
            };
            this.entrepriseOptions.push(option);
          });
        })
        .catch(function (response) {
          console.log("FAILURE!!");
          console.log(response);
        });
    },
    entrepriseId: function () {
      this.entrepriseData.forEach((element) => {
        if (element.idEntreprise == this.entrepriseId) {
          this.selectedEntreprise = element;
        }
      });
      axios
        .get("http://localhost/convention/getRespList.php", {
          params: {
            idEntre: this.selectedEntreprise.idEntreprise,
          },
        })
        .then((response) => {
          this.responsableData = response.data;
          this.responsableOptions = [];
          this.responsableData.forEach((element) => {
            let option = {
              text: element.civilite + " " + element.nom + " " + element.prenom,
              id: element.idResponsable,
            };
            this.responsableOptions.push(option);
          });
        })
        .catch(function (response) {
          console.log("FAILURE!!");
          console.log(response);
        });
    },
    responsableId: function () {
      this.responsableData.forEach((element) => {
        if (element.idResponsable == this.responsableId) {
          this.selectedResponsable = element;
        }
      });
    },
    selectedPeriodeId: function () {
      this.periodes.forEach((element) => {
        if (element.idPeriode == this.selectedPeriodeId) {
          this.selectedPeriode = element;
        }
      });
    },
  },
};
</script>

<style scoped>
div {
  margin: 20px 10%;
}
</style>