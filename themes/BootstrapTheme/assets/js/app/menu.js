export default () => {
    const menu = document.querySelector('.js-menu')
    const menuButton = document.querySelector('.js-menu-button')
    if (!menu || !menuButton) return

    const menuClose = menu.querySelector('.js-menu-close')
    if (!menuClose) return

    menuButton.addEventListener('click', () => {
        menu.classList.add('isActive')
    })

    menuClose.addEventListener('click', () => {
        menu.classList.remove('isActive')
    })
}
