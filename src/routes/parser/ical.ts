import request from 'request-promise-native';

const ical = require('node-ical');

const icalFromUrl = async (url: string) => {
    const icalRaw: string = await request.get(url, {
        followAllRedirects: true
    })
    const icalData = await ical.parseICS(icalRaw);

    const getValue = (obj: any, value: string) => {
        if (!obj[value]) return ''
        return obj[value].val || obj[value]
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
                    description: getValue(ev, 'description'),
                    location: getValue(ev, 'location'),
                    summary: getValue(ev, 'summary'),
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
