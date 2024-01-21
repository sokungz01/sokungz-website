import { SelectOption, InputBox } from "@/components";
import { getAcademicYear, createSchedule } from "@/libs/api";
import { FillOutForm, ResponseErrorForm, SuccessForm } from "@/libs/sweetalert";
import { ClassScheduleType, AcademicItem } from "@/types/classSchedule.types";
import { useEffect, useState } from "react";
import DayData from "@/components/classSchedule/data/day.json";
import TimeData from "@/components/classSchedule/data/time.json";

const days = DayData.map((obj) => {
  return { label: obj.day, value: obj.day };
});
const Times = TimeData.map((time) => {
  return { label: time.times, value: time.times };
});

const ScheduleForm = () => {
  const [dataSchedule, setdataSchedule] = useState<ClassScheduleType>({
    class_id: 0,
    academic_id: 0,
    class_subject: "",
    class_subject_no: "",
    class_room: "",
    day: "",
    startTime: "",
    endTime: "",
  });
  const [academicYearData, setAcademicYearData] = useState<AcademicItem[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const settingsData = await getAcademicYear();
        if (settingsData) {
          setAcademicYearData(settingsData.data.data);
        }
      } catch (err) {
        console.log("Error fetching data from the server : ", err);
      }
    };
    FetchData();
  }, []);

  const handleSave = async () => {
    let hasEmptyString = false;
    for (const key in dataSchedule) {
      if (Object.prototype.hasOwnProperty.call(dataSchedule, key)) {
        if (
          dataSchedule[key as keyof ClassScheduleType] === "" ||
          dataSchedule["academic_id"] === 0
        ) {
          hasEmptyString = true;
          break;
        }
      }
    }

    if (hasEmptyString) {
      FillOutForm();
      return;
    }

    const res = await createSchedule(dataSchedule);
    console.log(res.status);
    if (res.status == 200) {
      SuccessForm();
      setTimeout(() => window.location.reload(), 3000);
    } else {
      ResponseErrorForm();
    }
  };
  const AcademicYear = academicYearData.map((item) => {
    return { label: item.academic_year, value: item.academic_id };
  });

  return (
    <>
      <div className="flex w-screen">
        <div className="m-auto text-center w-2/3 lg:w-1/4">
          <div className="mt-5 border border-3 px-5 py-3 rounded-xl">
              <div className="flex flex-col">
                <SelectOption
                  label="Academic Year"
                  name="academic_id"
                  options={AcademicYear}
                  placeholder="Choose Academic Year"
                  value={dataSchedule.academic_id}
                  obj={dataSchedule}
                  setObj={setdataSchedule}
                  required
                />
                <hr className="my-3" />
                <p className="font-bold text-lg my-3">Class info</p>
                <div className="w-full">
                  <InputBox
                    label="Subject Name"
                    name="class_subject"
                    type="text"
                    placeholder="Subject Name"
                    value={dataSchedule.class_subject}
                    obj={dataSchedule}
                    setObj={setdataSchedule}
                    required
                  />
                  <InputBox
                    label="Subject No"
                    name="class_subject_no"
                    type="text"
                    placeholder="Subject No"
                    value={dataSchedule.class_subject_no}
                    obj={dataSchedule}
                    setObj={setdataSchedule}
                    required
                  />
                  <InputBox
                    label="Subject Room"
                    name="class_room"
                    type="text"
                    placeholder="Subject Room"
                    value={dataSchedule.class_room}
                    obj={dataSchedule}
                    setObj={setdataSchedule}
                    required
                  />
                </div>
                <SelectOption
                  label="Day"
                  name="day"
                  options={days}
                  placeholder="Choose Day"
                  value={dataSchedule.day}
                  obj={dataSchedule}
                  setObj={setdataSchedule}
                  required
                />
              </div>
              <hr className="my-3" />
              <p className="font-bold text-lg my-3">Class Time</p>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full">
                  <SelectOption
                    label="Start Time"
                    name="startTime"
                    options={Times}
                    placeholder="Choose Hours"
                    value={dataSchedule.startTime}
                    obj={dataSchedule}
                    setObj={setdataSchedule}
                    required
                  />
                </div>
                <div className="w-full">
                  <SelectOption
                    label="End Time"
                    name="endTime"
                    options={Times.filter(
                      (time) => time.value > dataSchedule.startTime
                    )}
                    placeholder="Choose Hours"
                    value={dataSchedule.endTime}
                    obj={dataSchedule}
                    setObj={setdataSchedule}
                    disabled={dataSchedule.startTime === ""}
                    required
                  />
                </div>
              </div>
              <button
                className="px-5 py-2 my-3 bg-slate-500 hover:bg-slate-700 text-white rounded-xl"
                onClick={handleSave}
              >
                Save
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleForm;
