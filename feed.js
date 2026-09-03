// =========================
// CONECTA V2 - FEED.JS
// =========================

// ---------- POSTS ----------

function getPosts() {

    return JSON.parse(
        localStorage.getItem("posts")
    ) || [];

}

function savePosts(posts) {

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

}

// ---------- USER ----------

function getCurrentUserData() {

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}

// ---------- XP ----------

function addXP(amount) {

    const user =
        getCurrentUserData();

    if (!user) return;

    user.xp =
        (user.xp || 0) + amount;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    const users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];

    const index =
        users.findIndex(
            u => u.id === user.id
        );

    if (index !== -1) {

        users[index] = user;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

    checkAchievements();

    if (
        typeof updateUserCard ===
        "function"
    ) {
        updateUserCard();
    }

    if (
        typeof updateProfile ===
        "function"
    ) {
        updateProfile();
    }

}

// ---------- CONQUISTAS ----------

function checkAchievements() {

    const user =
        getCurrentUserData();

    if (!user) return;

    if (!user.achievements) {
        user.achievements = [];
    }

    const posts =
        getPosts().filter(
            post =>
                post.authorId ===
                user.id
        );

    const unlock = title => {

        if (
            !user.achievements.includes(
                title
            )
        ) {

            user.achievements.push(
                title
            );

            addNotification(
                "Nova conquista: " +
                title
            );

        }

    };

    if (posts.length >= 1) {
        unlock("🏆 Primeiro Post");
    }

    if (posts.length >= 10) {
        unlock("🔥 10 Publicações");
    }

    if (user.xp >= 100) {
        unlock("⭐ 100 XP");
    }

    const users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];

    const index =
        users.findIndex(
            u => u.id === user.id
        );

    if (index !== -1) {

        users[index] = user;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    renderAchievements();

}

// ---------- NOTIFICAÇÕES ----------

function addNotification(text) {

    const notifications =
        JSON.parse(
            localStorage.getItem(
                "notifications"
            )
        ) || [];

    notifications.unshift({

        id: Date.now(),

        text,

        date:
            new Date()
            .toLocaleString()

    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(
            notifications
        )
    );

}

// ---------- CRIAR POST ----------

function createPost() {

    const input =
        document.getElementById(
            "postInput"
        );

    const text =
        input.value.trim();

    if (!text) {

        alert(
            "Digite algo para publicar."
        );

        return;
    }

    const user =
        getCurrentUserData();

    const posts =
        getPosts();

    posts.unshift({

        id: Date.now(),

        authorId: user.id,

        author: user.name,

        classroom:
            user.classroom,

        text,

        likes: 0,

        comments: [],

        createdAt:
            new Date()
            .toLocaleString()

    });

    savePosts(posts);

    input.value = "";

    addXP(10);

    loadPosts();

}

// ---------- CURTIR ----------

function likePost(postId) {

    const posts =
        getPosts();

    const post =
        posts.find(
            p => p.id === postId
        );

    if (!post) return;

    post.likes++;

    savePosts(posts);

    addXP(1);

    loadPosts();

}

// ---------- COMENTAR ----------

function commentPost(postId) {

    const text =
        prompt(
            "Digite seu comentário:"
        );

    if (!text) return;

    const posts =
        getPosts();

    const post =
        posts.find(
            p => p.id === postId
        );

    if (!post) return;

    const user =
        getCurrentUserData();

    post.comments.push({

        author: user.name,

        text

    });

    savePosts(posts);

    addXP(3);

    loadPosts();

}

// ---------- FEED ----------

function loadPosts() {

    const container =
        document.getElementById(
            "feedContainer"
        );

    if (!container) return;

    const posts =
        getPosts();

    if (posts.length === 0) {

        container.innerHTML = `

            <div class="post-card">

                <h3>
                    Nenhuma publicação.
                </h3>

                <p>
                    Seja o primeiro a postar.
                </p>

            </div>

        `;

        return;

    }

    container.innerHTML =
        posts.map(post => `

        <div class="post-card">

            <div class="post-header">

                <img
                src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}"
                >

                <div>

                    <h4>
                        ${post.author}
                    </h4>

                    <small>
                        ${post.classroom}
                    </small>

                </div>

            </div>

            <div class="post-content">

                ${post.text}

            </div>

            <small>

                ${post.createdAt}

            </small>

            <div
            class="post-footer">

                <button
                onclick="likePost(${post.id})">

                    ❤️ ${post.likes}

                </button>

                <button
                onclick="commentPost(${post.id})">

                    💬 ${post.comments.length}

                </button>

            </div>

            <div
            class="comments">

                ${post.comments.map(comment => `

                    <p>

                        <strong>

                            ${comment.author}

                        </strong>

                        ${comment.text}

                    </p>

                `).join("")}

            </div>

        </div>

    `).join("");

}

// ---------- CONQUISTAS ----------

function renderAchievements() {

    const container =
        document.getElementById(
            "achievementsContainer"
        );

    if (!container) return;

    const user =
        getCurrentUserData();

    if (!user) return;

    const achievements =
        user.achievements || [];

    if (
        achievements.length === 0
    ) {

        container.innerHTML = `

            <div
            class="achievement-card">

                Nenhuma conquista.

            </div>

        `;

        return;

    }

    container.innerHTML =
        achievements.map(item => `

        <div
        class="achievement-card">

            ${item}

        </div>

    `).join("");

}

// ---------- INIT ----------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const publishBtn =
            document.getElementById(
                "publishPostBtn"
            );

        if (publishBtn) {

            publishBtn.addEventListener(
                "click",
                createPost
            );

        }

        loadPosts();

        renderAchievements();

    }
);
