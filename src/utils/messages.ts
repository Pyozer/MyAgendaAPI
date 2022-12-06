import { Request } from "express"

class Message {
    public key: string
    public en: string
    public fr: string

    constructor(key: string, en: string, fr: string) {
        this.key = key
        this.en = en
        this.fr = fr
    }

    public getMessage(lang: string) {
        if (lang === "fr") { return this.fr }
        return this.en
    }
}

const messages = [
    new Message(
        "error_read_file",
        "Cannot find and read file: %file%",
        "Impossible de lire le fichier: %file%",
    ),
    new Message(
        "error_parse_file",
        "Error when trying to parse data from file : %file%",
        "Erreur durant la récupération des données du fichier: %file%",
    ),
    new Message(
        "missing_university_filename",
        "You must provide the university resource file name !",
        "Nom du fichier de ressources de l'université manquant !",
    ),
    new Message(
        "missing_ical_parse_arguments",
        "You must provide univId, resId, firstDate and lastDate to get events.",
        "Vous devez fournir univId, resId, firstDate et lastDate pour obtenir des événements.",
    ),
    new Message(
        "missing_university_id",
        "University id incorrect ! Please make sure you have latest version of the app",
        "Identifiant universitaire incorrect! Assurez-vous que vous avez la dernière version de l'application",
    ),
    new Message(
        "unknown_university_id",
        "University id provided is not correct !",
        "Identifiant de l'université non reconnue",
    ),
    new Message(
        "missing_ical_url",
        "You must provide ical file url to get events.",
        "URL du fichier ICAL manquant, impossible d'obtenir les événements.",
    ),
    new Message(
        "unknown_help_file",
        "You must provide the filename to get help data",
        "Nom du fichier d'aide manquant, impossible de fournir les données",
    ),
    new Message(
        "error_request_ics",
        "An error occurred while retrieving courses. Please check the url used or contact us.",
        "Erreur lors de la récupération des cours. Veuillez vérifier l'url utilisée ou contactez nous.",
    ),
    new Message(
        "error_parse_ics",
        "Cannot analyze the file containing your courses... Please report to us the issue.",
        "Impossible d'analyser le fichier contenant vos cours... N'hésitez pas à nous signaler le problème.",
    ),
]

export const getLangMsg = (req: Request, key: string, params?: Record<string, string>) => {
    const lang = req.headers["accept-language"]

    const message = messages.find((msg) => msg.key === key)
    if (!message) { return "Unknown message" }

    let langMessage = message.getMessage(lang)

    if (params) {
        Object.keys(params).forEach((k) => {
            const value = params[k]
            langMessage = langMessage.replace(`%${k}%`, value)
        })
    }

    return langMessage
}
