    import "dotenv/config";

    import { connectToDB } from "../../lib/mongoDB.js";
    import Event from "../../lib/models/Event.js";
    import { normalizeEvent } from "@/app/lib/normalizeEntry.js";
    import { parse } from "csv-parse/sync"
    import { NextResponse } from "next/server.js";

    type CSVRow = Record<string, string>

    export async function GET() {
        try {
            await connectToDB();
            const csvURL = process.env.CSV_URL;

            if (!csvURL) {
                throw new Error("CSV_URL is not defined");
            }

            const res = await fetch(csvURL);
            const csvText = await res.text();
            
            const rows = parse(csvText, {
                columns: true, 
                skip_empty_lines: true,
            }) as CSVRow[]

            for (const row of rows) {
                let hasChanged = false;
                const event = normalizeEvent(row);

                if (!event.submissionId) {
                    console.log("Skipping event with missing submissionId:", event);
                    continue;
                }

                // want to add so only the one that gets updated updates, not the whole event
                const existing = await Event.findOne({submissionId : event.submissionId}).lean();

                if (!existing) {
                    hasChanged = true;
                }

                // check if the entry has changed
                if (existing) {
                    for (const key of Object.keys(event)) {
                        if (existing[key] !== event[key]) {
                            hasChanged = true;
                            break;
                        }
                    }
                }
                if (!hasChanged) {
                    console.log("No changes detected for event:", event.submissionId);
                    continue;
                }

                await Event.updateOne(
                    { submissionId: event.submissionId },
                    { $set: { ...event, lastSyncedAt: new Date() } },
                    { upsert: true }
                )

                console.log("Sync complete for event:", event.submissionId);
                return NextResponse.json({success: true});
            }
        } catch (err) {
            console.log("Error syncing the events to Event DB.", err)
            return NextResponse.json({error: "Sync failed"}, {status: 500})
        }
    }