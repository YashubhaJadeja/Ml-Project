'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Heart, Brain, TrendingUp, Activity, AlertCircle } from 'lucide-react'

// Mock data for model metrics
const modelMetrics = [
  { name: 'Logistic Regression', accuracy: 0.724, precision: 0.746, recall: 0.678, f1: 0.711, auc: 0.786 },
  { name: 'Random Forest (Baseline)', accuracy: 0.721, precision: 0.732, recall: 0.697, f1: 0.714, auc: 0.783 },
  { name: 'Random Forest (Tuned)', accuracy: 0.732, precision: 0.757, recall: 0.683, f1: 0.718, auc: 0.798 },
]

const metricComparison = [
  { metric: 'Accuracy', 'Logistic Regression': 0.724, 'RF Baseline': 0.721, 'RF Tuned': 0.732 },
  { metric: 'Precision', 'Logistic Regression': 0.746, 'RF Baseline': 0.732, 'RF Tuned': 0.757 },
  { metric: 'Recall', 'Logistic Regression': 0.678, 'RF Baseline': 0.697, 'RF Tuned': 0.683 },
  { metric: 'F1 Score', 'Logistic Regression': 0.711, 'RF Baseline': 0.714, 'RF Tuned': 0.718 },
  { metric: 'ROC AUC', 'Logistic Regression': 0.786, 'RF Baseline': 0.783, 'RF Tuned': 0.798 },
]

const confusionData = [
  { category: 'True Negative', value: 5470, fill: '#3b82f6' },
  { category: 'False Positive', value: 1534, fill: '#ef4444' },
  { category: 'False Negative', value: 2220, fill: '#f97316' },
  { category: 'True Positive', value: 4776, fill: '#22c55e' },
]

const featureImportance = [
  { name: 'Feature_5', importance: 0.45 },
  { name: 'Feature_6', importance: 0.20 },
  { name: 'Feature_1', importance: 0.16 },
  { name: 'Feature_7', importance: 0.08 },
  { name: 'Feature_4', importance: 0.06 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-border bg-white dark:bg-slate-950 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Cardio ML Dashboard</h1>
                <p className="text-sm text-muted-foreground">Disease Prediction & Model Analytics</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Dataset: 70,000 samples</div>
              <div className="text-sm text-muted-foreground">Features: 13</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-blue-200 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Best Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.2%</div>
              <p className="text-xs text-muted-foreground">Random Forest (Tuned)</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 dark:border-green-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" /> Best ROC AUC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.798</div>
              <p className="text-xs text-muted-foreground">Random Forest (Tuned)</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Brain className="w-4 h-4" /> Models Trained
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+ Hyperparameter Tuning</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 dark:border-orange-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Cross-Val Stability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">± 0.003</div>
              <p className="text-xs text-muted-foreground">5-Fold Stratified KFold</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-slate-950 p-4 rounded-lg border border-border">
          {['overview', 'metrics', 'predictions', 'analysis'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Model Comparison</CardTitle>
                <CardDescription>Metrics across different models</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metricComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Logistic Regression" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="RF Baseline" fill="#f97316" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="RF Tuned" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Confusion Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Best Model - Confusion Matrix</CardTitle>
                <CardDescription>Random Forest (Tuned) - Test Set</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={confusionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {confusionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Feature Importance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top 5 Feature Importance</CardTitle>
                <CardDescription>Most influential features for predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={featureImportance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Metrics Tab */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {modelMetrics.map((model, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-xl font-semibold">{(model.accuracy * 100).toFixed(2)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Precision</p>
                      <p className="text-xl font-semibold">{(model.precision * 100).toFixed(2)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Recall</p>
                      <p className="text-xl font-semibold">{(model.recall * 100).toFixed(2)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">F1 Score</p>
                      <p className="text-xl font-semibold">{(model.f1 * 100).toFixed(2)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ROC AUC</p>
                      <p className="text-xl font-semibold">{(model.auc * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <Card>
            <CardHeader>
              <CardTitle>Make a Prediction</CardTitle>
              <CardDescription>Enter patient health metrics to get a prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age (years)</label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="Enter weight"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="Enter height"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cholesterol Level</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option>Normal</option>
                    <option>Above Normal</option>
                    <option>Well Above Normal</option>
                  </select>
                </div>
              </div>
              <Button className="w-full" size="lg">Get Prediction</Button>
            </CardContent>
          </Card>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-semibold text-green-700 dark:text-green-400">✓ Best Model: Random Forest (Tuned)</p>
                  <p className="text-sm text-muted-foreground">ROC AUC: 0.798 | Accuracy: 73.2%</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-700 dark:text-blue-400">Good Generalization</p>
                  <p className="text-sm text-muted-foreground">Logistic Regression shows minimal overfitting</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <p className="font-semibold text-orange-700 dark:text-orange-400">⚠ Potential Overfitting</p>
                  <p className="text-sm text-muted-foreground">Random Forest Baseline - Train/Test gap 27.9%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="font-semibold">1. Use Random Forest (Tuned) for Production</p>
                  <p className="font-semibold">2. Monitor Predictions with Confidence Scores</p>
                  <p className="font-semibold">3. Implement Regular Model Retraining</p>
                  <p className="font-semibold">4. Consider Ensemble Methods for Better Accuracy</p>
                  <p className="font-semibold">5. Feature Engineering May Improve Performance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
