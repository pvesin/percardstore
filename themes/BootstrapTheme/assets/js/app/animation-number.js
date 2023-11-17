const animationNumber = (element) => {
    const numberTarget = Number(element.dataset.numberTarget)
    const value = Number(element.innerText);

    const inc = numberTarget / 400

    if (value > numberTarget) {
        element.innerText = numberTarget
        return
    }

    element.innerText = Math.ceil(value + inc)
    setTimeout(animationNumber.bind(null, element), 1)
}

export default () => {
    const elements = document.querySelectorAll('.js-animation-number');
    [...elements].forEach(element => {
        animationNumber(element)
    })
}
