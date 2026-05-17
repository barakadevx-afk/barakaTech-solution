import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coffee, X, Phone, CreditCard, CheckCircle,
  Loader2, Heart, Gift, Sparkles, AlertCircle,
  Crown, Star, Zap, Lock, Check
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const donationAmounts = [
  { amount: 500, label: 'Coffee', icon: Coffee, description: 'Buy me a coffee ☕', emoji: '☕' },
  { amount: 1000, label: 'Lunch', icon: Gift, description: 'Buy me lunch 🍱', emoji: '🍱' },
  { amount: 2500, label: 'Support', icon: Heart, description: 'Big support 💖', emoji: '💖' },
  { amount: 5000, label: 'Super Fan', icon: Sparkles, description: 'Super supporter 🚀', emoji: '🚀' },
]

const premiumPerks = [
  'Download full source code (50+ projects)',
  'Priority 24h support from Baraka',
  'Private Discord community access',
  'Early access to new projects',
  'Personalized content recommendations',
  'Premium badge on your profile',
]

const paymentMethods = [
  { id: 'mtn', name: 'MTN Mobile Money', shortName: 'MTN MoMo', number: '0792828727' },
  { id: 'airtel', name: 'Airtel Money', shortName: 'Airtel Money', number: '0732594863' },
]

const PAWAPAY_TOKEN = 'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjIwMzk5IiwibWF2IjoiMSIsImV4cCI6MjA5MzAwMTkzNCwiaWF0IjoxNzc3MzgyNzM0LCJwbSI6IkRBRixQQUYiLCJqdGkiOiJkNjM0Yjk2Yy1jMzIzLTRhNjEtYWY4Zi00YWNhYzc5ZTJhMDUifQ.H9YVNFitLC6q-Jr4lfGa4VCP39l3sbJEOY-fn731U8xiNBQZVCQuttD0nVF8J579ow0qyzHaSoRCX2NWynMzzg'

function PawaPayDonation() {
  const { showPawaPayModal, closePawaPayModal, isPremium, isRegistered, upgradeToPremium, openAuthModal } = useAuth()
  const [step, setStep] = useState('perks') // 'perks', 'amount', 'phone', 'confirm', 'success'
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState('mtn')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (!showPawaPayModal) {
      setTimeout(() => {
        setStep('perks')
        setSelectedAmount(null)
        setPhoneNumber('')
        setCustomAmount('')
        setError(null)
      }, 300)
    }
  }, [showPawaPayModal])

  const handleDonate = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      const finalAmount = selectedAmount || parseInt(customAmount) || 0
      const recipientNumber = paymentMethods.find(m => m.id === selectedMethod)?.number

      const response = await fetch('https://api.pawapay.io/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PAWAPAY_TOKEN}`,
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'RWF',
          payer: {
            phoneNumber: phoneNumber,
            network: selectedMethod === 'mtn' ? 'MTN' : 'AIRTEL'
          },
          payee: {
            phoneNumber: recipientNumber,
            network: selectedMethod === 'mtn' ? 'MTN' : 'AIRTEL'
          },
          description: `Portfolio Support - ${donationAmounts.find(a => a.amount === selectedAmount)?.label || 'Custom'}`,
          reference: `donation-${Date.now()}`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Payment failed: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'PENDING' || data.status === 'SUCCESS' || data.status === 'ACCEPTED') {
        upgradeToPremium()
        setStep('success')
      } else {
        throw new Error(data.message || 'Payment failed')
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const finalAmount = selectedAmount || Number(customAmount) || 0
  const isOpen = showPawaPayModal

  const handleClose = () => {
    if (!isProcessing) closePawaPayModal()
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-24 right-6 z-40 flex items-center gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap"
            >
              ☕ Support & Go Premium!
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-900 dark:bg-white rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Pulse rings */}
          <motion.span
            animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-orange-400"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1.7], opacity: [0.4, 0.15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            className="absolute inset-0 rounded-full bg-yellow-400"
          />
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            onClick={() => { setStep('perks'); openPawaPayModal() }}
            className="relative z-10 p-4 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-rose-500 text-white shadow-xl shadow-orange-500/40"
          >
            <Coffee className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-dark-200 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Gradient header bar */}
              <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-500" />

              {/* Close */}
              <button
                onClick={handleClose}
                disabled={isProcessing}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors z-10 disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="px-6 pt-6 pb-4 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/30">
                  <Coffee className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Buy Me Coffee</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Support Baraka · Unlock Premium</p>
                </div>
              </div>

              {/* Step indicator */}
              {step !== 'success' && step !== 'perks' && (
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-2">
                    {['amount', 'phone', 'confirm'].map((s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step === s ? 'bg-orange-500 text-white' :
                          ['amount', 'phone', 'confirm'].indexOf(step) > i ? 'bg-green-500 text-white' :
                          'bg-gray-200 dark:bg-gray-700 text-gray-500'
                        }`}>
                          {['amount', 'phone', 'confirm'].indexOf(step) > i ? <Check className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        {i < 2 && <div className={`flex-1 h-0.5 w-8 ${['amount', 'phone', 'confirm'].indexOf(step) > i ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                      </div>
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 capitalize">{step}</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="px-6 pb-6">
                <AnimatePresence mode="wait">

                  {/* STEP: PERKS */}
                  {step === 'perks' && (
                    <motion.div key="perks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      {isPremium ? (
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border border-rose-100 dark:border-rose-800/30 text-center">
                          <Crown className="w-10 h-10 mx-auto mb-2 text-rose-500" />
                          <p className="font-bold text-gray-900 dark:text-white mb-1">You're already Premium!</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Thank you for supporting Baraka's work 🙏</p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border border-rose-200 dark:border-rose-800/30">
                          <div className="flex items-center gap-2 mb-3">
                            <Crown className="w-5 h-5 text-rose-500" />
                            <p className="font-bold text-gray-900 dark:text-white text-sm">What you unlock with Premium</p>
                          </div>
                          <ul className="space-y-2">
                            {premiumPerks.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <Check className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Any amount unlocks premium instantly via Rwanda mobile money
                      </p>

                      <button
                        onClick={() => setStep('amount')}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Coffee className="w-5 h-5" />
                        {isPremium ? 'Donate Again' : 'Support Baraka →'}
                      </button>

                      {!isRegistered && (
                        <p className="text-xs text-center text-gray-400">
                          <button onClick={() => { handleClose(); setTimeout(openAuthModal, 200) }} className="text-primary-500 hover:underline font-medium">
                            Sign in
                          </button>
                          {' '}to link premium to your account
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* STEP: AMOUNT */}
                  {step === 'amount' && (
                    <motion.div key="amount" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <button onClick={() => setStep('perks')} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
                        ← Back
                      </button>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
                        Choose how much to send (RWF)
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {donationAmounts.map((item) => (
                          <button
                            key={item.amount}
                            onClick={() => { setSelectedAmount(item.amount); setCustomAmount('') }}
                            className={`p-4 rounded-2xl border-2 transition-all text-left group ${
                              selectedAmount === item.amount
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md shadow-orange-500/10'
                                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-900/10'
                            }`}
                          >
                            <div className="text-2xl mb-1">{item.emoji}</div>
                            <p className="font-black text-gray-900 dark:text-white text-lg">
                              RWF {item.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Custom Amount (RWF)
                        </label>
                        <input
                          type="number"
                          placeholder="Enter any amount"
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                      </div>

                      <button
                        onClick={() => setStep('phone')}
                        disabled={!finalAmount || finalAmount <= 0}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                      >
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {/* STEP: PHONE */}
                  {step === 'phone' && (
                    <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <button onClick={() => setStep('amount')} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
                        ← Back
                      </button>

                      <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-100 dark:border-orange-800/30">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You are sending</p>
                        <p className="text-4xl font-black text-orange-600">RWF {finalAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">to Baraka DevX</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedMethod(method.id)}
                              className={`p-4 rounded-2xl border-2 transition-all ${
                                selectedMethod === method.id
                                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                              }`}
                            >
                              {method.id === 'mtn' ? (
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md">
                                  <span className="text-black font-black text-xs tracking-tighter">MTN</span>
                                </div>
                              ) : (
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
                                  <span className="text-white font-bold text-xs">Airtel</span>
                                </div>
                              )}
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{method.shortName}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="250 7XX XXX XXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          You'll receive an STK push to confirm payment
                        </p>
                      </div>

                      <button
                        onClick={() => setStep('confirm')}
                        disabled={phoneNumber.length < 10}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                      >
                        Review Payment →
                      </button>
                    </motion.div>
                  )}

                  {/* STEP: CONFIRM */}
                  {step === 'confirm' && (
                    <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <button onClick={() => setStep('phone')} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
                        ← Back
                      </button>

                      <div className="text-center mb-2">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                          <CreditCard className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Confirm Payment</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Check the phone to approve the STK push</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-300 space-y-3">
                        {[
                          ['Amount', `RWF ${finalAmount.toLocaleString()}`],
                          ['Method', paymentMethods.find(m => m.id === selectedMethod)?.name],
                          ['Your phone', phoneNumber],
                          ['Recipient', `+250 ${paymentMethods.find(m => m.id === selectedMethod)?.number}`],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">{label}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
                          <span className="font-bold text-gray-900 dark:text-white">Total</span>
                          <span className="font-black text-xl text-orange-500">RWF {finalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Premium unlock preview */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/10 dark:to-orange-900/10 border border-rose-100 dark:border-rose-800/30 flex items-center gap-2">
                        <Crown className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-rose-600">Premium unlocked</span> instantly after payment
                        </p>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold">Payment Error</p>
                            <p className="text-xs mt-0.5">{error}</p>
                          </div>
                        </motion.div>
                      )}

                      <button
                        onClick={handleDonate}
                        disabled={isProcessing}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold disabled:opacity-60 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Coffee className="w-5 h-5" />
                            Pay RWF {finalAmount.toLocaleString()}
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                  {/* STEP: SUCCESS */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4 space-y-4"
                    >
                      {/* Animated success ring */}
                      <div className="relative w-24 h-24 mx-auto">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 to-orange-400"
                        />
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center shadow-xl shadow-rose-500/40">
                          <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                          Thank You! 🎉
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Your support means the world to Baraka.
                        </p>
                      </div>

                      {/* Premium granted card */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Crown className="w-5 h-5" />
                          <p className="font-bold">Premium Unlocked!</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {['Source Code Access', 'Priority Support', 'Discord Community', 'Early Access'].map((p) => (
                            <div key={p} className="flex items-center gap-1.5 text-xs text-white/90">
                              <Check className="w-3 h-3" />
                              {p}
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                          >
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>

                      <button
                        onClick={handleClose}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold hover:shadow-lg transition-all"
                      >
                        Awesome, close!
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer */}
              {step !== 'success' && (
                <div className="px-6 pb-5 text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    🔒 Secure · Rwanda Mobile Money · MTN & Airtel
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    MTN: +250 792 828 727 · Airtel: +250 732 594 863
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PawaPayDonation
