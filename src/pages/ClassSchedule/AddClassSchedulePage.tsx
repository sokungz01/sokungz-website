import { Link} from 'react-router-dom';
import {ScheduleForm} from '@/components/classSchedule';
import { useEffect } from 'react';

const AddClassSchedulePage = () =>{
    useEffect(() => {
        if(!localStorage.getItem("loginSettings")) {
            location.href="/";
        }
      }, []);
    return(
        <>
        <div className="flex w-screen">
            <div className="m-auto text-center">
                <div className="mt-5">
                    <p className="text-3xl">Add Class Schedule</p>
                    <div className="mt-5">
                    <Link to="/" className="text-white text-lg bg-slate-500 hover:bg-slate-700 px-3 py-1 rounded-2xl ">Home</Link>
                    <Link to="/class-schedule" className="text-white text-lg bg-slate-500 hover:bg-slate-700 px-3 py-1 rounded-2xl ml-2">Class Schedule</Link>
                    <ScheduleForm/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddClassSchedulePage;