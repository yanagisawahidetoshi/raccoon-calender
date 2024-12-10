<template>
  <vue-modal-2
    name="registScheduleModal"
    :header-options="{
      title: '予定を登録',
    }"
    :footer-options="{
      btn1: 'キャンセル',
      btn2: '登録',
      btn2Style: {
        backgroundColor: 'green',
      },
      btn1OnClick: () => {
        $emit('closeScheduleRegistModal');
      },
      btn2OnClick: () => {
        registSchedule();
        $emit('closeScheduleRegistModal');
      },
    }"
    @on-close="$emit('closeScheduleRegistModal')"
  >
    <div class="wrap_input">
      <dl class="input_col">
        <dt class="input_title">日付</dt>
        <dd><InputDate v-model="dateValue" /></dd>
      </dl>
      <dl class="input_col">
        <dt class="input_title">開始時間</dt>
        <dd><InputTime v-model="startTimeValue" /></dd>
      </dl>
      <dl class="input_col">
        <dt class="input_title">終了時間</dt>
        <dd><InputTime v-model="endTimeValue" /></dd>
      </dl>
    </div>
  </vue-modal-2>
</template>
<script>
import InputDate from "@/components/atoms/InputDate.vue";
import InputTime from "@/components/atoms/InputTime.vue";

export default {
  name: "CalenderModalRegistSchedule.vue",
  components: { InputDate, InputTime },
  props: {
    isScheduleRegistModalOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      dateValue: "",
      startTimeValue: "",
      endTimeValue: "",
    };
  },
  watch: {
    isScheduleRegistModalOpen(newValue) {
      console.log(newValue);
      newValue
        ? this.$vm2.open("registScheduleModal")
        : this.$vm2.close("registScheduleModal");
    },
  },
  methods: {
    registSchedule() {
      this.$emit("schedule", {
        dateValue: this.dateValue,
        startTimeValue: this.startTimeValue,
        endTimeValue: this.endTimeValue,
      });
    },
  },
};
</script>

<style scoped>
.wrap_input {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;
}
.input_col {
  display: flex;
  align-items: center;
}
.input_title:after {
  content: "：";
}
</style>
