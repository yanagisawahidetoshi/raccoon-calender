<template>
  <vue-modal-2
    :name="modalName"
    @on-close="$emit('close')"
    :headerOptions="headerOptions"
    :footerOptions="footerOptions"
  >
    <input
      type="date"
      @input="updateScheduleDate($event.target.value)"
    />
    <input
      v-model="scheduleContent"
      @input="updateScheduleContent"
      placeholder="内容を入力"
    />
  </vue-modal-2>
</template>

<script>
const MODAL_NAME = 'scheduleModal';
export default {
  name: "ScheduleModal",
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    headerOptions: {
      type: Object,
    },
    footerOptions: {
      type: Object,
    },
  },
  data() {
    return {
      modalName: MODAL_NAME,
      scheduleContent: "",
    };
  },
  watch: {
    isModalOpen: function(flag) {
      if (flag) {
        this.$vm2.open(MODAL_NAME);
      }else{
        this.$vm2.close(MODAL_NAME);
      }
    },
  },
  methods: {
    updateScheduleDate(value) {
      this.$emit("updateScheduleDate", value);
    },
    updateScheduleContent() {
      this.$emit("updateScheduleContent", this.scheduleContent);
    }
  },
};
</script>
