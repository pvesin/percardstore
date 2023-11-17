import Router from './Router';

class LocaleRouter {
    locale;

    static instance;

    constructor() {
        if (!LocaleRouter.instance) {
            LocaleRouter.instance = this;
        }

        return LocaleRouter.instance;
    }

    /**
     *
     * @param locale
     */
    setLocale(locale) {
        this.locale = locale;
    }

    /**
     *
     * @returns locale
     */
    getLocale() {
        return this.locale;
    }

    /**
     *
     * @param routeName
     * @param params
     * @param hasLocaleSuffix
     * @returns {*}
     */
    generate(routeName, params = {}, hasLocaleSuffix = false) {
        if (!hasLocaleSuffix && this.routeHasLocale(routeName) && !params._locale) {
            params._locale = this.locale
        }

        return Router.generate(
            this.replaceRouteNameParams(routeName) + (hasLocaleSuffix ? '.' + this.locale : ''),
            params,
            true
        );
    }

    /**
     *
     * @param routeName
     * @returns {*}
     */
    routeHasLocale(routeName) {
        const routes = Router.routing.getRoutes() ?? {}

        return routes[routeName]?.requirements?._locale
    }

    /**
     *
     * @param routeName
     * @returns {*}
     */
    replaceRouteNameParams(routeName) {
        if (routeName.includes('%locale%')) {
            routeName = routeName.replace('%locale%', this.locale)
        }
        // if (routeName.includes('%section%')) {
        // routeName = routeName.replace('%section%', this.section)
        // }

        return routeName;
    }
}

const localeRouter = new LocaleRouter()

export default localeRouter;

(() => {
    const { locale } = document.body.dataset

    if (!locale) {
        console.warn('<body> element should implement "data-section" and "data-locale" to use the LocaleRouter')
    }

    localeRouter.setLocale(locale)
})()
