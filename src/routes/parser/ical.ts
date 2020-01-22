import ical from "ical"
import request from "request-promise-native"

const icalFromUrl = async (url: string) => {
    let icalRaw: string
    try {
        icalRaw = await request.get(url, {
            followAllRedirects: true,
            timeout: 6000, // 6sec
        })
    } catch (e) {
        console.error(e)
        throw "error_request_ics"
    }

    let icalData: ical.FullCalendar
    try {
        icalData = ical.parseICS(icalRaw)
    } catch (e) {
        console.error(e)
        throw "error_parse_ics"
    }

    const getValue = (value: any) => !value ? '' : value.val || value

    const vevents = []
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

export default icalFromUrl
