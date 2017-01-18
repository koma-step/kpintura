function notify_error(where, type) {
    var message = "";

    if(where == 'login') {
        if(type == 'bad_auth') {
            message = "Erreur d'authentification";
        }
    }

    $.notify({
        icon: "error",
        message: message
    },{
        type: "danger",
        timer: 1000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
}

$(function() {
    setTimeout(function() {
        $('#username').focus();
    }, 100);
});