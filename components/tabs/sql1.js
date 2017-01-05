// var sqlLi1 = {
//     view: function (vnode) {
//         return m("li", {class: "nav-item"}, [
//             m("a[href=/sqlg/sql1]", {
//                 oncreate: m.route.link,
//             }, "Sql1")
//         ]);
//     }
// }

var sql1 = {
    name: function () {
        return "sql1";
    },
    url: function() {
        return "/sqlg/sql1";
    },
    view: function (vnode) {
        return m("div", "sql1");
    }
}
