function handleRequest() {
  const userInput = document.getElementById("userInput").value.trim();
  const message = document.getElementById("message");

  if (!userInput) {
    message.textContent = "Please enter your email or phone.";
    return;
  }

  const lastRequest = localStorage.getItem("forgotPasswordRequestDate");
  const today = new Date().toISOString().split("T")[0];

  if (lastRequest === today) {
    message.textContent = "You can request password reset only once per day.";
    return;
  }

  // Simulate password reset process
  localStorage.setItem("forgotPasswordRequestDate", today);
  message.style.color = "green";
  message.textContent = "Password reset link sent successfully!";
}

function generatePassword(length = 10) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allChars = lower + upper;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randIndex];
  }

  document.getElementById("generatedPassword").textContent = password;
}
