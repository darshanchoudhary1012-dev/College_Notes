document.addEventListener("DOMContentLoaded", function () {
  // Predefined Credentials
  const AUTH_USER = "admin";
  const AUTH_PASS = "12345";

  // DOM Elements
  const loginModal = document.getElementById("loginModal");
  const protectedContent = document.getElementById("protectedContent");
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");
  const logoutBtn = document.getElementById("logoutBtn");
  const userDisplay = document.getElementById("userDisplay");
  const searchInput = document.getElementById("searchInput");

  // Check Login State on Page Load
  function checkAuthState() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("username");

    if (isLoggedIn === "true") {
      loginModal.classList.add("hidden");
      protectedContent.classList.remove("hidden");
      if (userDisplay && savedUser) userDisplay.textContent = savedUser;
    } else {
      loginModal.classList.remove("hidden");
      protectedContent.classList.add("hidden");
    }
  }

  // Handle Login Submit
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredUser = usernameInput.value.trim();
    const enteredPass = passwordInput.value.trim();

    if (enteredUser === AUTH_USER && enteredPass === AUTH_PASS) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", enteredUser);
      
      errorMsg.style.display = "none";
      usernameInput.value = "";
      passwordInput.value = "";
      
      checkAuthState();
    } else {
      errorMsg.style.display = "block";
    }
  });

  // Handle Logout
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    checkAuthState();
  });

  // Live Search Filter
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const filterValue = searchInput.value.toLowerCase().trim();
      const subjectCards = document.querySelectorAll(".subject-card");

      subjectCards.forEach((card) => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(filterValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Initial Auth Check
  checkAuthState();
});