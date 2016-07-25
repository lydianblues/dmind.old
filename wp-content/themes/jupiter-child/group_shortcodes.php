<?php

require_once('helpers.php');

function group_owner_panel($current_user, $reg_type) {
    ?>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Group Owner</h3>
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
                 data-wp-first-name="<?php echo $current_user->user_firstname ?>">
                First Name:&nbsp;<?php echo $current_user->user_firstname ?>
            </div>
            <div id="user-last-name"
                 data-wp-last-name="<?php echo $current_user->user_lastname ?>">
                Last Name:&nbsp;<?php echo $current_user->user_lastname ?>
            </div>
            <div id="user-display-name"
                 data-wp-display-name="<?php echo $current_user->user_display_name ?>">
                Display Name:&nbsp;<?php echo $current_user->display_name ?>
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
                    <label for="owner-organization" class="col-sm-2 control-label">
                        Organization
                    </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"
                               id="owner-organization" placeholder="Organization">
                    </div>
                </div>
                <!-- Has its own form-group -->
                <?php echo student_aux_info('single-other'); ?>
            </form>
        </div>
    </div>
    <?php
}

function group_training_info_panel($course_id, $training_id) {
    ?>
    <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Training Information</h3>
            </div>
            <div class="panel-body">

                <div id="course-title" data-course-id="<?php echo $course_id ?>">
        Course:&nbsp;
                </div>
                <div id="course-description">
        Description:&nbsp;
                </div>
                <div id="training-code"
                     data-training-id="<?php echo $training_id ?>">
                         Training Code:&nbsp;
                </div>
                <div id="start-date">
        Start Date:&nbsp;
                </div>
                <div id="end-date">
        End Date:&nbsp;
                </div>
                <div id="training-city">
        City:&nbsp;
                </div>

                <div class="row">
                    <div class="col-sm-2 col-sm-offset-5">
                        <a href="/registration"
                           class="btn btn-warning">Change Registration</a>
                    </div>
                </div>
            </div>
        </div>
    <?php
}

function group_add_members_panel() {

    ?>
    <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Add Group Members</h3>
            </div>
            <div class="panel-body">
                <div id="attending-warning">
        Don't forget to also add yourself, if you will be
                    attending!<br/> If you have a group of 20+, please call the
                    office at (510) 451-3004.
                </div>

                <form id="group-list-controller" action="#" class="form-horizontal"
                    data-toggle="validator" role="form">
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

                    <?php echo student_aux_info('single-self') ?>

                    <div class="form-group">
                        <div class="col-sm-offset-5 col-sm-2">
                            <button id="add-group-member" type="submit"
                                    class="btn btn-warning">
                                Add Group Member
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    <?php
}

function group_list_panel() {
    ?>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Group Members</h3>
        </div>
        <div class="panel-body">
            <div class="table-responsive"
                 style="overflow-y:auto;height:16em;overflow-x:auto;">
                <table id="group-members"
                       class="table table-striped table-condensed table-hover">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Occupation</th>
                        <th>Newsletter</th>
                        <th>Discount</th>
                        <th colspan="1"></th>
                    </tr>
                    </thead>
                    <tbody id="list-of-members">
                    </tbody>
                </table>
            </div>
        </div>
    </div>


    <?php
}

function niroga_group() {

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
        if (($reg_type !== 'group-inclusive') && ($reg_type != 'group-exclusive')) {
            $fatal_errmsg = "Registration type is not valid. Please try again from the " .
                "<a href=\"/registration\">Registration</a> page.";
        }
    }
    $current_user = wp_get_current_user();

    ob_start();

    ?>

    <div id="reg-type" data-reg-type="<?php echo $reg_type; ?>"></div>

    <div style="background-color:#cfc;padding:1em;margin-bottom:1em;" class="container">

        <?php

        if (!empty($fatal_errmsg)) {
            fatal_errmsg($fatal_errmsg);
        } else {
            ?> <div id="global-msg-box"></div> <?php
            group_training_info_panel($course_id, $training_id);
            group_owner_panel($current_user, $reg_type);
            group_add_members_panel();
            group_list_panel();
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
add_shortcode('niroga_group', 'niroga_group');
