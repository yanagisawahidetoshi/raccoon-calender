<template>
  <input type="date" :value="value" @input="upDateDate($event)" />
</template>

<script>
export default {
  name: "InputDate",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    upDateDate(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
input {
  border: 1px solid #999;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
}
</style>
