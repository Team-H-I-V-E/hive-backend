import OpenAI from "openai";

async function getHaikuAboutAI(): Promise<string> {
    // OpenAI 인스턴스 생성
    const openai = new OpenAI();

    try {
        // ChatGPT API 호출
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "user", content: "write a haiku about AI" },
            ],
        });

        // API 응답에서 결과 추출
        return completion.choices[0].message?.content || "No response from AI.";
    } catch (error) {
        console.error("Error generating haiku:", error);
        return "Error occurred while generating haiku.";
    }
}

// 함수 호출 예제
getHaikuAboutAI().then((haiku) => {
    console.log("Generated Haiku:", haiku);
});
