import { getSchedulesSettings, getAcademicYear, getSchedule } from "@/libs/api";
import {
  SettingsItem,
  AcademicItem,
  ClassScheduleType,
} from "@/types/classSchedule.types";
import TimeData from "@/components/classSchedule/data/time.json";
import DayData from "@/components/classSchedule/data/day.json";
import { useEffect, useState } from "react";

const days = DayData.map((obj) => obj.day);
const times = TimeData.map((time) => time.times);

function compareTimes(time1: string, time2: string) {
  if (!time1 || !time2) {
    return 0;
  }

  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  if (hours1 !== hours2) {
    return hours1 - hours2;
  } else {
    return minutes1 - minutes2;
  }
}

interface MergedScheduleType extends ClassScheduleType {
  colSpan: number;
}

const ClassTable = () => {
  const [dataSchedule, setdataSchedule] = useState<ClassScheduleType[]>([]);
  const [academicYearData, setAcademicYearData] = useState<AcademicItem[]>([]);
  const [academicYear, setAcademicYear] = useState<AcademicItem>();
  const [currentAcademicYear, setCurrentAcademicYear] = useState<number>(0);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const settingsData = await getSchedulesSettings();
        const academicYearData = await getAcademicYear();

        setAcademicYearData(academicYearData.data.data);

        const fetchAcademicYear = settingsData.data.data.find(
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
          setdataSchedule(res.data.data);
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

  const mergeCells = () => {
    const mergedDataSchedule: MergedScheduleType[][] = [];

    days.forEach((day) => {
      const mergedDaySchedule: MergedScheduleType[] = [];

      times
        .filter((_, timeIndex) => timeIndex < times.length - 1)
        .forEach((time, timeIndex) => {
          const scheduleItem = dataSchedule.find(
            (item) =>
              item.day === day &&
              compareTimes(item.startTime, time) <= 0 && // Compare start time
              compareTimes(item.endTime, times[timeIndex + 1]) >= 0 // Compare end time
          );

          if (scheduleItem) {
            const existingMergedItem = mergedDaySchedule.find(
              (mergedItem) =>
                compareTimes(mergedItem.startTime, scheduleItem.startTime) ===
                  0 &&
                compareTimes(mergedItem.endTime, scheduleItem.endTime) === 0
            );

            if (existingMergedItem) {
              existingMergedItem.colSpan += 1;
            } else {
              mergedDaySchedule.push({ ...scheduleItem, colSpan: 1 });
            }
          } else {
            mergedDaySchedule.push({
              class_id: 0,
              class_subject: "",
              class_subject_no: "",
              class_room: "",
              startTime: time,
              endTime: times[timeIndex + 1],
              day: day,
              academic_id: 0,
              colSpan: 1,
            });
          }
        });

      mergedDataSchedule.push(mergedDaySchedule);
    });

    return mergedDataSchedule;
  };

  const mergedDataSchedule = mergeCells();

  return (
    <div className="w-5/6 h-screen">
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
      <div className="flex items-center justify-center">
        <table className="w-full h-full flex flex-row flex-no-wrap overflow-hidden sm:flex-none sm:table sm:table-col table-fixed sm:border-separate sm:border-spacing-x-2 sm:border-spacing-y-4 sm:border border-slate-500">
          <thead>
            <tr className="hidden sm:text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[12px] sm:table-row">
              <th scope="col" className=" border py-10 sm:py-3">
                Day | Time
              </th>
              {times
                .filter((_, index) => index < times.length - 1)
                .map((_, index) => (
                  <th scope="col" key={index} className="border">
                    {times[index] + "-" + times[index + 1]}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {mergedDataSchedule.map((mergedDaySchedule, dayIndex) => {
              const dynamicColorClass = `day-color-${days[
                dayIndex
              ].toLowerCase()}`;
              return (
                <tr
                  key={dayIndex}
                  className="flex flex-col flex-no wrap my-5 border-2 sm:border-0 sm:table-row"
                >
                  <th
                    className={`flex flex-row justify-center sm:text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[12px] sm:border py-10 ${dynamicColorClass}`}
                  >
                    <p className="transform sm:-rotate-90 xl:rotate-0 ">{days[dayIndex]}</p>
                  </th>
                  {mergedDaySchedule.map((scheduleItem, timeIndex) => (
                    <td
                      key={timeIndex}
                      colSpan={scheduleItem.colSpan}
                      className={`sm:table-col text-sm sm:border ${scheduleItem.class_id === 0 ? "" :dynamicColorClass}`}
                    >
                      {scheduleItem ? (
                        <div className="mt-3 sm:mt-0">
                          <p className="text-xs">
                            {scheduleItem.class_subject}
                          </p>
                          <p className="text-[10px]">
                            {scheduleItem.class_subject_no}
                          </p>
                          <p className="text-[10px]">
                            {scheduleItem.class_room}
                          </p>
                          <p className="text-[10px] sm:hidden">
                            {scheduleItem.startTime +
                              "-" +
                              scheduleItem.endTime}
                          </p>
                        </div>
                      ) : (
                        " "
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3">
        Class Schedule for {academicYear?.academic_year} CPE Regular Program |
        KMUTT
      </p>
    </div>
  );
};

export default ClassTable;
