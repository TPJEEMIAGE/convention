<template>
  <div class="eleves">
    <div>
      <label>Eleve</label>
      <vue-infinite-autocomplete
        :data-source="elevesOptions"
        @select="handleSelectEleve"
      />
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
      <div v-if="!newEntreprise">
        <vue-infinite-autocomplete
          :data-source="entrepriseOptions"
          @select="handleSelectEntre"
        />
        <span>Vous ne trouvez pas votre entreprise ?</span><input
          type="button"
          value="Ajouter"
          @click="createEntreprise()"
        >
      </div>
      <div
        v-else
        class="formclass"
      >
        <div>
          <label>Raison Sociale</label>
          <input
            v-model="selectedEntreprise.rs"
            type="text"
          >
        </div>
        <div>
          <label>Activité</label>
          <input
            v-model="selectedEntreprise.activite"
            type="text"
          >
        </div>
        <div>
          <label>Siret du Siège</label>
          <input
            v-model="selectedEntreprise.siretSiege"
            type="text"
          >
        </div>
        <div>
          <label>Numéro de téléphone du Siège</label>
          <input
            v-model="selectedEntreprise.numTel"
            type="text"
          >
        </div>
        <div>
          <label>Numéro de fax du Siège</label>
          <input
            v-model="selectedEntreprise.numFax"
            type="text"
          >
        </div>
        <div>
          <label>Siret</label>
          <input
            v-model="selectedEntreprise.siret"
            type="text"
          >
        </div>
        <div>
          <label>Adresse</label>
          <input
            v-model="selectedEntreprise.adresse"
            type="text"
          >
          <input
            v-model="selectedEntreprise.adresse2"
            type="text"
          >
        </div>
        <div>
          <label>Ville</label>
          <input
            v-model="selectedEntreprise.ville"
            type="text"
          >
        </div>
        <div>
          <label>Pays</label>
          <input
            v-model="selectedEntreprise.pays"
            type="text"
          >
        </div>
        <div>
          <label>Numéro de téléphone</label>
          <input
            v-model="selectedEntreprise.numTelLieu"
            type="text"
          >
        </div>
        <div>
          <label>Numéro de fax</label>
          <input
            v-model="selectedEntreprise.numFaxLieu"
            type="text"
          >
        </div>
      </div>
    </div>
    <div v-if="selectedEntreprise != null">
      <label>Responsable</label>
      <div v-if="!newResponsable">
        <vue-infinite-autocomplete
          :data-source="responsableOptions"
          @select="handleSelectResp"
        />
        <span>Vous ne trouvez pas le responsable ?</span><input
          type="button"
          value="Ajouter"
          @click="createResponsable()"
        >
      </div>
      <div
        v-else
        class="formclass"
      >
        <div>
          <label>Civilité</label>
          <select
            v-model="selectedResponsable.civilite"
          >
            <option value="M.">
              M.
            </option>
            <option value="Mme.">
              Mme.
            </option>
          </select>
        </div>
        <div>
          <label>Nom</label>
          <input
            v-model="selectedResponsable.nom"
            type="text"
          >
        </div>
        <div>
          <label>Prenom</label>
          <input
            v-model="selectedResponsable.prenom"
            type="text"
          >
        </div>
        <div>
          <label>Fonction</label>
          <input
            v-model="selectedResponsable.fonction"
            type="text"
          >
        </div>
        <div>
          <label>Email</label>
          <input
            v-model="selectedResponsable.email"
            type="text"
          >
        </div>
        <div>
          <label>Téléphone fixe</label>
          <input
            v-model="selectedResponsable.telFixe"
            type="text"
          >
        </div>
        <div>
          <label>Téléphone portable</label>
          <input
            v-model="selectedResponsable.telPortable"
            type="text"
          >
        </div>
      </div>
    </div>
    <div v-if="selectedResponsable != null || newResponsable">
      <input
        type="button"
        value="Créer"
        @click="createStage()"
      >
    </div>
  </div>
</template>

<script>
import VueInfiniteAutocomplete from "vue-infinite-autocomplete";
import axios from "axios";

export default {
  name: "Eleves",
  components: {
    "vue-infinite-autocomplete": VueInfiniteAutocomplete,
  },
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
      newResponsable : false,
      newEntreprise : false
    };
  },
  watch: {
    eleveId: function () {
      this.elevesData.forEach((element) => {
        if (element.idEleve == this.eleveId) {
          this.selectedEleve = element;
        }
      });
      console.log(this.selectedEleve);
      axios
        .get(this.$wsServer + "getPeriodes.php", {
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
        .get(this.$wsServer + "getEntrepriseList.php")
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
        .get(this.$wsServer + "getRespList.php", {
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
  mounted() {
    console.log("launch");
    axios
      .get(this.$wsServer + "getElevesList.php")
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
  methods: {
    async doCreateEntreprise(){
      return await axios
        .post(this.$wsServer + "createEntreprise.php", this.selectedEntreprise)
        .then((response) => {
          console.log(response.data)
          this.selectedEntreprise = response.data[0]
        })
    },
    async doCreateResponsable(){
      this.selectedResponsable.idEntreprise = this.selectedEntreprise.idEntreprise
       return await axios
        .post(this.$wsServer + "createResponsable.php", this.selectedResponsable)
        .then((response) => {
          console.log(response)
          this.selectedResponsable = response.data
        })
    },
    doCreateStage(){
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
          .post(this.$wsServer + "createStage.php", stage)
          .then((response) => {
            console.log(response);
          })
    },
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
    async createStage() {
      if(this.newEntreprise){
        await this.doCreateEntreprise()
        await this.doCreateResponsable()
        this.doCreateStage()
      }
      else if(this.newResponsable){
        await this.doCreateResponsable()
        this.doCreateStage()
      }
      else{
        this.doCreateStage()
      }
    },
    createEntreprise(){
      this.newEntreprise = true
      this.selectedEntreprise = {
        rs: "",
        activite: "",
        siretSiege: "",
        numTel: "",
        numFax: "",
        siret: "",
        adresse: "",
        adresse2: "",
        ville: "",
        pays: "FRANCE",
        numTelLieu: "",
        numFaxLieu: ""
      }
      this.newResponsable = true
      this.selectedResponsable = {
        civilite: "",
        nom: "",
        prenom: "",
        fonction: "",
        email: "",
        telFixe: "",
        telPortable: "",
        idEntreprise: null
      }
    },
    createResponsable(){
      this.newResponsable = true
      this.selectedResponsable = {
        civilite: "",
        nom: "",
        prenom: "",
        fonction: "",
        email: "",
        telFixe: "",
        telPortable: "",
        adresse:"adresse",
        idEntreprise: this.selectedEntreprise.idEntreprise
      }
    }
  },
};
</script>

<style scoped>
div {
  margin: 20px 20px;
}
.formclass{
  width:100%;
  display: flex;
  flex-wrap: wrap;
}
.formclass div{
  width: 50%;
  margin: 0 0;
  padding:10px 10px
}
.formclass div label{
  display: block;
}
.formclass div input{
  width: 100%;
}
.formclass div select{
  width: 100%;
}
</style>