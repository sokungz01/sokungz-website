import { Link } from "react-router-dom";
const NotFoundPage = () => {
    return (
        <>
        <div className="flex h-screen">
            <div className="m-auto text-center">
                <p className="font-bold text-4xl lg:text-[72px]"> 404 </p>
                <p className="font-bold text-xl lg:text-3xl"> Not Found </p>
                <p className="font-thin text-xs lg:text-lg">The resource requested could not be found on this server!</p>
                <br/>
                <Link 
                    to="/"
                    className="font-thin text-xs lg:text-lg hover:font-extralight"> 
                    &lt; Back to homepage. 
                </Link>
            </div>
        </div>
        </>
    )
}

export default NotFoundPage;