jQuery(function($) {

    // This one is identical to the one in single_script.js and registration_script. -- FIX
    function add_to_msg_box(node, prefix, msg) {
        var contents =
            "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" " +
            "aria-label=\"Close\">" +
            "<span aria-hidden=\"true\">&times;</span>" +
            "</button>" +
            "<strong>" + prefix + "</strong>" + msg +

            "</div>";

        node.html(contents); // could be node.append...
    }


    function add_participant(participant) {
        html = [
            '<td>' + participant.first_name + '</td>',
            '<td>' + participant.last_name + '</td>',
            '<td>' + participant.email + '</td>',
            '<td>' + participant.occupation + '</td>',
            '<td>' + participant.newsletter + '</td>',
            '<td>' + participant.discount + '</td>',
            '<td><button class="btn btn-xs btn-danger remove-row">Delete</button></td>'
        ];

        $("#list-of-members").prepend('<tr></tr>');
        $("#list-of-members tr:nth-child(1)").html(html);

        // Attach event handler to newly added node.
        $("#list-of-members tr:nth-child(1) button.remove-row").click(function(event){
            event.preventDefault();
            $(event.target).parent().parent().remove();
        });
    }

    $("#group-list-controller").submit(function(event) {
        event.preventDefault();

        participant = {};

        participant.first_name = $("#group-list-controller input#first-name").val();
        participant.last_name = $("#group-list-controller input#last-name").val();
        participant.email = $("#group-list-controller input#email").val();
        participant.occupation = $("#group-list-controller input#occupation").val();
        newsletter = $("#group-list-controller input#newsletter").is(':checked');
        discount = $("#group-list-controller input#discount").is(':checked');

        if (newsletter) {
            participant.newsletter = "Yes";
        } else {
            participant.newsletter = "No";
        }
        if (discount) {
            participant.discount = "Yes"
        } else {
            participant.discount = "No";
        }

        add_participant(participant);

    });

    $("button.remove-row").click(function(event){
        event.preventDefault();
        /* parent is a <td> and parent of that is <tr> to remove */
       $(event.target).parent().parent().remove();

    });

    /*
     * This function is character-for-character equal to the same-named
     * function in "single_script.js".  TODO: FIXME
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

    function submit_to_registrar() {
        var registration = generate_registration();
        var reg_data = JSON.stringify(registration);

        $.ajax({
            type: "POST",
            url: DMindConfig.create_registration_url(),
            // The key needs to match your method's input parameter (case-sensitive).
            data: reg_data,
            contentType: "application/json; charset=utf-8",
            headers: {'X-Api-Key': DMindConfig.api_token() },
            dataType: "json",
            success: function(data, textStatus, jqXHR){

                if (data.status === "OK") {
                    window.location.href =
                        "/payment?reg_id=" + data.reg_id;
                } else {
                    add_to_msg_box($("#global-msg-box"),
                        "Error:&nbsp", data.status);
                }
            },
            failure: function(jqXHR, textStatus, errorThrown) {
                add_to_msg_box($("#global-msg-box"),
                    "Error:&nbsp", textStatus);
            }
        });

    }

    function generate_registration() {

        var registration = {};

        // Collect group owner info.
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

        // Collect registration info.  All we need is the training id
        // and possibly the registration type.
        var training_id = $("#training-code").data('training-id');
        var reg_type = $("#reg-type").data('reg-type');

        all_participants = [];

        // Collect participants info.
        $('table#group-members tr:has(td)').map(function(i, v) {

            var td =  $('td', this);
            var participant = {};

            participant.wp_first_name = td.eq(0).text();
            participant.wp_last_name = td.eq(1).text();
            participant.wp_email = td.eq(2).text();
            participant.occupation = td.eq(3).text();
            participant.email_list = (td.eq(4).text() === 'Yes' ? true : false);
            participant.student_discount = (td.eq(5).text() === 'Yes' ? true : false);

            all_participants.push(participant);
        });

        registration.reg_type = reg_type;
        registration.training_id = training_id;
        registration.participants = all_participants;
        registration.owner = owner;

        return registration;
    }

    $("#finalize-registration").click(function(event) {
        event.preventDefault();
        submit_to_registrar();
    });

    training_and_course_info();

});

// Convert this to jQuery, probably use existing jQuery modal, and
// put in a common file.  This same code block is in group_script.js.
//

// Get the modal
var modal = document.getElementById('student-notice-modal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Make the <a> link open the modal.
$("#discount-notice").click(function(event) {
    event.preventDefault();
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
