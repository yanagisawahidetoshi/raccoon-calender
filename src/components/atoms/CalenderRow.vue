<template>
  <div class="row">
    <p>{{ formatDate(date, "d") }}</p>
    <p class="day">{{ formatDate(date, "E") }}</p>
    <button
      v-for="(schedule, index) in schedules"
      :key="index"
      class="calender-button"
      @click="editSchedule(index)"
    >
      <div>
        {{ schedule.startTime }}～{{ schedule.finishTime }}
        {{ schedule.content }}
      </div>
    </button>
    <ScheduleRegisterModal
      @registeredSchedule="upDateSchedules"
      @clickCloseButton="closeModal"
      :isModalOpen="isModalOpen"
    />
  </div>
</template>
<script>
import { format } from "../../libs/dateUtil.js";
import ScheduleRegisterModal from "@/components/morcules/ScheduleRegisterModal";

export default {
  name: "CalenderRow",
  props: {
    date: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  data() {
    return {
      isModalOpen: false,
      editIndex: null,
      editingSchedule: {
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      },
    };
  },
  components: {
    ScheduleRegisterModal,
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    editSchedule(index) {
      this.isModalOpen = true;
      // 行からモーダルを開く時は必ず編集になるため、編集したい予定の番号を渡す
      // this.$emit("editSchedule", index);
      this.isModalOpen = true;
      this.editIndex = index;
      this.editingSchedule = this.schedules[index];
    },
    closeModal() {
      this.isModalOpen = false;
      this.editingSchedule = {
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      };
      this.editIndex = null;
    },
    upDateSchedules(newSchedule) {
      const newSchedules = this.schedules.map((schedule, index) => {
        return index === this.editIndex ? { ...newSchedule } : { ...schedule };
      });
      this.$emit("upDateSchedules", newSchedules);
      // this.schedules = newSchedules;
    },
  },
};
</script>
<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 5px;
}
.day {
  font-size: 0.8em;
}
.calender-button {
  margin-right: 10px;
}
</style>
