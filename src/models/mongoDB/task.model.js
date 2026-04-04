import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    createdBy: { type: Number, required: true },
    title: { type: String, default: "", trim: true },
    description: {
      type: String,
      default: "",
      required: function () {
        return this.title === "";
      },
      trim: true,
    },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Task", taskSchema);
