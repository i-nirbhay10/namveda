interface NameFilters {
  inspirations: string[];
  gender: string;
  religions: string[];
  styles: string[];
  minLength?: number;
  maxLength?: number;
  startingLetter?: string;
  endingLetter?: string;
  desiredMeaning?: string;
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateNames(filters: NameFilters) {
  const prompt = buildPrompt(filters);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${prompt}You are an expert baby name consultant with deep knowledge of names from various cultures, religions, and traditions. You specialize in creating unique, meaningful names that blend different inspirations while respecting cultural significance.
     
                      Always respond with a valid JSON array of exactly 15 name objects. Each object must have:
                      - name: string (the actual name)
                      - meaning: string (detailed meaning and significance)
                      - origin: string (cultural/religious origin)
                      - pronunciation: string (phonetic pronunciation guide)
                      - gender: string (male/female/unisex)
                      
                      Ensure names are:
                      - Pronounceable and pleasant sounding
                      - Culturally appropriate and respectful
                      - Unique but not bizarre
                      - Meaningful and significant`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = rawText.replace(/```json\n?|\n?```/g, "").trim();
    const suggestions = JSON.parse(cleanedText);

    return suggestions.slice(0, 15);
  } catch (error) {
    console.error("Error generating names with Gemini:", error);
    return getFallbackNames(filters.gender);
  }
}

function buildPrompt(filters: NameFilters): string {
  let prompt = `Generate 15 unique baby names based on these preferences:\n\n`;

  if (filters.inspirations.length > 0) {
    prompt += `Inspirations to blend: ${filters.inspirations.join(", ")}\n`;
  }

  prompt += `Gender: ${filters.gender}\n`;

  if (filters.religions.length > 0) {
    prompt += `Religious/Cultural background: ${filters.religions.join(
      ", "
    )}\n`;
  }

  if (filters.styles.length > 0) {
    prompt += `Style preferences: ${filters.styles.join(", ")}\n`;
  }

  if (filters.minLength || filters.maxLength) {
    prompt += `Name length: ${filters.minLength || "any"} to ${
      filters.maxLength || "any"
    } characters\n`;
  }

  if (filters.startingLetter) {
    prompt += `Must start with: ${filters.startingLetter}\n`;
  }

  if (filters.endingLetter) {
    prompt += `Must end with: ${filters.endingLetter}\n`;
  }

  if (filters.desiredMeaning) {
    prompt += `Desired meaning/theme: ${filters.desiredMeaning}\n`;
  }

  prompt += `\nCreate names that are:
  - Unique and creative (not just common names from lists)
  - Culturally respectful and appropriate
  - Easy to pronounce
  - Meaningful and significant
  - Harmonious when combining inspirations

  Return as a JSON array with the exact structure specified.`;

  return prompt;
}

function getFallbackNames(gender: string) {
  const fallbackNames = {
    male: [
      {
        name: "Arjun",
        meaning: "Bright, shining, white, silver",
        origin: "Sanskrit/Hindu",
        pronunciation: "AR-jun",
        gender: "male",
      },
      {
        name: "Kiran",
        meaning: "Ray of light, beam of light",
        origin: "Sanskrit/Hindu",
        pronunciation: "KEE-ran",
        gender: "male",
      },
    ],
    female: [
      {
        name: "Anaya",
        meaning: "Caring, guardian, protected",
        origin: "Sanskrit/Hindu",
        pronunciation: "ah-NAH-ya",
        gender: "female",
      },
      {
        name: "Priya",
        meaning: "Beloved, dear one",
        origin: "Sanskrit/Hindu",
        pronunciation: "PREE-ya",
        gender: "female",
      },
    ],
    unisex: [
      {
        name: "Avani",
        meaning: "Earth, nature",
        origin: "Sanskrit/Hindu",
        pronunciation: "ah-VAH-nee",
        gender: "unisex",
      },
    ],
  };

  return (
    fallbackNames[gender as keyof typeof fallbackNames] || fallbackNames.unisex
  );
}

// export async function generateNames(filters: NameFilters) {
//   const prompt = buildPrompt(filters);

//   try {
//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `${prompt}\n\nRespond in this JSON format:\n[\n  {\n    "name": "string",\n    "meaning": "string",\n    "origin": "string",\n    "pronunciation": "string",\n    "gender": "male/female/unisex"\n  }\n  // total of 15 objects\n]`,
//               },
//             ],
//           },
//         ],
//       }),
//     });

//     const data = await response.json();
//     const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     const cleanedText = rawText.replace(/```json\n?|\n?```/g, "").trim();
//     const suggestions = JSON.parse(cleanedText);

//     return suggestions.slice(0, 15);
//   } catch (error) {
//     console.error("Error generating names with Gemini:", error);
//     return getFallbackNames(filters.gender);
//   }
// }

// export async function generateNames(filters: NameFilters) {
//   const prompt = buildPrompt(filters)

//   try {
//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt,
//       system: `You are an expert baby name consultant with deep knowledge of names from various cultures, religions, and traditions. You specialize in creating unique, meaningful names that blend different inspirations while respecting cultural significance.

// Always respond with a valid JSON array of exactly 15 name objects. Each object must have:
// - name: string (the actual name)
// - meaning: string (detailed meaning and significance)
// - origin: string (cultural/religious origin)
// - pronunciation: string (phonetic pronunciation guide)
// - gender: string (male/female/unisex)

// Ensure names are:
// - Pronounceable and pleasant sounding
// - Culturally appropriate and respectful
// - Unique but not bizarre
// - Meaningful and significant`,
//     })

//     // Parse the AI response
//     const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
//     const suggestions = JSON.parse(cleanedText)

//     return suggestions.slice(0, 15) // Ensure we don't exceed 15 names
//   } catch (error) {
//     console.error("Error generating names:", error)
//     // Return fallback names if AI fails
//     return getFallbackNames(filters.gender)
//   }
// }
