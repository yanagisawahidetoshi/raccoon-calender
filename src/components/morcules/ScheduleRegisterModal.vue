<template>
  <vue-modal-2
    :name="modalName"
    @on-close="closeModalAddSchedule"
    :headerOptions="{
      title: '予定を登録',
    }"
    :footerOptions="{
      btn1: 'キャンセル',
      btn2: button2Name,
      btn1OnClick: () => {
        closeModalAddSchedule();
      },
      btn2OnClick: () => {
        register();
      },
    }"
  >
    <div>
      <p class="schedule-text"><FormInput v-model="schedule.content" /></p>
      <p><FormInputDate v-model="schedule.date" /></p>
      <p>開始時間<FormInputTime v-model="schedule.startTime" /></p>
      <p>終了時間<FormInputTime v-model="schedule.finishTime" /></p>
    </div>
  </vue-modal-2>
</template>
<script>
import FormInput from "@/components/atoms/FormInput";
import FormInputDate from "@/components/atoms/FormInputDate";
import FormInputTime from "@/components/atoms/FormInputTime";

export default {
  name: "ScheduleRegisterModal",
  components: {
    FormInput,
    FormInputDate,
    FormInputTime,
  },
  props: {
    isModalOpen: {
      type: Boolean,
    },
    editingSchedule: {
      type: Object,
    },
    button2Name: {
      type: String,
    },
    modalName: {
      type: String,
    },
  },
  data() {
    return {
      schedule: {
        id: "",
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      },
    };
  },
  methods: {
    closeModalAddSchedule() {
      this.$emit("clickCloseButton");
    },
    register() {
      this.$emit("registeredSchedule", {
        content: this.schedule.content,
        date: this.schedule.date,
        startTime: this.schedule.startTime,
        finishTime: this.schedule.finishTime,
      });
      this.closeModalAddSchedule();
      Object.keys(this.schedule).forEach((key) => {
        this.schedule[key] = "";
      });
    },
  },
  watch: {
    isModalOpen(status) {
      if (status) {
        this.$vm2.open(this.modalName);
      } else {
        this.$vm2.close(this.modalName);
      }
    },
    editingSchedule(editSchedule) {
      // ifをしないと、登録ボタンからモーダル出したときにエラーになる
      if (this.button2Name === "登録") {
        return;
      }
      this.schedule.content = editSchedule.content;
      this.schedule.date = editSchedule.date;
      this.schedule.startTime = editSchedule.startTime;
      this.schedule.finishTime = editSchedule.finishTime;
    },
  },
};
</script>
