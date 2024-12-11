<template>
  <vue-modal-2
    :name="modalName"
    :header-options="{
      title: modalTitle,
    }"
    :footer-options="{
      btn1: 'キャンセル',
      btn2: modalBtnName,
      btn2Style: {
        backgroundColor: 'green',
      },
      btn1OnClick: () => {
        $emit('toggleModalSchedule', false);
      },
      btn2OnClick: () => {
        newSchedule();
        $emit('toggleModalSchedule', false);
      },
    }"
    @on-close="$emit('toggleModalSchedule', false)"
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
      <dl class="input_col">
        <dt class="input_title">ToDo</dt>
        <dd><InputText v-model="toDo" /></dd>
      </dl>
    </div>
  </vue-modal-2>
</template>

<script>
import InputDate from "@/components/atoms/InputDate.vue";
import InputTime from "@/components/atoms/InputTime.vue";
import InputText from "@/components/atoms/InputText.vue";
export default {
  name: "ModalSchedule",
  components: { InputDate, InputTime, InputText },
  props: {
    isModalOpen: {
      type: Boolean,
    },
    schedule: {
      type: Object,
    },
    modalName: {
      type: String,
    },
    modalTitle: {
      type: String,
    },
    modalBtnName: {
      type: String,
    },
  },
  data() {
    return {
      dateValue: "",
      startTimeValue: "",
      endTimeValue: "",
      toDo: "",
      id: 0,
    };
  },
  watch: {
    schedule(newValue) {
      this.dateValue = newValue.dateValue;
      this.startTimeValue = newValue.startTimeValue;
      this.endTimeValue = newValue.endTimeValue;
      this.toDo = newValue.toDo;
      this.id = newValue.id;
    },
    isModalOpen(newValue) {
      newValue
        ? this.$vm2.open(this.modalName)
        : this.$vm2.close(this.modalName);
    },
  },
  methods: {
    newSchedule() {
      this.$emit("newSchedule", {
        dateValue: this.dateValue,
        startTimeValue: this.startTimeValue,
        endTimeValue: this.endTimeValue,
        toDo: this.toDo,
        id: this.id,
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
