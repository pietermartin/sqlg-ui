var MenuNav = {
    uistate: null,
    oninit: function (vnode) {
        this.uistate = vnode.attrs.uistate;
    },
    oncreate: function (vnode) {
        for (var i = 0; i < vnode.children.length; i++) {
            var ulVnode = vnode.children[i];
            for (var j = 0; j < ulVnode.children.length; j++) {
                var liVnode = ulVnode.children[j];
                var menu;
                if (this.uistate.leftMenus[liVnode.state.menu.text] !== undefined) {
                    menu = this.uistate.leftMenus[liVnode.state.menu.text];
                } else {
                    menu = this.uistate.rightMenus[liVnode.state.menu.text];
                }
                menu.left = $(liVnode.dom).position().left;
                menu.width = $(liVnode.dom).outerWidth();
            }
        }
    },
    onupdate: function (vnode) {
        for (var i = 0; i < vnode.children.length; i++) {
            var ulVnode = vnode.children[i];
            for (var j = 0; j < ulVnode.children.length; j++) {
                var liVnode = ulVnode.children[j];
                var menu;
                if (this.uistate.leftMenus[liVnode.state.menu.text] !== undefined) {
                    menu = this.uistate.leftMenus[liVnode.state.menu.text];
                } else {
                    menu = this.uistate.rightMenus[liVnode.state.menu.text];
                }
                menu.left = $(liVnode.dom).position().left;
                menu.width = $(liVnode.dom).outerWidth();
            }
        }
    },
    view: function (vnode) {
        var ui = this.uistate;
        return m("nav", {class: ui.isMenu ? "menu" : "tab", role: "navigation"}, [
            m("div", {class: "nav-menu"}, vnode.children),
            m("div", {
                class: this.uistate.showDropDown ? "nav-menu-dropdown visible" : "nav-menu-dropdown hidden",
                oncreate: function() {
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
                            ui.buttonWidth = $(vnode.dom).outerWidth();
                            if (ui.calculateVisibility()) {
                                setTimeout(function () {
                                    m.redraw();
                                }, 20)
                            }
                        },
                        onupdate: function (vnode) {
                            ui.buttonLeft = $(vnode.dom).position().left;
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
                            ui.dropDownMenuArray.map(function (menu) {
                                    return m("li", {class: menu.visible ? "hidden" : "vissible"}, [
                                        m("a", {href: menu.url, oncreate: m.route.link}, [
                                            m("div", menu.text)
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

var Menu = {
    oninit: function (vnode) {
        var uistate = {
            isMenu: true,
            menuLeft: 0,
            menuWidth: 0,
            leftMenuArray: [],
            rightMenuArray: [],
            leftMenus: {},
            rightMenus: {},
            dropDownMenuArray: [],
            buttonLeft: 0,
            buttonWidth: 0,
            showDropDown: false,
            calculateVisibility: function () {
                var redraw = this.showDropDown;
                var showDropdown;
                for (var i = 0; i < this.leftMenuArray.length; i++) {
                    var menu = this.leftMenus[this.leftMenuArray[i].text];
                    if (this.showDropDown) {
                        showDropdown = (menu.left + menu.width) > (this.menuLeft + this.menuWidth - this.buttonWidth);
                    } else {
                        showDropdown = (menu.left + menu.width) > (this.menuLeft + this.menuWidth);
                    }
                    menu.visible = !showDropdown;
                }
                for (i = 0; i < this.rightMenuArray.length; i++) {
                    menu = this.rightMenus[this.rightMenuArray[i].text];
                    if (this.showDropDown) {
                        showDropdown = (menu.left + menu.width) > (this.menuLeft + this.menuWidth - this.buttonWidth);
                    } else {
                        showDropdown = (menu.left + menu.width) > (this.menuLeft + this.menuWidth);
                    }
                    menu.visible = !showDropdown;
                }
                this.showDropDown = showDropdown;
                return redraw !== this.showDropDown;
            },
            setMenuInactive: function() {
                this.leftMenuArray.map(function (menu) {
                    menu.active = false;
                });
                if (this.rightMenuArray) {
                    this.rightMenuArray.map(function (menu) {
                        menu.active = false;
                    });
                }
            }
        };
        vnode.state.uistate = uistate;
        if (!vnode.attrs.isMenu) {
            uistate.isMenu = false;
        }
        if (vnode.attrs.leftMenus) {
            uistate.leftMenuArray = vnode.attrs.leftMenus;
        }
        if (vnode.attrs.rightMenus) {
            uistate.rightMenuArray = vnode.attrs.rightMenus;
        }
        vnode.attrs.leftMenus.map(function (menu) {
            menu.visible = true;
            menu.active = false;
            uistate.leftMenus[menu.text] = menu;
        });
        if (vnode.attrs.rightMenus) {
            vnode.attrs.rightMenus.map(function (menu) {
                menu.visible = true;
                menu.active = false;
                uistate.rightMenus[menu.text] = menu;
            });
        }
        if (this.uistate.leftMenus[vnode.attrs.activeMenu]) {
            this.uistate.leftMenus[vnode.attrs.activeMenu].active = true;
        }
        if (this.uistate.rightMenus[vnode.attrs.activeMenu]) {
            this.uistate.rightMenus[vnode.attrs.activeMenu].active = true;
        }
        uistate.leftMenuArray.map(function (menu) {
            uistate.dropDownMenuArray.push(menu);
        });
        if (uistate.rightMenuArray) {
            uistate.rightMenuArray.map(function (menu) {
                uistate.dropDownMenuArray.push(menu);
            });
        }
    },
    onupdate: function (vnode) {
        this.uistate.menuLeft = $(vnode.dom).position().left;
        this.uistate.menuWidth = $(vnode.dom).outerWidth();
        this.uistate.setMenuInactive();
        var redraw = false;
        if (this.uistate.leftMenus[vnode.attrs.activeMenu] && !this.uistate.leftMenus[vnode.attrs.activeMenu].active) {
            redraw = true;
            this.uistate.leftMenus[vnode.attrs.activeMenu].active = true;
        }
        if (this.uistate.rightMenus[vnode.attrs.activeMenu] && !this.uistate.rightMenus[vnode.attrs.activeMenu].active) {
            redraw = true;
            this.uistate.rightMenus[vnode.attrs.activeMenu].active = true;
        }
        if (redraw) {
            setTimeout(function(){m.redraw()}, 20);
        }
    },
    oncreate: function (vnode) {
        this.uistate.menuLeft = $(vnode.dom).position().left;
        this.uistate.menuWidth = $(vnode.dom).outerWidth();
        $('.nav-menu').each(function () {
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
        return m(MenuNav, {uistate: this.uistate},
            m("ul", {class: "left-menu"},
                vnode.state.uistate.leftMenuArray.map(function (menu) {
                    return m("li", {
                        class: menu.active ? "active" : "",
                        oninit: function (vnode) {
                            vnode.state.menu = menu
                        }
                    }, [
                        m("a", {href: menu.url, oncreate: m.route.link}, [
                            m("div", menu.text)
                        ])
                    ]);
                })
            ),
            m("ul", {class: "right-menu"},
                vnode.state.uistate.rightMenuArray.map(function (menu) {
                    return m("li", {
                        class: menu.active ? "active" : "",
                        oninit: function (vnode) {
                            vnode.state.menu = menu
                        }
                    }, [
                        m("a", {href: menu.url, oncreate: m.route.link}, [
                            m("div", menu.text)
                        ])
                    ]);
                })
            )
        );
    }
};
