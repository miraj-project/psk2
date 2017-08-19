(require 'cljs.build.api)

(cljs.build.api/watch "src"
                      {:main 'shell.my-app
                       ;; :optimizations :none
                       ;;
                       :optimizations :advanced
                       :externs ["bower_components/polymer/externs/closure-types.js"
                                 "bower_components/polymer/externs/polymer-externs.js"
                                 "bower_components/polymer/externs/webcomponents-externs.js"]
                       :language-in :es6-strict
                       ;; end optimizations advanced
                       :output-to "out/main.js"
                       :output-dir "out"})

