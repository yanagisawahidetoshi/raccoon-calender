<template>
  <input
    type="time"
    :value="value"
    class="inputTime"
    @input="validate($event.target.value)"
  />
</template>

<script>
export default {
  name: "InputTime",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    validate(inputValue) {
      const datePattern = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
      if (datePattern.test(inputValue)) {
        this.$emit("input", inputValue);
      } else {
        console.log("時間フォーマットが違います。HH:mm");
      }
    },
  },
};
</script>
<style>
.inputTime {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
