<template>
  <vue-modal-2
    :name="modalName"
    @on-close="$emit('close')"
    :footerOptions="{
      btn1: 'キャンセル',
      btn2: '登録',
      btn2OnClick: () => {
        handleSubmit();
      },
      btn1OnClick: () => {
        handleClose();
      },
    }"
  >
    <input name="date" type="date" v-model="schedule.date" />
    <input name="startTime" type="time" v-model="schedule.startTime" />
    <input name="endTime" type="time" v-model="schedule.endTime" />
    <textarea name="content" v-model="schedule.content"></textarea>
  </vue-modal-2>
</template>

<script>
const MODAL_NAME = "scheduleModal";
export default {
  name: "ScheduleModal",
  props: {
    isModalOpen: {
      type: Boolean,
    },
    defaultSchedule: {
      type: Object,
      default: null,
    },
    modalName: {
      type: String,
      default: MODAL_NAME,
    },
  },
  data() {
    return {
      // modalName: MODAL_NAME,
      schedule: {
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        content: "",
      },
    };
  },
  mounted() {
    if (this.isModalOpen) {
      this.$vm2.open(this.modalName);
    }
    if (this.defaultSchedule) {
      this.schedule = this.defaultSchedule;
    }
  },
  watch: {
    isModalOpen: function (flag) {
      if (flag) {
        this.$vm2.open(this.modalName);
      } else {
        this.$vm2.close(this.modalName);
      }
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("onSubmit", this.schedule);
      this.$vm2.close(this.modalName);
    },
    handleClose() {},
  },
};
</script>
