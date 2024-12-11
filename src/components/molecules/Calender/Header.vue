<template>
  <header class="common_header">
    <div class="wrap_button">
      <BaseButton @click="changeDate(-1)">前月</BaseButton>
      <BaseButton @click="changeCurrentMonth()">当月</BaseButton>
      <BaseButton @click="changeDate(1)">翌月</BaseButton>
      <BaseButton @click="toggleModalRegistSchedule(true)">登録</BaseButton>
      {{ formatDate(currentDate, "yyyy年MMMM") }}
    </div>
    <ModalSchedule
      @newSchedule="addSchedule"
      @toggleModalSchedule="toggleModalRegistSchedule"
      :isModalOpen="isScheduleRegistModalOpen"
      :modalName="'modalRegistSchedule'"
      :modalTitle="'予定の登録'"
      :modalBtnName="'登録'"
    />
  </header>
</template>

<script>
import BaseButton from "@/components/atoms/BaseButton.vue";
import ModalSchedule from "./ModalSchedule.vue";
import { format } from "../../../libs/date-util";
export default {
  name: "CalenderHeader",
  components: { BaseButton, ModalSchedule },
  data() {
    return {
      isScheduleRegistModalOpen: false,
    };
  },
  props: {
    changeDate: Function,
    changeCurrentMonth: Function,
    currentDate: {
      type: Date,
    },
  },
  methods: {
    addSchedule(data) {
      this.$emit("addSchedule", data);
    },
    formatDate(data, f) {
      return format(data, f);
    },
    toggleModalRegistSchedule(val) {
      this.isScheduleRegistModalOpen = val;
    },
  },
};
</script>

<style scoped>
.common_header {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
}
.wrap_button {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
</style>
