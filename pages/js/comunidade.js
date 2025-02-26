document.addEventListener("DOMContentLoaded", loadPosts);

// Adiciona uma nova postagem
function addPost() {
    const postContent = document.getElementById("post-content").value.trim();
    
    if (postContent === "") {
        alert("Digite algo para postar!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const newPost = {
        id: Date.now(),
        content: postContent,
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("post-content").value = "";
    loadPosts();
}

// Carrega as postagens
function loadPosts() {
    const postFeed = document.getElementById("post-feed");
    postFeed.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <p class="content">${post.content}</p>
            <div class="actions">
                <span class="like-btn" onclick="likePost(${post.id})">👍 ${post.likes}</span>
                <button onclick="toggleComments(${post.id})" class="comunidade_btn">💬 Comentar</button>
            </div>
            <div class="comment-section" id="comments-${post.id}" style="display: none;">
                <input type="text" id="comment-input-${post.id}" placeholder="Escreva um comentário..." class="comunidade_textArea">
                <button onclick="addComment(${post.id})" class="comunidade_btn">Enviar</button>
                <div id="comments-list-${post.id}"></div>
            </div>
        `;

        postFeed.appendChild(postElement);

        // Atualiza a lista de comentários
        updateComments(post.id);
    });
}

// Adiciona um comentário a um post
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Digite um comentário antes de enviar!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].comments.push(commentText);
        localStorage.setItem("posts", JSON.stringify(posts));
        commentInput.value = "";
        updateComments(postId);
    }
}

// Atualiza a exibição dos comentários
function updateComments(postId) {
    const commentsList = document.getElementById(`comments-list-${postId}`);
    commentsList.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(post => post.id === postId);

    if (post && post.comments.length > 0) {
        post.comments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.classList.add("comment");
            commentElement.textContent = comment;
            commentsList.appendChild(commentElement);
        });
    }
}

// Alternar a exibição da seção de comentários
function toggleComments(postId) {
    const commentSection = document.getElementById(`comments-${postId}`);
    commentSection.style.display = (commentSection.style.display === "none") ? "block" : "none";
}

// Adiciona curtidas a um post
function likePost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].likes += 1;
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}
