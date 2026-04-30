import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Coffee, X, Phone, CreditCard, CheckCircle, 
  Loader2, Heart, Gift, Sparkles, AlertCircle
} from 'lucide-react'

const donationAmounts = [
  { amount: 500, label: 'Coffee', icon: Coffee, description: 'Buy me a coffee' },
  { amount: 1000, label: 'Lunch', icon: Gift, description: 'Buy me lunch' },
  { amount: 2500, label: 'Support', icon: Heart, description: 'Support my work' },
  { amount: 5000, label: 'Premium', icon: Sparkles, description: 'Premium support' },
]

const paymentMethods = [
  { id: 'mtn', name: 'MTN Mobile Money', color: 'bg-yellow-500', number: '0792828727' },
  { id: 'airtel', name: 'Airtel Money', color: 'bg-red-500', number: '0732594863' },
]

// PawaPay API Token
const PAWAPAY_TOKEN = 'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjIwMzk5IiwibWF2IjoiMSIsImV4cCI6MjA5MzAwMTkzNCwiaWF0IjoxNzc3MzgyNzM0LCJwbSI6IkRBRixQQUYiLCJqdGkiOiJkNjM0Yjk2Yy1jMzIzLTRhNjEtYWY4Zi00YWNhYzc5ZTJhMDUifQ.H9YVNFitLC6q-Jr4lfGa4VCP39l3sbJEOY-fn731U8xiNBQZVCQuttD0nVF8J579ow0qyzHaSoRCX2NWynMzzg'

function PawaPayDonation() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('amount') // 'amount', 'phone', 'confirm', 'success'
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState('mtn')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState(null)

  const handleDonate = async () => {
    setIsProcessing(true)
    setError(null)
    
    try {
      const finalAmount = selectedAmount || parseInt(customAmount) || 0
      const recipientNumber = paymentMethods.find(m => m.id === selectedMethod)?.number
      
      // PawaPay API call
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
          description: `Donation - ${donationAmounts.find(a => a.amount === selectedAmount)?.label || 'Custom'}`,
          reference: `donation-${Date.now()}`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('PawaPay API error:', errorData)
        throw new Error(errorData.message || `Payment failed: ${response.status}`)
      }

      const data = await response.json()
      console.log('PawaPay response:', data)
      
      if (data.status === 'PENDING' || data.status === 'SUCCESS' || data.status === 'ACCEPTED') {
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

  const reset = () => {
    setStep('amount')
    setSelectedAmount(null)
    setPhoneNumber('')
    setCustomAmount('')
    setIsOpen(false)
  }

  const finalAmount = selectedAmount || Number(customAmount) || 0

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl"
      >
        <Coffee className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !isProcessing && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-dark-200 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => !isProcessing && setIsOpen(false)}
                disabled={isProcessing}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors z-10 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="p-6 pb-4 bg-gradient-to-r from-yellow-400 to-orange-500">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-white/20">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Buy Me Coffee</h2>
                    <p className="text-white/80 text-sm">Support my work via mobile money</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'amount' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Select an amount to support my work
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {donationAmounts.map((item) => (
                        <button
                          key={item.amount}
                          onClick={() => setSelectedAmount(item.amount)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            selectedAmount === item.amount
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 mb-2 ${
                            selectedAmount === item.amount ? 'text-orange-500' : 'text-gray-400'
                          }`} />
                          <p className="font-bold text-gray-900 dark:text-white">TZS {item.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Custom Amount (TZS)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <button
                      onClick={() => setStep('phone')}
                      disabled={!finalAmount || finalAmount <= 0}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                    >
                      Continue →
                    </button>
                  </motion.div>
                )}

                {step === 'phone' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <button
                      onClick={() => setStep('amount')}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      ← Back
                    </button>

                    <div className="text-center p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                      <p className="text-sm text-gray-600 dark:text-gray-400">You are donating</p>
                      <p className="text-3xl font-bold text-orange-600">TZS {finalAmount.toLocaleString()}</p>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-center ${
                              selectedMethod === method.id
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                            }`}
                          >
                            {method.id === 'mtn' ? (
                              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-yellow-400 flex items-center justify-center">
                                <span className="text-black font-black text-xs tracking-tighter">MTN</span>
                              </div>
                            ) : (
                              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-red-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xs tracking-tight">Airtel</span>
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {method.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="250 7XX XXX XXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        You will receive an STK push on your phone to complete payment
                      </p>
                    </div>

                    <button
                      onClick={() => setStep('confirm')}
                      disabled={phoneNumber.length < 10}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                    >
                      Continue →
                    </button>
                  </motion.div>
                )}

                {step === 'confirm' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <button
                      onClick={() => setStep('phone')}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      ← Back
                    </button>

                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-orange-500" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Confirm Payment</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You will receive a prompt on your phone to complete the payment
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-300 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Amount</span>
                        <span className="font-bold text-gray-900 dark:text-white">TZS {finalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Method</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {paymentMethods.find(m => m.id === selectedMethod)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Phone</span>
                        <span className="font-bold text-gray-900 dark:text-white">{phoneNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Recipient</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          +250 {paymentMethods.find(m => m.id === selectedMethod)?.number}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">Total</span>
                        <span className="font-bold text-lg text-orange-600">TZS {finalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Payment Error</p>
                          <p>{error}</p>
                          <p className="text-xs mt-1 opacity-80">
                            Please check your phone number and try again.
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleDonate}
                      disabled={isProcessing}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Thank You! 🎉
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Your support means a lot! The payment has been initiated.
                    </p>
                    <button
                      onClick={reset}
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg transition-shadow"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {step !== 'success' && (
                <div className="p-4 bg-gray-50 dark:bg-dark-300/50 text-center border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rwanda Mobile Money • MTN & Airtel
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    MTN: +250 792 828 727 • Airtel: +250 732 594 863
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
