<template>
  <div id="app">
    <h1 class="title">カレンダー</h1>
    <section class="block">
      <h2 class="sub_title">
        まずは、ハードコードで1日〜31日までをv-forで表示させてみる
      </h2>
      <ol class="list">
        <li class="detail" v-for="day in 31" :key="day">
          {{ day }}日{{ applyDayOfWeek(day) }}曜日
        </li>
      </ol>
    </section>
    <section class="block">
      <h2 class="sub_title">
        date-fnsを使って当月の1日〜最終日までをv-forで表示させる
      </h2>
      <div class="wrap_button">
        <button class="button" @click="prevMonth">前月</button>
        <button class="button" @click="currentMonth">当月</button>
        <button class="button" @click="nextMonth">翌月</button>
      </div>
      <div class="wrap_input">
        <dl class="input_col">
          <dt class="input_title">テキスト</dt>
          <dd><InputText v-model="textValue" /></dd>
        </dl>
        <dl class="input_col">
          <dt class="input_title">日付</dt>
          <dd><InputDate v-model="dateValue" /></dd>
        </dl>
        <dl class="input_col">
          <dt class="input_title">時間</dt>
          <dd><InputTime v-model="dateTime" /></dd>
        </dl>
      </div>
      <ol class="list">
        <li class="detail" v-for="(day, index) in instanceMonth" :key="index">
          {{ formatDate(day) }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
} from "date-fns";
import { ja } from "date-fns/locale";
import InputText from "./components/atoms/InputText.vue";
import InputDate from "./components/atoms/InputDate.vue";
import InputTime from "./components/atoms/InputTime.vue";

export default {
  name: "App",
  components: { InputText, InputDate, InputTime },
  data() {
    return {
      active: new Date(),
      textValue: "",
      dateValue: "",
      timeValue: "",
    };
  },
  computed: {
    instanceMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.active),
        end: endOfMonth(this.active),
      });
      return dates;
    },
  },
  methods: {
    applyDayOfWeek(day) {
      const dayOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
      return dayOfWeek[(day - 1) % 7];
    },
    formatDate(date) {
      return format(date, "yyyy年MMMMdo（EEEE）", { locale: ja });
    },
    prevMonth() {
      this.active = subMonths(this.active, +1);
    },
    nextMonth() {
      this.active = subMonths(this.active, -1);
    },
    currentMonth() {
      this.active = new Date();
    },
  },
};
</script>

<style scoped>
#app {
  margin: 30px;
}
.title {
  font-size: 50px;
  font-weight: bold;
}
.sub_title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.block {
  margin: 30px 0;
}
.list .detail {
  margin-bottom: 8px;
}
.wrap_button {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.button {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(240, 240, 240);
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid black;
}
.wrap_input {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
}
.input_col {
  display: flex;
  align-items: center;
}
.input_title:after {
  content: "：";
}
</style>
