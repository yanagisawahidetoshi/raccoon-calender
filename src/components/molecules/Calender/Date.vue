<template>
  <div class="wrap_date">
    <div>{{ formatDate(date, "do（E）") }}</div>
    <template v-for="(schedule, index) in schedules">
      <div :key="index" class="schedule">
        <div class="time">
          {{ schedule.startTimeValue }} ～ {{ schedule.endTimeValue }}
        </div>
        <div>{{ schedule.toDo }}</div>
        <BaseButton @click="$emit('toggleModalEditSchedule', true, schedule.id)"
          >編集</BaseButton
        >
      </div>
    </template>
  </div>
</template>

<script>
import { format } from "../../../libs/date-util";
import BaseButton from "@/components/atoms/BaseButton.vue";
export default {
  name: "CalenderDate",
  components: { BaseButton },
  props: {
    date: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    completeEdit(startTimeValue, endTimeValue, id) {
      this.$emit("updateSchedule", {
        dateValue: this.date,
        startTimeValue: startTimeValue,
        endTimeValue: endTimeValue,
        id: id,
      });
    },
  },
};
</script>
<style scoped>
.wrap_date {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.time {
  margin-right: 5px;
}
.edit {
  display: flex;
  gap: 8px;
}
.schedule {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
}
.schedule:before {
  content: "・";
}
</style>
