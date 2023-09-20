import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const NewListModal = ({ close, addNewList }) => {
    const [listname, setListname] = useState("");
    return (
        <div
            onClick={close}
            className="fixed top-0 left-0 bg-primary bg-opacity-50 w-[100vw] h-[100vh] flex justify-center items-center"
        >
            <div
                className="bg-white p-4 flex justify-center items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="text"
                    value={listname}
                    onChange={(e) => setListname(e.target.value)}
                    placeholder="New List"
                    className="p-2 w-[300px]"
                />
                <AiFillPlusCircle
                    className="text-primary text-4xl cursor-pointer"
                    size={30}
                    onClick={() => {
                        if (!listname) {
                            window.postMessage({
                                type: "error",
                                message: "List name cannot be empty",
                            });
                            return;
                        }
                        addNewList({
                            name: listname,
                            tasks: [],
                        });
                        setListname("");
                        close();
                    }}
                />
            </div>
        </div>
    );
};

export default NewListModal;
