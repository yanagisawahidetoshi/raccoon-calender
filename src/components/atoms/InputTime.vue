<template>
  <input type="time" :value="value" @input="upDateTime($event)" />
</template>

<script>
export default {
  name: "InputTime",
  props: {
    value: {
      type: String,
      default: "00:00",
    },
  },
  methods: {
    upDateTime(event) {
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
