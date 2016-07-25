jQuery(function($) {

    function format_name(obj) {
        return obj.wp_first_name + "&nbsp;" + obj.wp_last_name;
    }

    $("#retry-payment").click(function() {
        document.location.reload(true);
    });

    function retry_payment_modal_events() {

        var modal = document.getElementById('retry-payment-modal');
        var span = document.getElementById('retry-payment-close');
        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function success_payment_modal_events() {

        var modal = document.getElementById('success-payment-modal');
        var span = document.getElementById('success-payment-close');
        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    
    // Make an XHR call the the registrar to get info about the current registration.
    // All we have is the reg_id.  In particular, we get the price that we can pass
    // on to Braintree in a nested XHR call.
    function registration_review_panel() {

        var reg_id = $("#registration-summary").data("reg-id");

        $.ajax(DMindConfig.show_registration_url(reg_id), {
            dataType: "json", // expected back from server
            headers: {'X-Api-Key': DMindConfig.api_token()},
            contentType: "application/json; charset=utf-8",
            method: 'GET',
            success: function (data, textStatus, jqXHR) {
                $("#registration-summary #course").html(data.course.name);
                $("#registration-summary #description").html(data.course.description);
                $("#registration-summary #start-date").html(data.training.start_date);
                $("#registration-summary #end-date").html(data.training.end_date);
                $("#registration-summary #city").html(data.training.city);
                $("#registration-summary #cost").html(data.formatted_price);
                $("#registration-summary #owner").html(data.owner.wp_first_name + "&nbsp;" +
                    data.owner.wp_last_name + "&nbsp(" + data.owner.wp_email + ")");

                // Exactly one of data.student or data.group should be defined
                if (typeof data.group !== 'undefined') {
                    var student_list = "";
                    var len = data.group.length;
                    for (var i = 0; i < len; i++) {
                        student_list += format_name(data.group[i]);
                        if (i < len - 1) {
                            student_list += ", ";
                        }
                    }

                    $("#registration-summary #participants").html(student_list);
                }

                if (typeof data.student !== 'undefined') {
                    $("#registration-summary #participants").html(format_name(data.student));
                }

                var charged_amt = (data.price / 100.00).toFixed(2);
                var client_token = "<?php echo(Braintree\ClientToken::generate()); ?>";

                braintree.setup(client_token, "dropin", {
                    container: "braintree-container",
                    // id: "custom-container", // id of the form for custom
                    paypal: {
                        singleUse: true,  // required
                        amount: charged_amt,    // required, should be a Javascript float.
                        currency: 'USD',  // required
                        locale: 'en_us'
                    },
                    onPaymentMethodReceived: function (obj) {
                        $.post(
                            "/wp-content/themes/dmind/payment_action.php",
                            {
                                nonce: obj.nonce,
                                type: obj.type,
                                details: obj.details,
                                amount: charged_amt
                            },
                            function (data, status) {
                                if (data.success) {

                                    // This is a field in the Registration Summary Panel.
                                    $("#payment-status").text("Payment Received");

                                    // Add more data to Registration Summary Panel.
                                    $("#transaction-id").text(data.id);
                                    if (data.paymentInstrumentType === "paypal_account") {
                                        $("#payment-type").text("PayPal");
                                        $("#authorization-code")
                                            .text(data.authorizationId);
                                    } else {
                                        $("#payment-type").text(data.cardType);
                                        $("#authorization-code")
                                            .text(data.processorAuthorizationCode);
                                    }
                                    $("#transaction-id").parent().show();
                                    $("#payment-type").parent().show();
                                    $("#authorization-code").parent().show();

                                    // Reduce the chance client could pay twice by
                                    // hiding the payment details panel.
                                    $("#payment-details-panel").hide();

                                    // Fill in the modal and show it.
                                    $("#payment-success").html(
                                        "<div><pre>" + JSON.stringify(data, null, 2) + "</pre></div>");
                                    $("#success-payment-modal").show();
                                } else {

                                    $("#payment-errors").html(
                                        "<div><pre>" + JSON.stringify(data, null, 2) + "</pre></div>")
                                    $("#retry-payment-modal").show();
                                }

                                $.ajax(DMindConfig.update_registration_url(reg_id), {
                                    dataType: "json", // expected back from server
                                    headers: {'X-Api-Key': DMindConfig.api_token()},
                                    // contentType: "application/json; charset=utf-8",
                                    // This fails because the _method field is wrapped
                                    // in JSON, so it doesn't get interpreted by Rails
                                    // to set the HTTP method.
                                    data: {
                                        bt_id: data.id,
                                        _method: 'put',
                                        success: data.success
                                    },
                                    method: 'POST',
                                    success: function (data, textStatus, jqXHR) {
                                        if (status === "success" && data.status === "OK") {
                                            $("#payment-status").html("Payment Recorded");

                                        } else {
                                            alert("There was a problem with your registration.<br/>" +
                                                "Please call the office at (510) 451-3004.");
                                        }
                                    }
                                });
                            },
                            "json"
                        )
                    }
                })
            }
        })
    }

    registration_review_panel();
    retry_payment_modal_events();
    success_payment_modal_events();

});



