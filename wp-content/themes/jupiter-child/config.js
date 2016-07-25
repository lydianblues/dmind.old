jQuery(function($) {

    /*
     * All communication with the registrar is through Javascript,
     * and uses one of the following URLs.  PHP pages refer to
     * the Wordpress PHP server using only the "path" (and following
     * parts) in the URL.
     */

    DMindConfig = function() {

        var API_TOKEN = "LwveqfAx78GuYOQPhDH4WQ==";

        var testing = false;
        var registrar = "";

        if (testing) {
            registrar = "http://localhost:3000/";
        } else {
            registrar = "https://registrar.niroga.org/";
        }

        return {
	        api_token: function() {
                return API_TOKEN;
	        },
            show_course_url: function(course_id) {
                return registrar + "courses/" + course_id + ".json";
            },
            show_training_url: function(training_id) {
                return registrar + "trainings/" + training_id + ".json";
            },
            show_location_url: function(location_id) {
                return registrar + "locations/" + location_id + ".json";
            },
            create_registration_url: function() {
                return registrar + "api/register"; /* HTTP POST */
            },
            show_registration_url: function(reg_id) {
                return registrar + "/api/register/" + reg_id + ".json"; /* HTTP GET */
            },
            update_registration_url: function(reg_id) {
                return registrar + "/api/register/" + reg_id + ".json"; /* HTTP PUT */
            },
            index_courses_url: function() {
                return registrar + "courses.json";
            },
            index_trainings_url: function() {
                return registrar + "trainings.json";
            }

        };
    }();
});
