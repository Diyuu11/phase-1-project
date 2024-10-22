
fetch('http://localhost:3000/posts')
let posts = []; // Array to store posts
let currentIndex = null; // Track the current post being edited

document.getElementById('add_post_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    if (currentIndex === null) {
        // Adding a new post
        const newPost = { title, imageUrl, author, date, description };
        posts.push(newPost);
    } else {
        // Updating an existing post
        posts[currentIndex] = { title, imageUrl, author, date, description };
        currentIndex = null; // Reset index after update
    }

    // Reset form and display posts
    document.getElementById('add_post_form').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide(); // Hide modal after submission
    displayPosts();
    document.getElementById('message').innerText = 'Post saved successfully!';
});

function displayPosts() {
    const postRow = document.getElementById('posts_row');
    postRow.innerHTML = ''; // Clear previous posts

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'col-md-4 mb-3';
        postDiv.innerHTML = `
            <div class="card">
                <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <p class="card-text"><small class="text-muted">By ${post.author} on ${post.date}</small></p>
                    <button class="btn btn-warning" onclick="editPost(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deletePost(${index})">Delete</button>
                </div>
            </div>
        `;
        postRow.appendChild(postDiv);
    });
}

function deletePost(index) {
    posts.splice(index, 1); // Remove post from array
    displayPosts(); // Refresh displayed posts
    document.getElementById('delete_message').innerText = 'Post deleted successfully!';
}

function editPost(index) {
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('imageUrl').value = post.imageUrl;
    document.getElementById('author').value = post.author;
    document.getElementById('date').value = post.date;
    document.getElementById('description').value = post.description;

    currentIndex = index; // Set the index for editing
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show(); // Show modal for editing
}
