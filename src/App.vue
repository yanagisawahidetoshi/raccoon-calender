<template>
  <div id="app">
    <!-- <CalenderHeader
      :currentDate="currentDate"
      @changeMonth="changeMonth"
      @changeToCurrentMonth="changeToCurrentMonth"
      :inputDate="inputDate"
      :inputText="inputText"
      :inputTime="inputTime"
    /> -->
    <div>
      <button type="button" @click="changeMonth(-1)">前月</button>
      <button type="button" @click="changeToCurrentMonth">当月</button>
      <button type="button" @click="changeMonth(1)">翌月</button>
      <h1>{{ format(currentDate, "yyyy/MM") }}</h1>
      <button type="submit" @click="openModal('registNewSchedule-modal')">
        登録
      </button>
      <vue-modal-2
        name="registNewSchedule-modal"
        @on-close="closeModal('registNewSchedule-modal')"
        :headerOptions="{ title: '予定を登録' }"
        :footerOptions="{
          btn1: 'キャンセル',
          btn2: '登録',
          btn2Style: {
            backgroundColor: 'blue',
          },
          btn1OnClick: () => {
            closeModal('registNewSchedule-modal');
          },
          btn2OnClick: () => {
            regist();
          },
        }"
      >
        <InputDate v-model="inputDate" />
        <InputTime v-model="inputTime" />
        <InputText v-model="inputText" />
      </vue-modal-2>
    </div>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <DateRow :date="date" />
      </li>
    </ol>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
} from "./libs/date-util.js";
import DateRow from "./components/atoms/DateRow";
import InputDate from "./components/atoms/InputDate";
import InputText from "./components/atoms/InputText";
import InputTime from "./components/atoms/InputTime";

export default {
  name: "App",
  components: {
    DateRow,
    InputDate,
    InputText,
    InputTime,
  },
  data() {
    return {
      currentDate: new Date(),
      inputDate: "2024-10-28",
      inputText: "aaa",
      inputTime: "10:12",
    };
  },
  mounted() {
    const currentURL = window.location.href;
    const match = currentURL.match(
      /^https?:\/\/.*\/([0-9]{4})\/(0[1-9]|1[0-2])\/?.*$/
    );
    if (match) {
      const yearFromURL = match[1];
      const monthFromURL = match[2].padStart(2, 0);
      this.currentDate = new Date(yearFromURL + "-" + monthFromURL + "-01");
    }
  },
  computed: {
    dates() {
      const start = startOfMonth(this.currentDate);
      const end = lastDayOfMonth(this.currentDate);
      return eachDayOfInterval({ start, end });
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(num) {
      this.currentDate = addMonths(this.currentDate, num);
      window.history.pushState(
        {},
        "",
        this.format(this.currentDate, "/yyyy/MM/")
      );
    },
    changeToCurrentMonth() {
      this.currentDate = new Date();
    },
    openModal(name) {
      this.$vm2.open(name);
    },
    closeModal(name) {
      this.$vm2.close(name);
    },
    regist() {},
  },
};
</script>
