require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// console.log(key);

const generateFromGoogle = async (userPrompt) => {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent(`
    I want to create a **detailed learning roadmap** to become a successful ${userPrompt}.

    ✅ Format Instructions:
    - Respond in **GitHub-style Markdown**
    - Use **rich formatting**: headings, bold, bullet points
    - Add **emojis** in section titles and topic bullets to make it engaging
    - DO NOT use "\\" slashes anywhere
    - DO NOT include horizontal rules like "---"
    - Use clear **line breaks** between points for readability
    - Avoid writing big chunks of text — keep each point clean and skimmable

    📚 Structure:
    ## Phase 1: Foundational Front-End 🧱
    ## Phase 2: Advanced Front-End & Tooling 🛠️
    ## Phase 3: Back-End & Databases ⚙️
    ## Phase 4: Deployment & DevOps 🚀
    ## Phase 5: Continuous Learning & Specialization 🌱

    💡 For each phase, include:
    - Key topics with bullet points and emojis
    - 1–2 tools or platforms to use
    - Rough **time estimate** for that phase
    - 1–2 recommended **free resources**

    The roadmap should be practical, easy to follow for complete beginners, and visually well-structured in markdown.

    Only return the roadmap content — no intro, no closing.

  `);

  // const responseText =
  //   result?.response?.candidates[0].content?.parts[0].text ||
  //   "No response from AI";

  // const responseText = await result.response.text();
  // return responseText;

  const raw = await result.response.text();

  // console.log("---------- Raw Gemini Response ----------");
  // console.log(JSON.stringify(raw, null, 2));
  // console.log("----------- End of Response ------------");

  // Fix formatting for Markdown rendering
  // const fixedMarkdown = raw
  //   .replace(/## /g, "\n\n## ")
  //   .replace(/\* \*\*/g, "\n* **")
  //   .replace(/\* (?!\*)/g, "\n* ")
  //   .replace(/---/g, "\n\n---\n\n"); // Pad stage dividers

  return raw;
};

module.exports = { generateFromGoogle };
