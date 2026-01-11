/* ================= GET DATA ================= */

const salaryData = JSON.parse(localStorage.getItem("salaryInsights"));
const userInput = JSON.parse(localStorage.getItem("userInput"));

if (!salaryData || !userInput) {
  alert("No salary data found. Please predict salary first.");
  window.location.href = "predict.html";
}

/* ================= THEME TOGGLE ================= */

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ================= SALARY DISPLAY ================= */

const salary = salaryData.finalSalary;
const minSalary = Math.round(salary * 0.9);
const maxSalary = Math.round(salary * 1.1);

document.getElementById("salaryValue").innerText =
  `₹${salary.toLocaleString()} / year`;

document.getElementById("salaryRange").innerText =
  `Range: ₹${minSalary.toLocaleString()} – ₹${maxSalary.toLocaleString()}`;

/* ================= SALARY BREAKDOWN CHART ================= */

const breakdownCtx = document
  .getElementById("breakdownChart")
  .getContext("2d");

new Chart(breakdownCtx, {
  type: "bar",
  data: {
    labels: ["Base Salary", "Experience Bonus", "Education Bonus", "Final Salary"],
    datasets: [{
      data: [
        salaryData.base,
        salaryData.experience,
        salaryData.education,
        salaryData.finalSalary
      ],
      backgroundColor: [
        "#60a5fa",
        "#34d399",
        "#fbbf24",
        "#f87171"
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

/* ================= LOCATION COMPARISON CHART ================= */

const locationCtx = document
  .getElementById("locationChart")
  .getContext("2d");

const locationMultiplier = {
  India: 1,
  USA: 2.5,
  Europe: 2,
  Remote: 1.8
};

new Chart(locationCtx, {
  type: "line",
  data: {
    labels: Object.keys(locationMultiplier),
    datasets: [{
      label: "Salary by Location (₹)",
      data: Object.values(locationMultiplier).map(
        m => Math.round(salary * m)
      ),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.2)",
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});

/* ================= CAREER SUGGESTIONS ================= */

function generateSuggestions(input) {
  let tips = [];

  if (input.education === "Bachelor's") {
    tips.push("🎓 Consider a Master's degree to unlock higher salary bands.");
  }

  if (input.level === "Junior") {
    tips.push("📈 Upskill and target Mid/Senior roles with real-world projects.");
  }

  if (input.experience < 3) {
    tips.push("🧠 Gaining 2–3 more years of experience can significantly boost pay.");
  }

  if (input.location === "India") {
    tips.push("🌍 Explore remote or international roles for better compensation.");
  }

  if (tips.length === 0) {
    tips.push("✅ You're on a strong career path. Keep upgrading your skills!");
  }

  return tips;
}

const tips = generateSuggestions(userInput);

document.getElementById("suggestions").innerHTML = `
  <h3>💡 How to Increase Your Salary</h3>
  <ul>${tips.map(t => `<li>${t}</li>`).join("")}</ul>
`;

/* ================= NAVIGATION ================= */

function goBack() {
  window.location.href = "predict.html";
}
