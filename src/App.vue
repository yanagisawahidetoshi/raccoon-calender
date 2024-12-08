<template>
  <div id="app">
    <CalenderHeader
      @changeMonth="changeMonth"
      :date="currentDate"
      @registeredSchedule="registeredSchedules"
    />
    <ol class="calendar-list">
      <li v-for="(date, index) in calendar" :key="index" class="calendar-item">
        <CalenderRow :date="date" :schedules="filterScheduleByDate(date)" />
      </li>
    </ol>
  </div>
</template>

<script>
import {
  lastDayOfMonth,
  startOfMonth,
  addMonths,
  format,
  eachDayOfInterval,
  parse,
} from "./libs/dateUtil.js";

import CalenderRow from "@/components/atoms/CalenderRow";
import CalenderHeader from "@/components/morcules/CalenderHeader";

export default {
  name: "App",
  data() {
    return {
      currentDate: null,
      schedules: [],
    };
  },
  components: {
    CalenderRow,
    CalenderHeader,
  },
  computed: {
    calendar() {
      const start = startOfMonth(this.currentDate);
      const end = lastDayOfMonth(this.currentDate);
      return eachDayOfInterval(start, end);
    },
    getCurrentUrl() {
      return new URL(window.location);
    },
  },
  methods: {
    filterScheduleByDate(date) {
      const target = this.formatDate(date, "yyyy-MM-dd");
      return this.schedules.filter((schedule) => {
        return target === schedule.date;
      });
    },
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(number) {
      this.currentDate = addMonths(this.currentDate, number);
    },
    currentMonth() {
      this.currentDate = new Date();
    },
    getSearchParam(url, param) {
      return url.searchParams.get(param);
    },
    registeredSchedules(newSchedule) {
      this.schedules = [...this.schedules, newSchedule];
    },
  },
  mounted() {
    const url = location.href;
    const regexp =
      /https?:\/\/.*\/\?year=([1-2][0-9]{3})&month=(0?[1-9]|1[0-2])$\/?.*/;
    const result = url.match(regexp);

    if (result === null) {
      this.currentDate = new Date();
      return;
    }
    this.currentDate = 
      parse(`${result[1]}-${result[2]}`, "yyyy-MM", new Date())
    ;
  },
  watch: {
    currentDate(newCurrentDate) {
      const url = this.getCurrentUrl;
      url.searchParams.set("year", this.formatDate(newCurrentDate, "yyyy"));
      url.searchParams.set("month", this.formatDate(newCurrentDate, "MM"));
      window.history.pushState({}, "", url);
    },
  },
};
</script>
<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

li {
  list-style-type: none;
}

.calendar-list {
  padding-left: 0;
}
.calendar-item {
  border-bottom: 1px solid #dadce0;
  padding: 16px;
}
</style>
