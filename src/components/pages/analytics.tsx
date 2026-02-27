'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

const learningCurveData = [
  { size: 1000, train: 0.68, test: 0.64 },
  { size: 5000, train: 0.72, test: 0.70 },
  { size: 10000, train: 0.74, test: 0.72 },
  { size: 20000, train: 0.76, test: 0.74 },
  { size: 40000, train: 0.78, test: 0.76 },
  { size: 56000, train: 0.81, test: 0.78 },
]

const featureImportanceData = [
  { name: 'age (years)', importance: 45, color: '#f43f5e' },
  { name: 'systolic_bp (ap_hi)', importance: 20, color: '#ec4899' },
  { name: 'weight (kg)', importance: 16, color: '#a855f7' },
  { name: 'diastolic_bp (ap_lo)', importance: 8, color: '#6366f1' },
  { name: 'cholesterol', importance: 6, color: '#0ea5e9' },
  { name: 'Others', importance: 5, color: '#06b6d4' },
]

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Activity className="w-8 h-8 text-green-500" /> Analytics & Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Deep dive into model performance and learning patterns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Best Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">79.8%</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">ROC AUC Score</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Overfitting Gap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">3.2%</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Train-Test Difference</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <TrendingDown className="w-4 h-4" /> Tuning Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">+1.5%</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Accuracy Improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Curve */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Learning Curve Analysis</CardTitle>
          <CardDescription>Model performance vs training data size - indicates no underfitting</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={learningCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="size"
                stroke="#64748b"
                label={{ value: 'Training Samples', position: 'insideBottomRight', offset: -5 }}
              />
              <YAxis stroke="#64748b" label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={(value) => (Number(value) * 100).toFixed(1) + '%'}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="train"
                stroke="#3b82f6"
                dot={{ fill: '#3b82f6' }}
                name="Training Accuracy"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="test"
                stroke="#10b981"
                dot={{ fill: '#10b981' }}
                name="Test Accuracy"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Feature Importance (Random Forest)</CardTitle>
          <CardDescription>Which features contribute most to predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={featureImportanceData}
              layout="vertical"
              margin={{ left: 80, right: 30, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="name" type="category" stroke="#64748b" width={70} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={(value) => (Number(value) * 100).toFixed(1) + '%'}
              />
              <Bar dataKey="importance" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cross-Validation Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>5-Fold Cross-Validation Results</CardTitle>
            <CardDescription>Model stability across different data splits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { fold: 'Fold 1', score: 0.7862 },
                { fold: 'Fold 2', score: 0.7881 },
                { fold: 'Fold 3', score: 0.7845 },
                { fold: 'Fold 4', score: 0.7858 },
                { fold: 'Fold 5', score: 0.7868 },
              ].map((item) => (
                <div key={item.fold}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.fold}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.score.toFixed(4)}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{ width: `${item.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Average CV Score</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">0.7864 ± 0.0026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Model Comparison Summary</CardTitle>
            <CardDescription>Key metrics across all trained models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { model: 'Logistic Regression', auc: 0.786, accuracy: 0.724 },
                { model: 'RF Baseline', auc: 0.783, accuracy: 0.721 },
                { model: 'RF Tuned (Best)', auc: 0.798, accuracy: 0.732 },
              ].map((item) => (
                <div key={item.model} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{item.model}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">ROC AUC</p>
                      <p className="font-bold text-slate-900 dark:text-white">{item.auc.toFixed(3)}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Accuracy</p>
                      <p className="font-bold text-slate-900 dark:text-white">{(item.accuracy * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="text-indigo-900 dark:text-indigo-100">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-indigo-800 dark:text-indigo-200">
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>Random Forest (Tuned) achieves best performance with 79.8% ROC AUC</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>Low overfitting gap (3.2%) indicates good generalization capability</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>age (years), systolic_bp (ap_hi), and weight (kg) are the top 3 predictive features</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>CV stability (±0.003) shows consistent performance across different data splits</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>Model shows improvement with hyperparameter tuning (+1.5% accuracy gain)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>Hyperparameter tuning improved RandomForest from 0.783 to 0.798 ROC AUC</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
