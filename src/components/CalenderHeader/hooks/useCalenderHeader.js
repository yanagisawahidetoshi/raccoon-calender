import {computed,ref } from "@vue/composition-api"
// Vue3で各場合はimport {computed,ref } from "vue"
import { format } from "../../../libs/date-fns"

export function useCalenderHeader(currentDate) {
	const isModalOpen = ref(false);

	const title = computed(() => {
		return format(currentDate,"yyyy年MM月")
	});

	const openScheduleModal = () => {
		// conpotionAPIで値を更新する場合、.valueを追加エル
		isModalOpen.value = true;
	};

	const closeScheduleModal = () => {
		isModalOpen.value = false;
	};

	return {
		isModalOpen,
		openScheduleModal,
		closeScheduleModal,
		title,
	}
}


