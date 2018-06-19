require(["jquery", "render"], function(r, n) {
    r.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(r) {
            var e, o, u;
            e = 3, o = [], u = 0, r.forEach(function(r, n) {
                o[u] || (o[u] = []);
                var a = n + 1;
                o[u].push(r), a % e == 0 && u++
            }), n("#list", ".list", o)
        },
        error: function(r) { console.warn(r) }
    })
});