import Glide from '@glidejs/glide'
import { Breakpoints, Controls } from '@glidejs/glide/dist/glide.modular.esm'
import GLIDE_REFS from '../common/constants/glide.json'
import { getViewport } from '../common/utils/viewport'

class Slider {
    /**
     *
     * @param element
     * @param options
     */
    constructor (element, options) {
        this.element        = element
        this.options        = options
        this.defaultOptions = {
            type: 'slider',
            perView: 1,
            startAt: 0,
            gap: 16,
            bound: true,
        }

        this.bulletsContainer = this.element.querySelector('.glide__bullets')
        this.arrowsContainer  = this.element.querySelector('.glide__arrows')

        this.arrowsRelocateContainer = null
        if (this.element.dataset.relocateArrowsTrigger !== undefined) {
            this.arrowsRelocateContainer = [...document.querySelectorAll('[data-relocate-arrows-target]')]
                .find(container => container.dataset.relocateArrowsTarget === this.element.dataset.relocateArrowsTrigger)
        }

        this.controls = this.arrowsContainer || this.arrowsRelocateContainer
    }

    /**
     * Relocate Glide instance navigation.
     */
    relocateBullets () {
        const containerBullets = [...document.querySelectorAll('[data-relocate-bullets-target]')]
            .find(container => container.dataset.relocateBulletsTarget === this.element.dataset.relocateBulletsTrigger);

        [containerBullets].forEach(container => {
            if (!container) return

            const bullets = container.querySelectorAll('[data-glide-dir]')

            bullets.forEach(bullet => {
                bullet.addEventListener('click', () => {
                    const { glideDir } = bullet.dataset
                    this.instance.go(glideDir)
                })
            })

            bullets[0].classList.add('glide__bullet--active')

            this.instance.on('run', () => {
                const currentBullet = container.querySelector(`[data-glide-dir="=${ this.instance.index }"]`)

                bullets.forEach(bullet => bullet.classList.remove('glide__bullet--active'))

                if (currentBullet) {
                    currentBullet.classList.add('glide__bullet--active')
                }
            })

            this.calculateBulletSlider(container)
        })
    }

    /**
     *
     */
    relocateArrows () {
        if (!this.arrowsRelocateContainer) return
        const items = this.arrowsRelocateContainer.querySelectorAll('[data-glide-dir]')

        items.forEach(item => {
            item.addEventListener('click', () => {
                const { glideDir } = item.dataset
                this.instance.go(glideDir)
            })
        })
    }

    /**
     * Test if we enable sliders
     */
    sliderUnavailable () {
        this.instance._o.dragThreshold = false
        this.instance._o.autoplay      = false

        if (this.controls) {
            this.controls.classList.add('hidden')
        }
    }

    /**
     *
     * @returns {any}
     * Get perView value of nearest breakpoints (if object breakpoints exists)
     */
    perView () {
        let perView = this.instance._o.perView

        const valuesBreakpoints        = Object.keys(this.instance._o.breakpoints)
        const greatestValueBreakpoints = Math.max(...valuesBreakpoints)
        if (this.instance._o.breakpoints && getViewport().width < greatestValueBreakpoints) {
            const getValueBreakpoint = valuesBreakpoints.reduce((prev, curr) => {
                return getViewport().width > prev && getViewport().width < curr ? curr : prev
            }, 0)

            perView = this.instance._o.breakpoints[getValueBreakpoint].perView
        }

        return perView
    }

    /**
     *
     */
    calculateBulletSlider (bulletsContainer = this.bulletsContainer) {
        const nbSlides = this.element.querySelectorAll('.glide__slide').length

        if (this.instance._o.type === 'slider' && bulletsContainer) {
            const bullets   = bulletsContainer.querySelectorAll('[data-glide-dir]')
            const nbBullets = ( nbSlides - this.perView() ) + 1;

            [...bullets].slice(nbBullets).forEach(bullet => bullet.remove())

            if (nbBullets === 1) {
                bulletsContainer.remove()
            }
        }
    }

    /**
     * Init Glide Instance
     */
    init () {
        /**
         * @see https://glidejs.com/docs/
         */
        const optionsMerged = { ...this.defaultOptions, ...this.options }
        this.instance       = new Glide(this.element, optionsMerged)

        const nbSlides = this.element.querySelectorAll('.glide__slide').length

        if (this.controls) {
            this.controls.classList.remove('hidden')
        }

        if (this.instance._o.type === 'slider' && nbSlides <= this.perView()) {
            this.sliderUnavailable()
        }

        this.calculateBulletSlider()

        this.instance.mount({ Controls, Breakpoints })
    }
}

export default (glideRefs = GLIDE_REFS) => {
    const sliders = document.querySelectorAll('.js-init-slider');

    [...sliders].forEach(slider => {
        const { sliderRef, relocateArrowsTrigger, relocateBulletsTrigger } = slider.dataset
        const options                                                      = glideRefs[sliderRef]

        const sliderInst = new Slider(slider, options)
        if (!sliderInst) return
        sliderInst.init()

        if (relocateArrowsTrigger) {
            sliderInst.relocateArrows()
        }

        if (relocateBulletsTrigger) {
            sliderInst.relocateBullets()
        }
    })
}
