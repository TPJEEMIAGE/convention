<template>
  <div class="profs">
    <div>
      <label>Section : </label>
      <select v-model="selectedSection">
        <option
          v-for="section in listSection"
          :key="section.codeSection"
          :value="section.codeSection"
        >
          {{ section.codeSection }}
        </option>
      </select>
    </div>
    <div v-if="selectedSection != null">
      <label>Référent : </label>
      <select v-model="selectedProf">
        <option
          v-for="refs in listRefs"
          :key="refs.idProfesseur"
          :value="refs.idProfesseur"
        >
          {{ refs.nom }} {{ refs.prenom }}
        </option>
      </select>
    </div>
    <div v-if="selectedProf != null">
      <label>Elève : </label>
      <select v-model="selectedStageId">
        <option
          v-for="stage in stageList"
          :key="stage.idStage"
          :value="stage.idStage"
        >
          {{ stage.nomEleve }} {{ stage.prenomEleve }}
        </option>
      </select>
    </div>
    <div v-if="selectedStage != null">
      <Stage
        :stage-data="selectedStage"
        :validated="validatedStage"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stage from "@/components/Stage.vue";

export default {
  name: "Profs",
  components: {
    Stage,
  },
  data() {
    return {
      selectedSection: null,
      selectedProf: null,
      listRefs: [],
      listSection: [],
      stageList: null,
      selectedStageId: null,
      selectedStage: null,
      validatedStage: null,
    };
  },
  watch: {
    selectedSection: function () {
      this.selectedProf = null;
      this.selectedStage = null;
      this.selectedStageId = null;
      axios
        .get("http://localhost/convention/getRefList.php", {
          params: { secId: this.selectedSection },
        })
        .then((response) => {
          this.listRefs = response.data;
        })
        .catch(function (response) {
          console.log("FAILURE!!");
          console.log(response);
        });
    },
    selectedProf: function () {
      this.selectedStageId = null;
      this.selectedStage = null;
      axios
        .get("http://localhost/convention/getStageList.php", {
          params: { secId: this.selectedSection, profId: this.selectedProf },
        })
        .then((response) => {
          this.stageList = response.data;
        })
        .catch(function (response) {
          console.log("FAILURE!!");
          console.log(response);
        });
    },
    selectedStageId: function () {
      this.stageList.forEach((element) => {
        if (element.idStage == this.selectedStageId) {
          this.selectedStage = element;
          console.log(element);
        }
      });
      if (this.selectedStage.dateValidation) {
        this.validatedStage = true;
      } else {
        this.validatedStage = false;
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost/convention/getSectionList.php")
      .then((response) => {
        this.listSection = response.data;
      })
      .catch(function (response) {
        console.log("FAILURE!!");
        console.log(response);
      });
  },
};
</script>
<style scoped>
div {
  margin-top: 20px;
}
label {
  margin-right: 10px;
}
</style>