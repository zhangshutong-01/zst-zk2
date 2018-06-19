define(["jquery", 'handlebars'], function($, handlebars) {
    function render(rouce, cls, res) {
        var tem = $(rouce).html();
        var com = handlebars.compile(tem);
        var html = com(res)
        $(cls).append(html)
    }
    return render
});