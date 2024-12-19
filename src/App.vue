<template>
  <div>
    <CalenderHeader
      :formatDate="formatDate"
      @changeMonth="changeMonth"
      @changeCurrentMonth="changeCurrentMonth"
      @registerSchedule="registerSchedule"
    />
    {{ /* 日付と曜日を出力 */ }}
    <CalenderFild
      :daysOfWeek="daysOfWeek"
      :calendar="calendar"
      :schedules="rgistedSchedule"
      @updatedSchedule="updatedSchedule($event)"
    />
  </div>
</template>

<script>
import {
  format,
  //dateInterval,
  addMonths,
  addDays,
  startOfMonth,
  endOfMonth,
  getDay,
  eachWeekOfInterval,
  eachDayOfInterval,
} from "./libs/date-utility";
import { getPathYearMonth } from "./libs/get-path-year-month.js";
import CalenderFild from "./components/CalenderFild";
import CalenderHeader from "./components/CalenderHeader";

export default {
  name: "App",
  components: {
    CalenderFild,
    CalenderHeader,
  },

  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      inputSchedule: "",
      inputDate: "",
      inputStartTime: "",
      inputEndTime: "",
      rgistedSchedule: [
        {
          id: 1,
          date: "2025-01-01",
          startTime: "00:00",
          endTime: "23:59",
          schedule: "元旦",
        },
      ],
    };
  },
  computed: {
    formatDate() {
      return format(this.currentDate, "yyyy年MM月");
    },
    calendar() {
      const startDate = startOfMonth(this.currentDate);
      const endDate = endOfMonth(this.currentDate);
      const dateWeek = eachWeekOfInterval(startDate, endDate);
      const endWeekDay = getDay(endDate); // 0-6
      // 曜日と月日を取得
      const monthDate = eachDayOfInterval(dateWeek[0], endDate).map((week) => ({
        date: format(week, "yyyy-MM-dd"),
        day: this.daysOfWeek[getDay(week)],
      }));
      // 月末の週で曜日欄が空欄の場合、次の月日で埋める
      let addedDateCount = 6 - endWeekDay;
      for (let i = 1; i <= addedDateCount; i++) {
        const addDate = addDays(endDate, i);
        monthDate.push({
          date: format(addDate, "yyyy-MM-dd"),
          day: this.daysOfWeek[getDay(addDate)],
        });
      }
      return monthDate;
    },
  },
  mounted() {
    const currentPath = window.location.pathname;
    this.currentDate = getPathYearMonth(currentPath, format);
  },
  methods: {
    changeMonth(addDate) {
      this.currentDate = addMonths(this.currentDate, addDate);
      this.urlParams();
    },
    changeCurrentMonth() {
      this.currentDate = new Date();
      this.urlParams();
    },
    urlParams() {
      const year = format(this.currentDate, "yyyy");
      const Month = format(this.currentDate, "MM");
      const newUrl = `${window.location.origin}/${year}/${Month}/`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    },
    registerSchedule(scheduleData) {
      // console.log(scheduleData);
      const scheduleid = (this.rgistedSchedule.at(-1)?.id ?? 0) + 1;
      this.rgistedSchedule.push({ ...scheduleData, id: scheduleid });
      // console.log(this.rgistedSchedule);
    },
    updatedSchedule(scheduleData) {
      // console.log("Updated Schedule:", scheduleData);
      // console.log(scheduleData.id);

      //let debug = false;
      this.rgistedSchedule = this.rgistedSchedule.map((schedule) => {
        if (schedule.id === scheduleData.id) {
          //debug = true;
          return { ...scheduleData };
        } else {
          return schedule;
        }
      });
      //console.log(debug);
      // if (!debug) {
      //   console.log("一致する情報がない");
      // }
      // console.log(JSON.stringify(this.rgistedSchedule, null, 2));
    },
  },
};
</script>
<style>
ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.day-Week,
.date-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.day-Week li,
.date-list li {
  border-bottom: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  padding: 12px 0;
  max-width: calc(100% / 7);
  width: 100%;
}
.btn {
  margin: 0 6px;
}
.input-wrap {
  margin: 6px 10px;
}
.inputDate,
.inputTime {
  border: none;
}
.inputText {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #cccccc;
  width: 100%;
  border-radius: inherit;
}
.inputText:focus {
  outline: none;
}
</style>
