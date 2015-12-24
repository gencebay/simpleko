// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "vendor/components-bootstrap/js/bootstrap.min",
        "crossroads":           "vendor/crossroads/dist/crossroads.min",
        "hasher":               "vendor/hasher/dist/js/hasher.min",
        "jquery":               "vendor/jquery/dist/jquery",
        "knockout":             "vendor/knockout/dist/knockout",
        "knockout-projections": "vendor/knockout-projections/dist/knockout-projections",
        "signals":              "vendor/js-signals/dist/signals.min",
        "text":                 "vendor/requirejs-text/text"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
