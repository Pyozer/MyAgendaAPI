import ical from "ical"
import request from "request-promise-native"

interface IEvent {
    uid: string,
    dtstart: Date,
    dtend: Date,
    description: string,
    location: string,
    summary: string,
    dtstamp: Date,
    created: Date,
    lastmodified: Date,
}

export const icalFromUrl = async (url: string): Promise<IEvent[]> => {
    let icalRaw: string
    try {
        icalRaw = await request.get(url.replace("webcal://", "https://"), {
            followAllRedirects: true,
            maxRedirects: 5,
            strictSSL: false,
            timeout: 6000, // 6sec
        })
    } catch (e) {
        console.log("Request error: ", e)
        throw "error_request_ics"
    }

    let icalData: ical.FullCalendar
    try {
        icalData = ical.parseICS(icalRaw)
    } catch (e) {
        console.log("Parsing error: ", e)
        throw "error_parse_ics"
    }

    const getValue = (value: any) => !value ? "" : value.val || value

    const vevents: IEvent[] = []
    for (const key in icalData) {
        if (icalData.hasOwnProperty(key)) {
            const ev = icalData[key]
            if (ev.type === "VEVENT") {
                vevents.push({
                    uid: ev.uid,
                    dtstart: ev.start,
                    dtend: ev.end,
                    description: getValue(ev.description),
                    location: getValue(ev.location),
                    summary: getValue(ev.summary),
                    dtstamp: ev.dtstamp,
                    created: ev.created,
                    lastmodified: ev.lastmodified,
                })
            }
        }
    }
    return vevents
}
