import {
    handleAcceptLanguage,
    handleBodyRequestParsing,
    handleCompression,
} from "./common"

export default [
    handleBodyRequestParsing,
    handleCompression,
    handleAcceptLanguage,
]
