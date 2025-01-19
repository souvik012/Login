document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:8000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            credentials: "include", // Include cookies (authentication token) with the request
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        //console.log("This is the response from login",data);
        console.log(data)

        if (response.ok) {
            messageEl.textContent = "Login successful!";
            messageEl.style.color = "green";
            
            // Redirect to dashboard or homepage
            setTimeout(() => {
                window.location.href = "/Frontend/html/logout.html"; // Update with your desired page
            }, 1000);
        } else {
            messageEl.textContent = data.message || "Login failed.";
            messageEl.style.color = "red";
           
            
        }
    } catch (error) {
        messageEl.textContent = "An error occurred. Please try again.";
        messageEl.style.color = "red";
        console.error("Error logging in:", error);

    }
});
