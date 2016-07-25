<?php

function niroga_register() {

    if (isset ($_COOKIE['niroga-reg-type'])) {
        $reg_type = $_COOKIE['niroga-reg-type'];
    }
    if (isset ($_COOKIE['niroga-course'])) {
        $course_id = $_COOKIE['niroga-course'];
    }
    if (isset ($_COOKIE['niroga-training'])) {
        $training_id = $_COOKIE['niroga-training'];
    }

    ?>

    <div id="registration-params" data-reg-type="<?php echo $reg_type ?>"
         data-course-id="<?php echo $course_id ?>"
         data-training-id="<?php echo $training_id ?>"
    </div>


<div style="background-color:#cfc;padding:1em;margin-bottom:1em;" class="container">

    <div id="global-msg-box"></div>

    <div id="course-training-selector" class="row">
        <div class="col-sm-6">
            <select id="course-selector" class="selectpicker" title="Select Course"
                    data-style="btn-info" data-width="auto">
            </select>
        </div>

        <div class="col-sm-6">
            <select id="training-selector" class="selectpicker"
                    title="Select Location & Date"
                data-style="btn-info" data-width="auto">
            </select>
        </div>

    </div>

    <div id="registration-type" style="padding-left:15px;padding-top:1em;">
        <input type="radio" name="reg-type" value="single-self" checked>
            I am registering only myself.<br>
        <input type="radio" name="reg-type" value="single-other">
            I am registering for another person.<br>
        <input type="radio" name="reg-type" value="group-inclusive">
            I am registering a group, and I will also attend as a group member.<br>
        <input type="radio" name="reg-type" value="group-exclusive">
            I am registering a group, and I am not attending as a group member.
    </div>

<form id="registration-user" action="/wp-content/themes/dmind/registration_action.php" method="post">
    <input type="hidden" name="training" id="training-id"/>
    <input type="hidden" name="course" id="course-id"/>
    <input type="hidden" name="reg-type" id="reg-type" value="single-self"/>

  <div class="form-group">
    <div class="col-sm-offset-5 col-sm-2">
      <button type="submit" class="btn btn-warning">Continue to Next Step</button>
    </div>
      <div class="col-sm-5"></div>
  </div>
</form>

</div>

<?php
}
add_shortcode('niroga_registration', 'niroga_register');
