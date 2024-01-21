import { ClassTable } from "@/components/classSchedule";
import { Link } from "react-router-dom";

const ClassSchedulePage = () =>{
    const isLogin = localStorage.getItem("loginSettings");
    return (
        <>
        <div className="flex w-screen">
            <div className="m-auto text-center">
                <div className="mt-5">
                    <p className="text-3xl">Class Schedule</p>
                    <div className="mt-5">
                    <Link to="/" className="text-white text-lg bg-slate-500 px-3 py-1 rounded-2xl hover:bg-slate-700 ">Home</Link>
                    {
                    isLogin ?
                    <Link  to="add-schedule" className="text-white text-lg bg-slate-500 hover:bg-slate-700 px-3 py-1 rounded-2xl ml-2">Add Schedule</Link> : ""
                    
                    }
                    <div className="flex flex-row justify-center">
                        <ClassTable/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ClassSchedulePage;