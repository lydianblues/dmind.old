<?php

function ng_maybe_set_cookie($afield, $aarray) {
    if (array_key_exists($afield, $aarray)) {
        if (!empty($aarray[$afield])) {

            # Note that the domain (the third argument should be set
            # to '/' to be passed in redirects.  From the PHP Manual:
            # The path on the server in which the cookie will be available
            # on. If set to '/', the cookie will be available within the
            # entire domain. If set to '/foo/', the cookie will only be
            # available within the /foo/ directory and all sub-directories
            # such as /foo/bar/ of domain. The default value is the
            # current directory that the cookie is being set in.
            #
            setcookie('niroga-' . $afield, $aarray[$afield],
                time() + 60 * 60, '/');

        }
    }
}

function ng_redirect($url, $permanent = false)  {
    if (headers_sent() === false) {
        header('Location: ' . $url, true,
            ($permanent === true) ? 301 : 302);
    }
    exit();
}

function student_aux_info($reg_type) {

    if ($reg_type === 'single-self') {

        ?>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-2">
                <div class="checkbox">
                    <label>
                        <input id="newsletter" type="checkbox">
                        Add to Mailing List
                    </label>
                </div>
            </div>
            <div class="col-sm-offset-1 col-sm-2">
                <div class="checkbox">
                    <label>
                        <input id="discount" type="checkbox">
                        Student Discount
                    </label>
                </div>
            </div>
            <div class="col-sm-offset-1 col-sm-4" id="discount-notice-col">
                <a id="discount-notice" href="#">Read About the Student Discount</a>
            </div>
        </div>

        <?php

    } elseif ($reg_type === 'single-other') {

        ?>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                    <label>
                        <input id="newsletter" type="checkbox">Add to Mailing List
                    </label>
                </div>
            </div>
        </div>

        <?php

    }
}

// Student model uses its own container.
function student_modal() {
    ?>
    <div class="container">
        <div id="student-notice-modal" class="modal" >
            <div class="modal-content">
                <div class="panel panel-default"
                     style="margin-bottom:0px;">
                    <div class="panel-heading">
                        <h3 class="panel-title">Are You a Student?
                            <span class="close">x</span>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <?php include("student_agreement.html"); ?>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <?php
}

function retry_payment_modal() {
    ?>
    <div class="container">
        <div id="retry-payment-modal" class="modal" >
            <div class="modal-content">
                <div class="panel panel-default"
                     style="margin-bottom:0px;">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <span>Payment Failed</span>
                            <span id="retry-payment-close" class="close">x</span>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div id="payment-errors"></div>
                        <button id="retry-payment"
                                class="payment-font btn btn-danger">
                            Retry Payment
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <?php
}

function success_payment_modal() {
    ?>
    <div class="container">
        <div id="success-payment-modal" class="modal" >
            <div class="modal-content">
                <div class="panel panel-default"
                     style="margin-bottom:0px;">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <span>Payment Succeeded</span>
                            <span id="success-payment-close" class="close">x</span>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div id="payment-success"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <?php
}

function fatal_errmsg($errmsg) {
    ?>

    <div class="alert alert-danger" role="alert">
        <strong>Error:&nbsp;</strong> . <?php echo $errmsg ?>
    </div>

    <?php
}

function finalize_button() {
    ?>

    <div class="row" id="finalize-row">
        <div class="col-sm-offset-5 col-sm-2">
            <button id="finalize-registration" type="submit"
                    class="btn btn-danger">
                Finalize Registration
            </button>
        </div>
    </div>

    <?php
}

