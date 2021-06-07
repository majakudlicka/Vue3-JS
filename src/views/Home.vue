<template>
  <div id="app">
    <Suspense>
      <template #default>
        <MailScreen />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MailScreen from "../components/MailScreen.vue";

export default defineComponent({
  name: "Home",
  components: {
    MailScreen,
  },
});
</script>
