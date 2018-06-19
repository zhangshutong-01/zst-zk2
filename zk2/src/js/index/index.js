require(["jquery"], function($) {
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(res) {
            console.log(res)
        },
        error: function(error) {
            console.warn(error)
        }
    });
});