var Tab = {
    oninit: function (vnode) {
        var uistate = {
            activeTabText: "",
            activeTabIndex: 0,
            navWidth: 0,
            leftTabArray: [],
            leftTabs: {},
            dropDownTabArray: [],
            buttonWidth: 0,
            buttonVisible: false,
            setVisibilityFromStartToActiveTab: function (tabIndex) {
                var redraw = false;
                var activeTab = this.leftTabArray[tabIndex];
                var totalLeftWidth = activeTab.tabWidth + this.buttonWidth;
                for (var i = this.activeTabIndex - 1; i >= 0; i--) {
                    var tabToLeft = this.leftTabArray[i];
                    var tabToLeftWidth = tabToLeft.tabWidth;
                    totalLeftWidth += tabToLeftWidth;
                    if (totalLeftWidth > this.navWidth) {
                        redraw = redraw || tabToLeft.visible;
                        tabToLeft.visible = false;
                    } else {
                        redraw = redraw || !tabToLeft.visible;
                        tabToLeft.visible = true;
                    }
                }
                return redraw;
            },
            setVisibilityFromActiveTabToButton: function() {
                var redraw = false;
                var totalLeftWidth = this.buttonWidth;
                for (var i = 0; i < this.leftTabArray.length; i++) {
                    var tabToLeft = this.leftTabArray[i];
                    totalLeftWidth += tabToLeft.tabWidth;
                    if (i > this.activeTabIndex) {
                        if (totalLeftWidth > this.navWidth) {
                            redraw = redraw || tabToLeft.visible;
                            tabToLeft.visible = false;
                        } else {
                            redraw = redraw || !tabToLeft.visible;
                            tabToLeft.visible = true;
                        }
                    }
                }
                return redraw;
            },
            calculateVisibility: function () {
                var redraw = false;
                if (this.leftTabArray[this.activeTabIndex + 1] && this.leftTabArray[this.activeTabIndex + 1].visible) {
                    var totalLeftWidth = this.buttonWidth;
                    for (var i = 0; i < this.leftTabArray.length; i++) {
                        var tabToLeft = this.leftTabArray[i];
                        totalLeftWidth += tabToLeft.tabWidth;
                        if (totalLeftWidth > this.navWidth) {
                            redraw = redraw || tabToLeft.visible;
                            tabToLeft.visible = false;
                            this.buttonVisible = true;
                        } else {
                            redraw = redraw || !tabToLeft.visible;
                            tabToLeft.visible = true;
                        }
                    }
                } else {
                    redraw = redraw || this.setVisibilityFromStartToActiveTab(this.activeTabIndex);
                    this.setVisibilityFromActiveTabToButton();
                }
                return redraw;
            }
        };
        vnode.state.uistate = uistate;
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
    oncreate: function (vnode) {
    },
    onupdate: function (vnode) {
    },
    view: function (vnode) {
        var ui = this.uistate;
        ui.activeTabText = vnode.attrs.activeTab;
        return m("nav", {class: "tab", role: "navigation"},
            m("div", {
                    class: "outer",
                    oncreate: function (vnode) {
                        ui.navWidth = $(vnode.dom).outerWidth();
                    },
                    onupdate: function (vnode) {
                        ui.navWidth = $(vnode.dom).outerWidth();
                    }
                }, [
                    m("div", {
                            class: "nav-tab",
                            onupdate: function (vnode) {
                                var redraw = false;
                                for (var i = 0; i < vnode.children.length; i++) {
                                    var buttonVnode = vnode.children[1];
                                    ui.buttonWidth = $(buttonVnode.dom).outerWidth();
                                    var array = vnode.children[0];
                                    for (var j = 0; j < array.children.length; j++) {
                                        var aVnode = array.children[j];
                                        var tabWidth = $(aVnode.dom).outerWidth();
                                        aVnode.state.tab.tabWidth = tabWidth;
                                        if (aVnode.state.tab.text === ui.activeTabText) {
                                            ui.activeTabIndex = j;
                                            redraw = redraw || !aVnode.state.tab.active;
                                            aVnode.state.tab.active = true;
                                        } else {
                                            redraw = redraw || aVnode.state.tab.active;
                                            aVnode.state.tab.active = false;
                                        }
                                    }
                                }
                                if (ui.calculateVisibility()) {
                                    m.redraw();
                                } else if (redraw) {
                                    m.redraw();
                                }
                            }
                        },
                        this.uistate.leftTabArray.map(function (tab) {
                            var style = tab.active ? "active" : "";
                            style += !tab.visible ? " invisible" : "";
                            return m("a", {
                                class: style,
                                href: tab.url,
                                oninit: function (vnode) {
                                    vnode.state.tab = tab;
                                },
                                oncreate: m.route.link,
                            }, tab.text)
                        }),
                        m("a", {class: "tab-button"}, "button")
                    )
                ]
            ));
    }
};
