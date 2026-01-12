const express = require("express");
const { generateFromLocal } = require("../utils/local-llm");

module.exports.dataController = async (req, res) => {
  try {
    const { userInput } = req.query;
    if (!userInput || userInput === undefined) {
      return res.status(400).json({ error: "User Input is required" });
    }

    const roadmap = await generateFromLocal(userInput);
    if (!roadmap)
      return res.status(500).json({ error: "Failed to generate roadmap" });

    return res.status(200).json({ roadmap });
  } catch (error) {
    console.error("GET /api/get-data failed:", error);

    if (
      error?.code === "MISSING_HF_API_KEY" ||
      error?.code === "MISSING_OPENAI_API_KEY" ||
      error?.code === "MISSING_GOOGLE_API_KEY"
    ) {
      return res.status(500).json({ error: error.message });
    }

    // If the upstream AI call fails, returning a clearer error helps debugging.
    return res.status(500).json({
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error?.message || "Internal server error",
    });
  }
};
