import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import ListCard from "../components/ListCard";
import uuid from "../helpers/uuid";
import NewListModal from "../components/NewListModal";
import NewTaskModal from "../components/NewTaskModal";
import LIST from "../helpers/tasks";
import { useNavigate } from "react-router-dom";

const Board = () => {
    const navigate = useNavigate();

    const [lists, setLists] = useState(LIST.getLists());

    const [newListModal, setNewListModal] = useState(false);
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [selectedListIndex, setSelectedListIndex] = useState(0);

    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if (!authenticated) {
            navigate("/login");
            return;
        }
        const time = JSON.parse(authenticated).time;
        // logout after 1 hour
        if (new Date().getTime() - time > 60 * 60 * 1000) {
            localStorage.removeItem("authenticated");
            navigate("/login");
            return;
        }
    }, [navigate]);

    return (
        <div className="">
            <main className="p-4">
                <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                    {lists.map((list, index) => (
                        <ListCard
                            key={uuid()}
                            name={list.name}
                            tasks={list.tasks}
                            openNewTaskModal={() => {
                                setSelectedListIndex(index);
                                setNewTaskModal(true);
                            }}
                            updateTaskStatus={(task, status) => {
                                const res = LIST.upsertTask(index, {
                                    ...task,
                                    status,
                                });
                                window.postMessage({
                                    type: res.success ? "success" : "error",
                                    message: res.message,
                                });
                                if (!res.success) {
                                    return;
                                }
                                const newLists = lists.map((list, index) => {
                                    if (index === selectedListIndex) {
                                        return {
                                            ...list,
                                            tasks: list.tasks.map((t) => {
                                                if (t.id === task.id) {
                                                    return {
                                                        ...t,
                                                        status,
                                                    };
                                                }
                                                return t;
                                            }),
                                        };
                                    }
                                    return list;
                                });
                                setLists(newLists);
                            }}
                            deleteList={() => {
                                const res = LIST.deleteList(index);
                                window.postMessage({
                                    type: res.success ? "success" : "error",
                                    message: res.message,
                                });
                                if (!res.success) {
                                    return;
                                }
                                const newLists = lists.filter(
                                    (_, i) => i !== index
                                );
                                setLists(newLists);
                            }}
                        />
                    ))}
                </div>
            </main>

            {newTaskModal ? (
                <NewTaskModal
                    close={() => setNewTaskModal(false)}
                    addNewTask={(task) => {
                        const res = LIST.upsertTask(selectedListIndex, task);
                        window.postMessage({
                            type: res.success ? "success" : "error",
                            message: res.message,
                        });
                        if (!res.success) {
                            return;
                        }
                        const newLists = lists.map((list, index) => {
                            if (index === selectedListIndex) {
                                return {
                                    ...list,
                                    tasks: [...list.tasks, task],
                                };
                            }
                            return list;
                        });
                        setLists(newLists);
                    }}
                />
            ) : null}

            {newListModal ? (
                <NewListModal
                    close={() => setNewListModal(false)}
                    addNewList={(newList) => {
                        const res = LIST.addNewList(newList.name);
                        window.postMessage({
                            type: res.success ? "success" : "error",
                            message: res.message,
                        });
                        if (!res.success) {
                            return;
                        }
                        setLists([...lists, newList]);
                    }}
                />
            ) : null}

            <div
                onClick={() => setNewListModal(true)}
                className="fixed cursor-pointer hover:scale-95 active:scale-75 duration-200 bottom-10 right-10"
            >
                <AiFillPlusCircle
                    className="text-primary text-4xl cursor-pointer"
                    size={60}
                />
            </div>
        </div>
    );
};

export default Board;
