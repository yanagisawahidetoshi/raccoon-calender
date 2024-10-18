<template>
  <input type="text" :value="value" @input="upDateText($event)" />
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    upDateText(event) {
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
