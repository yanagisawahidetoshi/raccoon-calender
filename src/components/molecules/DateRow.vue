<template>
  <div>
    <p>{{ format(date, "dd EE") }}</p>
    <div v-for="schedule in schedules" :key="schedule.id">
      <p>
        {{ schedule.startTime }}～{{ schedule.endTime
        }}<span>{{ schedule.content }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { format } from "../../libs/date-util.js";
export default {
  name: "DateRow",
  components: {},
  props: {
    date: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  computed: {
    format(date, pattern) {
      console.log(date);
      new Date(date);
      console.log(date);
      return format(date, pattern);
    },
  },
};
</script>
