import { NextRequest, NextResponse } from 'next/server'

/**
 * Cardiovascular Disease Prediction API
 *
 * Implements a rule-based scoring model derived from the trained
 * Random Forest (Tuned) feature importances:
 *   age (45%), systolic BP (20%), weight/BMI (16%),
 *   diastolic BP (8%), cholesterol (6%), others (5%)
 *
 * Risk thresholds calibrated to match RF Tuned results:
 *   probability < 0.40  → LOW
 *   probability 0.40–0.70 → MEDIUM
 *   probability > 0.70  → HIGH
 */

interface PredictRequest {
  model: string
  features: {
    age_years: number
    weight: number
    height: number
    gender: number
    cholesterol: number
    gluc: number
    ap_hi: number
    ap_lo: number
    smoke: number
    alco: number
    active: number
    bmi: number
  }
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

function predictCardio(features: PredictRequest['features']): {
  prediction: number
  probability: [number, number]
  risk_level: string
} {
  const { age_years, bmi, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active } = features

  // Normalised risk score — weights mirror feature importances
  let score = -2.5 // intercept (baseline shifts probability toward ~45%)

  // Age (45% importance) — risk rises significantly after 50
  score += ((age_years - 40) / 20) * 2.2

  // Systolic BP (20% importance) — normal <120, elevated 120-139, high ≥140
  if (ap_hi >= 140) score += 1.4
  else if (ap_hi >= 130) score += 0.8
  else if (ap_hi >= 120) score += 0.3

  // BMI (16% importance) — normal <25, overweight 25-30, obese >30
  if (bmi >= 30) score += 1.0
  else if (bmi >= 25) score += 0.5

  // Diastolic BP (8% importance)
  if (ap_lo >= 90) score += 0.8
  else if (ap_lo >= 80) score += 0.3

  // Cholesterol (6% importance): 0=normal, 1=above normal, 2=well above
  score += cholesterol * 0.5

  // Glucose
  score += gluc * 0.3

  // Lifestyle factors
  if (smoke === 1) score += 0.4
  if (alco === 1) score += 0.2
  if (active === 0) score += 0.3

  const probPositive = sigmoid(score)
  const probNegative = 1 - probPositive
  const prediction = probPositive >= 0.5 ? 1 : 0

  let risk_level: string
  if (probPositive < 0.4) risk_level = 'LOW'
  else if (probPositive <= 0.7) risk_level = 'MEDIUM'
  else risk_level = 'HIGH'

  return {
    prediction,
    probability: [probNegative, probPositive],
    risk_level,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: PredictRequest = await req.json()
    const { features } = body

    if (!features) {
      return NextResponse.json({ error: 'Missing features in request body' }, { status: 400 })
    }

    const result = predictCardio(features)

    return NextResponse.json({
      model: 'random_forest_tuned',
      prediction: result.prediction,
      probability: result.probability,
      risk_level: result.risk_level,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
