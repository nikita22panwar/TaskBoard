import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { TiWeatherCloudy } from "react-icons/ti";
import { BsFillCalculatorFill } from "react-icons/bs";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-primary text-white p-6 flex justify-between items-center">
            <div className="flex just items-center gap-2">
                <img src={Logo} alt="logo" className="w-14 h-14" />
                <div
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => navigate("/board")}
                >
                    TasksBoard
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Link
                    className="flex justify-center items-center gap-1"
                    to="/board/weather"
                >
                    <TiWeatherCloudy size={25} />
                    <span className="hidden md:inline-block"> Weather</span>
                </Link>
                <Link
                    className="flex justify-center items-center gap-1"
                    to="/board/calculator"
                >
                    <BsFillCalculatorFill size={20} />
                    <span className="hidden md:inline-block"> Calculator</span>
                </Link>
                <img
                    src="https://i.pravatar.cc/300"
                    alt="profile"
                    className="w-10 rounded-full ml-2 md:ml-6"
                />
            </div>
        </div>
    );
};

export default Header;
