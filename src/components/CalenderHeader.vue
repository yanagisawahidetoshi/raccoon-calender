<template>
  <div class="menu">
    <span class="nowMonth">{{ formatDate }}</span>
    <Button className="arrow-left" @click="$emit('changeMonth', -1)" />
    <Button tagName="span" @click="$emit('changeCurrentMonth')"> 当月 </Button>
    <Button className="arrow-right" @click="$emit('changeMonth', 1)" />
    <Button tagName="a" className="regist" @click="modalOpen"> 登録 </Button>
    {{ /* 新規の場合、編集IDはあり得ない数字にする */ }}
    <ScheduleRegistModal
      v-show="isModalOpen"
      :isModalOpen="isModalOpen"
      @onSubmit="registerSchedule($event)"
      @modalClose="modalClose"
    />
  </div>
</template>

<script>
import Button from "./Button";
import ScheduleRegistModal from "./ScheduleRegistModal";

export default {
  name: "CalenderHeader",
  components: {
    Button,
    ScheduleRegistModal,
  },
  props: {
    formatDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isModalOpen: false,
      editSchedule: null,
    };
  },
  methods: {
    modalOpen() {
      this.isModalOpen = true;
    },
    modalClose() {
      this.isModalOpen = false;
    },
    registerSchedule(scheduleData) {
      this.$emit("registerSchedule", scheduleData);
      this.modalClose();
    },
  },
};
</script>
<style scoped>
.menu {
  position: sticky;
  background: #fff;
  top: 0;
  border-bottom: 1px solid #d3d3d3;
  padding: 12px 0;
  display: flex;
  align-items: center;
}
.arrow-left {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 10px;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(45deg);
}
.arrow-right {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 10px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  transform: rotate(45deg);
}
.nowMonth {
  font-size: 18px;
  vertical-align: middle;
  font-weight: 500;
  display: inline-block;
  margin: 0 12px;
}
.regist {
  vertical-align: -4px;
  margin: 0 6px;
  cursor: pointer;
}
</style>
