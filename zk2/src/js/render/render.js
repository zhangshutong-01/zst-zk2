define(["jquery", 'handlebars'], function($, handlebars) {
    function render(rouce, cls, res) {
        console.log(res)
        var tem = $(rouce).html();
        var com = handlebars.compile(tem);
        var html = com(res)
        $(cls).append(html)
    }
    return render
});