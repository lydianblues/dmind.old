<?php

require_once get_stylesheet_directory() . '/login_controls.php';
require_once get_stylesheet_directory() . '/registration_shortcodes.php';
require_once get_stylesheet_directory() . '/payment_shortcodes.php';
require_once get_stylesheet_directory() . '/group_shortcodes.php';
require_once get_stylesheet_directory() . '/single_shortcodes.php';

/**
* Register our sidebars and widgetized areas.
*
*/
function niroga_widgets_init() {

    register_sidebar( array(
        'name'          => 'Niroga Events List Area',
        'id'            => 'niroga_events_list',
        'before_widget' => '<div>',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="rounded">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => 'Niroga Events List Narrow Area',
        'id'            => 'niroga_events_list_narrow',
        'before_widget' => '<div>',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="rounded">',
        'after_title'   => '</h2>',
    ) );

    }
add_action( 'widgets_init', 'niroga_widgets_init' );
