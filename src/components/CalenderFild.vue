<template>
  <div>
    <ol class="day-Week">
      <li v-for="(day, index) in daysOfWeek" :key="index">
        {{ day }}
      </li>
    </ol>
    <ol class="date-list">
      <li v-for="(n, index) in calendar" :key="index">
        <DateField
          :date="n.date"
          :day="n.day"
          :scheduleDate="getSchedule(n.date)"
          @editModalOpen="editModalOpen"
        />
      </li>
    </ol>
    {{ /* 新規の場合、編集IDはあり得ない数字にする */ }}
    <ScheduleRegistModal
      v-show="isModalOpen"
      :isModalOpen="isModalOpen"
      :targetSchedule="targetSchedule"
      @modalClose="modalClose"
      @onSubmit="updatedSchedule($event)"
    />
  </div>
</template>

<script>
import DateField from "./DateField";
import ScheduleRegistModal from "./ScheduleRegistModal";
export default {
  name: "CalenderFild",
  components: {
    DateField,
    ScheduleRegistModal,
  },
  props: {
    daysOfWeek: {
      type: Array,
      required: true,
    },
    calendar: {
      type: Array,
      required: true,
    },
    schedules: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
      isEditType: false,
      targetSchedule: null,
      scheduleId: "",
    };
  },
  methods: {
    getSchedule(date) {
      const scheduleDate = this.schedules.filter((item) => item.date === date);
      return scheduleDate ? scheduleDate : null;
    },
    editModalOpen(scheduleId) {
      this.targetScheduleId = scheduleId;
      this.targetSchedule = this.schedules.find(
        (schedule) => schedule.id === scheduleId
      );
      this.isModalOpen = true;
    },
    modalClose() {
      this.isModalOpen = false;
      this.targetSchedule = null;
      this.targetScheduleId = "";
    },
    updatedSchedule(scheduleData) {
      this.$emit("updatedSchedule", scheduleData);
      this.modalClose();
    },
  },
};
</script>
