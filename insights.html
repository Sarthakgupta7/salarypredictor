// ================= LOAD DATA =================

const data = JSON.parse(localStorage.getItem("salaryInsights"));
const userInput = JSON.parse(localStorage.getItem("userInput"));

if (!data || !userInput) {
  alert("No salary data found. Please predict salary first.");
  window.location.href = "predict.html";
}

// ================= THEME =================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// ================= SALARY DISPLAY =================

document.getElementById("salaryValue").innerText =
  `₹${data.monthlySalary.toLocaleString()} / month`;

document.getElementById("salaryRange").innerText =
  `₹${Math.round(data.yearlySalary * 0.9).toLocaleString()} – ₹${Math.round(
    data.yearlySalary * 1.1
  ).toLocaleString()} / year`;

// ================= SUGGESTIONS =================

const tips = [];

if (userInput.education === "Bachelor's") {
  tips.push("🎓 Consider pursuing a Master's degree to unlock higher salary bands.");
}

if (userInput.level === "Junior") {
  tips.push("📈 Upskill and gain experience to move into Mid or Senior roles.");
}

if (userInput.experience < 3) {
  tips.push("🧠 More hands-on experience can significantly boost your salary.");
}

if (userInput.location === "India") {
  tips.push("🌍 Explore remote or international roles for better compensation.");
}

if (tips.length === 0) {
  tips.push("✅ You are on a strong career path. Keep growing your skills!");
}

document.getElementById("suggestions").innerHTML = `
  <h3>💡 How to Increase Your Salary</h3>
  <ul>${tips.map(t => `<li>${t}</li>`).join("")}</ul>
`;

// ================= SALARY BREAKDOWN CHART (MONTHLY) =================

new Chart(document.getElementById("breakdownChart"), {
  type: "bar",
  data: {
    labels: [
      "Base (Monthly)",
      "Experience (Monthly)",
      "Education (Monthly)",
      "Final (Monthly)"
    ],
    datasets: [{
      data: [
        data.baseMonthly,
        data.experienceMonthly,
        data.educationMonthly,
        data.monthlySalary
      ],
      backgroundColor: [
        "#60a5fa",
        "#34d399",
        "#fbbf24",
        "#6366f1"
      ]
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

// ================= LOCATION COMPARISON (YEARLY) =================

const locationMultiplier = {
  India: 1,
  USA: 2.5,
  Europe: 2,
  Remote: 1.8
};

new Chart(document.getElementById("locationChart"), {
  type: "line",
  data: {
    labels: Object.keys(locationMultiplier),
    datasets: [{
      label: "Estimated Yearly Salary (₹)",
      data: Object.values(locationMultiplier).map(
        m => Math.round(data.yearlySalary * m)
      ),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.15)",
      tension: 0.4,
      fill: true
    }]
  }
});

// ================= NAV =================

function goBack() {
  window.location.href = "predict.html";
}
