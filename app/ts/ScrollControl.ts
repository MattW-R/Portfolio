let oldScrollPosition = 0

window.addEventListener('scroll', () => {
    if (window.scrollY > oldScrollPosition) {
        console.log('Scroll Down')
    } else if (window.scrollY < oldScrollPosition) {
        console.log('Scroll Up')
    }
    oldScrollPosition = window.scrollY
})
