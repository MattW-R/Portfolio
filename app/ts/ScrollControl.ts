/**
 * function to find next upward/downward scroll anchor on the page
 * given the currently scrolled y position of the page,
 * returns the current scroll anchor element if at the top/bottom of all scroll anchors on the page
 *
 * @param {string} scrollDirection string of value 'up' or 'down'
 * indicating the direction of scrolling/scroll anchor searching
 *
 * @returns {HTMLElement|null} a scroll anchor HTML element in the intended scroll direction
 * or null if there are no scroll anchors on the page
 */
const findNextScrollAnchor = (scrollDirection: 'up'|'down'): HTMLElement|null => {
    const scrollAnchors: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.scroll-anchor')
    if (scrollAnchors.length > 0) {
        let closestAnchorIndex: number = 0
        for (let i = 0; i < scrollAnchors.length; i++) {
            if (Math.abs(scrollAnchors[closestAnchorIndex].getBoundingClientRect().top)
                >= Math.abs(scrollAnchors[i].getBoundingClientRect().top)) {
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

let oldScrollPosition: number = 0

window.addEventListener('scroll', () => {
    oldScrollPosition = window.scrollY
})

window.addEventListener('wheel', () => {
    if (window.scrollY !== oldScrollPosition) {
        const nextScrollAnchor: HTMLElement = (window.scrollY > oldScrollPosition) ?
            findNextScrollAnchor('down') : findNextScrollAnchor('up')
        if (nextScrollAnchor !== null) {
            window.scrollTo(0, nextScrollAnchor.getBoundingClientRect().top
                - document.querySelector('body').getBoundingClientRect().top)
        }
    }
})
