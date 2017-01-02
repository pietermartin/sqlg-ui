module.exports = {
    view: function (vnode) {
        return m("nav", {class: "navbar navbar-light bg-faded"}, [
            m("a", {class: "navbar-brand", href: "#"}, "Navbar"),
            m("ul", {class: "nav navbar-nav"}, [
                m("li", {class: "nav-item active"}, [
                    m("a", {class: "nav-link", href: "#"}, "Home ", [
                        m("span", {class: "sr-only"}, "(current)")
                    ])
                ]),
                m("li", {class: "nav-item"}, [
                    m("a", {class: "nav-link", href: "#"}, "Line")
                ])
            ])
        ]);
    }
}
