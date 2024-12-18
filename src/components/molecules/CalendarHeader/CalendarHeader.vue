<template>
  <header>
    <ul>
      <li><button @click="$emit('changeMonth', -1)">prev</button></li>
      <li><button @click="$emit('changeToCurrentMonth')">current</button></li>
      <li><button @click="$emit('changeMonth', 1)">next</button></li>
      <li>
        <button type="button" @click="openScheduleModal">登録</button>
      </li>
    </ul>

    <!-- <p>{{ scheduleDate }}{{ scheduleContent }}</p> -->
    
    <ScheduleModal
      :isModalOpen="isModalOpen"
      :headerOptions="{ title: 'スケジュール登録' }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn1OnClick: closeScheduleModal,
        btn2OnClick: setSchedule,
      }"
      @close="closeScheduleModal"
      @updateScheduleDate="setScheduleDate"
      @updateScheduleContent="setScheduleContent"
    />
  </header>
</template>

<script>
import ScheduleModal from "../ScheduleModal/ScheduleModal.vue";
export default {
  name: "CalendarHeader",
  components: { ScheduleModal },
  data() {
    return {
      isModalOpen: false,
      scheduleDate: "",
      scheduleContent: "",
    };
  },
  methods: {
    openScheduleModal() {
      this.isModalOpen = true;
    },
    closeScheduleModal() {
      this.isModalOpen = false;
    },
    setScheduleDate(date) {
      this.scheduleDate = date;
    },
    setScheduleContent(content) {
      this.scheduleContent = content;
    },
    setSchedule() {
      console.log(this.scheduleDate);
      console.log(this.scheduleContent);
    },
  },
};
</script>
