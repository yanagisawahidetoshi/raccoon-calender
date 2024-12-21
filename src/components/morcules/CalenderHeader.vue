<template>
  <header class="header">
    <ul class="controle-month">
      <li>
        <a href="javascript:void(0);" @click="$emit('changeMonth', -1)">
          <svg
            data-v-0b6b1d24=""
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              data-v-0b6b1d24=""
              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
            ></path>
          </svg>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" @click="$emit('changeMonth', 1)">
          <svg
            data-v-0b6b1d24=""
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              data-v-0b6b1d24=""
              d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
    <h1 class="title">{{ formatDate(date, "yyyy年M月") }}</h1>
    <CommonButton @click="openRegisterModal">登録</CommonButton>
    <ScheduleRegisterModal
      @registeredSchedule="(newSchedule) => $emit('onAddSchedule', newSchedule)"
      @clickCloseButton="closeModal"
      :isModalOpen="isModalOpen"
      button2Name="登録"
      modalName="modal-new-schedule"
    />
  </header>
</template>
<script>
import { format } from "../../libs/dateUtil.js";
import CommonButton from "@/components/atoms/CommonButton";
import ScheduleRegisterModal from "@/components/morcules/ScheduleRegisterModal";

export default {
  name: "CalenderHeader",
  data() {
    return {
      isModalOpen: false,
    };
  },
  props: {
    date: {
      type: Date,
    },
  },
  components: {
    CommonButton,
    ScheduleRegisterModal,
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    openRegisterModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #000;
}
.title {
  font-size: 18px;
  margin: 0;
}
.controle-month {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0;
  padding-left: 0;
  :hover {
    cursor: pointer;
  }
}
li {
  list-style-type: none;
}
</style>
