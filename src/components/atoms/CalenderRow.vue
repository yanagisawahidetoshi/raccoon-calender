<template>
  <div class="row">
    <p>{{ formatDate(date, "d") }}</p>
    <p class="day">{{ formatDate(date, "E") }}</p>
    <div v-for="(schedule, index) in schedules" :key="index">
      <button
        type="button"
        class="calender-button"
        @click="openEditModal(schedule)"
      >
        <div>
          ID:{{ schedule.id }}<br />
          {{ schedule.startTime }}～{{ schedule.finishTime }}
          {{ schedule.content }}
        </div>
      </button>
    </div>
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
    openEditModal(schedule) {
      this.$emit("onEditingSchedule", schedule);
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
