/**
 * function to check what the active section of the web page is from the url hash
 * & update the corresponding nav link to indicate the active section
 */
const checkAndDisplayActiveSection = (): void => {
    document.querySelectorAll('nav a').forEach((navLink: HTMLAnchorElement) => {
        const activeSection = window.location.hash
        if (navLink.href.indexOf(activeSection) !== -1 && !navLink.classList.contains('active')) {
            navLink.classList.add('active')
        } else if (navLink.href.indexOf(activeSection) === -1 && navLink.classList.contains('active')) {
            navLink.classList.remove('active')
        }
    })
}

checkAndDisplayActiveSection()
window.addEventListener('scroll', checkAndDisplayActiveSection)
