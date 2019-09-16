const ical: any = require("node-ical")

const icalFromUrl = (url: string, callback: Function) => {
    ical.fromURL(url, {}, (error: any, icalData: any) => {
        if (error) {
            callback(error, null)
            return
        }
        const vevents = []
        for (const key in icalData) {
            if (icalData.hasOwnProperty(key)) {
                const ev = icalData[key]
                if (icalData[key].type === "VEVENT") {
                    vevents.push({
                        uid: key,
                        dtstart: ev.start,
                        dtend: ev.end,
                        description: ev.description,
                        location: ev.location,
                        summary: ev.summary,
                        dtstamp: ev.dtstamp,
                        created: ev.created,
                        lastmodified: ev.lastmodified,
                    })
                }
            }
        }
        callback(null, vevents)
    })
}

export default icalFromUrl