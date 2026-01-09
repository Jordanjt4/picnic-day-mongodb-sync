import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        submissionId: {
            type: "String",
            required: true,
            unique: true,
        },

        event: {
            name: String,
            description: String,
            category: String,
            location: String,
            startTime: String,
            endTime: String,
            tags: [String],
        },

        primaryContact: {
            name: String,
            phone: String,
            email: String,
        },

        lastSyncedAt: Date,
    },
    {timestamps: true}
)

export default mongoose.models.Event || mongoose.model("Event", EventSchema);