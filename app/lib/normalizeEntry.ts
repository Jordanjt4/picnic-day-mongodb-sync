import { COLUMN_MAP } from "./columnMap";

function setValue(event: Record<string, any>, path: string, value: any) {
    const keys = path.split(".");

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        // create object if it hasn't been added yet
        if (!event[key]) {
            event[key] = {};
        }
        // move into it
        event = event[key];
    }
    // set value
    // keys = ["primaryContact", "name"], need "name" which is index keys.length - 1
    event[keys[keys.length - 1]] = value;
}

export function normalizeEvent(row: Record<string, string>) {
    const event: Record<string, any> = {};

    for (const [column, value] of Object.entries(row)) {
        const rule = COLUMN_MAP[column];

        if (!rule) continue;

        // unique submission ID
        if (rule.type === "id") {
            event.submissionId = value;
        }

        // normal fields
        if (rule.type === "field") {
            setValue(event, rule.path, value);
        }

        // tags, comma separated
        if (rule.type === "tags") {
            event.tags = value.split(",").map(tag => tag.trim()).filter(Boolean);
        }
    }

    return event;
}