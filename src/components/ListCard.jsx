import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsCircle, BsCheck2Circle } from "react-icons/bs";
import { useEffect, useState } from "react";

const ListCard = ({
    name,
    tasks,
    openNewTaskModal,
    updateTaskStatus,
    deleteList,
}) => {
    const [dropDownPostion, setDropDownPostion] = useState({
        x: 0,
        y: 0,
        show: false,
    });

    useEffect(() => {
        const handleClick = (e) => {
            console.log(e.target.className);
            if (e.target.className.includes("delete-btn")) {
                return;
            }
            setDropDownPostion({
                ...dropDownPostion,
                show: false,
            });
        };
        window.addEventListener("mousedown", handleClick);
        return () => {
            window.removeEventListener("mousedown", handleClick);
        };
    }, [dropDownPostion]);
    return (
        <div>
            <div className="border-primary border-[1px] p-2 w-[90vw] md:w-[300px]">
                <div className="flex justify-between items-center">
                    <div className="text-primary text-sm ">{name}</div>
                    <BiDotsVerticalRounded
                        className="text-primary text-xl cursor-pointer"
                        onClick={(e) =>
                            setDropDownPostion({
                                x: e.clientX,
                                y: e.clientY,
                                show: true,
                            })
                        }
                    />

                    {dropDownPostion.show ? (
                        <div
                            className="fixed p-2 bg-white shadow border-primary dropdown"
                            style={{
                                top: dropDownPostion.y,
                                left: dropDownPostion.x,
                            }}
                        >
                            <div
                                className="p-2 cursor-pointer hover:bg-gray-100 delete-btn"
                                onClick={() => {
                                    deleteList();

                                    setDropDownPostion({
                                        ...dropDownPostion,
                                        show: false,
                                    });
                                }}
                            >
                                Delete
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="my-4">
                    {tasks
                        .filter((t) => t.status === "pending")
                        .map((task) => (
                            <div key={task.id}>
                                <div className="flex gap-2 justify-start items-center mt-2">
                                    <BsCircle
                                        className="text-primary text-xs"
                                        size={20}
                                        onClick={() =>
                                            updateTaskStatus(task, "completed")
                                        }
                                    />
                                    <div className="text-sm">{task.name}</div>
                                </div>
                            </div>
                        ))}
                </div>

                {tasks.filter((t) => t.status === "completed").length ? (
                    <div className="text-green-600">
                        Completed (
                        {tasks.filter((t) => t.status === "completed").length})
                    </div>
                ) : null}

                <div className="my-4">
                    {tasks
                        .filter((t) => t.status === "completed")
                        .map((task) => (
                            <div key={task.id}>
                                <div className="flex gap-2 justify-start items-center mt-2">
                                    <BsCheck2Circle
                                        className="text-green-500 text-xs"
                                        size={20}
                                        onClick={() =>
                                            updateTaskStatus(task, "pending")
                                        }
                                    />
                                    <div className="text-sm text-green-500">
                                        {task.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div
                    onClick={openNewTaskModal}
                    className="flex justify-start items-center gap-2 mt-4 cursor-pointer hover:opacity-75 active:opacity-40 duration-200"
                >
                    <AiFillPlusCircle
                        className="text-primary text-4xl cursor-pointer"
                        size={30}
                    />
                    <span className="text-primary text-sm cursor-pointer">
                        Add a task
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
