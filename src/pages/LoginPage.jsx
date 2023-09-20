import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosCheckboxOutline } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";
import USER from "../helpers/users";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            return window.postMessage({
                type: "error",
                message: "Please fill all the fields",
            });
        }
        const res = USER.login(email, password);
        if (res.success) {
            window.postMessage({
                type: "success",
                message: res.message,
            });
            setTimeout(() => {
                localStorage.setItem(
                    "authenticated",
                    JSON.stringify({
                        time: new Date().getTime(),
                    })
                );
                if (rememberMe) localStorage.setItem("authenticated", true);
                navigate("/board");
            }, 2000);
        } else {
            window.postMessage({
                type: "error",
                message: res.message,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="w-[100vw] h-[100vh] bg-primary text-white flex justify-center items-center flex-col">
                <h1 className="text-4xl font-bold">Log in!</h1>
                <fieldset className="mt-8 border-[1px] border-white   min-w-[400px]">
                    <legend className="m-auto px-4">Email Address</legend>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="abc@gmail.com"
                        className="w-full py-4 px-2 bg-transparent relative bottom-1 border-none outline-none text-white"
                    />
                </fieldset>
                <fieldset className="mt-8 border-[1px] border-white   min-w-[400px]">
                    <legend className="m-auto px-4">Password</legend>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full py-4 px-2 bg-transparent relative bottom-1 border-none outline-none text-white"
                    />
                </fieldset>

                <div className="flex w-[400px] justify-between mt-6">
                    <div className="flex items-center justify-center gap-1">
                        {rememberMe ? (
                            <RiCheckboxBlankLine
                                stroke="white"
                                className="text-2xl text-white fill-white"
                                onClick={() => setRememberMe(false)}
                            />
                        ) : (
                            <IoIosCheckboxOutline
                                className="text-2xl text-white"
                                onClick={() => setRememberMe(true)}
                            />
                        )}
                        <span className="text-sm">Remember me</span>
                    </div>
                    <div>
                        <Link to={"/signup"}>
                            <span className="text-sm">Sign up</span>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleLogin}
                    className="mt-8 bg-white text-primary py-4 px-14 active:opacity-40 hover:opacity-60 transition-all duration-300"
                >
                    Log In
                </button>
            </div>
        </>
    );
};

export default LoginPage;
