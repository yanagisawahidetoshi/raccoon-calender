<template>
  <div>
    <p>{{ formatDate(date) }}</p>
    <p v-for="schedule in schedules" :key="schedule.id">
      <button type="button" @click="openScheduleModal(schedule)">
        {{ schedule.content }} ({{ schedule.startTime }} -
        {{ schedule.endTime }})
      </button>
      <button type="button" @click="$emit('onClickDeleteButton', schedule.id)">
        削除
      </button>
    </p>
    <ScheduleModal
      v-if="isModalOpen"
      :isModalOpen="isModalOpen"
      :defaultSchedule="defaultSchedule"
      modalName="editModal"
      @close="closeScheduleModal"
      @onSubmit="$emit('onSubmit', $event)"
    />
  </div>
</template>
<script>
import { format } from "../libs/date-fns";
import ScheduleModal from "../components/ScheduleModal.vue";
export default {
  name: "DateRow",
  components: { ScheduleModal },
  props: {
    date: { type: Date },
    schedules: {
      type: Array,
    },
  },

  data() {
    return {
      isModalOpen: false,
      defaultSchedule: "",
    };
  },
  methods: {
    formatDate(date) {
      return format(date, "MM月dd日");
    },
    openScheduleModal(schedule) {
      this.defaultSchedule = JSON.parse(JSON.stringify(schedule));
      this.isModalOpen = true;
    },
    closeScheduleModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
