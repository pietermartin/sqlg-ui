// var homeLi = {
//     view: function (vnode) {
//         return m("li", [
//             m("a[href=/sqlg/home]", {
//                 oncreate: m.route.link,
//             }, "Home")
//         ]);
//     }
// }



var home = {
    name: function () {
        return "home";
    },
    url: function() {
        return "/sqlg/home";
    },
    view: function (vnode) {
        return m("div", "home");
    }
}
