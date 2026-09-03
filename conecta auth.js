// =========================
// CONECTA V2 - AUTH.JS
// =========================

// ---------- HELPERS ----------

function getUsers() {
    return JSON.parse(
        localStorage.getItem("users")
    ) || [];
}

function saveUsers(users) {
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

function setCurrentUser(user) {
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );
}

// ---------- REGISTER ----------

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();

    const classroom =
        document.getElementById(
            "registerClass"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;

    if (
        !name ||
        !email ||
        !password
    ) {

        alert(
            "Preencha todos os campos."
        );

        return;
    }

    const users = getUsers();

    const exists =
        users.find(
            user =>
                user.email === email
        );

    if (exists) {

        alert(
            "Este e-mail já está cadastrado."
        );

        return;
    }

    const newUser = {

        id: Date.now(),

        name,

        email,

        password,

        classroom,

        bio: "Olá! Eu uso o Conecta.",

        xp: 0,

        verified: false,

        achievements: [],

        createdAt:
            new Date().toISOString()

    };

    users.push(newUser);

    saveUsers(users);

    alert(
        "Conta criada com sucesso!"
    );

    document
        .getElementById(
            "registerForm"
        )
        .reset();

    showPage(
        "loginPage"
    );

}

// ---------- LOGIN ----------

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const users =
        getUsers();

    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );

    if (!user) {

        alert(
            "E-mail ou senha inválidos."
        );

        return;
    }

    setCurrentUser(user);

    showPage(
        "appPage"
    );

    if (
        typeof updateUserCard
        === "function"
    ) {

        updateUserCard();

    }

    if (
        typeof updateProfile
        === "function"
    ) {

        updateProfile();

    }

    if (
        typeof loadPosts
        === "function"
    ) {

        loadPosts();

    }

    if (
        typeof loadGroups
        === "function"
    ) {

        loadGroups();

    }

    if (
        typeof loadEvents
        === "function"
    ) {

        loadEvents();

    }

}

// ---------- PROFILE UPDATE ----------

function updateCurrentUser(
    updatedData
) {

    const users =
        getUsers();

    const current =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    if (!current) return;

    const index =
        users.findIndex(
            user =>
                user.id === current.id
        );

    if (index === -1) return;

    users[index] = {
        ...users[index],
        ...updatedData
    };

    saveUsers(users);

    localStorage.setItem(
        "currentUser",
        JSON.stringify(
            users[index]
        )
    );

}

// ---------- PROFILE FORM ----------

function saveProfile(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "editName"
        ).value;

    const bio =
        document.getElementById(
            "editBio"
        ).value;

    updateCurrentUser({

        name,
        bio

    });

    updateUserCard();
    updateProfile();

    alert(
        "Perfil atualizado!"
    );

    document
        .getElementById(
            "profileModal"
        )
        .style.display = "none";

}

// ---------- MODAL ----------

function openProfileModal() {

    const modal =
        document.getElementById(
            "profileModal"
        );

    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    if (!user) return;

    document.getElementById(
        "editName"
    ).value =
        user.name;

    document.getElementById(
        "editBio"
    ).value =
        user.bio || "";

    modal.style.display =
        "flex";

}

function closeProfileModal() {

    document.getElementById(
        "profileModal"
    ).style.display =
        "none";

}

// ---------- PAGE LINKS ----------

function registerAuthEvents() {

    const registerForm =
        document.getElementById(
            "registerForm"
        );

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            registerUser
        );

    }

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }

    const registerLink =
        document.getElementById(
            "openRegister"
        );

    if (registerLink) {

        registerLink.addEventListener(
            "click",
            e => {

                e.preventDefault();

                showPage(
                    "registerPage"
                );

            }
        );

    }

    const loginLink =
        document.getElementById(
            "backToLogin"
        );

    if (loginLink) {

        loginLink.addEventListener(
            "click",
            e => {

                e.preventDefault();

                showPage(
                    "loginPage"
                );

            }
        );

    }

    const editProfile =
        document.getElementById(
            "editProfileBtn"
        );

    if (editProfile) {

        editProfile.addEventListener(
            "click",
            openProfileModal
        );

    }

    const closeButton =
        document.querySelector(
            ".close-modal"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeProfileModal
        );

    }

    const profileForm =
        document.getElementById(
            "profileForm"
        );

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfile
        );

    }

}

// ---------- INIT ----------

document.addEventListener(
    "DOMContentLoaded",
    registerAuthEvents
);