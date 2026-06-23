import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts'
import {
  Eye, LayoutDashboard, History, Settings, LogOut, Zap, Shield,
  TrendingUp, AlertTriangle, Globe, Search, Bell, ChevronRight,
  Menu, X, Plus, ExternalLink, Clock, CheckCircle2, XCircle
} from 'lucide-react'
import Button from '../components/ui/Button'

const weeklyData = [
  { day: 'Mon', analyzed: 4, flagged: 2 },
  { day: 'Tue', analyzed: 7, flagged: 3 },
  { day: 'Wed', analyzed: 2, flagged: 1 },
  { day: 'Thu', analyzed: 9, flagged: 5 },
  { day: 'Fri', analyzed: 6, flagged: 2 },
  { day: 'Sat', analyzed: 3, flagged: 1 },
  { day: 'Sun', analyzed: 5, flagged: 4 },
]

const trustTrend = [
  { day: 'Mon', avg: 62 }, { day: 'Tue', avg: 48 }, { day: 'Wed', avg: 71 },
  { day: 'Thu', avg: 34 }, { day: 'Fri', avg: 55 }, { day: 'Sat', avg: 80 }, { day: 'Sun', avg: 45 },
]

const historyItems = [
  { title: 'NASA announces discovery of liquid water on Mars', score: 34, verdict: 'Misleading', time: '2 hours ago', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  { title: 'Fed raises interest rates by 0.25% in latest policy decision', score: 91, verdict: 'Credible', time: '5 hours ago', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  { title: 'New vaccine shown to be 99% effective against all COVID variants', score: 47, verdict: 'Uncertain', time: 'Yesterday', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  { title: 'Local government announces $2B infrastructure spending plan', score: 83, verdict: 'Credible', time: 'Yesterday', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  { title: 'Celebrity claims government hiding UFO landings in Nevada desert', score: 12, verdict: 'False', time: '2 days ago', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: History, label: 'History', id: 'history' },
  { icon: TrendingUp, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

function StatCard({ label, value, sub, icon: Icon, color, change }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass glass-hover rounded-xl p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${change > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold font-mono text-white mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
      {sub && <div className="text-xs text-slate-600 mt-0.5">{sub}</div>}
    </motion.div>
  )
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className="fixed top-0 left-0 bottom-0 w-64 z-40 lg:translate-x-0 lg:static lg:block"
          style={{ background: 'rgba(13,21,38,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(30,41,59,0.6)' }}
        >
          <div className="flex flex-col h-full p-5">
            {/* Logo */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="font-bold text-base">
                  <span className="text-white">Truth</span>
                  <span className="text-indigo-400">Lens</span>
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-600 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Analyze CTA */}
            <Button size="md" className="w-full mb-6" onClick={() => navigate('/')}>
              <Plus className="w-4 h-4" />
              New Analysis
            </Button>

            {/* Nav */}
            <nav className="flex-1 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeNav === item.id
                      ? 'bg-indigo-500/15 border border-indigo-500/25 text-indigo-400'
                      : 'text-slate-500 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* User section */}
            <div className="border-t border-slate-800/60 pt-5">
              <div className="flex items-center gap-3 mb-4 px-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">M</div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">Mehak S.</div>
                  <div className="text-xs text-slate-500 truncate">Free plan · 38/50 left</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1 mb-4">
                <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '76%' }} />
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-slate-800/60 transition-all">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.aside>
      </>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between border-b border-slate-800/60"
          style={{ background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white p-1">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 w-72">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <input
                placeholder="Search analyses..."
                className="bg-transparent text-sm text-slate-400 placeholder-slate-600 focus:outline-none flex-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-white transition-colors">
              <Bell className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white cursor-pointer">M</div>
          </div>
        </div>

        <div className="p-6 max-w-6xl">
          {/* Welcome header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back, <span className="text-indigo-400">Mehak</span> 👋
            </h1>
            <p className="text-slate-500 text-sm">Here's what happened with your analyses this week.</p>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Analyzed" value="36" change={12} icon={Globe} color="bg-indigo-500/10 border border-indigo-500/25 text-indigo-400" />
            <StatCard label="Flagged as Fake" value="14" change={-3} icon={AlertTriangle} color="bg-red-500/10 border border-red-500/25 text-red-400" />
            <StatCard label="Avg Trust Score" value="58.4" sub="this week" icon={Shield} color="bg-amber-500/10 border border-amber-500/25 text-amber-400" />
            <StatCard label="Analyses Left" value="14" sub="resets in 8 days" icon={Zap} color="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 border border-slate-700/40"
            >
              <h3 className="text-sm font-semibold text-white mb-5">Weekly Analysis Volume</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData} barGap={4}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #1E293B', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#E2E8F0' }}
                  />
                  <Bar dataKey="analyzed" fill="#6366F1" radius={[3, 3, 0, 0]} opacity={0.8} />
                  <Bar dataKey="flagged" fill="#EF4444" radius={[3, 3, 0, 0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /><span className="text-xs text-slate-500">Analyzed</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-400" /><span className="text-xs text-slate-500">Flagged</span></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 border border-slate-700/40"
            >
              <h3 className="text-sm font-semibold text-white mb-5">Avg Trust Score Trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trustTrend}>
                  <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #1E293B', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#E2E8F0' }}
                  />
                  <Line type="monotone" dataKey="avg" stroke="#6366F1" strokeWidth={2} dot={{ fill: '#6366F1', r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* History table */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl border border-slate-700/40 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800/60">
              <h3 className="text-sm font-semibold text-white">Recent Analyses</h3>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-800/60">
              {historyItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-4 p-4 hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  onClick={() => navigate('/results')}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${item.bg}`}>
                    {item.score >= 70 ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${item.color}`} />
                    ) : item.score >= 45 ? (
                      <AlertTriangle className={`w-3.5 h-3.5 ${item.color}`} />
                    ) : (
                      <XCircle className={`w-3.5 h-3.5 ${item.color}`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate group-hover:text-white transition-colors">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span className="text-xs text-slate-600">{item.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div>
                      <div className={`text-right text-sm font-bold font-mono ${item.color}`}>{item.score}</div>
                      <div className={`text-right text-xs mt-0.5 ${item.color}`}>{item.verdict}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            {historyItems.length === 0 && (
              <div className="py-20 text-center">
                <Globe className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-medium mb-1">No analyses yet</p>
                <p className="text-sm text-slate-600 mb-6">Start by analyzing a news article or URL</p>
                <Button onClick={() => navigate('/')}>
                  <Plus className="w-4 h-4" />
                  Analyze First Article
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
