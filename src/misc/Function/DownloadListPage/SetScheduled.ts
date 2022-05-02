import api from "../../../api/api";

export async function getAllSchedule(userId: number) {
  const allSchedule = await api(
    `api/schedulingCarpet/getAll/${userId}`,
    "get",
    {}
  );
  if (allSchedule.status === "error") return [];
  return allSchedule.data;
}

export async function editSchedule(
  schedulingCarpetId: number,
  userId: number,
  downloadArray: []
) {
  const schedule = await api(`api/schedulingCarpet/edit/${userId}`, "post", {
    scheduling_carpet_id: schedulingCarpetId,
    is_sheduling: true,
  });
  return editDownloadArray(downloadArray, schedule.data);
}

function editDownloadArray(downloadArray: [], schedule: any) {
  return downloadArray.filter(
    (item: any) => item.schedulingCarpetId !== schedule.schedulingCarpetId
  );
}
