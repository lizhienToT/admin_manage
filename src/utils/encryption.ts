// @ts-ignore
import CryptoJS from 'crypto-js'

const baseCryptoCode = '80e779492fdd4a95ab4724debc8262ba'

const getKeyHex = () => CryptoJS.enc.Latin1.parse(baseCryptoCode)

const getIvHex = () => CryptoJS.enc.Latin1.parse(baseCryptoCode)

const getEncrypt = (key: string) => {
    let keyHex = getKeyHex()
    let ivHex = getIvHex()
    try {
        key = JSON.stringify(key)
    } catch (e) {
        console.warn(e)
    }
    return CryptoJS.AES.encrypt(key, keyHex, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
        iv: ivHex
    }).toString()
}

export const encryptToBase64 = (key: string) => {
    let encryptStr = getEncrypt(key)
    let wordArray = CryptoJS.enc.Utf8.parse(encryptStr)
    return CryptoJS.enc.Base64.stringify(wordArray)
}

const getDecrypt = (data: string) => {
    let keyHex = getKeyHex()
    let ivHex = getIvHex()
    const wordArray = CryptoJS.enc.Base64.parse(data)
    let decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(wordArray), keyHex, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
        iv: ivHex
    }).toString(CryptoJS.enc.Utf8)

    try {
        decrypted = JSON.parse(decrypted)
    } catch (e) {
        console.warn(e)
    }
    return decrypted
}

export const decryptByBase64 = (data: string) => {
    let parsedWordArray = CryptoJS.enc.Base64.parse(data)
    let decryptStr = parsedWordArray.toString(CryptoJS.enc.Utf8)
    return getDecrypt(decryptStr)
}
