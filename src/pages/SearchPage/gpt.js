export const CallGPT = async () => {
    console.log(">>>callGPT");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello!"}
            ],
            temperature: 0.5,
            max_tokens: 200,
        }),
    });
    const responseData = await response.json();
    console.log("responseData", responseData);
    return responseData;
}