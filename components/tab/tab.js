var Tab = {
    oninit: function (vnode) {
        var uistate = {
            tabLeft: 0,
            tabWidth: 0,
            leftTabArray: [],
            leftTabs: {},
            dropDownTabArray: [],
            buttonLeft: 0,
            buttonWidth: 0,
            showDropDown: false,
            calculateVisibility: function () {
                // var redraw = this.showDropDown;
                // var showDropdown;
                // for (var i = 0; i < this.leftTabArray.length; i++) {
                //     var tab = this.leftTabs[this.leftTabArray[i].text];
                //     if (this.showDropDown) {
                //         showDropdown = (tab.left + tab.width) > (this.tabLeft + this.tabWidth - this.buttonWidth);
                //     } else {
                //         showDropdown = (tab.left + tab.width) > (this.tabLeft + this.tabWidth);
                //     }
                //     tab.visible = !showDropdown;
                // }
                // this.showDropDown = showDropdown;
                // return redraw !== this.showDropDown;
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
        return m("nav", {class: "tab", role: "navigation"},
            m("div", {class: "outer"}, [
                    m("div", {
                        // class: "nav-tab right",
                        class: "nav-tab left",
                        oncreate: function(vnode){
                            var navWidth = $(vnode.dom).outerWidth();
                        },
                        onupdate: function(vnode){
                            var navWidth = $(vnode.dom).outerWidth();
                        }
                    }, [
                        this.uistate.leftTabArray.map(function (tab) {
                            return m("a", {
                                class: tab.active ? "active" : "",
                                href: tab.url,
                                tab: tab,
                                oncreate: function(vnode) {
                                    m.route.link(vnode);
                                    tab.width = $(vnode.dom).outerWidth();
                                },
                                onupdate: function(vnode) {
                                    tab.width = $(vnode.dom).outerWidth();
                                }
                            }, tab.text)
                        }),
                        // m("a", {class: "tab-button right"}, "button")
                        m("a", {class: "tab-button left"}, "button")
                    ])
                ]
            ));
    }
};
