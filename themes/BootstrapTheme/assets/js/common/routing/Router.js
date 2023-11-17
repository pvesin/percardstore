class Router {
    routing;

    constructor() {
        if (!Router.instance) {
            this.routing = window.Routing;
            this.routing.setHost(window.location.host)

            Router.instance = this;
        }

        return Router.instance;
    }

    /**
     *
     * @param route  string
     * @param params object
     * @returns {*}
     */
    generate(route, params = {}) {
        return this.routing.generate(route, params, true);
    }
}

export default new Router();
