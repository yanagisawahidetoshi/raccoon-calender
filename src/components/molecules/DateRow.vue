<template>
  <p>{{ formatDate }}</p>
</template>

<script>
import { format } from "../../libs/date-util.js";
export default {
  name: "DateRow",
  components: {},
  props: {
    date: {
      default: "",
    },
  },
  computed: {
    formatDate() {
      return format(this.date, "dd EE");
    },
  },
};
</script>
