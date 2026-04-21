
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemma-3-1b-it:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: `User message: ${message}

(Repeat: You must detect the language of the message above and respond in that same language. Helpful and brief tone.)` }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 0,
                }
            })
        });

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Calibration error.";

        res.status(200).json({ reply: reply.replace(/Predicto/gi, 'PREDDICTO') });
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
}
