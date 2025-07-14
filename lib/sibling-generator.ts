interface SiblingFilters {
  existingNames: string[]
  newBabyGender: string
  matchingPreferences: string[]
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export async function generateSiblingNames(filters: SiblingFilters) {
  const prompt = buildSiblingPrompt(filters)

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
                text: `${prompt}

You are an expert in sibling name harmony and family naming traditions. You specialize in finding names that create beautiful, balanced sibling sets while respecting cultural significance and family preferences.

Always respond with a valid JSON array of exactly 12 sibling name objects. Each object must have:
- name: string (the suggested sibling name)
- meaning: string (detailed meaning and significance)
- origin: string (cultural/religious origin)
- pronunciation: string (phonetic pronunciation guide)
- gender: string (male/female/unisex)
- matchReason: string (specific explanation of why this name harmonizes with the existing siblings)

Ensure suggestions:
- Create harmonious sibling sets (rhythmic, cultural, or thematic matches)
- Are culturally appropriate and respectful
- Sound pleasant when said together with existing names
- Have meaningful connections or complementary meanings
- Avoid names that are too similar or rhyme awkwardly`,
              },
            ],
          },
        ],
      }),
    })

    const data = await response.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""

    const cleanedText = rawText.replace(/```json\n?|\n?```/g, "").trim()
    const suggestions = JSON.parse(cleanedText)

    return suggestions.slice(0, 12)
  } catch (error) {
    console.error("Error generating sibling names:", error)
    return getFallbackSiblingNames(filters.newBabyGender)
  }
}

function buildSiblingPrompt(filters: SiblingFilters): string {
  let prompt = `Generate 12 perfect sibling names that harmonize with these existing children's names:\n\n`

  prompt += `Existing siblings: ${filters.existingNames.join(", ")}\n`
  prompt += `New baby gender: ${filters.newBabyGender}\n`

  if (filters.matchingPreferences.length > 0) {
    prompt += `Prioritize these matching styles: ${filters.matchingPreferences.join(", ")}\n`
  }

  prompt += `\nAnalyze the existing names for:
- Cultural/ethnic origins and traditions
- Syllable patterns and rhythm
- Phonetic qualities and sound harmony
- Name lengths and structures
- Meanings and thematic connections
- Modern vs traditional balance

Create sibling names that:
- Sound harmonious when said together with existing names
- Maintain consistent cultural or stylistic themes
- Have complementary or related meanings when possible
- Follow similar rhythmic or phonetic patterns
- Create a balanced and beautiful sibling set

For each suggestion, explain specifically why it's a perfect match for the existing sibling names.`

  return prompt
}

function getFallbackSiblingNames(gender: string) {
  const fallbackNames = {
    male: [
      {
        name: "Arjun",
        meaning: "Bright, shining, white",
        origin: "Sanskrit/Hindu",
        pronunciation: "AR-jun",
        gender: "male",
        matchReason: "Classic Indian name with strong, clear pronunciation",
      },
    ],
    female: [
      {
        name: "Anaya",
        meaning: "Caring, guardian",
        origin: "Sanskrit/Hindu",
        pronunciation: "ah-NAH-ya",
        gender: "female",
        matchReason: "Melodic name with beautiful meaning",
      },
    ],
    unisex: [
      {
        name: "Avani",
        meaning: "Earth, nature",
        origin: "Sanskrit/Hindu",
        pronunciation: "ah-VAH-nee",
        gender: "unisex",
        matchReason: "Nature-inspired name with universal appeal",
      },
    ],
  }

  return fallbackNames[gender as keyof typeof fallbackNames] || fallbackNames.unisex
}
