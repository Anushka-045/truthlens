import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarRadiusAxis, Tooltip
} from 'recharts'
import {
  Shield, AlertTriangle, TrendingUp, Globe, Eye, BookOpen,
  Zap, ChevronRight, Info, CheckCircle2, XCircle, AlertCircle,
  ArrowLeft, Share2, Download, Flag
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'

const MOCK = {
  title: 'NASA announces discovery of liquid water on Mars, scientists say colonization possible within 5 years',
  trustScore: 34,
  verdict: 'Likely Misleading',
  verdictColor: 'text-amber-400',
  verdictBg: 'bg-amber-500/10 border-amber-500/30',
  scores: [
    { label: 'Reliability', value: 28, color: '#EF4444', icon: Shield, desc: 'Cross-referenced against 12 databases — no corroborating sources found.' },
    { label: 'Fact Confidence', value: 41, color: '#F59E0B', icon: TrendingUp, desc: 'Some factual elements exist, but core claim lacks citation.' },
    { label: 'Bias', value: 72, color: '#F59E0B', icon: Eye, desc: 'Strong sensationalist framing detected. Emotional language in headline.' },
    { label: 'Emotional Manipulation', value: 81, color: '#EF4444', icon: AlertTriangle, desc: 'High urgency triggers and fear-of-missing-out signals present.' },
    { label: 'Scam Risk', value: 19, color: '#10B981', icon: Flag, desc: 'No known scam domain patterns. Not a monetized misinformation site.' },
    { label: 'Source Diversity', value: 15, color: '#EF4444', icon: Globe, desc: 'Only one unnamed source. No independent verification cited.' },
  ],
  missingPerspectives: [
    'No statement from NASA official communications team',
    'Missing peer-reviewed research citations',
    'No independent astrophysicist quotes',
    'Colonization timeline claim unsupported by any NASA roadmap',
  ],
  recommendation: 'Do not share without independent verification. The headline makes extraordinary claims without citing verifiable NASA sources. Check nasa.gov directly and cross-reference with AP, Reuters, or science publications.',
}

function ScoreGauge({ score }) {
  const color = score >= 70 ? '#10B981' : score >= 45 ? '#F59E0B' : '#EF4444'
  const circumference = 2 * Math.PI * 45
  const dashoffset = circumference * (1 - score / 100)

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-4xl font-bold font-mono"
          style={{ color }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-slate-500 mt-1">/ 100</span>
      </div>
    </div>
  )
}

function MiniScoreBar({ label, value, color, icon: Icon, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="glass glass-hover rounded-xl p-5 group cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-medium text-slate-300">{label}</span>
        </div>
        <span className="text-sm font-bold font-mono" style={{ color }}>{value}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed hidden group-hover:block">{desc}</p>
    </motion.div>
  )
}

const radarData = [
  { metric: 'Reliability', A: 28 },
  { metric: 'Facts', A: 41 },
  { metric: 'Bias', A: 72 },
  { metric: 'Emotion', A: 81 },
  { metric: 'Scam Risk', A: 19 },
  { metric: 'Sources', A: 15 },
]

export default function ResultsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Back + Actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze Another
          </button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<Share2 className="w-3.5 h-3.5" />}>Share</Button>
            <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
          </div>
        </motion.div>

        {/* Article title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6 border border-slate-700/40"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Article analyzed</span>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">"{MOCK.title}"</p>
            </div>
          </div>
        </motion.div>

        {/* Main trust score card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-indigo-500/20 flex flex-col items-center justify-center text-center"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Trust Score</p>
            <ScoreGauge score={MOCK.trustScore} />
            <div className="mt-6">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${MOCK.verdictBg}`}>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span className={MOCK.verdictColor}>{MOCK.verdict}</span>
              </div>
              <p className="text-xs text-slate-600 mt-3">Analyzed in 2.1 seconds</p>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-slate-700/40"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Signal Map</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748B', fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Scores" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1E293B', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#E2E8F0' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick flags */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-slate-700/40 flex flex-col gap-3"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Detection Flags</p>
            {[
              { icon: XCircle, text: 'No corroborating sources', color: 'text-red-400' },
              { icon: XCircle, text: 'Sensationalist headline', color: 'text-red-400' },
              { icon: AlertCircle, text: 'Unverified author claim', color: 'text-amber-400' },
              { icon: AlertCircle, text: 'Missing expert quotes', color: 'text-amber-400' },
              { icon: CheckCircle2, text: 'No known scam domain', color: 'text-emerald-400' },
              { icon: CheckCircle2, text: 'No financial solicitation', color: 'text-emerald-400' },
            ].map((flag, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <flag.icon className={`w-3.5 h-3.5 flex-shrink-0 ${flag.color}`} />
                <span className="text-xs text-slate-400">{flag.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {MOCK.scores.map((score, i) => (
            <MiniScoreBar key={i} {...score} delay={0.1 * i + 0.4} />
          ))}
        </div>

        {/* Missing Perspectives */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-7 mb-5 border border-amber-500/15"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
              <Info className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Missing Perspectives</h3>
            <span className="ml-auto text-xs text-amber-400 font-medium">{MOCK.missingPerspectives.length} gaps found</span>
          </div>
          <ul className="space-y-3">
            {MOCK.missingPerspectives.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400/60 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-2xl p-7 border border-red-500/20"
          style={{ background: 'rgba(239,68,68,0.03)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Our Recommendation</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{MOCK.recommendation}</p>
          <div className="flex items-center gap-3 mt-6">
            <Button size="md" onClick={() => navigate('/')}>
              <Zap className="w-3.5 h-3.5" />
              Analyze Another
            </Button>
            <Button variant="outline" size="md">
              Report Feedback
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
