var uistate = {
    menuWidth: null,
    leftMenuArray: null,
    rightMenuArray: null,
    leftMenus: {},
    rightMenus: {},
    dropDownMenuArray: [],
    buttonLeft: 0,
    buttonWidth: 0,
    showDropDown: false,
    calculateVisibility: function () {
        var redraw = uistate.showDropDown;
        for (var i = 0; i < uistate.leftMenuArray.length; i++) {
            var menu = uistate.leftMenus[uistate.leftMenuArray[i].text];
            if (uistate.showDropDown) {
                uistate.showDropDown = menu.left + menu.width > (uistate.menuWidth - uistate.buttonWidth);
            } else {
                uistate.showDropDown = menu.left + menu.width > (uistate.menuWidth);
            }
            menu.visible = !uistate.showDropDown;
        }
        for (i = 0; i < uistate.rightMenuArray.length; i++) {
            menu = uistate.rightMenus[uistate.rightMenuArray[i].text];
            if (uistate.showDropDown) {
                uistate.showDropDown = menu.left + menu.width > (uistate.menuWidth - uistate.buttonWidth);
            } else {
                uistate.showDropDown = menu.left + menu.width > (uistate.menuWidth);
            }
            menu.visible = !uistate.showDropDown;
        }
        return redraw !== uistate.showDropDown;
    }
};

var MenuLi = {
    view: function (vnode) {
        return m("li", [
            m("a", {href: vnode.attrs.menu.url}, [
                m("div", vnode.attrs.menu.text)
            ])
        ])
    }
}

var MenuDropdown = {
    view: function (vnode) {
        return m("div", m("ul",
            uistate.dropDownMenuArray.map(function (menu) {
                    return m("li", {class: menu.visible ? "hidden" : "vissible"}, [
                        m("a", {href: menu.url}, [
                            m("div", menu.text)
                        ])
                    ])
                }
            )));
    }
}

var MenuNav = {
    onupdate: function (vnode) {
        for (var i = 0; i < vnode.children.length; i++) {
            var ulVnode = vnode.children[i];
            for (var j = 0; j < ulVnode.children.length; j++) {
                var liVnode = ulVnode.children[j];
                var menu;
                if (uistate.leftMenus[liVnode.attrs.menu.text] !== undefined) {
                    menu = uistate.leftMenus[liVnode.attrs.menu.text];
                } else {
                    menu = uistate.rightMenus[liVnode.attrs.menu.text];
                }
                menu.left = $(liVnode.dom).position().left;
                menu.width = $(liVnode.dom).outerWidth();
            }
        }
    },
    view: function (vnode) {
        return m("nav", {role: "navigation"}, [
            m("div", {class: "nav-menu"}, vnode.children),
            m("div", {class: uistate.showDropDown ? "nav-dropdown visible" : "nav-dropdown hidden"},
                m("ul", [
                    m("li", {
                        oncreate: function (vnode) {
                            uistate.buttonLeft = $(vnode.dom).position().left;
                            uistate.buttonWidth = $(vnode.dom).outerWidth()
                            if (uistate.calculateVisibility()) {
                                m.redraw();
                            }
                        },
                        onupdate: function (vnode) {
                            uistate.buttonLeft = $(vnode.dom).position().left;
                            uistate.buttonWidth = $(vnode.dom).outerWidth()
                            if (uistate.calculateVisibility()) {
                                m.redraw();
                            }
                        }
                    }, [
                        m("a", {href: "#"}, [
                            m("div", [
                                m("span", {class: "fa fa-angle-double-down"})
                            ])
                        ]),
                        m(MenuDropdown)
                    ])
                ])
            )
        ]);
    }
};

var Menu = {
    oninit: function (vnode) {
        uistate.leftMenuArray = vnode.attrs.leftMenus;
        uistate.rightMenuArray = vnode.attrs.rightMenus;
        vnode.attrs.leftMenus.map(function (menu) {
            menu.visible = true;
            uistate.leftMenus[menu.text] = menu;
        });
        if (vnode.attrs.rightMenus) {
            vnode.attrs.rightMenus.map(function (menu) {
                menu.visible = true;
                uistate.rightMenus[menu.text] = menu;
            });
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
        uistate.menuWidth = vnode.dom.offsetWidth;
    },
    oncreate: function (vnode) {
        uistate.menuWidth = vnode.dom.offsetWidth;
        $(".nav-menu").each(function () {
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
        return m(MenuNav,
            m("ul", {class: "left-menu"},
                uistate.leftMenuArray.map(function (menu) {
                    return m(MenuLi, {menu: menu})
                })
            ),
            m("ul", {class: "right-menu"},
                uistate.rightMenuArray.map(function (menu) {
                    return m(MenuLi, {menu: menu})
                })
            )
        );
    }
}
