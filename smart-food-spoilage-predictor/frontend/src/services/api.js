const API_BASE_URL =
    "https://food-ai-e7vw.onrender.com/api";

export async function predictSpoilage(formData) {
    const response = await fetch(
        `${API_BASE_URL}/predict`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Prediction request failed"
        );
    }

    return data;
}