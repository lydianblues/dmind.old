<?php

function add_braintree_javascript() {
    ?>
    <script>
        <?php require_once(get_stylesheet_directory() . '/config.js'); ?>
    </script>
    <script>
        <?php require_once(get_stylesheet_directory() . '/payment_script.js'); ?>
    </script>
    <?php
}

function registration_summary_template() {
    ?>
        <div class="row">
            <div class="col-sm-2">Course</div>
            <div id="course" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div class="col-sm-2">Description</div>
            <div id="description" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div class="col-sm-2">Start Date</div>
            <div id="start-date" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div class="col-sm-2">End Date</div>
            <div id="end-date" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div class="col-sm-2">City</div>
            <div id="city" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div class="col-sm-2">Payer</div>
            <div id="owner" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div class="col-sm-2">Participants</div>
            <div id="participants" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row">
            <div id="payment-status" class="col-sm-2">Payment Required</div>
            <div id="cost" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row" style="display:none;">
            <div class="col-sm-2">Transaction Id</div>
            <div id="transaction-id" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row" style="display:none;">
            <div class="col-sm-2">Authorization Code</div>
            <div id="authorization-code" class="col-sm-offset-1 col-sm-9"></div>
        </div>
        <div class="row" style="display:none;">
            <div class="col-sm-2">Payment Type</div>
            <div id="payment-type" class="col-sm-offset-1 col-sm-9"></div>
        </div>

    <?php
}

function registration_summary_panel() {
    ?>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Registration Summary</h3>
        </div>
        <div id="registration-summary"
             data-reg-id="<?php echo $_GET["reg_id"]; ?>" >
            <?php echo registration_summary_template() ?>
        </div>
    </div> <!-- end registration-summary -->

    <?php

}

function braintree_panel() {
    ?>

    <div id="payment-details-panel" class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Payment Details</h3>
        </div>
            <div class="row" style="padding:1em;">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <form id="braintree-checkout" method="post"
                        action="/payment" >
                        <div id="braintree-container"></div>
                        <button id="confirm-payment" class="payment-font btn btn-danger">
                            Confirm Payment
                        </button>
                    </form>

                </div>
                <div class="col-sm-2"></div>
            </div> <!-- row -->
        </div>

    <?php
}

function niroga_payment() {

    $fatal_errmsg = "";
    if (!is_user_logged_in()) {
        $fatal_errmsg = "You must be logged in to use this page.  Please try again " .
            "from the <a href=\"/register-login\">Login</a> page.";
    } elseif (!isset($_COOKIE['niroga-reg-type'])) {
        $fatal_errmsg = "Registration type is not set. Please try again from the " .
            "<a href=\"/registration\">Registration</a> page.";
    } elseif (!isset($_GET['reg_id']) || (!is_numeric($_GET['reg_id']))) {
        $fatal_errmsg = "Registration ID is invalid or missing.  Please try again " .
            "from the <a href=\"/registration\">Registration</a> page.";
    }

    // We're still not properly catching the case where the Registrar returns
    // this: ActiveRecord::RecordNotFound (Couldn't find Registration with 'id'=94)...

    $clientToken = Braintree_ClientToken::generate();

    // Not at the top level.  Otherwise all the pages get to enjoy our
    // javascript...
    add_action('wp_footer', 'add_braintree_javascript');

    ob_start();

    ?>

    <div style="background-color:#cfc;padding-top:1em;" class="container">

        <div id="braintree-client-token" data-client-token="<?php echo $clientToken ?>"></div>

        <?php

        if (!empty($fatal_errmsg)) {
            fatal_errmsg($fatal_errmsg);
        } else {
            ?> <div id="global-msg-box"></div> <?php
            registration_summary_panel();
            braintree_panel();
        }

        ?>

    </div> <!-- container -->

    <div id="transaction-status" class="payment-font"></div>

    <?php

    retry_payment_modal();
    success_payment_modal();

    ob_end_flush();
}

add_shortcode( 'niroga_payments', 'niroga_payment');
