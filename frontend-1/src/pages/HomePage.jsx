import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Zap, TrendingUp, AlertTriangle, Globe, Eye,
  ArrowRight, CheckCircle2, Star, ChevronRight, BarChart3,
  Search, Lock, Cpu
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
}

function FeatureCard({ icon: Icon, title, desc, color, delay }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass glass-hover rounded-2xl p-7 group"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function StatBadge({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-white font-mono">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const [inputText, setInputText] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  const handleAnalyze = () => {
    if (!inputText.trim()) return
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      navigate('/results')
    }, 2200)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-bg opacity-40" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-indigo-500/25"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Powered by GPT-4 + Fact-Checking APIs</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="text-white">Check if News is</span>
            <br />
            <span className="text-gradient">Real or Fake</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Paste any article or URL. Our AI cross-references 50+ fact-checking databases,
            detects bias patterns, and gives you a verified trust score in seconds.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-10 mb-10"
          >
            <StatBadge value="98.7%" label="Detection accuracy" />
            <div className="w-px h-8 bg-slate-800" />
            <StatBadge value="2.4s" label="Avg analysis time" />
            <div className="w-px h-8 bg-slate-800" />
            <StatBadge value="4.2M+" label="Articles analyzed" />
          </motion.div>

          {/* Main Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-3xl mx-auto"
          >
            <div
              className={`relative rounded-2xl transition-all duration-300 ${
                isFocused
                  ? 'shadow-[0_0_0_2px_rgba(99,102,241,0.5),0_0_40px_rgba(99,102,241,0.15)]'
                  : 'shadow-[0_0_0_1px_rgba(99,102,241,0.2)]'
              }`}
              style={{ background: 'rgba(13,21,38,0.8)', backdropFilter: 'blur(20px)' }}
            >
              {/* Scan line animation */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ top: 0, opacity: 0 }}
                    animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    className="absolute left-4 right-4 h-0.5 rounded-full pointer-events-none z-10"
                    style={{ background: 'linear-gradient(90deg, transparent, #6366F1, #10B981, transparent)' }}
                  />
                )}
              </AnimatePresence>

              <textarea
                rows={5}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Paste a news article, headline, or URL here...&#10;&#10;Example: 'Scientists discover new cure for diabetes' or https://example.com/article"
                className="w-full bg-transparent text-slate-200 placeholder-slate-600 text-sm sm:text-base resize-none p-6 rounded-2xl focus:outline-none leading-relaxed font-mono"
              />

              <div className="flex items-center justify-between px-5 pb-4 pt-1">
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> End-to-end encrypted
                  </span>
                  <span>{inputText.length}/5000 chars</span>
                </div>
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  loading={isScanning}
                  disabled={!inputText.trim()}
                  className="gap-2"
                >
                  {isScanning ? 'Analyzing...' : (
                    <>
                      <Zap className="w-4 h-4" />
                      Analyze Now
                    </>
                  )}
                </Button>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-3">
              Or try an example: {' '}
              <button
                onClick={() => setInputText('NASA announces discovery of liquid water on Mars, scientists say colonization possible within 5 years')}
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
              >
                Load sample article
              </button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">What We Detect</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Three layers of verification
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Every analysis runs three independent detection pipelines in parallel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard
              icon={Shield}
              title="Trust Score"
              desc="A 0–100 composite score built from source credibility, cross-reference matches, and linguistic truthfulness signals."
              color="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400"
              delay={0}
            />
            <FeatureCard
              icon={BarChart3}
              title="Bias Detection"
              desc="Identifies political lean, emotional manipulation, loaded language, and missing context across 14 measured dimensions."
              color="bg-amber-500/10 border border-amber-500/30 text-amber-400"
              delay={1}
            />
            <FeatureCard
              icon={AlertTriangle}
              title="Scam Risk"
              desc="Flags clickbait patterns, known misinformation domains, urgency manipulation, and financial scam indicators."
              color="bg-red-500/10 border border-red-500/30 text-red-400"
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              From paste to verdict in seconds
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {[
              { icon: Search, step: '01', title: 'Submit Content', desc: 'Paste your article text or drop a URL. We accept any language.' },
              { icon: Cpu, step: '02', title: 'AI Analysis', desc: 'Our pipeline checks 50+ fact databases and runs NLP bias detection.' },
              { icon: CheckCircle2, step: '03', title: 'Get Your Report', desc: 'Receive a detailed breakdown with trust score, bias metrics, and actionable context.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-14 h-14 rounded-2xl glass border border-indigo-500/25 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-xs font-mono font-bold text-indigo-500 mb-1">{item.step}</div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Sarah K.', role: 'Investigative Journalist', rating: 5, quote: 'TruthLens flagged a story our entire team missed. The bias breakdown alone is worth it.' },
              { name: 'Dr. Marcus T.', role: 'Media Research, Stanford', rating: 5, quote: 'The source diversity metric is genuinely novel. Nothing else on the market measures this.' },
              { name: 'Priya M.', role: 'Fact-Checker, Reuters', rating: 5, quote: 'Cut my verification time from 45 minutes to under 3. I use this on every breaking story.' },
            ].map((review, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-2xl p-7"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5 italic">"{review.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{review.name}</div>
                    <div className="text-xs text-slate-500">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 border border-indigo-500/25 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />
            <div className="relative">
              <Globe className="w-10 h-10 text-indigo-400 mx-auto mb-5" />
              <h2 className="text-3xl font-bold text-white mb-4">Stop spreading misinformation</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join 50,000+ journalists, researchers, and informed citizens who verify before they share.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="xl" onClick={() => navigate('/register')}>
                  Start Analyzing Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="xl" onClick={() => navigate('/results')}>
                  See a Demo Result
                </Button>
              </div>
              <p className="text-xs text-slate-600 mt-5">No credit card required · 50 free analyses/month</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
