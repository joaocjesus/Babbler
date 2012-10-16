var username = "user";
var oldusername = "";
var lastActivity = 0;

$(window).unload(function() {
    if (!$.browser.webkit) {
        oldusername=username;
        username="";
        $.post("files/setuser.php", {olduser: oldusername, user: username});
    }
});

$(document).ready(function() {
    if ($.browser.webkit) {
        window.onbeforeunload = function(e) {
            oldusername=username;
            username="";
            jQuery.ajax({
                url: 'files/setuser.php',
                data: {olduser: oldusername, user: username},
                async: false
            });
        };
    }
    username+=getTimestamp();
    hasWebStorage = ('localStorage' in window) && window['localStorage'] !== null;
    if (hasWebStorage) {
        var user = localStorage.getItem("username");
        if (user != '' && user != null)
            username = user;
    }
    setUser();
    getUsers();
    startChat();
    $("#send").click(function() {
        checkSpaces($("#prompt"));
        if($("#prompt").prop("value") != '') {
           var newline = "<li><span class='user'>[" + username + "]: </span>" + $("#prompt").prop("value") + "</li>";
           addchat(username, $("#prompt").prop("value"),true);
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
    $("#clearStorage").click(function() {
        localStorage.clear();
        setUser("user" + getTimestamp());
    }); 
});

function getUsers() {
    var userclass;
    $.getJSON('files/getusers.php', function(data) {
        for(n in data) {
            if(data[n] == username)
                userclass="me";
            else
                userclass="user";
            $("#users").append("<li class='" + userclass + "'>"+ data[n] +"</li>");
        }
    });
}

function addchat(user, text, send) {
    var newline = "<li><span class='user'>[" + user + "]: </span>" + text + "</li>";
    $("#chat").append(newline);
    $("#chat").scrollTop($("#chat").prop("scrollHeight"));
    if(send)
        sendData(text);
}

function startChat() {
    $.getJSON('files/lastrecord.php', function (record) {
         lastActivity = parseInt(record.id);
    });

    setInterval(function () {
        $.getJSON('files/fetch.php', { id: lastActivity }, function (data) {
            for(n in data) {
                // ignores messages that are from the current user (so it doesnt duplicate in the chat)
                if(data[n].user != username)
                    addchat(data[n].user,data[n].message);
                lastActivity = parseInt(data[n].id);
            }
        });
    }, 2500);
}

function checkSpaces(element) {
    var spaces = element.prop("value").split(" ").length - 1;  // counts number of blank spaces
    if (element.prop("value").length == spaces)   // if text is only blank spaces
        element.prop("value", "");   // clear text entered
}

function sendData(newline) {
    $.post("files/save.php", {user: username, message: newline});
}

function setUser(name) {
    if (name) {
        oldusername = username;
        username = name;
    }
    $.post("files/setuser.php", {olduser: oldusername, user: username}, function(data) {
        if(parseInt(data) == 0) {
            $("#statusMsg").html("User already exists! Please choose a new username.").delay(10000).fadeOut(2000);
        } else if (hasWebStorage) {
            localStorage.setItem("username", username);      
            $("#setuser").prop("value", username);
            $("#chat li .user").html("[" + username + "]:&nbsp;");    
        }
    });         
}
/*
function getTime() {
    $.getJSON('files/time.php', function (time) {
        return time.servertime;
    });
}*/