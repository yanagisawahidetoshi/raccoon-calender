<template>
  <p class="date-block">
    <span class="date">{{ formatDate }}</span>
    <span v-for="(n, index) in scheduleDate" :key="index" class="schedule">
      <button tagName="a" className="regist" @click="editModalOpen(n.id)">
        {{ n.schedule }} ({{ n.startTime }}-{{ n.endTime }})
      </button>
    </span>
  </p>
</template>

<script>
import { format } from "../libs/date-utility";
export default {
  name: "DateField",
  props: {
    date: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    scheduleDate: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formatDate() {
      const viewDate = format(this.date, "d");
      return viewDate;
    },
  },
  methods: {
    editModalOpen(scheduleId) {
      this.$emit("editModalOpen", scheduleId);
    },
  },
};
</script>
<style>
.date-block {
  padding: 6px;
}
.date {
  display: block;
  margin: 0 0 12px;
}
.day {
  font-size: 12px;
}
.schedule {
  display: block;
  font-size: 12px;
  background: #66cdaa;
  border-radius: 8px;
  padding: 2px 6px;
  text-align: center;
}
.edit {
  vertical-align: -4px;
  margin: 0 6px;
  cursor: pointer;
}
</style>
