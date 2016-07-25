<?php

function register_login_controls() {
    $reg_type = $_COOKIE['niroga-reg-type'];

    if (!isset($reg_type)) {

        ?>
        <div class="container" style="margin-top:1em;">
            <div class="alert alert-warning" role="alert">
                Please visit the <a href="/registration">Registration</a> page first.
            </div>
        </div> <!-- container -->
        <?php
        exit;
    }

    ?>

    <div class="container" style="margin-top:1em;">

        <?php

        if (is_user_logged_in()) {
            if (($reg_type === 'single-self') || ($reg_type === 'single-other')) {
                $url = "/single";
            } else {
                $url = "/group";
            }

            ?>

            <div class="row">
                <div class="col-sm-offset-5 col-sm-2">
                    <a href="<?php echo $url ?>" class="btn btn-warning">
                        Continue Registration
                    </a>
                </div>
            </div>

            <?php

        } else {
            ?>
            <div class="alert alert-info" role="alert">
                Please log in or create account to continue.
            </div>

            <?php
        }

        ?> </div> <?php
}
add_shortcode('register-login-controls', 'register_login_controls');

function register_edit_controls() {
    $reg_type = $_COOKIE['niroga-reg-type'];
    $updated = $_GET['updated'];

    if (!isset($reg_type)) {

        ?>
        <div class="container" style="margin-top:1em;">
            <div class="alert alert-warning" role="alert">
                Please visit the <a href="/registration">Registration</a> page first.
            </div>
        </div> <!-- container -->
        <?php
        exit;
    }

    ?>

    <div class="container" style="margin-top:1em;">

        <?php

        if ($updated === 'success') {
            if (($reg_type === 'single-self') || ($reg_type === 'single-other')) {
                $url = "/single";
            } else {
                $url = "/group";
            }

            ?>

            <div class="row" style="margin-bottom:1em;">
                <div class="col-sm-offset-5 col-sm-2">
                    <a href="<?php echo $url ?>" class="btn btn-warning">
                        Continue Registration
                    </a>
                </div>
            </div>

            <?php

        }

        ?> </div> <?php
}
add_shortcode('register-edit-controls', 'register_edit_controls');
