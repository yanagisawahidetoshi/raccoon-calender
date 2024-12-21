<template>
  <div>
    <ol class="calendar-list">
      <li v-for="(date, index) in calendar" :key="index" class="calendar-item">
        <CalenderRow
          :date="date"
          :schedules="filterScheduleByDate(date)"
          @onEditingSchedule="openEditModal"
        />
      </li>
    </ol>
    <ScheduleRegisterModal
      :editingSchedule="editingSchedule"
      :isModalOpen="isModalOpen"
      @registeredSchedule="upDateSchedules"
      @clickCloseButton="closeModal"
      modalName="modal-edit-schedule"
      button2Name="編集"
    />
  </div>
</template>
<script>
import CalenderRow from "@/components/atoms/CalenderRow";
import { format } from "../../libs/dateUtil.js";
import ScheduleRegisterModal from "@/components/morcules/ScheduleRegisterModal";

export default {
  name: "CalenderList",
  data() {
    return {
      isModalOpen: false,
      editingSchedule: {
        id: "",
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      },
    };
  },
  props: {
    calendar: {
      type: Array,
    },
    schedules: {
      type: Array,
    },
  },
  components: {
    CalenderRow,
    ScheduleRegisterModal,
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    filterScheduleByDate(date) {
      const target = this.formatDate(date, "yyyy-MM-dd");
      return this.schedules.filter((schedule) => {
        return target === schedule.date;
      });
    },
    openEditModal(editingSchedule) {
      this.editingSchedule = editingSchedule;
      this.isModalOpen = true;
    },
    upDateSchedules(newSchedule) {
      const newSchedules = this.schedules.map((schedule) => {
        return schedule.id === this.editingSchedule.id
          ? { ...newSchedule, id: schedule.id }
          : { ...schedule };
      });
      this.$emit("onUpdate", newSchedules);
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
<style>
.calendar-list {
  padding-left: 0;
}
.calendar-item {
  border-bottom: 1px solid #dadce0;
  padding: 16px;
}
</style>
