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
        }
    }
    return null
}

/**
 * function to scroll the page to a specific scroll anchor
 *
 * @param {HTMLElement|null} scrollAnchor the scroll anchor to scroll to
 */
const scrollToAnchor = (scrollAnchor: HTMLElement|null): void => {
    if (scrollAnchor !== null) {
        if (scrollAnchor.classList.contains('scroll-anchor')) {
            scrolling = true
            window.location.hash = scrollAnchor.id
            window.location.href = window.location.href
        }
    }
}

let scrolling: boolean = false

setInterval(() => {
    scrolling = false
}, 500)

document.body.addEventListener('wheel', (e: WheelEvent): void => {
    if (Math.abs(e.deltaY) > 10 && !scrolling) {
        const nextScrollAnchor: HTMLElement = (e.deltaY > 0) ?
            findNextScrollAnchor('down') : findNextScrollAnchor('up')
        scrollToAnchor(nextScrollAnchor)
    }
})

document.querySelector('#scroll-chevron-up').addEventListener('click', () => {
    const nextScrollAnchor: HTMLElement = findNextScrollAnchor('up')
    scrollToAnchor(nextScrollAnchor)
})
document.querySelector('#scroll-chevron-down').addEventListener('click', () => {
    const nextScrollAnchor: HTMLElement = findNextScrollAnchor('down')
    scrollToAnchor(nextScrollAnchor)
})

document.querySelectorAll('[tabindex]').forEach(element => {
    element.addEventListener('focus', (e: FocusEvent) => {
        let target: HTMLElement = e.target as HTMLElement
        let parentScrollAnchor: HTMLElement = target.closest('.scroll-anchor')
        if (parentScrollAnchor !== null) {
            window.location.hash = parentScrollAnchor.id
            target.focus()
        }
    })
})
