var username = "user";
var oldusername = "";
var lastActivity;

$(window).unload(function() {
    oldusername=username;
    username="";
    $.post("files/setuser.php", {olduser: oldusername, user: username});
});


$(document).ready(function() {
    username+=getTimestamp();
    $("#setuser").prop("value", username);
    $(".user").html(username);
    setUser();
    $("#send").click(function() {
        checkSpaces($("#prompt"));
        if($("#prompt").prop("value") != '') {
           var newline = "<li><span class='user'>[" + username + "]: </span>" + $("#prompt").prop("value") + "</li>";
           $("#chat").append(newline);
           $("#chat").scrollTop($("#chat").prop("scrollHeight"));
           lastActivity = getTime();
           sendData($("#prompt").prop("value"));
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
            oldusername = username;
            username = $("#setuser").prop("value");
            setUser();
            $(".user").html(username);
            $("#chat li .user").html("[" + username + "]:&nbsp;");
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

$(window).unload(function() {
    oldusername=username;
    username="";
    setUser();
});

function checkSpaces(element) {
    var spaces = element.prop("value").split(" ").length - 1;  // counts number of blank spaces
    if (element.prop("value").length == spaces)   // if text is only blank spaces
        element.prop("value", "");   // clear text entered
}

function sendData(newline) {
    $.post("files/save.php", {lastmsg: lastActivity, user: username, message: newline});
}

function setUser() {
    $.post("files/setuser.php", {olduser: oldusername, user: username});
}

function getTime() {
    $.getJSON('files/time.php', function (time) {
        return time.servertime;
    });
}