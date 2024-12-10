<template>
  <div>
    <ol class="day-Week">
      <li v-for="(day, index) in daysOfWeek" :key="index">
        {{ day }}
      </li>
    </ol>
    <ol class="date-list">
      <li v-for="(n, index) in calendar" :key="index">
        <DateField
          :date="n.date"
          :day="n.day"
          :scheduleDate="getSchedule(n.date)"
          @editModalOpen="editModalOpen"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import DateField from "./DateField";

export default {
  name: "CalenderFild",
  components: {
    DateField,
  },
  props: {
    daysOfWeek: {
      type: Array,
      required: true,
    },
    calendar: {
      type: Array,
      required: true,
    },
    schedules: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getSchedule(date) {
      const scheduleDate = this.schedules.filter((item) => item.date === date);
      return scheduleDate ? scheduleDate : null;
    },
    editModalOpen(scheduleIndex) {
      this.$emit("editModalOpen", scheduleIndex);
    },
  },
};
</script>
