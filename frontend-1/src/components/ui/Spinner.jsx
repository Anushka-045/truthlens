import React from 'react'
import { motion } from 'framer-motion'

export default function Spinner({ size = 'md', label }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} rounded-full border-2 border-slate-800 border-t-indigo-500`}
      />
      {label && <p className="text-sm text-slate-500 font-medium">{label}</p>}
    </div>
  )
}
