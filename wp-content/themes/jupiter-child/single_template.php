<?php
/*
** Template Name: Niroga Single
**
**  bootstrap.php
** mk_build_main_wrapper : builds the main divisions that contains the content. Located in framework/helpers/global.php
** mk_get_view gets the parts of the pages, modules and components. Function located in framework/helpers/global.php
*/

wp_enqueue_style (
    "bootstrap-css",
    "/wp-content/themes/dmind/bower_components/bootstrap/dist/css/bootstrap.min.css");

wp_enqueue_style (
    "bootstrap-select-css",
    "/wp-content/themes/dmind/bower_components/bootstrap-select/dist/css/bootstrap-select.min.css");

wp_register_script (
    "jquery-niroga",
    "/wp-content/themes/dmind/bower_components/jquery/dist/jquery.min.js",
    array(), false, true);

wp_enqueue_script (
    "bootstrap-js",
    "/wp-content/themes/dmind/bower_components/bootstrap/dist/js/bootstrap.min.js",
    array("jquery-niroga"), false, true);

wp_enqueue_script (
    "bootstrap-select-js",
    "/wp-content/themes/dmind/bower_components/bootstrap-select/dist/js/bootstrap-select.js",
    array("jquery-niroga"), false, true);

wp_enqueue_script (
    "bootstrap-validate-js",
    "/wp-content/themes/dmind/bower_components/bootstrap-validator/dist/validator.js",
    array("jquery-niroga"), false, true);

wp_enqueue_script (
    "niroga-config",
    "/wp-content/themes/dmind/config.js",
    array("jquery-niroga"), false, true);

wp_enqueue_script (
    "niroga-group-js",
    "/wp-content/themes/dmind/single_script.js",
    array("jquery-niroga", "niroga-config"), false, true);

get_header();


Mk_Static_Files::addAssets('mk_button');
Mk_Static_Files::addAssets('mk_audio');
Mk_Static_Files::addAssets('mk_swipe_slideshow');

mk_build_main_wrapper( mk_get_view('singular', 'wp-page', true) );


get_footer();


