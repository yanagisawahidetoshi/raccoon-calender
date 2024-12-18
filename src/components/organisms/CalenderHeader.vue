<template>
  <div>
    <InputButton type="button" @click="$emit('changeMonth', -1)"
      >前月</InputButton
    >
    <InputButton type="button" @click="$emit('changeToCurrentMonth')"
      >当月</InputButton
    >
    <InputButton type="button" @click="$emit('changeMonth', 1)"
      >翌月</InputButton
    >
    <h1>{{ format(currentDate, "yyyy/MM") }}</h1>
    <InputButton type="button" @click="openModal('registNewScheduleModal')"
      >登録</InputButton
    >
    <vue-modal-2
      name="registNewScheduleModal"
      @on-close="closeModal('registNewScheduleModal')"
      :headerOptions="{ title: '予定を登録' }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn2Style: {
          backgroundColor: 'blue',
        },
        btn1OnClick: () => {
          closeModal('registNewScheduleModal');
        },
        btn2OnClick: () => {
          regist();
          closeModal('registNewScheduleModal');
        },
      }"
    >
      <InputDate v-model="tmpScheduleDatas.inputDate" />
      <InputTime v-model="tmpScheduleDatas.inputStart" />
      <InputTime v-model="tmpScheduleDatas.inputEnd" />
      <InputText v-model="tmpScheduleDatas.inputText" />
    </vue-modal-2>
    {{ tmpScheduleDatas }}
  </div>
</template>

<script>
import { format } from "../../libs/date-util.js";
import InputButton from "../atoms/InputButton";
import InputDate from "../atoms/InputDate";
import InputText from "../atoms/InputText";
import InputTime from "../atoms/InputTime";
export default {
  name: "CalenderHeader",
  components: { InputDate, InputText, InputTime, InputButton },
  props: {
    currentDate: {
      type: Date,
    },
    newScheduleDatas: {
      type: Object,
    },
  },
  data() {
    return {
      tmpScheduleDatas: {
        inputDate: new Date(),
        inputText: "aaa",
        inputStart: "10:12",
        inputEnd: "10:12",
      },
    };
  },
  watch: {
    "newScheduleDatas.inputDate"(newValue) {
      this.tmpScheduleDatas.inputDate = newValue;
    },
    "newScheduleDatas.inputText"(newValue) {
      this.tmpScheduleDatas.inputText = newValue;
    },
    "newScheduleDatas.inputStart"(newValue) {
      this.tmpScheduleDatas.inputStart = newValue;
    },
    "newScheduleDatas.inputEnd"(newValue) {
      this.tmpScheduleDatas.inputEnd = newValue;
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
    openModal(name) {
      this.$vm2.open(name);
    },
    closeModal(name) {
      this.$vm2.close(name);
    },
    regist() {
      this.$emit("registSchedule", this.tmpScheduleDatas);
    },
  },
};
</script>
