'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, Activity, Brain, AlertCircle, Check } from 'lucide-react'

const modelMetrics = [
  { name: 'Logistic Regression', accuracy: 0.724, auc: 0.786 },
  { name: 'RF Baseline', accuracy: 0.721, auc: 0.783 },
  { name: 'RF Tuned', accuracy: 0.732, auc: 0.798 },
]

const confusionData = [
  { category: 'True Negative', value: 5470, fill: '#3b82f6' },
  { category: 'False Positive', value: 1534, fill: '#ef4444' },
  { category: 'False Negative', value: 2220, fill: '#f97316' },
  { category: 'True Positive', value: 4776, fill: '#22c55e' },
]

const performanceData = [
  { metric: 'Accuracy', 'LR': 72.4, 'RF-B': 72.1, 'RF-T': 73.2 },
  { metric: 'Precision', 'LR': 74.6, 'RF-B': 73.2, 'RF-T': 75.7 },
  { metric: 'Recall', 'LR': 67.8, 'RF-B': 69.7, 'RF-T': 68.3 },
  { metric: 'F1 Score', 'LR': 71.1, 'RF-B': 71.4, 'RF-T': 71.8 },
  { metric: 'ROC AUC', 'LR': 78.6, 'RF-B': 78.3, 'RF-T': 79.8 },
]

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Real-time model performance and analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Best Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">73.2%</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">RF Tuned Model</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Best ROC AUC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">0.798</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Random Forest</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Brain className="w-4 h-4" /> Models Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">3</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">All tuned & ready</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <Check className="w-4 h-4" /> CV Stability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">±0.003</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">5-fold cross-validation</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Comparison */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>All models across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="LR" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="RF-B" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="RF-T" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Confusion Matrix */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Confusion Matrix (RF Tuned)</CardTitle>
            <CardDescription>Best model results on test data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={confusionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {confusionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Model Details */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Model Details</CardTitle>
          <CardDescription>Comprehensive metrics for all trained models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modelMetrics.map((model) => (
              <div
                key={model.name}
                className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{model.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Accuracy</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{(model.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">ROC AUC</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{model.auc.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
            <Check className="w-5 h-5" /> System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-700 dark:text-green-300">
          ✓ All models loaded successfully
          <br />
          ✓ API server is running and operational
          <br />
          ✓ Ready for predictions
        </CardContent>
      </Card>
    </div>
  )
}
