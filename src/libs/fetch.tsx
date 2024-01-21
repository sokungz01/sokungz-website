import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;
console.log(url)
const instance = axios.create({
    withCredentials: true,
    baseURL: url
})

export const getSchedulesSettings = async () => {
    const res = await instance.get(`${url}/api/class-schedule/settings`);
    return res.data;
}

export const getSchedule = async (academic_id : number) => {
    const res = await instance.get(`${url}/api/class-schedule/getSchedule/${academic_id}`);
    return res.data;
}

export const getAcademicYear = async () => {
    const res = await instance.get(`${url}/api/class-schedule/academicYear`);
    return res.data;
}