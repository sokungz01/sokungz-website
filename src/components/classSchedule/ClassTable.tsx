const academic_year = ["1/2022","2/2022","1/2023","2/2023"];
const days = {
    day: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    colors:["bg-yellow-200","bg-pink-200","bg-green-200","bg-orange-200","bg-blue-200","bg-purple-200","bg-red-200"]
};
const times = ["8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

const ClassTable = () =>{
    return (
        <div className="w-full">
            <div className="my-5">
                <label htmlFor="academic_year" className="text-xl">Academic Year</label>
                <select name="academic_year" id="academic_year" className="px-5 py-2 ml-3 border">
                    {
                        academic_year.map((item,index) => {
                            return <option value={item} key={index}>{item}</option>
                        })
                    }
                </select>
            </div>
            <table className="table-fixed border-separate border-spacing-x-2 border-spacing-y-4 border border-slate-500">
                <thead>
                    <th className="text-sm border"> Day | Time </th>
                    {
                        times.filter((_,index) => index < times.length-1).map((_,index) => {
                            return <th className="text-sm border">{ times[index] + " - " + times[index+1] }</th>
                        })
                    }
                </thead>
                <tbody>
                    {
                        days.day.map((item,index) => {
                            return (
                            <tr>
                                <th className={`text-sm border py-5 ${days.colors[index]}`}> {item} </th>
                                {
                                times.filter((_,index) => index < times.length-1).map((_,index) => {
                                    return <th className="text-sm border"> </th>
                                })
                                }
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <p className="mt-3"> Class Schedule for 2/2023 CPE Regular Program | KMUTT</p>
        </div>
    );
}
export default ClassTable;