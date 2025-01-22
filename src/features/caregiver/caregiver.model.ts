import mongoose, { Schema } from 'mongoose'

const caregiverSchema = new Schema(
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
    child_relationship: {
      type: String,
      required: true,
    },
    parent_relationship: {
      type: String,
      required: true,
    },
    child_relationship_type: String,
    parent_relationship_type: String,
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
    },
    branch: String,
    identification_type: {
      type: String,
    },
    identification_photo: {
      type: String,
    },
    identification_number: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const Caregiver = mongoose.model('Caregiver', caregiverSchema)
export default Caregiver
