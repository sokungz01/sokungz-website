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

export const getSchedule = async () => {
    const res = await instance.get(`${url}/api/class-schedule/getSchedule`);
    return res.data;
}