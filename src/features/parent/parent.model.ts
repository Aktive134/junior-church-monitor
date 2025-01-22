import mongoose, { Schema } from 'mongoose'

const parentSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    gender: String,
    role: String,
    role_type: String,
    user_type: String, //visitor or member
    image: {
      type: String,
      required: true,
    },
    address: String,
    country: String,
    state: String,
    lga: String,
    location: String,
    branch: String,
    identification_type: {
      type: String,
      required: true,
    },
    identification_photo: {
      type: String,
      required: true,
    },
    identification_number: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
)

const Parent = mongoose.model('Parent', parentSchema)
export default Parent
