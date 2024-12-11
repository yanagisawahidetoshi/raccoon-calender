<template>
  <div class="row">
    <p>{{ formatDate(date, "d") }}</p>
    <p class="day">{{ formatDate(date, "E") }}</p>
    <button
      v-for="(schedule, index) in schedules"
      :key="index"
      class="calender-button"
      @click="editSchedule(index)"
    >
      <div>
        {{ schedule.startTime }}～{{ schedule.finishTime }}
        {{ schedule.content }}
      </div>
    </button>
  </div>
</template>
<script>
import { format } from "../../libs/dateUtil.js";

export default {
  name: "CalenderRow",
  props: {
    date: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    editSchedule(index) {
      // 行からモーダルを開く時は必ず編集になるため、編集したい予定の番号を渡す
      this.$emit("editSchedule", index);
    },
  },
};
</script>
<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 5px;
}
.day {
  font-size: 0.8em;
}
.calender-button {
  margin-right: 10px;
}
</style>
