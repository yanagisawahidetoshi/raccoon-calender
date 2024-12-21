<template>
  <div id="app">
    <CalenderHeader
      @changeMonth="changeMonth"
      :date="currentDate"
      @onAddSchedule="addNewSchedule"
    />
    <CalenderList
      :schedules="schedules"
      :calendar="calendar"
      @onUpdate="upDateSchedule"
    />
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

import CalenderHeader from "@/components/morcules/CalenderHeader";
import CalenderList from "@/components/morcules/CalenderList";

export default {
  name: "App",
  data() {
    return {
      currentDate: null,
      schedules: [],
    };
  },
  components: {
    CalenderHeader,
    CalenderList,
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
    addNewSchedule(newSchedule) {
      const id = this.schedules.length > 0 ? this.schedules.at(-1).id + 1 : 1;
      this.schedules = [...this.schedules, { ...newSchedule, id }];
    },
    upDateSchedule(newSchedule) {
      this.schedules = newSchedule;
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
    this.currentDate = parse(
      `${result[1]}-${result[2]}`,
      "yyyy-MM",
      new Date()
    );
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
