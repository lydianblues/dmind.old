<?php
//
// This function is identical to the info panel generation in
// group_shortcodes.php.
//

require_once('helpers.php');

function single_training_info_panel($course_id, $training_id) {
?>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Training Information</h3>
        </div>
        <div class="panel-body">

            <div id="course-title" data-course-id="<?php echo $course_id ?>">
                Course:&nbsp;
            </div>

            <div id="course-description"> Description:&nbsp;</div>

            <div id="training-code"
                  data-training-id="<?php echo $training_id ?>">
                      Training Code:&nbsp;
            </div>

            <div id="start-date">Start Date:&nbsp;</div>

            <div id="end-date">End Date:&nbsp;</div>

            <div id="training-city">City:&nbsp;</div>

            <div class="row">
                <div class="col-sm-2 col-sm-offset-5">
                    <a href="/registration"
                        class="btn btn-warning">Change Registration
                    </a>
                </div>
            </div>
        </div>
    </div>

<?php

}

function single_owner_panel($reg_type, $current_user, $panel_title) {
    ?>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><?php echo $panel_title ?></h3>
        </div>
        <div class="panel-body">
            <div id="user-login"
                data-wp-login="<?php echo $current_user->user_login ?>">
                    Login:&nbsp;<?php echo $current_user->user_login ?>
            </div>
            <div id="user-email"
                 data-wp-email="<?php echo $current_user->user_email ?>">
                Email:&nbsp;<?php echo $current_user->user_email ?>
            </div>
            <div id="user-first-name"
                 data-wp-first-name="<?php echo $current_user->user_firstname?>">
                First Name:&nbsp;<?php echo $current_user->user_firstname ?>
            </div>
            <div id="user-last-name"
                 data-wp-last-name="<?php echo $current_user->user_lastname ?>">
                Last Name:&nbsp;<?php echo $current_user->user_lastname ?>
            </div>
            <div id="user-display-name"
                 data-wp-display-name="<?php echo $current_user->user_display_name ?>">
                Display Name:&nbsp;<?php echo $current_user->display_name?>
            </div>
            <div id="user-id"
                 data-wp-id="<?php echo $current_user->ID ?>">
                ID:&nbsp;<?php echo $current_user->ID ?>
            </div>

            <form id="owner-info" class="form-horizontal">

                <div class="form-group">
                    <label for="owner-occupation" class="col-sm-2 control-label">
                        Occupation
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"
                               id="owner-occupation" placeholder="Occupation">
                    </div>
                </div>

                <div class="form-group">
                    <label for="owner-organization" class="col-sm-2 control-label">
                        Organization
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"
                               id="owner-organization" placeholder="Organization">
                    </div>
                </div>

                <?php echo student_aux_info($reg_type); ?>

            </form>
        </div>
    </div>
    <?php
    }

function single_registrant_panel($panel_title) {

    ?>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><?php echo $panel_title ?></h3>
        </div>
        <div class="panel-body">
            <div id="registrant-msg-box"></div>
            <form id="single-list-controller" action="#" class="form-horizontal"
                role="form" data-toggle="validator">
                <div class="form-group">
                    <label for="first-name" class="col-sm-2 control-label">
                        First Name*
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" required
                               id="first-name" placeholder="First Name">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="last-name" class="col-sm-2 control-label">
                        Last Name*
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" required
                               id="last-name" placeholder="Last Name">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="col-sm-2 control-label">
                        Email*
                    </label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" required
                            id="email" placeholder="Email">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="occupation" class="col-sm-2 control-label">
                        Occupation
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"
                               id="occupation" placeholder="Occupation">
                    </div>
                </div>
                <div class="form-group">
                    <label for="organization" class="col-sm-2 control-label">
                        Organization
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"
                               id="organization" placeholder="Organization">
                    </div>
                </div>
                <?php echo student_aux_info('single-self'); ?>
            </form>
        </div>
    </div>

    <?php

}

function niroga_single() {
    $reg_type = $_COOKIE['niroga-reg-type'];
    $course_id = $_COOKIE['niroga-course'];
    $training_id = $_COOKIE['niroga-training'];

    $fatal_errmsg = "";
    if (!is_user_logged_in()) {
        $fatal_errmsg = "You must be logged in to use this page.  Please try again " .
            "from the <a href=\"/register-login\">Login</a> page.";
    } elseif (!isset($_COOKIE['niroga-reg-type'])) {
        $fatal_errmsg = "Registration type is not set. Please try again from the " .
            "<a href=\"/registration\">Registration</a> page.";
    } else {
        $reg_type = $_COOKIE['niroga-reg-type'];
        if (($reg_type !== 'single-other') && ($reg_type != 'single-self')) {
            $fatal_errmsg = "Registration type is not valid. Please try again from the " .
                "<a href=\"/registration\">Registration</a> page.";
        }
    }

    ob_start();
    ?>

    <!-- Value to pass to Javascript. -->
    <div id="reg-type" data-reg-type="<?php echo $reg_type; ?>"></div>

    <div style="background-color:#cfc;padding-top:1em;" class="container">

        <?php

        if (!empty($fatal_errmsg)) {
            fatal_errmsg($fatal_errmsg);
        } else {
            ?> <div id="global-msg-box"></div> <?php
            single_training_info_panel($course_id, $training_id);
            single_owner_panel($reg_type, wp_get_current_user(), "About yourself");
            if ($reg_type === 'single-other') {
                single_registrant_panel("About the person you are registering");
            }
            finalize_button();
        }

        ?>

    </div> <!-- container -->

    <?php
    if (empty($fatal_errmsg)) {
        // has its own container
        student_modal();
    }

    ob_end_flush();
}

add_shortcode('niroga_single', 'niroga_single');
