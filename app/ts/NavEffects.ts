/**
 * function to check what the active section of the web page is from the url hash
 * & update the corresponding nav link to indicate the active section
 */
const checkAndDisplayActiveSection = (): void => {
    document.querySelectorAll('nav a').forEach((navLink: HTMLAnchorElement) => {
        const activeSection: string = window.location.hash || '#about'
        if (navLink.href.indexOf(activeSection) !== -1 && !navLink.classList.contains('active')) {
            navLink.classList.add('active')
        } else if (navLink.href.indexOf(activeSection) === -1 && navLink.classList.contains('active')) {
            navLink.classList.remove('active')
        }
    })
}

/**
 * function to check what the active section of the web page is from the url hash
 * & update the scroll chevron visibility
 */
const displayScrollChevrons = (): void => {
    const activeSection: string = window.location.hash || '#about'
    const scrollChevronUp: HTMLElement = document.querySelector<HTMLElement>('#scroll-chevron-up')
    const scrollChevronDown: HTMLElement = document.querySelector<HTMLElement>('#scroll-chevron-down')
    if (activeSection === '#about') {
        if (!scrollChevronUp.classList.contains('hidden-scroll-chevron')) {
            scrollChevronUp.classList.add('hidden-scroll-chevron')
        }
    } else if (activeSection === '#contact') {
        if (!scrollChevronDown.classList.contains('hidden-scroll-chevron')) {
            scrollChevronDown.classList.add('hidden-scroll-chevron')
        }
    } else {
        scrollChevronUp.classList.remove('hidden-scroll-chevron')
        scrollChevronDown.classList.remove('hidden-scroll-chevron')
    }
}

const updateNavEffects = () => {
    checkAndDisplayActiveSection()
    displayScrollChevrons()
}

updateNavEffects()
window.addEventListener('scroll', updateNavEffects)
