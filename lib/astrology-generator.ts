interface AstrologyFilters {
  astrologyData: any
  gender: string
  astrologySystem: string
  birthDate: string
  birthTime?: string
  birthPlace?: string
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export async function generateAstrologicalNames(filters: AstrologyFilters) {
  const prompt = buildAstrologyPrompt(filters)

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

You are an expert in Vedic astrology, Western astrology, Chinese zodiac, and numerology with deep knowledge of how celestial influences affect naming traditions across cultures.

Always respond with a valid JSON array of exactly 12 astrologically aligned name objects. Each object must have:
- name: string (the suggested name)
- meaning: string (detailed meaning and significance)
- origin: string (cultural/religious origin)
- pronunciation: string (phonetic pronunciation guide)
- gender: string (male/female/unisex)
- astrologicalSignificance: string (specific explanation of astrological alignment)

Ensure suggestions:
- Are aligned with the specified astrological system and birth data
- Respect traditional astrological naming principles
- Have meaningful connections to celestial influences
- Are culturally appropriate and authentic
- Include specific astrological reasoning for each name`,
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
    console.error("Error generating astrological names:", error)
    return getFallbackAstrologicalNames(filters.gender)
  }
}

function buildAstrologyPrompt(filters: AstrologyFilters): string {
  let prompt = `Generate 12 names aligned with this astrological profile:\n\n`

  prompt += `Birth Date: ${filters.birthDate}\n`
  if (filters.birthTime) prompt += `Birth Time: ${filters.birthTime}\n`
  if (filters.birthPlace) prompt += `Birth Place: ${filters.birthPlace}\n`

  prompt += `Gender: ${filters.gender}\n`
  prompt += `Astrology System: ${filters.astrologySystem}\n\n`

  prompt += `Astrological Data:\n`
  prompt += `- Life Path Number: ${filters.astrologyData.numerology.lifePathNumber}\n`
  prompt += `- Numerology Meaning: ${filters.astrologyData.numerology.meaning}\n`
  prompt += `- Zodiac Sign: ${filters.astrologyData.zodiacSign}\n`
  prompt += `- Nakshatra: ${filters.astrologyData.nakshatra}\n`
  prompt += `- Chinese Zodiac: ${filters.astrologyData.chineseZodiac}\n\n`

  switch (filters.astrologySystem) {
    case "vedic":
      prompt += `Focus on Vedic astrology principles:
- Names that harmonize with the Nakshatra
- Sanskrit origins and meanings
- Planetary influences and gemstone connections
- Ayurvedic elemental balance`
      break
    case "western":
      prompt += `Focus on Western astrology principles:
- Names that align with zodiac sign characteristics
- Elemental associations (Fire, Earth, Air, Water)
- Planetary rulerships and influences
- Seasonal and mythological connections`
      break
    case "chinese":
      prompt += `Focus on Chinese zodiac principles:
- Names that complement the animal year characteristics
- Five element theory (Wood, Fire, Earth, Metal, Water)
- Yin/Yang balance considerations
- Traditional Chinese naming wisdom`
      break
    case "numerology":
      prompt += `Focus on numerological principles:
- Names that harmonize with the life path number
- Letter-to-number correspondences
- Vibrational frequencies and meanings
- Karmic and destiny number influences`
      break
  }

  prompt += `\n\nFor each name, provide specific astrological reasoning explaining how it aligns with the birth chart and chosen system.`

  return prompt
}

function getFallbackAstrologicalNames(gender: string) {
  const fallbackNames = {
    male: [
      {
        name: "Surya",
        meaning: "Sun, solar energy, illumination",
        origin: "Sanskrit/Vedic",
        pronunciation: "SOOR-ya",
        gender: "male",
        astrologicalSignificance: "Aligned with solar energy and leadership qualities",
      },
    ],
    female: [
      {
        name: "Chandra",
        meaning: "Moon, lunar energy, intuition",
        origin: "Sanskrit/Vedic",
        pronunciation: "CHAN-dra",
        gender: "female",
        astrologicalSignificance: "Connected to lunar cycles and emotional wisdom",
      },
    ],
    unisex: [
      {
        name: "Tara",
        meaning: "Star, celestial light",
        origin: "Sanskrit/Vedic",
        pronunciation: "TAH-ra",
        gender: "unisex",
        astrologicalSignificance: "Represents stellar influence and cosmic guidance",
      },
    ],
  }

  return fallbackNames[gender as keyof typeof fallbackNames] || fallbackNames.unisex
}
