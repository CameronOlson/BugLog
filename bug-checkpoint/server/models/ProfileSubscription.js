import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProfileSubscriptionSchema = new Schema(
  {

  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)
