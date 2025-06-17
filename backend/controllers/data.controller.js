const express = require("express");
const { generateFromGoogle } = require("../utils/google.genai");

module.exports.dataController = async (req, res) => {
  try {
    const { userInput } = req.query;
    if (!userInput || userInput === undefined) {
      return res.status(400).json({ error: "User Input is required" });
    }

    const roadmap = await generateFromGoogle(userInput);
    if (!roadmap)
      return res.status(500).json({ error: "Failed to generate roadmap" });

    return res.status(200).json({ roadmap });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
