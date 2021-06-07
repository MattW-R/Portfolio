const findNextScrollAnchor = (scrollDirection: 'up'|'down'): HTMLElement|null => {
    const scrollAnchors: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.scroll-anchor')
    if (scrollAnchors.length > 0) {
        let closestAnchorIndex: number = 0
        for (let i = 0; i < scrollAnchors.length; i++) {
            if (Math.abs(scrollAnchors[closestAnchorIndex].getBoundingClientRect().top) >= Math.abs(scrollAnchors[i].getBoundingClientRect().top)) {
                closestAnchorIndex = i
            }
        }
        if (scrollDirection === 'up' && closestAnchorIndex > 0) {
            return scrollAnchors[closestAnchorIndex - 1]
        } else if (scrollDirection === 'down' && closestAnchorIndex < scrollAnchors.length - 1) {
            return scrollAnchors[closestAnchorIndex + 1]
        } else {
            return scrollAnchors[closestAnchorIndex]
        }
    } else {
        return null
    }
}

let oldScrollPosition = 0

window.addEventListener('scroll', () => {
    oldScrollPosition = window.scrollY
})

window.addEventListener('wheel', () => {
    if (window.scrollY > oldScrollPosition) {
        const nextScrollAnchor = findNextScrollAnchor('down')
        if (nextScrollAnchor !== null) {
            window.scrollTo(0, - document.querySelector('body').getBoundingClientRect().top + nextScrollAnchor.getBoundingClientRect().top)
        }
    } else if (window.scrollY < oldScrollPosition) {
        const nextScrollAnchor = findNextScrollAnchor('up')
        if (nextScrollAnchor !== null) {
            window.scrollTo(0, - document.querySelector('body').getBoundingClientRect().top + nextScrollAnchor.getBoundingClientRect().top)
        }
    }
})
