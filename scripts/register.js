document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "An error occurred during registration.");
      } else {
        alert(data.message || "Registration successful!");
        window.location.href = "login.html";  // Redirect to login page
      }
    } catch (err) {
      alert("An error occurred, please try again.");
      console.error("Error during registration:", err);
    }
});
