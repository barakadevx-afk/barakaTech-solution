import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, default: 'RWF' },
  payerPhone: { type: String, required: true },
  recipientPhone: { type: String, required: true },
  method: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
  reference: { type: String, default: null },
  pawapayTransactionId: { type: String, default: null },
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } })

export default mongoose.model('Payment', paymentSchema)
