/* ================= JOB DATA ================= */

const jobCategories = {
  "Technology & Engineering": [
    "Software Engineer","Web Developer","Frontend Developer","Backend Developer",
    "Full Stack Developer","Mobile App Developer","DevOps Engineer","Cloud Engineer",
    "Data Engineer","Machine Learning Engineer","AI Engineer",
    "System Administrator","Network Engineer","Technical Support Specialist"
  ],
  "Design & UX": [
    "UX Designer","UI Designer","UX Researcher",
    "Product Designer","Graphic Designer","Interaction Designer"
  ],
  "Data & Analytics": [
    "Data Analyst","Business Analyst","BI Analyst",
    "Data Scientist","Quantitative Analyst"
  ],
  "Quality & Testing": [
    "QA Engineer","Automation Test Engineer",
    "Manual Tester","Performance Tester"
  ],
  "Management & Leadership": [
    "Project Manager","Program Manager","Product Manager",
    "Delivery Manager","Engineering Manager",
    "VP of Engineering","VP of Operations","VP of Finance",
    "Chief Technology Officer (CTO)"
  ],
  "Finance & Accounting": [
    "Financial Analyst","Accountant","Senior Accountant",
    "Finance Manager","Investment Analyst","Risk Analyst","Auditor"
  ],
  "Supply Chain & Operations": [
    "Supply Chain Manager","Operations Manager",
    "Logistics Manager","Procurement Specialist","Inventory Manager"
  ],
  "Human Resources": [
    "HR Executive","HR Manager","Technical Recruiter",
    "Talent Acquisition Specialist","Training Specialist","HR Business Partner"
  ],
  "Content & Documentation": [
    "Technical Writer","Content Writer","Copywriter","Documentation Specialist"
  ],
  "Marketing & Sales": [
    "Digital Marketing Specialist","SEO Specialist","Marketing Analyst",
    "Brand Manager","Sales Executive","Sales Manager","Account Manager"
  ],
  "Support & Customer Success": [
    "Customer Support Executive","Customer Success Manager","Implementation Consultant"
  ]
};

/* ================= POPULATE JOB DROPDOWN ================= */

const jobSelect = document.getElementById("job");
const jobSearch = document.getElementById("jobSearch");

for (const category in jobCategories) {
  const group = document.createElement("optgroup");
  group.label = category;

  jobCategories[category].forEach(job => {
    const option = document.createElement("option");
    option.value = job;
    option.textContent = job;
    group.appendChild(option);
  });

  jobSelect.appendChild(group);
}

/* ================= SEARCHABLE JOB DROPDOWN (FIXED) ================= */

jobSearch.addEventListener("input", () => {
  const filter = jobSearch.value.toLowerCase();
  jobSelect.innerHTML = "";

  for (const category in jobCategories) {
    const group = document.createElement("optgroup");
    group.label = category;

    jobCategories[category]
      .filter(job => job.toLowerCase().includes(filter))
      .forEach(job => {
        const option = document.createElement("option");
        option.value = job;
        option.textContent = job;
        group.appendChild(option);
      });

    if (group.children.length > 0) {
      jobSelect.appendChild(group);
    }
  }
});

/* ================= MULTIPLIERS ================= */

const categoryMultiplier = {
  "Technology & Engineering": 1.6,
  "Design & UX": 1.4,
  "Data & Analytics": 1.8,
  "Quality & Testing": 1.2,
  "Management & Leadership": 2.2,
  "Finance & Accounting": 1.7,
  "Supply Chain & Operations": 1.5,
  "Human Resources": 1.3,
  "Content & Documentation": 1.2,
  "Marketing & Sales": 1.4,
  "Support & Customer Success": 1.1
};

const levelMultiplier = { Junior: 0.8, Mid: 1, Senior: 1.3, Lead: 1.6 };
const locationMultiplier = { India: 1, USA: 2.5, Europe: 2, Remote: 1.8 };

/* ================= HELPERS ================= */

function getCategoryByJob(job) {
  for (const cat in jobCategories) {
    if (jobCategories[cat].includes(job)) return cat;
  }
}

/* ================= THEME ================= */

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

/* ================= MAIN ACTION ================= */
function handlePredict() {
  const age = Number(document.getElementById("age").value);
  const experience = Number(document.getElementById("experience").value);
  const education = document.getElementById("education").value;
  const job = document.getElementById("job").value;
  const level = document.getElementById("level").value;
  const location = document.getElementById("location").value;

  // ✅ MONTHLY salary calculation
  let monthlySalary = 30000;
  monthlySalary += experience * 4500;

  if (education === "Master's") monthlySalary += 12000;
  if (education === "PhD") monthlySalary += 22000;

  const category = getCategoryByJob(job);
  monthlySalary *= categoryMultiplier[category];
  monthlySalary *= levelMultiplier[level];
  monthlySalary *= locationMultiplier[location];

  if (age > 40) monthlySalary *= 1.05;

  // ✅ YEARLY salary
  const yearlySalary = monthlySalary * 12;

  // Save user input
  localStorage.setItem(
    "userInput",
    JSON.stringify({ age, experience, education, job, level, location })
  );

  // Save salary data
  localStorage.setItem(
    "salaryInsights",
    JSON.stringify({
      baseMonthly: 30000,
      experienceMonthly: experience * 4500,
      educationMonthly:
        education === "PhD"
          ? 22000
          : education === "Master's"
          ? 12000
          : 0,
      monthlySalary: Math.round(monthlySalary),
      yearlySalary: Math.round(yearlySalary),
    })
  );

  // Redirect to insights page
  window.location.href = "insights.html";
}
