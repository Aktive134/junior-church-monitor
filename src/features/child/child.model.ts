import mongoose, { Schema } from 'mongoose'

const childSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: String,
  dob: String,
  age_division: String,
  image: {
    type: String,
    required: true,
  },
  child_relationship: String,
  relationship_type: String,
  special_needs: String,
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  },
})

const Child = mongoose.model('Child', childSchema);
export default Child;
