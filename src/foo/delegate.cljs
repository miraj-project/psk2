(ns foo.delegate)
;  (:require [my-app :as foo]))

(enable-console-print!)

(println "hello from delegate!")

(defn foobar [page] (println "FOOBAR, you " page "!"))
