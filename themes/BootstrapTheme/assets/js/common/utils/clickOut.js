export default (el, callback) => {
    document.addEventListener('click', (e) => {
        if (!el.contains(e.target)) {
            callback()
        }
    })
}
