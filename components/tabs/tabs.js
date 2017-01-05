var tabBarWidth = -1;
var resizeEvent = false;

var DropdownLi = {
    view: function (vnode) {
        var tab = vnode.attrs.tab;
        var visibleTabs = vnode.attrs.visibleTabs;
        if (visibleTabs[tab.name()]) {
            return m("li", {class: visibleTabs[tab.name()].visible ? "" : "ttd-show"}, [
                m("a[href=" + tab.url() + "]", {oncreate: m.route.link}, tab.name())
            ]);
        } else {
            return m("li", [m("a[href=" + tab.url() + "]", {oncreate: m.route.link}, tab.name())]);
        }
    }
};

var Dropdown = {
    view: function (vnode) {
        return m("div", {class: "dropdown" + (vnode.attrs.nav.showDropDown ? " ttd-show" : "")}, [
            m("button", {
                class: "dropdown-toggle", onclick: function () {
                    $(vnode.dom).toggleClass("ttd-open");
                }
            }, "...", [
                m("span", {class: "fa fa-angle-down"})
            ]),
            m("ul", [
                vnode.attrs.nav.tabs.map(function (tab) {
                    return m(DropdownLi, {visibleTabs: vnode.attrs.nav.visibleTabs, tab: tab});
                })
            ])
        ])
    }
};

var Li = {
    tab: null,
    view: function (vnode) {
        this.tab = vnode.attrs.tab;
        return m("li", [m("a[href=" + vnode.attrs.tab.url() + "]", {oncreate: m.route.link}, vnode.attrs.tab.name())]);
    }
};

var Ul = {
    nav: null,
    tabs: [],
    hideTab: function (tab) {
        var redraw = false;
        //check is it needs to be hidden.
        if (Ul.nav.visibleTabs[tab.name()].visible) {
            Ul.nav.visibleTabs[tab.name()].visible = false;
            redraw = true;
        }
        return redraw;
    },
    showTab: function (tab) {
        var redraw = false;
        //check is it needs to be hidden.
        if (!Ul.nav.visibleTabs[tab.name()].visible) {
            Ul.nav.visibleTabs[tab.name()].visible = true;
            redraw = true;
        }
        return redraw;
    },
    onupdate: function (vnode) {
        var redraw = false;
        var arrayLength = vnode.children.length;
        Ul.nav.showDropDown = false;
        for (var i = 0; i < arrayLength; i++) {
            var childVnode = vnode.children[i];
            var tabListItemOffset = $(childVnode.dom).position().left + $(childVnode.dom).outerWidth();
            if (tabListItemOffset >= tabBarWidth) {
                redraw  = redraw || vnode.state.hideTab(childVnode.state.tab);
                Ul.nav.showDropDown = true;
            } else {
                redraw = redraw || vnode.state.showTab(childVnode.state.tab);
            }
        }
        if (redraw) {
            m.redraw();
        }
    },
    oncreate: function (vnode) {
        var redraw = false;
        Ul.tabs = vnode.attrs.tabs;
        Ul.nav.showDropDown = false;
        var arrayLength = vnode.children.length;
        for (var i = 0; i < arrayLength; i++) {
            var childVnode = vnode.children[i];
            var tabListItemOffset = $(childVnode.dom).position().left + $(childVnode.dom).outerWidth();
            if (tabListItemOffset >= tabBarWidth) {
                Ul.nav.showDropDown = true;
                redraw  = redraw || vnode.state.hideTab(childVnode.state.tab);
            }
        }
        if (redraw) {
            m.redraw();
        }
    },
    view: function (vnode) {
        Ul.nav = vnode.attrs.nav;
        return m("ul", vnode.children);
    }
}

var Nav = {
    tabs: [],
    visibleTabs: {},
    showDropDown: false,
    prepareTabs: function () {
        Nav.tabs.map(function (tab) {
            Nav.visibleTabs[tab.name()] = {visible: true};
        });
    },
    onupdate: function(vnode) {
        tabBarWidth = vnode.dom.offsetWidth;
    },
    oncreate: function(vnode) {
        vnode.state.prepareTabs();
        tabBarWidth = vnode.dom.offsetWidth;
    },
    view: function (vnode) {
        Nav.tabs = vnode.attrs.tabs;
        return [
            m("nav", {class: "tab-bar"},
                    m(Ul, {nav: Nav, tabs: vnode.attrs.tabs},
                        vnode.attrs.tabs.map(function (tab) {
                                return m(Li, {tab: tab});
                            }
                        )
                    )
            ),
            m(Dropdown, {nav: this})
        ]
    }
};

var Tabs = {
    oncreate: function (vnode) {
        $(".tabs-to-dropdown").each(function () {
            var resizeTimeout = 20;
            $(window).bind("resize", function () {
                if (typeof sizeWait != "undefined") {
                    clearTimeout(sizeWait);
                }
                sizeWait = setTimeout(function () {
                    m.redraw();
                }, resizeTimeout);
            });
        });
    },
    view: function (vnode) {
        return [
            m("div", {class: "tabs-to-dropdown"}, [
                m(Nav, {tabs: vnode.attrs.tabs})
            ]),
            vnode.attrs.tabs.map(function (tab) {
                return m("div", {class: "tab-content " + (vnode.attrs.activeTab === tab.name() ? "active" : "inactive")}, [
                    m(tab)
                ]);
            })
        ];
    }
}

