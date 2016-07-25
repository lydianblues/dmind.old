<?php

require 'helpers.php';

require_once( '../../../wp-load.php' );
# Can't use this line because ABSPATH is defined in 'wp-load.php'
# require_once( ABSPATH . '/wp-load.php' );

//
// The user has just filled out the training registration form.  To get
// here, the registration type is either group-inclusive or group-exclusive.
//
// We are not passed and we don't care about any user-specific info.  If
// the user is logged in, we can get it ourselves.  If the user is not logged
// in, he/she will log in in the next step.
//

if (isset($_POST)) {
    $post_fields = array('course', 'training', 'reg-type');
    foreach ($post_fields as $field) {
        ng_maybe_set_cookie($field, $_POST);
    }
}

$ng_reg_type = "";
if (isset($_POST['reg-type'])) {
    $ng_reg_type = $_POST['reg-type'];
}

if (is_user_logged_in()) {
    if (($ng_reg_type === 'single-self') ||
        ($ng_reg_type === 'single-other')) {
        ng_redirect("/single");
    } elseif (($ng_reg_type === 'group-inclusive') ||
        ($ng_reg_type === 'group-exclusive')) {
        ng_redirect("/group");
    }
} else {
    ng_redirect("/register-login");
}


