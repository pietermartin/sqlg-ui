var sqlgProperties = {
    jdbcUrl: "",
    jdbcUsername: "",
    jdbcPassword: "",
    updateJdbcUrl: function (value) {
        sqlgProperties.jdbcUrl = value;
    },
    updateJdbcUsername: function (value) {
        sqlgProperties.jdbcUsername = value;
    },
    updateJdbcPassword: function (value) {
        sqlgProperties.jdbcPassword = value;
    }
}

var login = function () {
    m.request({
        method: "POST",
        url: "http://localhost:4567/connect",
        data: {
            jdbcUrl: sqlgProperties.jdbcUrl,
            jdbcUsername: sqlgProperties.jdbcUsername,
            jdbcPassword: sqlgProperties.jdbcPassword
        }
    })
        .then(function (data) {
            m.route.set("/sqlg/Menu1/Tab1", {}, true)
        })
};

module.exports = {
    view: function (vnode) {
        return [
            m("input", {
                name: "jdbc.url",
                placeHolder: "jdbc.url",
                oninput: m.withAttr("value", sqlgProperties.updateJdbcUrl)
            }),
            m("input", {
                name: "jdbc.username",
                placeHolder: "jdbc.username",
                oninput: m.withAttr("value", sqlgProperties.updateJdbcUsername)
            }),
            m("input", {
                name: "jdbc.password",
                placeHolder: "jdbc.password",
                type: "password",
                oninput: m.withAttr("value", sqlgProperties.updateJdbcPassword)
            }),
            m("button", {
                onclick: function () {
                    login();
                }
            }, " Connect")
        ]
    }
};
