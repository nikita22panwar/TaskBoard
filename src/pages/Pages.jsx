import {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";
import uuid from "../helpers/uuid";
import Signup from "./Signup";
import Board from "./Board";
import Calculator from "../components/Calculator";
import Weather from "../components/Weather";
import Header from "../components/Header";

const Redirect = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(props.to, { replace: true });
    }, [navigate, props.to]);
    return null;
};

const Dashboard = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

const Pages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        window.onmessage = (e) => {
            if (e.data.type === "success") {
                setMessages((prev) => [
                    ...prev,
                    { message: e.data.message, type: "success" },
                ]);
            } else if (e.data.type === "error") {
                setMessages((prev) => [
                    ...prev,
                    { message: e.data.message, type: "error" },
                ]);
            }

            setTimeout(() => {
                setMessages((prev) => prev.slice(1));
            }, 3000);
        };
    }, []);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Redirect to="login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* Dashboard */}
                    <Route path="/board" element={<Dashboard />}>
                        <Route index element={<Board />} />
                        <Route path="weather" element={<Weather />} />
                        <Route path="calculator" element={<Calculator />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <div className=" text-white fixed bottom-10 z-50 left-[50vw] -translate-x-1/2 flex flex-col gap-4">
                {messages.map((message) => (
                    <div
                        key={uuid()}
                        className={
                            message.type === "success"
                                ? " bg-green-600 p-4 rounded-md slide-in-bottom"
                                : "  bg-red-600 p-4 rounded-md slide-in-bottom"
                        }
                    >
                        {message.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pages;
