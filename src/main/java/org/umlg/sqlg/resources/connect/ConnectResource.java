package org.umlg.sqlg.resources.connect;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.umlg.sqlg.structure.SqlgGraph;
import org.umlg.sqlg.ui.server.SqlgGraphSingleton;
import spark.Request;
import spark.Response;

import java.util.Map;

/**
 * Date: 2016/12/19
 * Time: 6:06 PM
 */
public class ConnectResource {

    public static final String PATH = "/connect";

    @SuppressWarnings("unchecked")
    public static Object handle(Request request, Response response) {
        String sqlgProperties = request.body();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, String> properties = objectMapper.readValue(sqlgProperties, Map.class);
            String jdbcUrl = properties.get("jdbcUrl");
            String jdbcUsername = properties.get("jdbcUsername");
            String jdbcPassword = properties.get("jdbcPassword");
            PropertiesConfiguration propertiesConfiguration = new PropertiesConfiguration();
//            propertiesConfiguration.setProperty("jdbc.url", jdbcUrl);
//            propertiesConfiguration.setProperty("jdbc.username", jdbcUsername);
//            propertiesConfiguration.setProperty("jdbc.password", jdbcPassword);
            propertiesConfiguration.setProperty("jdbc.url", "jdbc:postgresql://localhost:5432/sqlgraphdb");
            propertiesConfiguration.setProperty("jdbc.username", "postgres");
            propertiesConfiguration.setProperty("jdbc.password", "postgres");
            SqlgGraphSingleton.INSTANCE.close();
            SqlgGraph sqlgGraph = SqlgGraph.open(propertiesConfiguration);
            //TODO replace with request params
            SqlgGraphSingleton.INSTANCE.addSqlgGraph("jdbc:postgresql://localhost:5432/sqlgraphdb", sqlgGraph);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "";
    }
}
