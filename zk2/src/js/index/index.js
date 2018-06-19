require(["jquery", 'render'], function($, render) {
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(res) {
            format(res, 3);
        },
        error: function(error) {
            console.warn(error)
        }
    });

    function format(data, num) {
        var target = [];
        var i = 0;
        data.forEach(function(file, ind) {
            if (!target[i]) { //如果数组为空
                target[i] = [];
            }
            var index = ind + 1;
            target[i].push(file);
            if (index % num === 0) {
                i++
            }
        })
        render('#list', '.list', target)
    }

});