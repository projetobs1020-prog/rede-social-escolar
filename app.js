// =========================
// CONECTA V2 - APP.JS
// =========================

// ---------- STORAGE ----------

const Storage = {

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    set(key, value) {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }

};

// ---------- DEFAULT DATA ----------

function initializeDatabase() {

    if (!Storage.get("users")) {
        Storage.set("users", []);
    }

    if (!Storage.get("posts")) {
        Storage.set("posts", []);
    }

    if (!Storage.get("groups")) {
        Storage.set("groups", []);
    }

    if (!Storage.get("events")) {
        Storage.set("events", []);
    }

    if (!Storage.get("notifications")) {
        Storage.set("notifications", []);
    }

    if (!Storage.get("achievements")) {

        Storage.set("achievements", [

            {
                id: 1,
                title: "🏆 Primeiro Post"
            },

            {
                id: 2,
                title: "💬 Primeiro Comentário"
            },

            {
                id: 3,
                title: "⭐ 100 XP"
            },

            {
                id: 4,
                title: "🔥 10 Publicações"
            }

        ]);
    }
}

// ---------- LOADING ----------

function hideLoading() {

    setTimeout(() => {

        const loading =
            document.getElementById(
                "loadingScreen"
            );

        if (loading) {
            loading.style.display = "none";
        }

    }, 1200);

}

// ---------- PAGE CONTROL ----------

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });

    document
        .getElementById(pageId)
        .classList.add("active");

}

// ---------- SECTION CONTROL ----------

function showSection(sectionName) {

    document
        .querySelectorAll(
            ".content-section"
        )
        .forEach(section => {

            section.classList.remove(
                "active"
            );

        });

    document
        .querySelectorAll(
            ".nav-btn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });

    const target =
        document.getElementById(
            sectionName + "Section"
        );

    if (target) {
        target.classList.add("active");
    }

    document
        .querySelector(
            `[data-section="${sectionName}"]`
        )
        ?.classList.add("active");

}

// ---------- THEME ----------

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme) {

        document.body.setAttribute(
            "data-theme",
            savedTheme
        );

    }

}

function toggleTheme() {

    const current =
        document.body.getAttribute(
            "data-theme"
        );

    const next =
        current === "dark"
        ? "light"
        : "dark";

    document.body.setAttribute(
        "data-theme",
        next
    );

    localStorage.setItem(
        "theme",
        next
    );

}

// ---------- USER ----------

function getCurrentUser() {

    return Storage.get(
        "currentUser"
    );

}

function updateUserCard() {

    const user =
        getCurrentUser();

    if (!user) return;

    const name =
        document.getElementById(
            "userName"
        );

    const turma =
        document.getElementById(
            "userClass"
        );

    const xp =
        document.getElementById(
            "userXP"
        );

    if (name)
        name.textContent =
            user.name;

    if (turma)
        turma.textContent =
            user.classroom;

    if (xp)
        xp.textContent =
            user.xp + " XP";

}

// ---------- PROFILE ----------

function updateProfile() {

    const user =
        getCurrentUser();

    if (!user) return;

    document.getElementById(
        "profileName"
    ).textContent =
        user.name;

    document.getElementById(
        "profileBio"
    ).textContent =
        user.bio || "Sem bio.";

    document.getElementById(
        "profileXP"
    ).textContent =
        user.xp || 0;

}

// ---------- NOTIFICATIONS ----------

function updateNotificationCounter() {

    const notifications =
        Storage.get(
            "notifications"
        ) || [];

    const counter =
        document.getElementById(
            "notificationCount"
        );

    if (counter) {

        counter.textContent =
            notifications.length;

    }

}

// ---------- LOGOUT ----------

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    showPage(
        "loginPage"
    );

}

// ---------- EVENTS ----------

function registerGlobalEvents() {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            toggleTheme
        );

    }

    const logoutButton =
        document.getElementById(
            "logoutBtn"
        );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }

    document
        .querySelectorAll(
            ".nav-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.section
                    );

                }
            );

        });

}

// ---------- START ----------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDatabase();

        loadTheme();

        hideLoading();

        registerGlobalEvents();

        const currentUser =
            getCurrentUser();

        if (currentUser) {

            showPage(
                "appPage"
            );

            updateUserCard();
            updateProfile();
            updateNotificationCounter();

        } else {

            showPage(
                "loginPage"
            );

        }

    }
);
