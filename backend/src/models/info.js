import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InfoSchema = Schema({
  team: { type: String, required: true },
  money: { type: Number, required: true },
});

const exportSchema = mongoose.model("TeamInfo", InfoSchema);

export default exportSchema;
