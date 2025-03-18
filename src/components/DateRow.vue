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

import ScheduleModal from "../components/ScheduleModal.vue";
import { useDateRow } from "./CalenderHeader/hooks/useDateRow.js"

export default {
  name: "DateRow",
  components: { ScheduleModal },
  props: {
    date: { type: Date },
    schedules: {
      type: Array,
    },
  },

	setup(props) {
		const {isModalOpen,openScheduleModal,closeScheduleModal,formatDate,defaultSchedule} =
		useDateRow(props.date,props.schedules);
		return {
			isModalOpen,
			openScheduleModal,
			closeScheduleModal,
			formatDate,
			defaultSchedule,
		}
	}
};
</script>
