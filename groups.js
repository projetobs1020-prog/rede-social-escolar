// =========================
// CONECTA V2 - GROUPS.JS
// =========================

// ---------- STORAGE ----------

function getGroups() {

    return JSON.parse(
        localStorage.getItem("groups")
    ) || [];

}

function saveGroups(groups) {

    localStorage.setItem(
        "groups",
        JSON.stringify(groups)
    );

}

// ---------- USER ----------

function getCurrentUserGroup() {

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}

// ---------- CREATE GROUP ----------

function createGroup() {

    const name =
        prompt(
            "Nome do grupo:"
        );

    if (!name) return;

    const description =
        prompt(
            "Descrição do grupo:"
        ) || "";

    const user =
        getCurrentUserGroup();

    const groups =
        getGroups();

    groups.unshift({

        id: Date.now(),

        name,

        description,

        ownerId: user.id,

        ownerName: user.name,

        members: [user.id],

        createdAt:
            new Date()
            .toLocaleString()

    });

    saveGroups(groups);

    if (
        typeof addXP ===
        "function"
    ) {

        addXP(15);

    }

    addNotification(
        "Grupo criado: " +
        name
    );

    loadGroups();

}

// ---------- JOIN GROUP ----------

function joinGroup(groupId) {

    const user =
        getCurrentUserGroup();

    const groups =
        getGroups();

    const group =
        groups.find(
            g => g.id === groupId
        );

    if (!group) return;

    if (
        group.members.includes(
            user.id
        )
    ) {

        alert(
            "Você já participa deste grupo."
        );

        return;
    }

    group.members.push(
        user.id
    );

    saveGroups(groups);

    if (
        typeof addXP ===
        "function"
    ) {

        addXP(5);

    }

    addNotification(
        "Você entrou no grupo " +
        group.name
    );

    loadGroups();

}

// ---------- LEAVE GROUP ----------

function leaveGroup(groupId) {

    const user =
        getCurrentUserGroup();

    const groups =
        getGroups();

    const group =
        groups.find(
            g => g.id === groupId
        );

    if (!group) return;

    group.members =
        group.members.filter(
            member =>
                member !== user.id
        );

    saveGroups(groups);

    addNotification(
        "Você saiu do grupo " +
        group.name
    );

    loadGroups();

}

// ---------- RENDER ----------

function loadGroups() {

    const container =
        document.getElementById(
            "groupsContainer"
        );

    if (!container) return;

    const groups =
        getGroups();

    const user =
        getCurrentUserGroup();

    if (groups.length === 0) {

        container.innerHTML = `

            <div class="group-card">

                <h3>
                    Nenhum grupo criado.
                </h3>

                <p>
                    Crie o primeiro grupo.
                </p>

            </div>

        `;

        return;

    }

    container.innerHTML =
        groups.map(group => {

            const joined =
                group.members.includes(
                    user.id
                );

            return `

            <div class="group-card">

                <h3>
                    ${group.name}
                </h3>

                <p>
                    ${group.description}
                </p>

                <small>

                    Criado por:
                    ${group.ownerName}

                </small>

                <br><br>

                <small>

                    👥
                    ${group.members.length}
                    participantes

                </small>

                <br><br>

                ${
                    joined
                    ?

                    `
                    <button
                    onclick="leaveGroup(${group.id})">

                        Sair do Grupo

                    </button>
                    `

                    :

                    `
                    <button
                    onclick="joinGroup(${group.id})">

                        Entrar no Grupo

                    </button>
                    `
                }

            </div>

            `;

        }).join("");

}

// ---------- INIT ----------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const createButton =
            document.getElementById(
                "createGroupBtn"
            );

        if (createButton) {

            createButton.addEventListener(
                "click",
                createGroup
            );

        }

        loadGroups();

    }
);
