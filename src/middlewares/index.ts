import {
    handleAcceptLanguage,
    handleBodyRequestParsing,
    handleCompression,
    handleMorgan,
} from "./common"

export default [
    handleBodyRequestParsing,
    handleCompression,
    handleAcceptLanguage,
    handleMorgan,
]
