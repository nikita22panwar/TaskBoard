import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import uuid from "../helpers/uuid";

const NewTaskModal = ({ close, addNewTask }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    return (
        <div
            onClick={close}
            className="fixed top-0 left-0 bg-primary bg-opacity-50 w-[100vw] h-[100vh] flex justify-center items-center"
        >
            <div
                className="bg-white p-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <div className="text-primary text-sm ">New Task</div>
                    <RxCross1
                        onClick={close}
                        className="cursor-pointer"
                        size={20}
                    />
                </div>
                <label
                    htmlFor="taskName"
                    className="text-sm text-gray-600 mt-4 mb-2"
                >
                    Task Name
                </label>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Task Name"
                    className="p-2 w-[300px] border"
                />
                <label
                    htmlFor="taskName"
                    className="text-sm text-gray-600 mt-4 mb-2"
                >
                    Task Description
                </label>
                <textarea
                    rows={3}
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Description"
                    className="p-2 w-[300px] border"
                />
                <label
                    htmlFor="taskName"
                    className="text-sm text-gray-600 mt-4 mb-2"
                >
                    Add Date
                </label>
                <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    placeholder="Date"
                    className="p-2 w-[300px] border text-xs text-gray-600"
                />

                <button
                    className="bg-primary text-white p-2 mt-4"
                    onClick={() => {
                        if (!taskName) {
                            window.postMessage({
                                type: "error",
                                message: "Task name cannot be empty",
                            });
                            return;
                        }
                        addNewTask({
                            name: taskName,
                            description: taskDescription,
                            date: taskDate,
                            status: "pending",
                            id: uuid(),
                        });
                        setTaskName("");
                        setTaskDescription("");
                        setTaskDate("");
                        close();
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default NewTaskModal;
