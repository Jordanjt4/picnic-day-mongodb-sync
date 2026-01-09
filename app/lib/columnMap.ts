import { ColumnMapType } from "./types"

export const COLUMN_MAP: ColumnMapType = {
    "Submission ID": {
        type: "id",
        path: "submissionId",
    },

    "Event Name": {
        type: "field",
        path: "event.name"
    },
    "Event Description": {
        type: "field",
        path: "event.description"
    },

    "Category": {
        type: "field",
        path: "event.category"
    },

    "Location": {
        type: "field",
        path: "event.location"
    },

    "Official Event Start Time": {
        type: "field",
        path: "event.startTime"
    },
    "Official Event End Time": {
        type: "field",
        path: "event.endTime"
    },

    "Primary Contact Full Name": {
        type: "field",
        path: "primaryContact.name"
    },
    "Primary Contact Phone Number": {
        type: "field",
        path: "primaryContact.phone"
    },
    "Primary Contact Email Address": {
        type: "field",
        path: "primaryContact.email"
    },

    "Tags": {
        type: "tags",
    },
}