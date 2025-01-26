document.addEventListener("DOMContentLoaded", () => {
  const blogPostsContainer = document.getElementById("blog-posts");

  // Fetch JSON data
  fetch("data/posts.json")
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postHTML = `
          <div class="col-md-4">
            <div class="card">
              <img src="${post.image}" class="card-img-top" alt="${post.title}">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        `;
        blogPostsContainer.innerHTML += postHTML;
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
});
