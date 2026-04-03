import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: {
      type: String,
      default: "",
      required: () => {
        return this.title === "";
      },
    },
    dueDate: { type: Date, required: true },
    // providing LastUpdated because when we edit the tasks we should have the timing when it was last updated
    lastUpdated: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema)
