<template>
  <div>
    <vue-modal-2
      name="modalToRegistSchedule"
      :headerOptions="{
        title: isEditType ? '予定を編集' : '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: isEditType ? '更新' : '登録',
        btn1Style: {
          backgroundColor: '#cccccc',
        },
        btn2Style: {
          backgroundColor: 'green',
        },
        btn1OnClick: () => {
          this.modalClose();
        },
        btn2OnClick: () => {
          this.submitRegist();
        },
      }"
      @on-close="modalClose()"
    >
      <div class="input-wrap">
        {{ /* input:text */ }}
        <p>
          <InputText v-model="inputSchedule" placeholder="予定を入力" />
        </p>
        {{ /* input:date */ }}
        <p>
          <InputDate v-model="inputDate" />
        </p>
        {{ /* input:time */ }}
        <p>開始時間：<InputTime v-model="inputStartTime" /></p>
        <p>終了時間：<InputTime v-model="inputEndTime" /></p>
      </div>
      {{ this.editScheduleIndex }}
    </vue-modal-2>
  </div>
</template>

<script>
import InputDate from "./InputDate";
import InputTime from "./InputTime";
import InputText from "./InputText";

export default {
  name: "ScheduleRegistModal",
  components: {
    InputDate,
    InputTime,
    InputText,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    isEditType: {
      type: Boolean,
      required: true,
    },
    editScheduleIndex: {
      type: Number,
      default: -1,
    },
    editSchedule: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      inputSchedule: "",
      inputDate: "",
      inputStartTime: "",
      inputEndTime: "",
    };
  },
  watch: {
    isModalOpen(isOpen) {
      isOpen
        ? this.$vm2.open("modalToRegistSchedule")
        : this.$vm2.close("modalToRegistSchedule");
    },
    editSchedule: {
      // 参考：https://qiita.com/smkhkc/items/d5e1bc5580a62d060516
      //handlerプロパティにハンドラを定義
      handler(newVal) {
        if (newVal) {
          //console.log(this.editSchedule);
          this.inputSchedule = newVal.schedule || "";
          this.inputDate = newVal.date || "";
          this.inputStartTime = newVal.startTime || "";
          this.inputEndTime = newVal.endTime || "";
        }
      },
      //immediate = 初期読み込み時にも呼び出す
      immediate: true,
    },
  },
  methods: {
    modalClose() {
      this.clearInputs();
      this.$emit("modalClose");
    },
    submitRegist() {
      const scheduleData = {
        date: this.inputDate,
        startTime: this.inputStartTime,
        endTime: this.inputEndTime,
        schedule: this.inputSchedule,
      };
      // console.log(scheduleData);
      // console.log(this.editScheduleIndex);
      if (this.isEditType) {
        this.$emit("updatedSchedule", scheduleData, this.editScheduleIndex);
      } else {
        this.$emit("registerSchedule", scheduleData);
      }
    },

    clearInputs() {
      this.inputSchedule = "";
      this.inputDate = "";
      this.inputStartTime = "";
      this.inputEndTime = "";
    },
  },
};
</script>
