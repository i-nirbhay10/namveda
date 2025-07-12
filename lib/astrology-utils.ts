export function calculateNumerology(birthDate: Date) {
  const dateString = birthDate.toISOString().split("T")[0].replace(/-/g, "")
  let sum = 0

  for (const digit of dateString) {
    sum += Number.parseInt(digit)
  }

  // Reduce to single digit (except master numbers 11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number.parseInt(digit), 0)
  }

  return {
    lifePathNumber: sum,
    meaning: getNumerologyMeaning(sum),
  }
}

export function calculateNakshatra(birthDate: Date) {
  // Simplified Nakshatra calculation based on date
  const nakshatras = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati",
  ]

  const dayOfYear = Math.floor(
    (birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
  )
  const nakshatraIndex = Math.floor((dayOfYear * 27) / 365) % 27

  return nakshatras[nakshatraIndex]
}

export function calculateZodiacSign(birthDate: Date) {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
  return "Pisces"
}

export function calculateChineseZodiac(birthDate: Date) {
  const year = birthDate.getFullYear()
  const animals = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ]

  // Chinese zodiac starts from 1900 as Rat year
  const index = (year - 1900) % 12
  return animals[index]
}

function getNumerologyMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: "Leadership, independence, pioneering spirit",
    2: "Cooperation, harmony, diplomacy",
    3: "Creativity, communication, optimism",
    4: "Stability, hard work, practicality",
    5: "Freedom, adventure, versatility",
    6: "Nurturing, responsibility, healing",
    7: "Spirituality, introspection, wisdom",
    8: "Material success, authority, achievement",
    9: "Humanitarian, compassion, completion",
    11: "Intuition, inspiration, enlightenment",
    22: "Master builder, practical idealism",
    33: "Master teacher, spiritual guidance",
  }

  return meanings[number] || "Unique path"
}
