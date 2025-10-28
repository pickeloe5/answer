const os = require('os')
const crypto = require('crypto')

const util = {
    buffer: {
        writeInt32(buffer, int, offset) {
            buffer[`writeInt32${os.endianness()}`](int, offset)
        }
    },
    genKey(id) {
        const buffer = Buffer.alloc(48)
        util.buffer.writeInt32(buffer, id, 0)
        crypto.randomBytes(44).copy(buffer, 4)
        return buffer.toString('base64')
    },
    validateString(string, maxLength) {
        return (
            typeof string === 'string' &&
            string.length > 0 &&
            string.length <= maxLength
        )
    },
    validateAuthStrings(email, password) {
        return (
            util.validateEmail(email) &&
            util.validatePassword(password)
        )
    },
    validateEmail(email) {
        return util.validateString(email, 1024)
    },
    validatePassword(password) {
        return util.validateString(password, 1024)
    }
}

module.exports = util