module.exports = {
    oncreate: function (vnode) {
        $(vnode.dom).fancytree({
                source: {url: "/topology", cache: false},
                click: function (event, data) {
                }
            }
        );
    },
    view: function (vnode) {
        return m("div");
    }
};