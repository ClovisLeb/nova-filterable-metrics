let mix = require("laravel-mix");
const path = require("path");

mix.setPublicPath("dist")
    .js("resources/js/card.js", "js")
    .vue()
    .sass("resources/sass/card.scss", "css")
    .webpackConfig({
        resolve: {
            symlinks: false,
            alias: {
                "@": path.resolve(
                    __dirname,
                    "vendor/laravel/nova/resources/js/"
                ),
            },
        },
    });
