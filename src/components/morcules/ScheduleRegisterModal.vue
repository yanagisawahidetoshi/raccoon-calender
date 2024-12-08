<template>
  <vue-modal-2
    name="modal-add-schedule"
    @on-close="closeModalAddSchedule"
    :headerOptions="{
      title: '予定を登録',
    }"
    :footerOptions="{
      btn1: 'キャンセル',
      btn2: '登録',
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
  data() {
    return {
      schedule: {
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      },
    };
  },
  props: {
    isModalOpen: {
      type: Boolean,
    },
  },
  methods: {
    closeModalAddSchedule() {
      this.$vm2.close("modal-add-schedule");
      this.$emit("closeModal", false);
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
        this.$vm2.open("modal-add-schedule");
      }
    },
  },
};
</script>
