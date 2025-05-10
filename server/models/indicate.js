import mongoose from 'mongoose';

const indicateSchema = new mongoose.Schema({
  report: { type: String },
  dateofreport: { type: Date },
  title: { type: String },
  incidentno: { type: String },
  intype: { type: String },
  dateofindication: { type: Date },
  location: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  discription: { type: String },
  action: { type: String }
}, {
  timestamps: true 
});

const IndicateModel = mongoose.model('Indicate', indicateSchema);

export default IndicateModel;
