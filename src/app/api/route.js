// ==============================================================================================

const handleSearch = async () => {
  if (userPrompt.trim() === "") return;

  try {
    // Google Gemini AI Integration
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({ generationConfig, history: [] });

    const result = await chatSession.sendMessage(userPrompt);
    const responseText = await result.response.text();

    setApiResponse(responseText);
  } catch (error) {
    console.error("Error fetching API:", error);
    setApiResponse("Sorry, there was an error with the API.");
  }
};

// ==============================================================================================
