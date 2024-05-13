import mongoose, { Schema } from "mongoose";

interface Form extends Document {
  name: string;
  userId: Schema.Types.ObjectId;
  formData: any;
}

const FormSchema: Schema<Form> = new Schema({
  name: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  formData: { type: Schema.Types.Mixed },
});

const FormModel =
  mongoose.models.Form || mongoose.model<Form>("Form", FormSchema);

export default FormModel;
