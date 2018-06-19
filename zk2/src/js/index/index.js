require(["jquery", 'render'], function($, render) {
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(res) {
            console.log(res)
            render('#list', '.list', res)
        },
        error: function(error) {
            console.warn(error)
        }
    });
});