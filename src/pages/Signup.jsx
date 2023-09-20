import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosCheckboxOutline } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";
import USER from "../helpers/users";
import { Link, useNavigate } from "react-router-dom";
import LIST from "../helpers/tasks";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSignup = () => {
        if (!email || !password || !username) {
            return window.postMessage({
                type: "error",
                message: "Please fill all the fields",
            });
        }
        if (!acceptTerms) {
            return window.postMessage({
                type: "error",
                message: "Please accept terms and conditions",
            });
        }
        // email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return window.postMessage({
                type: "error",
                message: "Please enter a valid email address",
            });
        }

        const res = USER.signup({
            email,
            password,
            username,
        });
        if (res.success) {
            window.postMessage({
                type: "success",
                message: res.message,
            });
            LIST.addNewList("My Tasks");
            setTimeout(() => {
                navigate("/login");
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
                <title>Sign up</title>
            </Helmet>
            <div className="w-[100vw] h-[100vh] bg-primary text-white flex justify-center items-center flex-col">
                <h1 className="text-4xl font-bold">Sign up!</h1>
                <fieldset className="mt-8 border-[1px] border-white   min-w-[400px]">
                    <legend className="m-auto px-4">Username</legend>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        className="w-full py-4 px-2 bg-transparent relative bottom-1 border-none outline-none text-white"
                    />
                </fieldset>{" "}
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
                        {!acceptTerms ? (
                            <RiCheckboxBlankLine
                                stroke="white"
                                className="text-2xl text-white fill-white"
                                onClick={() => setAcceptTerms(true)}
                            />
                        ) : (
                            <IoIosCheckboxOutline
                                className="text-2xl text-white"
                                onClick={() => setAcceptTerms(false)}
                            />
                        )}
                        <span className="text-sm">
                            I accept the terms & conditions
                        </span>
                    </div>
                    <div>
                        <Link to={"/login"}>
                            <span className="text-sm">Login</span>
                        </Link>
                    </div>
                </div>
                <button
                    onClick={handleSignup}
                    className="mt-8 bg-white text-primary py-4 px-14 active:opacity-40 hover:opacity-60 transition-all duration-300"
                >
                    Sign up
                </button>
            </div>
        </>
    );
};

export default Signup;
