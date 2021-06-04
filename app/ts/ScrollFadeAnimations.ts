/**
 * function to iterate through a node list of HTML elements,
 * supplying a callback function with each element & a boolean indicating whether the element is in view
 * @param {NodeListOf<HTMLElement>} elements a node list of HTML elements
 * @param {function} callback a callback function with inputs: an HTML element & a boolean indicating whether or not the HTML element is in view
 */
const checkElementsInView = (elements: NodeListOf<HTMLElement>,
                             callback: (element: HTMLElement, inView: boolean) => void): void => {
    elements.forEach(element => {
        let domRect: DOMRect = element.getBoundingClientRect()
        let inView: boolean = (domRect.top <= 4 * window.innerHeight / 5
            && domRect.bottom >= window.innerHeight / 5)
        callback(element, inView)
    })
}

/**
 * function to toggle the presence of the visible class on an element
 * @param {HTMLElement} element an HTML element
 * @param {boolean} makeVisible a boolean indicating whether or not the HTML element is in view
 */
const toggleHiddenElementVisible = (element: HTMLElement, makeVisible: boolean): void => {
    if (makeVisible && !element.classList.contains('visible')) {
        element.classList.add('visible')
    } else if (!makeVisible && element.classList.contains('visible')) {
        element.classList.remove('visible')
    }
}

let hiddenElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.hidden')

window.addEventListener('scroll', () => {
    checkElementsInView(hiddenElements, toggleHiddenElementVisible)
})
checkElementsInView(hiddenElements, toggleHiddenElementVisible)
