import { ClassTable } from "@/components/classSchedule";
import { Link } from "react-router-dom";

const ClassSchedulePage = () =>{
    return (
        <>
        <div className="flex w-screen">
            <div className="m-auto text-center">
                <div className="mt-5">
                    <p className="text-3xl">Class Schedule</p>
                    <ClassTable/>
                    <div className="mt-5">
                    <Link to="/" className="text-white text-lg bg-slate-500 px-3 py-1 rounded-2xl "> Home </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ClassSchedulePage;