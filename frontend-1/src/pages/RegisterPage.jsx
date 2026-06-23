import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'

function InputField({ label, type, placeholder, icon: Icon, value, onChange, hint }) {
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPass ? 'text' : 'password') : type

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 border ${
          focused
            ? 'border-indigo-500/60 bg-indigo-500/5 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]'
            : 'border-slate-700/60 bg-slate-900/60'
        }`}
      >
        <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${focused ? 'text-indigo-400' : 'text-slate-600'}`} />
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPass(!showPass)} className="text-slate-600 hover:text-slate-400 transition-colors">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-slate-600 mt-1.5 ml-1">{hint}</p>}
    </div>
  )
}

const perks = [
  '50 free analyses per month',
  'Detailed bias & trust reports',
  'History & export to CSV',
  'No credit card required',
]

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] dot-bg flex">
      {/* Left panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Eye className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Truth</span>
              <span className="text-indigo-400">Lens</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-slate-500">Start verifying news in under 60 seconds</p>
          </div>

          {/* Google button */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60 transition-all text-sm font-medium text-slate-300 mb-6"
          >
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-600 font-medium">or register with email</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <div className="space-y-4 mb-8">
            <InputField
              label="Full name"
              type="text"
              placeholder="John Doe"
              icon={User}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              icon={Lock}
              value={password}
              onChange={e => setPassword(e.target.value)}
              hint="Use a mix of letters, numbers, and symbols"
            />
          </div>

          <Button
            size="xl"
            className="w-full mb-4"
            loading={loading}
            onClick={handleRegister}
          >
            {!loading && (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-slate-600 mb-6">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-slate-500 hover:text-slate-300 underline">Terms</a>{' '}
            and{' '}
            <a href="#" className="text-slate-500 hover:text-slate-300 underline">Privacy Policy</a>
          </p>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right panel - perks */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(16,185,129,0.04))' }}
      >
        <div className="absolute inset-0 border-l border-slate-800/60" />
        <div className="relative text-center max-w-md">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Eye className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="font-bold text-xl">
              <span className="text-white">Truth</span>
              <span className="text-indigo-400">Lens</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">Everything you need</h2>
          <p className="text-slate-500 text-sm mb-10">Your free account includes everything to get started.</p>

          <ul className="space-y-4 text-left">
            {perks.map((perk, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-slate-300 text-sm">{perk}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 glass rounded-2xl p-5 border border-indigo-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">P</div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Priya M.</div>
                <div className="text-xs text-slate-500">Fact-checker, Reuters</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic text-left">"Cut my verification time from 45 minutes to under 3."</p>
          </div>
        </div>
      </div>
    </div>
  )
}
