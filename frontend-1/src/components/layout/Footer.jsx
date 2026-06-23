import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, Github, Twitter, Linkedin, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-navy-950/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <Eye className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">Truth</span>
                <span className="text-indigo-400">Lens</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered misinformation detection. Analyze, verify, and understand the news you consume.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'API', 'Changelog'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Badge */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Security</h4>
            <div className="glass rounded-xl p-4 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">SOC 2 Compliant</span>
              </div>
              <p className="text-xs text-slate-500">Your data is encrypted in transit and at rest. We never sell user data.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2024 TruthLens. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
