(ns shell.my-app)
;  (:require [my-app :as foo]))

(enable-console-print!)

(println "hello from shell.my-app!")

(defn ^:export -constructor [this]
  ;; Get root pattern for app-route, for more info about `rootPath` see:
  ;; https://www.polymer-project.org/2.0/docs/upgrade#urls-in-templates
  (let [rp (.-pathname (js/URL. (goog.object/get this "rootPath")))]
    (goog.object/set this "rootPattern" rp)))

(defn ^:export -connectedCallback
  [this]
  (println "Connected callback on " this))

(defn ^:export -disconnectedCallback
  [this]
  (println "disonnected callback " this))

(defn -show-page-404
  []
  (println "Showing 404")
  (this-as this (goog.object/set this "page" "view404")))

(defn ^:export -page-changed [newpg oldpg]
  ;; Load page import on demand. Show 404 page if fails
  ;; importHref doc: https://www.polymer-project.org/2.0/docs/api/
  (this-as this
    (println "Page changed from: " oldpg " to " newpg)
      (println "This: " this)
    (let [new-url (.resolveUrl this (str "../my-" newpg ".html"))]
      (println "This: " this)
      ;; go thru the instance, using 'bind':
      ;; (.importHref js/Polymer new-url nil
      ;;              (.bind (goog.object/get this "_showPage404") this)
      ;;              true)))

      ;; inline, no need for 'bind':
      (.importHref js/Polymer new-url nil
                   (fn [] (goog.object/set this "page" "view404"))
                   true)))
  )

(defn ^:export -route-page-changed
  [page]
  ;; Polymer 2.0 will call with `undefined` on initialization.
  ;; Ignore until we are properly called with a string.
  (if (string? page)
    (this-as this
      ;; If no page was found in the route data, page will be an empty string.
      ;; Deault to 'view1' in that case.
      ;; <!--   this.page = page || 'view1'; -->
      (goog.object/set this "page" (if (empty? page) "view1" page))

      ;; Close a non-persistent drawer when the page & route are changed. -->
      (if (not (-> this (.-$) (.-drawer) (.-persistent)))
        (-> this (.-$) (.-drawer) (.close))))
    ))


