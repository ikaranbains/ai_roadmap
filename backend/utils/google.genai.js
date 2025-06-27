require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// console.log(key);

const generateFromGoogle = async (userPrompt) => {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent(`
    I want to create a **detailed and visually appealing roadmap** to become a successful ${userPrompt}.
    
    ✅ Follow these formatting rules:
    - Format using **GitHub-flavored Markdown**
    - Use **section headings** with relevant **emojis** (not on every bullet)
    - Use **4-space indented bullet points** under headings/subheadings
    - **Separate** "Estimated Time" and "Tools & Resources" as distinct sections
    - Include simple **flowcharts/diagrams** in markdown using \`\`\`text or markdown blocks
    - Add **line breaks** between all groups to enhance readability
    - Don't use "\\" or "---"
    - Keep content short, clean, and well-structured
    
    📘 Sample layout (copy this style for every phase):
    
    ---
    ## Phase 1: Programming Foundations 💻  
    **🕒 Estimated Time:** 3–4 weeks  
    
    **🛠️ Tools & Resources:**  
        - freeCodeCamp  
        - MDN Web Docs  
    
    ### 🧠 Core Topics  
        - Variables, data types, and operators  
        - Conditionals and loops  
        - Functions and scope  
    
    ### 🔁 Visual Guide  
    \`\`\`text
    Input → Process → Output  
       ↓        ↓         ↓  
    Variables → Logic → Result  
    \`\`\`
    
    ---
    
    Repeat this format for all future phases like:  
    - Advanced Concepts  
    - Project Work  
    - Tools/Frameworks  
    - APIs/Databases  
    - Deployment  
    - Specialization
    
    📌 The content should be highly skimmable and visually structured for markdown viewers.
    
    Only return the roadmap content. No intro or closing.
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
