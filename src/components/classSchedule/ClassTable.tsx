import {
  getSchedulesSettings,
  getAcademicYear,
  getSchedule,
} from "@/libs/fetch";
import {
  SettingsItem,
  AcademicItem,
  ClassScheduleType,
} from "@/types/classSchedule.types";
import TimeData from "@/components/classSchedule/data/time.json";
import DayData from "@/components/classSchedule/data/day.json";
import { useEffect, useState } from "react";

const days = DayData.map((obj) => {
  return { day: obj.day, colors: obj.color };
});
const times = TimeData.map((time) => time.times);

function compareTimes(time1: string, time2: string) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  if (hours1 !== hours2) {
    return hours1 - hours2;
  } else {
    return minutes1 - minutes2;
  }
}

const ClassTable = () => {
  const [dataSchedule, setdataSchedule] = useState<ClassScheduleType[]>([]);
  const [academicYearData, setAcademicYearData] = useState<AcademicItem[]>([]);
  const [academicYear, setAcademicYear] = useState<AcademicItem>(); // [TODO
  const [currentAcademicYear, setCurrentAcademicYear] = useState<number>(0);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const settingsData = await getSchedulesSettings();
        const academicYearData = await getAcademicYear();

        setAcademicYearData(academicYearData.data);

        const fetchAcademicYear = settingsData.data.find(
          (item: SettingsItem) => item.settingsName === "currentAcademicYear"
        );

        if (fetchAcademicYear && currentAcademicYear === 0) {
          setCurrentAcademicYear(fetchAcademicYear.settingsValue);
          localStorage.setItem(
            "currentAcademicYear",
            fetchAcademicYear.settingsValue
          );
        }

        getSchedule(currentAcademicYear).then((res) => {
          setdataSchedule(res.data);
        });
      } catch (err) {
        console.log("Error fetching data from the server : ", err);
      }
    };

    setAcademicYear(
      academicYearData.find((item) => {
        return item.academic_id == currentAcademicYear;
      })
    );
    FetchData();
  }, [currentAcademicYear]);
  return (
    <div className="w-full">
      <div className="my-5">
        <label htmlFor="academic_year" className="text-xl">
          Academic Year
        </label>
        <select
          name="academic_year"
          id="academic_year"
          className="px-5 py-2 ml-3 border"
          value={currentAcademicYear}
          onChange={(e) => {
            const value = Number(e.target.value);
            setCurrentAcademicYear(value);
          }}
        >
          {academicYearData.map((item, index) => {
            return (
              <option value={item.academic_id} key={index}>
                {item.academic_year}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table-fixed border-separate border-spacing-x-2 border-spacing-y-4 border border-slate-500">
        <thead>
          <tr>
            <th className="text-sm border">Day | Time</th>
            {times
              .filter((_, index) => index < times.length - 1)
              .map((_, index) => (
                <th key={index} className="text-sm border">
                  {times[index] + " - " + times[index + 1]}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => {
            return (
              <tr key={dayIndex}>
                <th className={`text-sm border py-5 ${days[dayIndex].colors}`}>
                  {day.day}
                </th>
                {times
                  .filter((_, timeIndex) => timeIndex < times.length - 1)
                  .map((time, timeIndex) => {
                    const scheduleItem = dataSchedule.find(
                      (item) =>
                        item.day === day.day &&
                        compareTimes(item.startTime, time) <= 0 && // Compare start time
                        compareTimes(item.endTime, times[timeIndex + 1]) >= 0 // Compare end time
                    );
                    return (
                      <td
                        key={timeIndex}
                        className={`text-sm border ${
                          scheduleItem ? days[dayIndex].colors : ""
                        }`}
                      >
                        {scheduleItem ? (
                          <div>
                            <p>{scheduleItem.class_subject}</p>
                            <p>{scheduleItem.class_subject_no}</p>
                            <p>{scheduleItem.class_room}</p>
                          </div>
                        ) : (
                          " "
                        )}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3">
        Class Schedule for {academicYear?.academic_year} CPE Regular Program |
        KMUTT
      </p>
    </div>
  );
};

export default ClassTable;
