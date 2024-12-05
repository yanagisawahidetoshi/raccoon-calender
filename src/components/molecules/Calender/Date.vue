<template>
  <div class="wrap_date">
    <div>{{ formatDate(date, "do（E）") }}</div>
    <template v-if="schedule">
      <template v-if="!isEdit">
        <div class="time">
          {{ schedule.startTimeValue }} ～ {{ schedule.endTimeValue }}
        </div>
        <BaseButton @click="toggleEdit">編集</BaseButton>
      </template>
      <template v-else-if="isEdit">
        <div class="time edit">
          <InputTime v-model="startTimeValue" />
          <InputTime v-model="endTimeValue" />
        </div>
        <BaseButton @click="completeEdit">完了</BaseButton>
      </template>
    </template>
    <!-- 年月日が一致すれば該当オブジェクトの時間を表示 -->
  </div>
</template>

<script>
import { format } from "../../../libs/date-util";
import BaseButton from "@/components/atoms/BaseButton.vue";
import InputTime from "@/components/atoms/InputTime.vue";
export default {
  name: "CalenderDate",
  components: { BaseButton, InputTime },
  data() {
    return {
      isEdit: false,
      startTimeValue: "",
      endTimeValue: "",
    };
  },
  props: {
    date: {
      type: Date,
    },
    schedule: {
      type: Object,
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    completeEdit() {
      this.$emit("updateSchedule", {
        dateValue: this.date,
        startTimeValue: this.startTimeValue,
        endTimeValue: this.endTimeValue,
      });
      this.startTimeValue = "";
      this.endTimeValue = "";
      this.isEdit = false;
    },
  },
};
</script>
<style scoped>
.wrap_date {
  display: flex;
  align-items: center;
}
.time {
  margin-right: 5px;
}
.edit {
  display: flex;
  gap: 8px;
}
</style>
