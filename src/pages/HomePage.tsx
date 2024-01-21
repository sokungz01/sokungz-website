import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex h-screen">
            <div className="m-auto">
            <div className="text-center">
            <p className="text-3xl">Homepage</p>
                    <div className="mt-5">
                        <Link to="/login" className="text-white text-lg bg-slate-500 px-3 py-1 rounded-2xl mx-2">Login</Link>
                        <Link to="/class-schedule" className="text-white text-lg bg-slate-500 px-3 py-1 rounded-2xl mx-2">Class Schedule</Link>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default HomePage;