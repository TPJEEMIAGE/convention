<template>
  <div class="administration">
    <nav>
      <router-link to="/fileimporter">
        Importer fichiers
      </router-link>
      <br>
      <router-link to="/exportstage">
        Exporter Stage
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Administration",
};
</script>