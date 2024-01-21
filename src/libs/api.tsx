import axios from "axios";
import { ClassScheduleType } from "@/types/classSchedule.types";
import { UserLoginType } from '@/types/user.types';
const url = import.meta.env.VITE_BACKEND_URL;
console.log(url)
const instance = axios.create({
    withCredentials: true,
    baseURL: url
})

export const getSchedulesSettings = async () => {
    const res = await instance.get(`${url}/api/class-schedule/settings`);
    return res;
}

export const getSchedule = async (academic_id : number) => {
    const res = await instance.get(`${url}/api/class-schedule/getSchedule/${academic_id}`);
    return res;
}

export const getAcademicYear = async () => {
    const res = await instance.get(`${url}/api/class-schedule/academicYear`);
    return res;
}

export const createSchedule = async (data : ClassScheduleType) => {
    const res = await instance.post(`${url}/api/class-schedule/createSchedule`, data);
    return res;
}

export const UserLogin = async (data : UserLoginType) => {
    const res = await instance.post(`${url}/api/user/login`, data);
    return res;
}