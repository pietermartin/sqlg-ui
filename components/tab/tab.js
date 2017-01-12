var TabNav = {
    uistate: null,
    oninit: function (vnode) {
        this.uistate = vnode.attrs.uistate;
    },
    oncreate: function (vnode) {
        for (var i = 0; i < vnode.children.length; i++) {
            var ulVnode = vnode.children[i];
            for (var j = 0; j < ulVnode.children.length; j++) {
                var liVnode = ulVnode.children[j];
                var tab;
                tab = this.uistate.leftTabs[liVnode.state.tab.text];
                tab.left = $(liVnode.dom).position().left;
                //noinspection JSValidateTypes
                tab.width = $(liVnode.dom).outerWidth();
            }
        }
    },
    onupdate: function (vnode) {
        for (var i = 0; i < vnode.children.length; i++) {
            var ulVnode = vnode.children[i];
            for (var j = 0; j < ulVnode.children.length; j++) {
                var liVnode = ulVnode.children[j];
                var tab;
                tab = this.uistate.leftTabs[liVnode.state.tab.text];
                tab.left = $(liVnode.dom).position().left;
                //noinspection JSValidateTypes
                tab.width = $(liVnode.dom).outerWidth();
            }
        }
    },
    view: function (vnode) {
        var ui = this.uistate;
        return m("nav", {class: "tab", role: "navigation"}, [
            m("div", {class: "nav-tab"}, vnode.children),
            m("div", {
                    class: this.uistate.showDropDown ? "nav-tab-dropdown visible" : "nav-tab-dropdown hidden",
                    oncreate: function () {
                        if (ui.calculateVisibility()) {
                            setTimeout(function () {
                                m.redraw();
                            }, 20)
                        }
                    }
                },
                m("ul",
                    m("li", {
                        oncreate: function (vnode) {
                            ui.buttonLeft = $(vnode.dom).position().left;
                            //noinspection JSValidateTypes
                            ui.buttonWidth = $(vnode.dom).outerWidth();
                            if (ui.calculateVisibility()) {
                                setTimeout(function () {
                                    m.redraw();
                                }, 20)
                            }
                        },
                        onupdate: function (vnode) {
                            ui.buttonLeft = $(vnode.dom).position().left;
                            //noinspection JSValidateTypes
                            ui.buttonWidth = $(vnode.dom).outerWidth();
                            if (ui.calculateVisibility()) {
                                setTimeout(function () {
                                    m.redraw();
                                }, 20)
                            }
                        }
                    }, [
                        m("a", {href: "#"}, [
                            m("div", [
                                m("span", {class: "fa fa-angle-double-down"})
                            ])
                        ]),
                        m("div", m("ul",
                            ui.dropDownTabArray.map(function (tab) {
                                    return m("li", {class: tab.visible ? "hidden" : "vissible"}, [
                                        m("a", {href: tab.url, oncreate: m.route.link}, [
                                            m("div", tab.text)
                                        ])
                                    ])
                                }
                            )))
                    ])
                )
            )
        ]);
    }
};

var Tab = {
    oninit: function (vnode) {
        var uistate = {
            isMenu: false,
            tabLeft: 0,
            tabWidth: 0,
            leftTabArray: [],
            leftTabs: {},
            dropDownTabArray: [],
            buttonLeft: 0,
            buttonWidth: 0,
            showDropDown: false,
            calculateVisibility: function () {
                var redraw = this.showDropDown;
                var showDropdown;
                for (var i = 0; i < this.leftTabArray.length; i++) {
                    var tab = this.leftTabs[this.leftTabArray[i].text];
                    if (this.showDropDown) {
                        showDropdown = (tab.left + tab.width) > (this.tabLeft + this.tabWidth - this.buttonWidth);
                    } else {
                        showDropdown = (tab.left + tab.width) > (this.tabLeft + this.tabWidth);
                    }
                    tab.visible = !showDropdown;
                }
                this.showDropDown = showDropdown;
                return redraw !== this.showDropDown;
            },
            setTabInactive: function () {
                this.leftTabArray.map(function (tab) {
                    tab.active = false;
                });
            }
        };
        vnode.state.uistate = uistate;
        if (!vnode.attrs.isMenu) {
            uistate.isMenu = false;
        }
        if (vnode.attrs.leftTabs) {
            uistate.leftTabArray = vnode.attrs.leftTabs;
        }
        vnode.attrs.leftTabs.map(function (tab) {
            tab.visible = true;
            tab.active = false;
            uistate.leftTabs[tab.text] = tab;
        });
        if (this.uistate.leftTabs[vnode.attrs.activeTab]) {
            this.uistate.leftTabs[vnode.attrs.activeTab].active = true;
        }
        uistate.leftTabArray.map(function (tab) {
            uistate.dropDownTabArray.push(tab);
        });
    },
    onupdate: function (vnode) {
        this.uistate.tabLeft = $(vnode.dom).position().left;
        //noinspection JSValidateTypes
        this.uistate.tabWidth = $(vnode.dom).outerWidth();
        this.uistate.setTabInactive();
        var redraw = false;
        if (this.uistate.leftTabs[vnode.attrs.activeTab] && !this.uistate.leftTabs[vnode.attrs.activeTab].active) {
            redraw = true;
            this.uistate.leftTabs[vnode.attrs.activeTab].active = true;
        }
        if (redraw) {
            setTimeout(function () {
                m.redraw()
            }, 20);
        }
    },
    oncreate: function (vnode) {
        this.uistate.tabLeft = $(vnode.dom).position().left;
        //noinspection JSValidateTypes
        this.uistate.tabWidth = $(vnode.dom).outerWidth();
    },
    view: function (vnode) {
        return m(TabNav, {uistate: this.uistate},
            m("ul", {class: "left-tab"},
                vnode.state.uistate.leftTabArray.map(function (tab) {
                    return m("li", {
                        class: tab.active ? "active" : "",
                        oninit: function (vnode) {
                            vnode.state.tab = tab;
                        }
                    }, [
                        m("a", {href: tab.url, oncreate: m.route.link}, [
                            m("div", tab.text)
                        ])
                    ]);
                })
            )
        );
    }
};
