export default () => {
    document.querySelectorAll('input[name$="[captcha]"]')
        .forEach(input => {
            const functionName = `recaptchaCallback_${input.id}`

            if (window[functionName]) {
                window[functionName]()
            }
        })
}
