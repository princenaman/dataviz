const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

 elixir(mix => {
    mix
        .sass([
            'app.scss' // Any scss content
        ], 'resources/assets/css/custom.css') // Move it to css resources
        .styles([
            '/resources/assets/css/bootstrap.min.css', // SCSS converted to css
            'node_modules/font-awesome/css/font-awesome.min.css', // Font Awesome Icons
            '/resources/assets/css/custom.css', // SCSS converted to css
            '/resources/assets/css/mdb.css', // Material Design css
            '/resources/assets/css/customizer.min.css', // Material customizer css
            '/resources/assets/css/app.css', // Custom CSS always keep it last
        ], 'public/css/all.css', __dirname)
        .webpack([
            '/resources/assets/js/bootstrap.min.js', // Bootstrap JS
            '/resources/assets/js/customizer.min.js', // Material customizer JS
        ], 'resources/assets/js/custom.js', __dirname) // Move it to js resources
        .scripts([
            'node_modules/moment/min/moment-with-locales.js', // Moment JS for time and stuff
            '/resources/assets/js/tether.min.js', // Tether JS for UI Position
            '/resources/assets/js/custom.js', // Material Design JS
            '/resources/assets/js/mdb.min.js', // Material Design JS
            '/resources/assets/js/app.js', // Custom JS functions
        ], 'public/js/all.js', __dirname)
        .copy( 'node_modules/simple-line-icons/fonts/', 'public/fonts')
        .copy( 'resources/assets/fonts', 'public/fonts')
        .copy( 'node_modules/font-awesome/fonts', 'public/fonts')
        .copy( 'node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/fonts')
        .copy( 'resources/assets/img', 'public/assets')
        .copy( 'resources/assets/img/loader.svg', 'public/loader.svg')
        .copy( 'resources/plugins/', 'public/plugins/');
});
