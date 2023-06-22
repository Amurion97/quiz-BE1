import otpGenerator = require('otp-generator')

export function OTP6Gen() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
}