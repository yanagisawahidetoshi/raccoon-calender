<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li>
        <button type="button" @click="$emit('changeToPrevMonth')">先月</button>
      </li>
      <li>
        <button type="button" @click="$emit('changeCurrentMonth')">当月</button>
      </li>
      <li>
        <button type="button" @click="$emit('changeToNextMonth')">翌月</button>
      </li>
      <li>
        <button type="button" @click="openScheduleModal">登録</button>
      </li>
    </ul>
    <ScheduleModal
      :isModalOpen="isModalOpen"
      @close="closeScheduleModal"
      @onSubmit="$emit('onSubmit', $event)"
    />
  </div>
</template>


<script>
import ScheduleModal from "./ScheduleModal.vue";
import { useCalenderHeader } from "./CalenderHeader/hooks/useCalenderHeader.js"

export default {
  name: "CalenderHeader",
	comments:{ScheduleModal},
  props: {
    currentDate: { type: Date },
  },
	setup(props) {
		const {isModalOpen,openScheduleModal,closeScheduleModal,title} =
		useCalenderHeader(props.currentDate);

		return {
			isModalOpen,
			openScheduleModal,
			closeScheduleModal,
			title,
		}
	}

};
</script>
