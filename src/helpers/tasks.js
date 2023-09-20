class Lists {
    constructor() {}

    makeLocalStorageIfNotExist() {
        if (!localStorage.getItem("lists")) {
            localStorage.setItem("lists", JSON.stringify([]));
        }
    }

    getLists() {
        this.makeLocalStorageIfNotExist();
        const lists = JSON.parse(localStorage.getItem("lists"));
        return lists;
    }

    addNewList(listname) {
        this.makeLocalStorageIfNotExist();
        const exisitingLists = this.getLists();
        const newList = {
            name: listname,
            tasks: [],
        };

        exisitingLists.push(newList);
        localStorage.setItem("lists", JSON.stringify(exisitingLists));

        return {
            success: true,
            message: "List created successfully",
        };
    }

    deleteList(index) {
        this.makeLocalStorageIfNotExist();
        const updated = this.getLists()
            .map((list, i) => {
                return {
                    ...list,
                    id: i,
                };
            })
            .filter((list) => list.id !== index);

        localStorage.setItem("lists", JSON.stringify(updated));
        return {
            success: true,
            message: "List deleted successfully",
        };
    }

    getListByName(name) {
        this.makeLocalStorageIfNotExist();
        const exisitingLists = this.getLists();
        const list = exisitingLists.find((list) => list.name === name);
        return list;
    }

    upsertTask(listindex, task) {
        this.makeLocalStorageIfNotExist();
        const exisitingLists = this.getLists();
        const list = exisitingLists[listindex];

        console.log(task);

        const taskIndex = list.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex === -1) {
            list.tasks.push(task);
        } else {
            list.tasks[taskIndex] = task;
        }
        const updatedLists = exisitingLists.map((l, i) => {
            if (i === listindex) {
                return list;
            }
            return l;
        });
        console.log(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        return {
            success: true,
            message: `Task ${
                taskIndex === -1 ? "created" : "updated"
            } successfully`,
        };
    }

    deleteTask(listindex, taskid) {
        this.makeLocalStorageIfNotExist();
        const exisitingLists = this.getLists();
        const list = exisitingLists[listindex];
        const taskIndex = list.tasks.findIndex((t) => t.id === taskid);
        if (taskIndex === -1) {
            return {
                success: false,
                message: "Task does not exist",
            };
        }
        list.tasks.splice(taskIndex, 1);
        localStorage.setItem("lists", JSON.stringify(exisitingLists));
        return {
            success: true,
            message: "Task deleted successfully",
        };
    }
}

const LIST = new Lists();

export default LIST;
