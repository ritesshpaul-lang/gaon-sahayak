
const data = {
  education: [
    {
      title: "Scholarship Finder",
      description:
        "Explore scholarship opportunities based on your student profile. Check official notices for eligibility and deadlines."
    },
    {
      title: "Education Service Guide",
      description:
        "Get guidance about admissions, education services and documents commonly required."
    }
  ],
  job: [
    {
      title: "Rural Job & Skill Navigator",
      description:
        "Explore employment opportunities, skill training and vocational learning pathways."
    },
    {
      title: "Skill Path Planner",
      description:
        "Identify digital and vocational skills that may help you prepare for work."
    }
  ],
  farmer: [
    {
      title: "Farmer Support Navigator",
      description:
        "Explore agriculture support, farming training and related services."
    },
    {
      title: "Agriculture Service Guide",
      description:
        "Find guidance about agricultural services and market-related information."
    }
  ],
  women: [
    {
      title: "Women Livelihood Navigator",
      description:
        "Explore entrepreneurship, livelihood opportunities and skill development."
    },
    {
      title: "Self-Help Group Guide",
      description:
        "Learn about community groups and livelihood support pathways."
    }
  ],
  essential: [
    {
      title: "Essential Service Finder",
      description:
        "Explore useful public-service categories for your area."
    },
    {
      title: "Document Checklist Assistant",
      description:
        "Review common documents that may be needed when applying for services."
    }
  ]
};

const $ = (id) => document.getElementById(id);

function getCategory(value) {
  const v = String(value || "").toLowerCase();

  if (
    v.includes("education") ||
    v.includes("scholarship") ||
    v.includes("शिक्षा") ||
    v.includes("छात्रवृत्ति")
  ) return "education";

  if (
    v.includes("job") ||
    v.includes("skill") ||
    v.includes("रोजगार") ||
    v.includes("नौकरी")
  ) return "job";

  if (
    v.includes("farmer") ||
    v.includes("agriculture") ||
    v.includes("किसान") ||
    v.includes("कृषि")
  ) return "farmer";

  if (
    v.includes("women") ||
    v.includes("livelihood") ||
    v.includes("महिला") ||
    v.includes("आजीविका")
  ) return "women";

  return "essential";
}

function showMessage(container, message) {
  container.replaceChildren();
  const p = document.createElement("p");
  p.textContent = message;
  container.appendChild(p);
}

function initializeGaonSahayak() {
  const findButton = $("find");
  const need = $("need");
  const locationInput = $("location");
  const results = $("results");
  const cards = $("cards");

  if (findButton && need && locationInput && results && cards) {
    findButton.addEventListener("click", () => {
      const category = getCategory(need.value);
      const opportunities = data[category];
      const location =
        locationInput.value.trim() || "Your area";

      cards.replaceChildren();

      opportunities.forEach((item) => {
        const article = document.createElement("article");
        article.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const locationLabel = document.createElement("p");
        locationLabel.textContent = "Location: " + location;

        article.append(heading, description, locationLabel);
        cards.appendChild(article);
      });

      results.hidden = false;
      results.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    });
  }

  const askButton = $("ask");
  const questionInput = $("q");
  const chat = $("chat");

  if (askButton && questionInput && chat) {
    askButton.addEventListener("click", () => {
      const question = questionInput.value.trim();
      if (!question) {
        questionInput.focus();
        return;
      }

      const q = question.toLowerCase();
      let answer;

      if (
        q.includes("student") ||
        q.includes("scholarship") ||
        q.includes("छात्र") ||
        q.includes("छात्रवृत्ति")
      ) {
        answer =
          "Choose Education / Scholarship to explore education guidance. Check official notices for current eligibility and deadlines.";
      } else if (
        q.includes("job") ||
        q.includes("skill") ||
        q.includes("नौकरी") ||
        q.includes("रोजगार")
      ) {
        answer =
          "Choose Job / Skill to explore employment and training pathways.";
      } else if (
        q.includes("farmer") ||
        q.includes("agriculture") ||
        q.includes("किसान") ||
        q.includes("खेती")
      ) {
        answer =
          "Choose Agriculture to explore farming support and related services.";
      } else if (
        q.includes("women") ||
        q.includes("महिला")
      ) {
        answer =
          "Choose Women / Livelihood to explore skills and livelihood guidance.";
      } else {
        answer =
          "Please tell me whether you need education, jobs and skills, agriculture, women’s livelihood, or an essential service.";
      }

      const message = document.createElement("div");
      message.className = "msg";

      const userLine = document.createElement("p");
      userLine.textContent = "You: " + question;

      const assistantLine = document.createElement("p");
      assistantLine.textContent = "Gaon Sahayak: " + answer;

      message.append(userLine, assistantLine);
      chat.appendChild(message);

      questionInput.value = "";
    });

    questionInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        askButton.click();
      }
    });
  }

  const language = $("lang");
  const title = $("title");
  const intro = $("intro");

  if (language && title && intro) {
    language.addEventListener("change", (event) => {
      if (event.target.value === "hi") {
        title.textContent = "बताइए आपको क्या चाहिए";
        intro.textContent =
          "योजनाओं, छात्रवृत्ति, रोजगार, कौशल और स्थानीय सेवाओं की जानकारी एक सरल प्लेटफॉर्म से खोजें।";
      } else {
        title.textContent = "Tell us what you need";
        intro.textContent =
          "Find relevant schemes, scholarships, jobs, skills and nearby services from one simple interface.";
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeGaonSahayak
  );
} else {
  initializeGaonSahayak();
}
