<template>
  <header class="common_header">
    <div class="wrap_button">
      <BaseButton @click="changeDate(-1)">前月</BaseButton>
      <BaseButton @click="changeCurrentMonth()">当月</BaseButton>
      <BaseButton @click="changeDate(1)">翌月</BaseButton>
      <BaseButton @click="openScheduleRegistModal">登録</BaseButton>
      <!--vue-modal-2はグローバルに提供されている-->
      {{ formatDate(currentDate, "yyyy年MMMM") }}
    </div>
    <ModalRegistScheduleVue
      @schedule="schedule"
      :isScheduleRegistModalOpen="isScheduleRegistModalOpen"
      @closeScheduleRegistModal="closeScheduleRegistModal"
    />
  </header>
</template>

<script>
import BaseButton from "@/components/atoms/BaseButton.vue";
import ModalRegistScheduleVue from "./ModalRegistSchedule.vue";
import { format } from "../../../libs/date-util";
export default {
  name: "CalenderHeader",
  components: { BaseButton, ModalRegistScheduleVue },
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
    schedule(data) {
      this.$emit("schedule", data);
    },
    formatDate(data, f) {
      return format(data, f);
    },
    openScheduleRegistModal() {
      this.isScheduleRegistModalOpen = true;
    },
    closeScheduleRegistModal() {
      this.isScheduleRegistModalOpen = false;
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
