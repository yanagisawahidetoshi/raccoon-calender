<template>
  <div id="app">
    <section>
      <h1>ハードコードで1日〜31日までをv-forで表示させてみる</h1>
      <ol>
        <li v-for="m in 31" :key="m">{{ m }}日</li>
      </ol>
    </section>
    <section>
      <h1>date-fnsを使って当月の1日〜最終日までをv-forで表示させる</h1>
      <ol>
        <li v-for="(date, index) in calendar" :key="index">{{ date }}</li>
      </ol>
    </section>
  </div>
</template>

<script>
import { lastDayOfMonth, format } from "date-fns";
import { ja } from "date-fns/locale";

// date-fnsを使って当月の1日〜最終日までをv-forで表示させる
// リストは日付 + 曜日にする
// リスtーの頭に何月かを表示させる。日本語形式で
// 1行1日のリスト形式で大丈夫です。
// console.log(format(new Date(), "yyyy年MM月dd日（E）", { locale: ja }));

// 今月を取得し、今月の最終日を取得する
const [year, month] = format(new Date(), "yyyy M", {
  locale: ja,
}).split(" ");
const lastDate = format(lastDayOfMonth(new Date()), "dd", { locale: ja });

export default {
  name: "App",
  computed: {
    calendar() {
      const calendar = [];
      for (let i = 1; i <= lastDate; i++) {
        const current = format(new Date(year, month - 1, i), "MM月dd日(E)", {
          locale: ja,
        });
        calendar.push(current);
      }
      return calendar;
    },
  },
};
</script>
<style scoped>
li {
  list-style-type: none;
}
</style>
