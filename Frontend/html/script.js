document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;
  const messageEl = document.getElementById("message");

  // Clear any previous message
  messageEl.textContent = "";

  // Validate inputs
  if (!name || !email || !password ||!confirmpassword) {
      messageEl.textContent = "All fields are required!";
      messageEl.style.color = "red";
      return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
      messageEl.textContent = "Please enter a valid email address.";
      messageEl.style.color = "red";
      return;
  }

  if (password !== confirmpassword) {
      messageEl.textContent = "Passwords do not match!";
      messageEl.style.color = "red";
      return;
  }

  try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ name, email, password,confirmpassword}),
      });

      const data = await response.json();

      if (response.ok) {
          messageEl.textContent = "Registration successful!";
          messageEl.style.color = "green";
          setTimeout(() => {
              window.location.href = "/Frontend/html/login.html"; // Redirect to login
          }, 2000);
      } else {
          messageEl.textContent = data.message || "Registration failed.";
          messageEl.style.color = "red";
      }
  } catch (error) {
      messageEl.textContent = "Something went wrong. Please try again.";
      messageEl.style.color = "red";
      console.error("Error:", error);
  }
});

