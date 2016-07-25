jQuery(function($) {

    NirogaSingle = function() {

        // This one is identical to the one in registration_script.js
        // and group_script.js -- FIX
        function add_to_msg_box(node, prefix, msg) {
            var contents =
                "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" " +
                "aria-label=\"Close\">" +
                "<span aria-hidden=\"true\">&times;</span>" +
                "</button>" +
                "<strong>" + prefix + "</strong>" + msg +

                "</div>";

            node.append(contents);
        }

        function student_modal() {

            var modal = document.getElementById('student-notice-modal');
            var span = document.getElementsByClassName("close")[0];

            $("#discount-notice").click(function (event) {
                event.preventDefault();
                modal.style.display = "block";
            });

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }

        /*
         * This function is character-for-character equal to the same-named
         * function in "group_script.js".  TODO: FIXME
         */
        function training_and_course_info() {

            var course_id = $("#course-title").data('course-id');
            var training_id = $("#training-code").data('training-id');

            if ((training_id == "") || (course_id == "")) {
                alert("training_id or course_id is empty");
                return;
            }

            // This needs to be fixed ASAP.  We shouldn't need to make 3 API calls.
            // Define an API so that one call gives you all the necessary data.
            $.ajax(DMindConfig.show_course_url(course_id), {
                    dataType: "json", // expected back from server
                    headers: {'X-Api-Key': DMindConfig.api_token()},
                    contentType: "application/json; charset=utf-8",
                    method: 'GET',
                    success: function(data, textStatus, jqXHR) {
                        var textNode = document.createTextNode(data.name);
                        $("#course-title").append(textNode);
                        textNode = document.createTextNode(data.description);
                        $("#course-description").append(textNode)
                    },
            });

            $.ajax(DMindConfig.show_training_url(training_id), {
                dataType: "json", // expected back from server
                headers: {'X-Api-Key': DMindConfig.api_token()},
                contentType: "application/json; charset=utf-8",
                method: 'GET',
                success: function(data, textStatus, jqXHR) {
                    var location_id = data.location_id;

                    var textNode = document.createTextNode(data.start_date);
                    $("#start-date").append(textNode);

                    textNode = document.createTextNode(data.end_date);
                    $("#end-date").append(textNode);

                    textNode = document.createTextNode(data.code);
                    $("#training-code").append(textNode);

                    $.ajax(DMindConfig.show_location_url(location_id), {
                        dataType: "json", // expected back from server
                        headers: {'X-Api-Key': DMindConfig.api_token()},
                        contentType: "application/json; charset=utf-8",
                        method: 'GET',
                        success: function(data, textStatus, jqXHR) {
                            // have data.name, data, data.street_1,
                            // data.street_2, data.city,
                            // data.state, and data.zip
                            var textNode = document.createTextNode(data.city);
                            $("#training-city").append(textNode);
                        }
                    });
                }
            });
        }

        function submit_to_registrar(reg_type) {
            var registration = generate_registration(reg_type);
            var reg_data = JSON.stringify(registration);

            $.ajax({
                type: "POST",
                url: DMindConfig.create_registration_url(),
                // The key needs to match your method's input
                // parameter (case-sensitive).
                data: reg_data,
                contentType: "application/json; charset=utf-8",
                headers: {'X-Api-Key': DMindConfig.api_token()},
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    if (data.status === "OK") {
                        window.location.href =
                            "/payment?reg_id=" + data.reg_id;
                    } else {
                        add_to_msg_box($("#global-msg-box"),
                            "Error:&nbsp", data.status);
                    }
                },
                failure: function (jqXHR, textStatus, errorThrown) {
                    add_to_msg_box($("#global-msg-box"),
                        "Failure:&nbsp",textStatus);
                }
            });
        }

        function generate_registration(reg_type) {

            var registration = {};

            // Collect single owner info.
            var owner = {};
            owner.wp_login = $("#user-login").data('wp-login');
            owner.wp_email = $("#user-email").data('wp-email');
            owner.wp_first_name = $("#user-first-name").data('wp-first-name');
            owner.wp_last_name = $("#user-last-name").data('wp-last-name');
            owner.wp_display_name = $("#user-display-name").data('wp-display-name');
            owner.wp_id = $("#user-id").data('wp-id');

            owner.occupation = $("#owner-occupation").val();
            owner.organization = $("#owner-organization").val();

            owner.email_list =
                $("#owner-info input#newsletter").is(':checked');

            /*
             *  Don't change the student discount status of the owner
             *  who is not a student
             */
            if (reg_type == 'single-self') {
                owner.student_discount =
                    $("#owner-info input#discount").is(':checked');
            }

            var training_id = $("#training-code").data('training-id');

            var all_participants = [];
            if (reg_type === 'single-other') {

                var participant = {};

                participant.wp_first_name =
                    $("#single-list-controller input#first-name").val();
                participant.wp_last_name =
                    $("#single-list-controller input#last-name").val();
                participant.wp_email =
                    $("#single-list-controller input#email").val();
                participant.occupation =
                    $("#single-list-controller input#occupation").val();
                participant.organization =
                    $("#single-list-controller input#organization").val();
                participant.email_list =
                    $("#single-list-controller input#newsletter").is(':checked');
                participant.student_discount =
                    $("#single-list-controller input#discount").is(':checked');

                all_participants.push(participant);
            }

            registration.reg_type = reg_type;
            registration.training_id = training_id;
            registration.participants = all_participants;
            registration.owner = owner;

            return registration;
        }

        function validate_registration() {


            $("#global-msg-box").empty();

            // Trigger bootstrap-validator.  The submission is received by our own
            // event handler, below.
            $("#single-list-controller").submit();

        }

        return {
            init: function() {
                var reg_type = $("#reg-type").data('reg-type');

                $("#finalize-registration").click(function (event) {
                    validate_registration();
                    event.preventDefault();
                    if (reg_type === 'single-self') {
                        submit_to_registrar(reg_type);
                    }
                });

                $("#single-list-controller").validator().submit(
                    function(event) {
                    if (event.isDefaultPrevented()) {
                        console.log("Form has errors");
                    } else {
                        console.log("Form valid");
                        event.preventDefault();
                        submit_to_registrar(reg_type);
                    }
                });

                training_and_course_info();
                student_modal();
            }
        };
    }();


    NirogaSingle.init();
});

