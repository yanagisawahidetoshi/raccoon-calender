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
import { format } from "../libs/date-fns";
import ScheduleModal from "../components/ScheduleModal.vue";

export default {
  name: "CalenderHeader",
  props: {
    currentDate: { type: Date },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  components: { ScheduleModal },
  computed: {
    title() {
      //console.log(this.currentDate);
      return format(this.currentDate, "yyyy年MM月");
    },
  },
  methods: {
    openScheduleModal() {
      this.isModalOpen = true;
    },
    closeScheduleModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
