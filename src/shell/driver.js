// not currently used!
// my-app/driver.js

// goog.module('foo.bar');  // ???

console.log("FOO");

// goog.require('my.delegate'); // ???

// export // es6 module?
class MyApp extends Polymer.Element {

    static get is() { return 'my-app'; }

    static get properties() {
        return {
            page: {
		type: String,
		reflectToAttribute: true,
		observer: '_pageChanged',
            },
            rootPattern: String,
            routeData: Object,
            subroute: String,
        };
    }

    static get observers() {
        return [
            '_routePageChanged(routeData.page)',
        ];
    }

    constructor() {
        super();

        // Get root pattern for app-route, for more info about `rootPath` see:
        // https://www.polymer-project.org/2.0/docs/upgrade#urls-in-templates
        this.rootPattern = (new URL(this.rootPath)).pathname;
    }

    _routePageChanged(page) {
        // Polymer 2.0 will call with `undefined` on initialization.
        // Ignore until we are properly called with a string.
        if (page === undefined) {
            return;
        }

        // If no page was found in the route data, page will be an empty string.
        // Deault to 'view1' in that case.
        this.page = page || 'view1';

        // Close a non-persistent drawer when the page & route are changed.
        if (!this.$.drawer.persistent) {
            this.$.drawer.close();
        }
    }

    _pageChanged(page) {
        // Load page import on demand. Show 404 page if fails
        var resolvedPageUrl = this.resolveUrl('my-' + page + '.html');
        Polymer.importHref(
            resolvedPageUrl,
            null,
            this._showPage404.bind(this),
            true);
    }

    _showPage404() {
        this.page = 'view404';
    }
}

window.customElements.define(MyApp.is, MyApp);
