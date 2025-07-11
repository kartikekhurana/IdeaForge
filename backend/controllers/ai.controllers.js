import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
const generateIdeas = async (req, res) => {
  try {
    const prompt =
      req.body.prompt ||
      "Generate 3 unique and creative startup ideas. Each idea should have a title followed by a short one-line description.";
    const response = await cohere.generate({
      model: "command",
      prompt,
      maxTokens: 150,
      temperature: 0.9,
    });
    const text = response.generations[0].text;
    const ideas = text
      .trim()
      .split("\n")
      .filter((line) => line.includes(":"))
      .map((line) => {
        const parts = line.split(":");
        return {
          title: parts[0]?.trim() || "Untitled",
          description: parts[1]?.trim() || "",
        };
      });
    return res.status(200).json({
      success: true,
      ideas,
    });
  } catch (error) {
    console.error("Cohere AI error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong with AI generation",
    });
  }
};
export { generateIdeas };
