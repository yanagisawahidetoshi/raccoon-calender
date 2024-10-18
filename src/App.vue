<template>
  <div id="app">
    <h1>カレンダー</h1>
    <section>
      <h2>来月、翌月ボタン追加</h2>
      <ul class="btnArea mb10">
        <li><button class="btn" @click="prevMonth">前月</button></li>
        <li><button class="btn" @click="currentMonth">当月</button></li>
        <li><button class="btn" @click="nextMonth">翌月</button></li>
      </ul>
      <ol>
        <li v-for="(date, index) in generateDate()" :key="index">
          {{ formatDate(date) }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import ja from "date-fns/locale/ja";
export default {
  name: "App",
  data() {
    return {
      currentDay: new Date(),
    };
  },
  mounted() {
    this.generateDate();
  },
  methods: {
    formatDate(date) {
      return format(date, "yyyy年M月d日（E）", { locale: ja });
    },
    generateDate() {
      const start = startOfMonth(this.currentDay);
      const end = endOfMonth(this.currentDay);
      return eachDayOfInterval({ start, end });
    },
    prevMonth() {
      this.currentDay = subMonths(this.currentDay, 1);
    },
    nextMonth() {
      this.currentDay = addMonths(this.currentDay, 1);
    },
    currentMonth() {
      this.currentDay = new Date();
    },
  },
};
</script>
<style scoped>
.mb10 {
  margin-bottom: 10px;
}
.btnArea {
  display: flex;
  gap: 10px;
}
.btn {
  padding: 0.5em;
  background-color: #ddd;
  border-radius: 3px;
}
</style>
