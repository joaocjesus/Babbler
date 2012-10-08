var username = "user";
$(document).ready(function() {
    $("#setuser").prop("value", username);
    $(".user").html(username);
    $("#send").click(function() {
        checkSpaces($("#prompt"));
        if($("#prompt").prop("value") != '') {
           var newline = "<li><span class='user'>[" + username + "]</span>: " + $("#prompt").prop("value") + "</li>";
           $("#chat").append(newline);
           $("#chat").scrollTop($("#chat").prop("scrollHeight"));
           $("#prompt").prop("value", "");
        }
    });
    $("#prompt").keypress(function(e) {
        if(e.which==13) {
            $("#send").click();
        }
    });
    $("#changeusername").click(function () {
        checkSpaces($("#setuser"));
        if($("#setuser").prop("value") != '') {
            username = $("#setuser").prop("value");
            $(".user").html(username);
        }
    });
    $("#setuser").keypress(function(e) {
        if(e.which==13) {
            $("#changeusername").click();
        }
    });
    $("#togglepanel").click(function () {
        if ($("#panel").is(":visible")) {
            $("#panel").slideUp();
            $("#togglepanel").html("Show options");
        }
        else {
            $("#panel").slideDown();
            $("#togglepanel").html("Hide options");
        }
    });
    $("#users li").click(function() {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
});

function checkSpaces(element) {
    var spaces = element.prop("value").split(" ").length - 1;  // counts number of blank spaces
    if (element.prop("value").length == spaces)   // if text is only blank spaces
        element.prop("value", "");   // clear text entered
}