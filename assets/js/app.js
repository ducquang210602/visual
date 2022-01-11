const header = document.getElementById('header')
const iconDownScroll = document.querySelector('.icon-down-scroll')
const pages = document.querySelectorAll('.page')
const contactBtn = document.querySelector('.js-contact-btn')
const btnsMovePageMain = document.querySelectorAll('.js-btn-move-page-main')
const listSliderMain = document.querySelectorAll('.slider-item')
const btnNextSlider = document.querySelector('.btn-control-right')
const btnPrevSlider = document.querySelector('.btn-control-left')
const partnerSlider = document.getElementById('partner-slider')
const progressBase = document.querySelectorAll('.progress-base')
const progressWrapper = document.querySelector('.progress-wrapper')
const statisticalWrapper = document.querySelector('.js-statistical-wrapper')
const statisticalNumbers = document.querySelectorAll('.statistical-item__number')
const windowHeightActive = window.innerHeight * 4.5 / 6
const sliderReviews = document.querySelectorAll('.js-slider-review')
const btnShowNavMobile = document.querySelector('.btn-show-nav-mobile')
const navMobile = document.querySelector('.header-navbar')
const navItems = document.querySelectorAll('.header-navbar__item')


let sliderIndex = 0

btnShowNavMobile.onclick = function () {
    navMobile.classList.toggle('showMobile')
}

navItems.forEach(navItem => {
    navItem.addEventListener('click', function () {
        if (window.innerWidth < 739) {
            btnShowNavMobile.click()
        }
    })
})

// Handle when scroll change background header
document.addEventListener('scroll', function () {
    let scrollValue = window.scrollY || document.documentElement.scrollTop
    if (scrollValue == 0) {
        header.classList.remove('active')
        iconDownScroll.classList.remove('active')
    } else {
        header.classList.add('active')
        iconDownScroll.classList.add('active')
    }
})

// Clicked go to contact page
contactBtn.onclick = function () {
    document.querySelector('.page.active').classList.remove('active')
    pages[1].classList.add('active')
    window.scrollTo(0, 0)
}

// Handle clicked back main page
btnsMovePageMain.forEach(btnItem => {
    btnItem.onclick = function () {
        if (!pages[0].classList.contains('active')) {
            document.querySelector('.page.active').classList.remove('active')
            pages[0].classList.add('active')
        }
    }
})

// Handle clicked next btn slider main
btnNextSlider.addEventListener('click', function () {
    sliderIndex++
    if (sliderIndex >= listSliderMain.length) {
        sliderIndex = 0
    }
    document.querySelector('.slider-item.active').classList.remove('active')
    listSliderMain[sliderIndex].classList.add('active')
    autoplaySliderMain()
})

// Handle clicked prev btn slider main
btnPrevSlider.addEventListener('click', function () {
    sliderIndex--
    if (sliderIndex < 0) {
        sliderIndex = listSliderMain.length - 1
    }
    document.querySelector('.slider-item.active').classList.remove('active')
    listSliderMain[sliderIndex].classList.add('active')
    autoplaySliderMain()
})

// Create interval autoplay slider and add event clicked button next, prev slider
function autoplaySliderMain() {
    const autoplay = setInterval(function () {
        btnNextSlider.click()
    }, 8000)
    btnNextSlider.addEventListener('click', function () {
        clearInterval(autoplay)
    })
    btnPrevSlider.addEventListener('click', function () {
        clearInterval(autoplay)
    })
}

function autoChangeSlider(sliderWrapper, length) {
    const listSlider = sliderWrapper.querySelectorAll('.col')
    sliderWrapper.style = `transform: translateX(0)`
    const quantitySlider = listSlider.length - length
    let index = 0
    const autoChange = setInterval(function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * quantitySlider)
        } while (newIndex == index)
        index = newIndex
        sliderWrapper.style = `transform: translateX(-${index * 100 / length}%)`
    }, 3000)
    window.addEventListener('resize', () => {
        clearInterval(autoChange)
    })
}

function checkDevice() {
    const widthHTML = document.documentElement.offsetWidth
    if (widthHTML < 739) {
        autoChangeSlider(partnerSlider, 2)
        return
    } else {
        autoChangeSlider(partnerSlider, 6)
    }
}

window.onload = checkDevice
window.onresize = checkDevice

autoplaySliderMain()

function checkScrollExperience() {
    const progressTop = progressWrapper.getBoundingClientRect().top

    if (progressTop <= windowHeightActive) {
        window.removeEventListener('scroll', checkScrollExperience)
        const progressBases = document.querySelectorAll('.progress-base')

        progressBases.forEach(progressGroup => {
            let index = 0
            const progressValue = progressGroup.dataset.value 
            const progressLine = progressGroup.querySelector('.progress-line')
            const progressCurValue = progressGroup.querySelector('.progress-value')

            const autoAsc = setInterval(function () {
                progressLine.style = `width: ${index}%`
                progressCurValue.style = `left: ${index}%`
                progressCurValue.innerHTML = `${index}%`
                index++

                if (index > progressValue) {
                    isPlayingExperience = true
                    clearInterval(autoAsc)
                }
            }, 20)
        })
    }
}

window.addEventListener('scroll', checkScrollExperience)

function checkValueInterval(lineDisplay, value) {
    let index = 0

    const autoAsc = setInterval(function () {
        index += value / 100
        lineDisplay.innerHTML = `${Math.floor(index)}`
        if (index >= value) {
            clearInterval(autoAsc)
        }
    }, 20)
}

function checkScrollStatistical() {
    const statisticalTop = statisticalWrapper.getBoundingClientRect().top
    if (statisticalTop <= windowHeightActive) {
        window.removeEventListener('scroll', checkScrollStatistical)

        statisticalNumbers.forEach(item => {
            const statisticalValue = item.dataset.value

            checkValueInterval(item, statisticalValue)
        })
    }
}

window.addEventListener('scroll', checkScrollStatistical)

function handleSlider(sliderItems, className, sec) {
    let lengthSlider = sliderItems.length
    let first = 1
    let second = 0
    let third = 0
    setInterval(function() {
        if (first >= lengthSlider) {
            first = 0
        }
        second = first + 1
        third = first + 2
        document.querySelector(className + '.first').classList.remove('first')
        document.querySelector(className + '.second').classList.remove('second')
        document.querySelector(className + '.third').classList.remove('third')
        sliderItems[first].classList.add('first')
        sliderItems[second < lengthSlider ? second : second - lengthSlider].classList.add('second')
        sliderItems[third < lengthSlider ? third : third - lengthSlider].classList.add('third')
        ++first
    }, sec) 
}

handleSlider(sliderReviews, '.js-slider-review', 5000)