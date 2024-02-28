// animation

const ratio = .65
const option = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
}

const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
            entry.target.classList.add('reveal-visible')
            //entry.target.classList.remove('reveal')
            observer.unobserve(entry.target)
        }
    })
}

const observer = new IntersectionObserver(handleIntersect, option)

// loader

const loaderPage = document.querySelector('#loader-page')
const loaderContainer = document.querySelector('#loader-page > div')
const loaderPercent = document.querySelector('#loader-page p')

function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(duration)
    }, duration)
 })
}

let keyLoader = parseInt(sessionStorage.getItem('keyLoader'))

if(isNaN(keyLoader)) {
    keyLoader = 0; // permet de mettre une valeur de base
}

const loader = function() {
    document.querySelector("body").style.overflow = 'hidden' // permet d'enlever le scroll de la page
    let percent = -1
    const loaderInterval = setInterval(() => {
        if(percent < 100) {
            percent++
        }
        loaderPercent.innerText = `${percent}%`

        if(percent === 100) {
            clearInterval(loaderInterval) // arrete l'interval
            document.querySelector("body").style.overflow = 'visible' // permet remettre le scroll de la page
            wait(100)
                .then(() => {
                    loaderContainer.classList.add('remove')
                    return wait(700)
                })
                .then(() => {
                    // active les animations quand le loader est terminer
                    document.querySelectorAll('[class*="reveal"]').forEach(function (r) {
                        observer.observe(r)
                    })
                    loaderPage.classList.add('remove')
                    return wait(1000)
                })
                .then(() => {
                    loaderPage.style.display = 'none'
                    // quand l'animation est terminé on met a jour la valeur dans sessionStorage
                    keyLoader++
                    sessionStorage.setItem('keyLoader', keyLoader)
                })
            }
    }, 30)
}

if(keyLoader === 0) {
    loader()
} else {
    loaderPage.style.display = 'none'
    // active les animations quand le loader est terminer
    document.querySelectorAll('[class*="reveal').forEach(function (r) {
        observer.observe(r)
    })
}

// nav

const openMenu = document.querySelector("#open-hamburger-menu")
const closeMenu = document.querySelector("#close-hamburger-menu")
const navBgPart = document.querySelectorAll("[class*='nav-bg-part-']")
const navMenu = document.querySelector(".nav-menu")
const linksNav = document.querySelectorAll(".nav-container-links div")

openMenu.addEventListener('click', () => {
    openMenu.classList.add('switch')
    closeMenu.classList.add('switch')

    navBgPart.forEach((part) => {
        part.classList.add('active')
    })

    document.querySelector("body").style.overflow = 'hidden' // permet d'enlever le scroll de la page

    setTimeout(() => {
        navMenu.classList.add('active')
        linksNav.forEach((link) => {
            link.classList.add('nav-reveal')
        })
    }, 500)
})

closeMenu.addEventListener('click', () => {
    linksNav.forEach((link) => {
        link.classList.remove('nav-reveal')
    })

    setTimeout(() => {
        openMenu.classList.remove('switch')
        closeMenu.classList.remove('switch')
    
        navBgPart.forEach((part) => {
            part.classList.remove('active')
            navMenu.classList.remove('active')
        })
        document.querySelector("body").style.overflow = 'visible' // permet remettre le scroll de la page
    }, 300)
})

// cursor

/**
 * @param {string} tagName 
 * @param {object} attributes 
 * @returns {HTMLElement}
 */
const createElement = function(tagName, attributes = {}) {
    const element = document.createElement(tagName);
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    }
    return element
}
// crée le curseur pour toutes les pages
document.querySelector('body').prepend(createElement('div', {class: 'cursor'}))
document.querySelector('.cursor').prepend(createElement('div'))

const body = document.querySelector('body')
const cursor = document.querySelector('.cursor')
const cursorText = document.querySelector('.cursor div')

body.addEventListener('mousemove', e => {
    const x = e.clientX + 20
    const y = e.clientY - 60
    cursor.style.transform = `translate(${x}px, ${y}px)`
})

/**
 * change le texte du curseur en fonction de l'element survoler
 * @param {HTMLElement} elements entre guillemets
 * @param {string} text
 */
const cursorOver = function(elements, text) {
    document.querySelectorAll(elements).forEach(element => {
        element.addEventListener('mouseover', () => {
            cursor.classList.add('over-active')
            cursorText.innerText = text
        })
        element.addEventListener('mouseout', () => {
            cursor.classList.remove('over-active')
        })
    })
}

cursorOver('.link-home', 'Home')
cursorOver('.open', 'Open')
cursorOver('.close', 'Close')
cursorOver('.go', 'Go')
cursorOver('.click', 'Click')
cursorOver('.play', 'Play')
cursorOver('.pause', 'Pause')
cursorOver('input', 'Fill')

// met a jour le curseur pour les element qui possede des curseurs differents
addEventListener('click', () => {
    cursorOver('.link-home', 'Home')
    cursorOver('.open', 'Open')
    cursorOver('.close', 'Close')
    cursorOver('.go', 'Go')
    cursorOver('.click', 'Click')
    cursorOver('.play', 'Play')
    cursorOver('.pause', 'Pause')
    cursorOver('input', 'Fill')
})