(require 'cljs.build.api)

(cljs.build.api/watch "src"
                      {:main 'shell.my-app
                       :output-to "out/main.js"})
