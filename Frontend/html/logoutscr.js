document.getElementById("logoutBtn").addEventListener("click", async () => {
  //e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include", // Include cookies for authentication
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ email, password }),
      });
  
      //const data = await response.json();
  
      if (response.ok) {
        alert("Logged out successfully!");
        window.location.href = "/Frontend/html/login.html"; // Redirect to login page
      } else {
        const data = await response.json();
        alert(data.message || "Failed to log out. Please try again.");
      }
    } catch (error) {
      console.log("Error logging out:", error);
      alert("An error occurred. Please try again.");
    }
  });
  