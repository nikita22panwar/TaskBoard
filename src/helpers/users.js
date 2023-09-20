import uuid from "./uuid";

class Users {
    constructor() {}

    makeLocalStorageIfNotExist() {
        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify([]));
        }
    }

    getUsers() {
        this.makeLocalStorageIfNotExist();
        this.users = JSON.parse(localStorage.getItem("users"));
        return this.users;
    }

    signup({ username, email, password }) {
        this.makeLocalStorageIfNotExist();
        const exisitingUsers = this.getUsers();
        const emailAlreadyExists = exisitingUsers.find(
            (user) => user.email === email
        );
        const usernameAlreadyExists = exisitingUsers.find(
            (user) => user.username === username
        );

        if (emailAlreadyExists || usernameAlreadyExists) {
            return {
                success: false,
                message: usernameAlreadyExists
                    ? "Username already exists"
                    : "Email already exists",
            };
        }

        const newUser = {
            id: uuid(),
            username,
            email,
            password,
        };

        exisitingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(exisitingUsers));

        return {
            success: true,
            message: "User created successfully",
        };
    }

    getUserById(id) {
        this.makeLocalStorageIfNotExist();
        const exisitingUsers = this.getUsers();
        const user = exisitingUsers.find((user) => user.id === id);
        return user;
    }

    login(email, password) {
        this.makeLocalStorageIfNotExist();
        const exisitingUsers = this.getUsers();
        const user = exisitingUsers.find(
            (user) => user.email === email && user.password === password
        );
        if (!user) {
            return {
                success: false,
                message: "Invalid credentials",
            };
        }
        return {
            success: true,
            message: "Login successful",
            user,
        };
    }
}

const USER = new Users();

export default USER;
