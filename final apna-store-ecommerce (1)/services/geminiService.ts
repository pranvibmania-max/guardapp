export const generateProductDescription = async (
  productName: string,
  category: string
): Promise<string> => {
  const client = getClient();

  if (!client) {
    return "Gemini API key missing.";
  }

  try {
    const model = client.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // ✅ FIXED PROMPT (template literal)
    const prompt = `Write a marketing-focused product description for ${productName} in the ${category} category. 
    Focus on benefits, premium feel, and futuristic technology.`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description.";
  }
};
