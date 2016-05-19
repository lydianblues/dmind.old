<?php
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

function ng_add_theme_scripts() {
    wp_enqueue_style( 'theme-icons',
        get_template_directory_uri() . '/assets/stylesheet/min/theme-icons.css',
            array(), '5.1.2', 'all');

}

add_action( 'wp_enqueue_scripts', 'ng_add_theme_scripts' );

