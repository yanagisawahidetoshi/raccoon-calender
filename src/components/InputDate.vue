<template>
  <input
    type="date"
    :value="value"
    class="inputDate"
    @input="validate($event.target.value)"
  />
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
    validate(inputValue) {
      const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      if (datePattern.test(inputValue)) {
        this.$emit("input", inputValue);
      } else {
        console.log('日付フォーマットが違います。YYYY-MM-DD"');
      }
    },
  },
};
</script>
<style>
.inputDate {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
