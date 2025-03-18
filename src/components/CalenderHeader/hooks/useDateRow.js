import { ref } from "@vue/composition-api"
import { format } from "../../../libs/date-fns"

export function useDateRow(currentDate,schedules) {
	const isModalOpen = ref(false);
	const defaultSchedule = ref(null);

	const formatDate = () => {
		return format(currentDate,"yyyy年MM月")
	};

	const openScheduleModal = () => {
		defaultSchedule.value = schedules ? JSON.parse(JSON.stringify(schedules)) : null;
		isModalOpen.value = true;
	};

	const closeScheduleModal = () => {
		isModalOpen.value = false;
	};

	return {
		formatDate,
		isModalOpen,
		defaultSchedule,
		openScheduleModal,
		closeScheduleModal
	}
}