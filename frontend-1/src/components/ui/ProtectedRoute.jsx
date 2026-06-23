import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Shield } from 'lucide-react'
import Button from './Button'

// UI-only wrapper — shows a lock screen for unauthenticated demo
export default function ProtectedRoute({ children, isAuthenticated = false }) {
  if (isAuthenticated) return children

  return (
    <div className="min-h-screen bg-navy-950 dot-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl border border-indigo-500/20 p-10 max-w-sm w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          You need to sign in to access this page. Create a free account to get started.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/login">
            <Button size="lg" className="w-full">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="w-full">Create Account</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs text-slate-500">Your data is always encrypted</span>
        </div>
      </motion.div>
    </div>
  )
}
