<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @addSchedule="addSchedule"
    />
    <section class="block">
      <ol class="list">
        <li class="detail" v-for="(date, index) in currentMonth" :key="index">
          <CalenderDate
            :date="date"
            :schedules="filterSchedules(date)"
            @toggleModalEditSchedule="toggleModalEditSchedule"
          />
        </li>
      </ol>
    </section>
    <ModalSchedule
      @toggleModalSchedule="toggleModalEditSchedule"
      @newSchedule="updateSchedule"
      :schedule="schedules[scheduleId]"
      :isModalOpen="isScheduleEditModalOpen"
      :modalName="'modalEditSchedule'"
      :modalTitle="'予定の登録'"
      :modalBtnName="'登録'"
    />
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
  parse,
  isSameDay,
} from "./libs/date-util";
import CalenderHeader from "./components/molecules/Calender/Header.vue";
import CalenderDate from "./components/molecules/Calender/Date.vue";
import ModalSchedule from "./components/molecules/Calender/ModalSchedule.vue";

export default {
  name: "App",
  components: { CalenderHeader, CalenderDate, ModalSchedule },
  data() {
    return {
      currentDate: new Date(),
      schedules: [], //初期値は空。dateValue,startTimeValue,endTimeValue,id
      isScheduleEditModalOpen: false,
      scheduleId: Number,
    };
  },
  computed: {
    currentMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.currentDate),
        end: endOfMonth(this.currentDate),
      });
      return dates;
    },
  },
  watch: {
    currentDate: function (newcurrentDate) {
      const url = new URL(window.location.href);
      url.searchParams.set("year", format(newcurrentDate, "yyyy"));
      url.searchParams.set("month", format(newcurrentDate, "MM"));
      window.history.pushState({}, "", url);
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const year = params.get("year");
    const month = params.get("month");
    if (year && month) {
      this.currentDate = parse(`${year}-${month}`, "yyyy-MM", new Date());
    }
    // //URLが/年/月/の場合に正規表現を使って年月を取得する
    // const url = location.href;
    // const date = url.match(
    //   /^https?:\/\/[^/]+\/([0-9]{4})\/(0[1-9]|1[0-2]|[1-9])\/?$/
    // ); //[^/]+スラッシュまで繰り返す・()で配列に格納
    // if (date) {
    //   this.currentDate = parse(`${date[1]}-${date[2]}`, "yyyy-MM", new Date());
    // }
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    changeCurrentMonth() {
      this.currentDate = new Date();
    },
    changeDate(num) {
      this.currentDate = addMonths(this.currentDate, num);
    },
    addSchedule(data) {
      if (this.schedules.length === 0) {
        // schedulesの初期値がnullの時はidを持っていないため、何もせず配列追加をする
        this.schedules.push(data);
      } else {
        data.id = this.schedules[this.schedules.length - 1].id + 1;
        this.schedules.push(data);
      }
    },
    filterSchedules(date) {
      const schedules = this.schedules.filter((v) => {
        return isSameDay(date, v.dateValue);
      });
      return schedules;
    },
    updateSchedule(updateSchedule) {
      this.schedules = this.schedules.map((v) => {
        if (v.id === updateSchedule.id) {
          return { ...v, ...updateSchedule };
        }
        return v;
      });
    },
    toggleModalEditSchedule(val, id) {
      this.isScheduleEditModalOpen = val;
      this.scheduleId = id;
    },
  },
};
</script>

<style scoped>
#app {
  margin: 30px;
}
.block {
  margin: 30px 0;
}
.list .detail {
  margin-bottom: 8px;
}
</style>
