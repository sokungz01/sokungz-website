import { Link } from "react-router-dom";

const HomePage = () => {
    const isLogin = localStorage.getItem("loginSettings");
    console.log(isLogin);
    const Logout = () => {
        localStorage.removeItem("loginSettings");
        location.href="/"
    }
    return (
        <div className="flex h-screen">
            <div className="m-auto">
            <div className="text-center">
            <p className="text-3xl">Homepage</p>
                    <div className="mt-5">
                        {
                            !isLogin ? <Link to="/login" className="text-white text-lg bg-slate-500 hover:bg-slate-700 px-3 py-1 rounded-2xl mx-2">Login</Link> :
                            <button className="text-white text-lg bg-slate-500 hover:bg-slate-700 px-3 py-1 rounded-2xl mx-2" onClick={Logout}>Logout</button>
                        }
                        <Link to="/class-schedule" className="text-white text-lg hover:bg-slate-700 bg-slate-500 px-3 py-1 rounded-2xl mx-2">Class Schedule</Link>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default HomePage;