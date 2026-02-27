'use client'

/**
 * Cardiovascular Disease Prediction Form
 * 
 * PATIENT INPUT COLLECTION:
 * - Personal Info: Age (years), Gender (Male/Female)
 * - Physical: Height (cm), Weight (kg) → Auto-calculates BMI
 * - Blood Pressure: Systolic (ap_hi), Diastolic (ap_lo)
 * - Health Markers: Cholesterol level, Glucose level
 * - Lifestyle: Smoking status, Alcohol consumption, Physical activity
 * 
 * DATA PREPROCESSING:
 * 1. Calculate BMI automatically: weight (kg) / (height (m)²)
 * 2. Convert age from years to days for API compatibility
 * 3. Encode categorical values (gender: 1=Female, 2=Male)
 * 4. Send to API for model preprocessing and transformation
 * 
 * PREDICTION PIPELINE:
 * 1. API preprocesses and encodes features
 * 2. Random Forest model predicts cardiovascular disease risk
 * 3. predict_proba returns confidence scores
 * 
 * RISK CLASSIFICATION:
 * - LOW: Probability < 40%
 * - MEDIUM: Probability 40-70%
 * - HIGH: Probability > 70%
 * 
 * UI DISPLAY:
 * - Prediction Result (Disease Present/Absent)
 * - Calculated BMI
 * - Confidence Score with progress bar
 * - Risk Level with color coding
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Zap, Heart, Loader } from 'lucide-react'

interface PredictionResult {
  model: string
  prediction: number
  probability: number
  riskLevel: string
  confidence: number
}

const riskLevelColors = {
  low: { bg: 'bg-green-50 dark:bg-green-950', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-300' },
  medium: { bg: 'bg-yellow-50 dark:bg-yellow-950', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-300' },
  high: { bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300' },
}

export default function PredictionForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [formData, setFormData] = useState({
    age_years: 45,
    weight: 70,
    height: 170,
    gender: 1,
    cholesterol: 1,
    gluc: 1,
    ap_hi: 120,
    ap_lo: 80,
    smoke: 0,
    alco: 0,
    active: 1,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }))
  }

  const handlePredict = async () => {
    setLoading(true)
    try {
      // Calculate BMI: weight (kg) / (height (m)^2)
      const heightInMeters = formData.height / 100
      const bmi = formData.weight / (heightInMeters * heightInMeters)

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'random_forest',
          features: {
            ...formData,
            bmi: bmi,
          },
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API error: ${response.status}`)
      }
      
      const data = await response.json()
      setResult({
        model: 'Random Forest (Tuned)',
        prediction: data.prediction,
        probability: data.probability[1],
        riskLevel: data.risk_level.toLowerCase(),
        confidence: data.probability[1] * 100,
      })
    } catch (error) {
      console.error('Prediction error:', error)
      alert(`Error making prediction: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Zap className="w-8 h-8 text-blue-500" /> Make a Prediction
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Use our trained ML models to predict cardiovascular disease risk</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-b">
              <CardTitle>Patient Health Data</CardTitle>
              <CardDescription>Enter patient information for prediction</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Age (years) <span className="text-xs text-slate-500">18-80</span>
                      </label>
                      <input
                        type="number"
                        name="age_years"
                        value={formData.age_years}
                        onChange={handleInputChange}
                        min="18"
                        max="80"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Weight (kg) <span className="text-xs text-slate-500">30-150</span>
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        min="30"
                        max="150"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Height (cm) <span className="text-xs text-slate-500">120-220</span>
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        min="120"
                        max="220"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Blood Pressure & Cholesterol */}
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Blood Pressure & Cholesterol</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Systolic BP (ap_hi) <span className="text-xs text-slate-500">80-200</span>
                      </label>
                      <input
                        type="number"
                        name="ap_hi"
                        value={formData.ap_hi}
                        onChange={handleInputChange}
                        min="80"
                        max="200"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Diastolic BP (ap_lo) <span className="text-xs text-slate-500">40-130</span>
                      </label>
                      <input
                        type="number"
                        name="ap_lo"
                        value={formData.ap_lo}
                        onChange={handleInputChange}
                        min="40"
                        max="130"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Cholesterol Level
                      </label>
                      <select
                        name="cholesterol"
                        value={formData.cholesterol}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0">Normal</option>
                        <option value="1">Above Normal</option>
                        <option value="2">Well Above Normal</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Glucose Level */}
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Glucose Level</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Blood Glucose Level
                    </label>
                    <select
                      name="gluc"
                      value={formData.gluc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0">Normal</option>
                      <option value="1">Above Normal</option>
                      <option value="2">Well Above Normal</option>
                    </select>
                  </div>
                </div>

                {/* Lifestyle Factors */}
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Lifestyle Factors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Smoking
                      </label>
                      <select
                        name="smoke"
                        value={formData.smoke}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Alcohol Consumption
                      </label>
                      <select
                        name="alco"
                        value={formData.alco}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Physical Activity
                      </label>
                      <select
                        name="active"
                        value={formData.active}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Making Prediction...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Get Prediction
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          {result ? (
            <Card
              className={`border-2 ${riskLevelColors[result.riskLevel as keyof typeof riskLevelColors].border} ${riskLevelColors[result.riskLevel as keyof typeof riskLevelColors].bg}`}
            >
              <CardHeader>
                <CardTitle className={riskLevelColors[result.riskLevel as keyof typeof riskLevelColors].text}>
                  {result.riskLevel === 'low' && <CheckCircle className="w-6 h-6 mb-2" />}
                  {result.riskLevel === 'medium' && <AlertCircle className="w-6 h-6 mb-2" />}
                  {result.riskLevel === 'high' && <AlertCircle className="w-6 h-6 mb-2" />}
                  {result.riskLevel.toUpperCase()} RISK
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Model</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{result.model}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Prediction</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {result.prediction === 1 ? 'Disease Present' : 'Disease Absent'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Calculated BMI</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {(formData.weight / ((formData.height / 100) ** 2)).toFixed(1)} kg/m²
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Confidence Score</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        result.riskLevel === 'low'
                          ? 'bg-green-500'
                          : result.riskLevel === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-semibold mt-2 text-slate-900 dark:text-white">{result.confidence.toFixed(1)}%</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-300 dark:border-slate-700 opacity-50">
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Fill the form and click "Get Prediction"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Prediction results will appear here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-sm text-blue-900 dark:text-blue-100">Model Information</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-blue-800 dark:text-blue-200 space-y-2">
              <p>✓ Accuracy: 73.2%</p>
              <p>✓ ROC AUC: 0.798</p>
              <p>✓ Trained on 70,000 samples</p>
              <p>✓ Cross-validated stability: ±0.003</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
