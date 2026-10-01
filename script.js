// ========================================
// ELEMENTLƏRİ GÖTÜRÜRÜK
// ========================================

// AUTH

const authContainer =
    document.getElementById("authContainer");


// TODO

const todoContainer =
    document.getElementById("todoContainer");


// LOGIN

const loginSection =
    document.getElementById("loginSection");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const loginButton =
    document.getElementById("loginButton");


// REGISTER

const registerSection =
    document.getElementById("registerSection");

const registerUsername =
    document.getElementById("registerUsername");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const registerButton =
    document.getElementById("registerButton");


// NAVIGATION

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");


// MESSAGE

const message =
    document.getElementById("message");


// TODO ELEMENTS

const usernameDisplay =
    document.getElementById("usernameDisplay");

const logoutButton =
    document.getElementById("logoutButton");

const taskInput =
    document.getElementById("taskInput");

const addButton =
    document.getElementById("addButton");

const taskList =
    document.getElementById("taskList");


// ========================================
// LOCAL STORAGE
// ========================================

// User-ləri LocalStorage-dan götürürük

let users = JSON.parse(
    localStorage.getItem("users")
) || [];


// Hazırda login olmuş user

let currentUser =
    localStorage.getItem("currentUser");


// ========================================
// REGISTER FORMUNU GÖSTƏR
// ========================================

showRegister.addEventListener(
    "click",
    function () {

        loginSection.classList.add("hidden");

        registerSection.classList.remove("hidden");

        message.textContent = "";

    }
);


// ========================================
// LOGIN FORMUNU GÖSTƏR
// ========================================

showLogin.addEventListener(
    "click",
    function () {

        registerSection.classList.add("hidden");

        loginSection.classList.remove("hidden");

        message.textContent = "";

    }
);


// ========================================
// REGISTER
// ========================================

registerButton.addEventListener(
    "click",
    function () {

        const username =
            registerUsername.value.trim();

        const password =
            registerPassword.value;

        const confirm =
            confirmPassword.value;


        // Boş sahələr

        if (
            username === "" ||
            password === "" ||
            confirm === ""
        ) {

            message.style.color = "#dc3545";

            message.textContent =
                "Bütün xanaları doldurun.";

            return;
        }


        // Password yoxlaması

        if (password !== confirm) {

            message.style.color = "#dc3545";

            message.textContent =
                "Şifrələr eyni deyil.";

            return;
        }


        // User artıq mövcuddur?

        const existingUser =
            users.find(
                function (user) {

                    return (
                        user.username === username
                    );

                }
            );


        if (existingUser) {

            message.style.color = "#dc3545";

            message.textContent =
                "Bu username artıq mövcuddur.";

            return;
        }


        // Yeni user yaradırıq

        const newUser = {

            username: username,

            password: password,

            tasks: []

        };


        // User-i siyahıya əlavə edirik

        users.push(newUser);


        // LocalStorage-a yazırıq

        saveUsers();


        // Uğur mesajı

        message.style.color = "green";

        message.textContent =
            "Qeydiyyat uğurla tamamlandı!";


        // Register formunu təmizləyirik

        registerUsername.value = "";

        registerPassword.value = "";

        confirmPassword.value = "";


        // 1 saniyədən sonra Login-ə keçir

        setTimeout(
            function () {

                registerSection.classList.add(
                    "hidden"
                );

                loginSection.classList.remove(
                    "hidden"
                );

                message.textContent = "";

            },
            1000
        );

    }
);


// ========================================
// LOGIN
// ========================================

loginButton.addEventListener(
    "click",
    function () {

        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value;


        // User-i tapırıq

        const user =
            users.find(
                function (user) {

                    return (
                        user.username === username &&
                        user.password === password
                    );

                }
            );


        // User tapılmadı

        if (!user) {

            message.style.color = "#dc3545";

            message.textContent =
                "Username və ya password yanlışdır.";

            return;
        }


        // Current user

        currentUser = username;


        // LocalStorage-a yazırıq

        localStorage.setItem(
            "currentUser",
            currentUser
        );


        // Todo səhifəsini açırıq

        openTodo();

    }
);


// ========================================
// TODO SƏHİFƏSİNİ AÇ
// ========================================

function openTodo() {

    authContainer.classList.add(
        "hidden"
    );

    todoContainer.classList.remove(
        "hidden"
    );


    // Username göstər

    usernameDisplay.textContent =
        currentUser;


    // Task-ları yüklə

    loadTasks();

}


// ========================================
// TASK-LARI YÜKLƏ
// ========================================

function loadTasks() {

    // Əvvəl siyahını təmizləyirik

    taskList.innerHTML = "";


    // Current user-i tapırıq

    const user =
        users.find(
            function (user) {

                return (
                    user.username === currentUser
                );

            }
        );


    if (!user) {

        return;

    }


    // User-in task-larını göstəririk

    user.tasks.forEach(
        function (task) {

            createTask(task);

        }
    );

}


// ========================================
// TASK YARAT
// ========================================

function createTask(task) {

    // LI

    const li =
        document.createElement("li");


    // Əgər tamamlanıbsa

    if (task.completed) {

        li.classList.add(
            "completed"
        );

    }


    // TASK TEXT

    const span =
        document.createElement("span");

    span.className =
        "task-text";

    span.textContent =
        task.text;


    // Task-a klik etdikdə tamamlanır

    span.addEventListener(
        "click",
        function () {

            task.completed =
                !task.completed;


            // LocalStorage-a yadda saxla

            saveUsers();


            // Görünüşü dəyiş

            li.classList.toggle(
                "completed"
            );

        }
    );


    // DELETE BUTTON

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "Sil";

    deleteButton.className =
        "delete-button";


    // Sil düyməsi

    deleteButton.addEventListener(
        "click",
        function () {

            deleteTask(task.id);

        }
    );


    // Elementləri birləşdiririk

    li.appendChild(span);

    li.appendChild(deleteButton);


    // Siyahıya əlavə edirik

    taskList.appendChild(li);

}


// ========================================
// TASK ƏLAVƏ ET
// ========================================

addButton.addEventListener(
    "click",
    addTask
);


// ENTER İLƏ TASK ƏLAVƏ ET

taskInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// TASK ƏLAVƏ FUNKSİYASI

function addTask() {

    const text =
        taskInput.value.trim();


    // Boşdursa

    if (text === "") {

        alert(
            "Zəhmət olmasa tapşırıq yazın!"
        );

        return;
    }


    // Current user

    const user =
        users.find(
            function (user) {

                return (
                    user.username === currentUser
                );

            }
        );


    if (!user) {

        return;

    }


    // Yeni task

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    // User-in task-larına əlavə et

    user.tasks.push(
        newTask
    );


    // LocalStorage-a yaz

    saveUsers();


    // Ekranda göstər

    createTask(
        newTask
    );


    // Input-u təmizlə

    taskInput.value = "";

    taskInput.focus();

}


// ========================================
// TASK SİL
// ========================================

function deleteTask(taskId) {

    // Current user

    const user =
        users.find(
            function (user) {

                return (
                    user.username === currentUser
                );

            }
        );


    if (!user) {

        return;

    }


    // Task-ı sil

    user.tasks =
        user.tasks.filter(
            function (task) {

                return (
                    task.id !== taskId
                );

            }
        );


    // LocalStorage

    saveUsers();


    // Siyahını yenilə

    loadTasks();

}


// ========================================
// USERS-İ LOCALSTORAGE-A YAZ
// ========================================

function saveUsers() {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


// ========================================
// LOGOUT
// ========================================

logoutButton.addEventListener(
    "click",
    function () {

        // Current user-i sil

        currentUser = null;


        // LocalStorage-dan sil

        localStorage.removeItem(
            "currentUser"
        );


        // Todo-nu gizlət

        todoContainer.classList.add(
            "hidden"
        );


        // Login-i göstər

        authContainer.classList.remove(
            "hidden"
        );


        // Login sahələrini təmizlə

        loginUsername.value = "";

        loginPassword.value = "";


        // Task siyahısını təmizlə

        taskList.innerHTML = "";

    }
);


// ========================================
// SƏHİFƏ YENİDƏN AÇILANDA
// ========================================

if (currentUser) {

    const userExists =
        users.find(
            function (user) {

                return (
                    user.username === currentUser
                );

            }
        );


    if (userExists) {

        openTodo();

    } else {

        localStorage.removeItem(
            "currentUser"
        );

        currentUser = null;

    }

}