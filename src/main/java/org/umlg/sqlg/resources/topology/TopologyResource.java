package org.umlg.sqlg.resources.topology;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.umlg.sqlg.structure.*;
import org.umlg.sqlg.ui.server.ObjectMapperSingleton;
import org.umlg.sqlg.ui.server.SqlgGraphSingleton;
import spark.Request;
import spark.Response;

import java.util.Set;

/**
 * Date: 2016/12/19
 * Time: 6:06 PM
 */
public class TopologyResource {

    public static final String PATH = "/topology";

//    [{"title": "Node 1", "key": "1"},
//    {"title": "Folder 2", "key": "2", "folder": true, "children": [
//        {"title": "Node 2.1", "key": "3"},
//        {"title": "Node 2.2", "key": "4"}
//    ]}
//]
    @SuppressWarnings("unchecked")
    public static Object handle(Request request, Response response) {
        ObjectMapper objectMapper = ObjectMapperSingleton.INSTANCE.getObjectMapper();
        Set<SqlgGraph> sqlgGraphs = SqlgGraphSingleton.INSTANCE.getSqlgGraphs();
        ArrayNode graphArray = objectMapper.createArrayNode();
        for (SqlgGraph sqlgGraph : sqlgGraphs) {
            ObjectNode graph = objectMapper.createObjectNode();
            graph.put("title", sqlgGraph.configuration().getString("jdbc.url"));
            graph.put("key", sqlgGraph.configuration().getString("jdbc.url"));

            ArrayNode metaGraphNode = objectMapper.createArrayNode();
            ObjectNode metaGraphChildren = objectMapper.createObjectNode();
            metaGraphChildren.put("title", "schemas");
            metaGraphChildren.put("key", "schemas");
            metaGraphNode.add(metaGraphChildren);
            graph.set("children", metaGraphNode);

            Set<Schema> schemas = sqlgGraph.getTopology().getSchemas();
            ArrayNode schemaArray = objectMapper.createArrayNode();
            for (Schema schema : schemas) {
                ObjectNode schemaNode = objectMapper.createObjectNode();
                schemaNode.put("title", schema.getName());
                schemaNode.put("key", schema.getName());
                schemaArray.add(schemaNode);

                ArrayNode schemaMetaChildren = objectMapper.createArrayNode();
                schemaNode.set("children", schemaMetaChildren);
                ObjectNode metaVertexLabel = objectMapper.createObjectNode();
                metaVertexLabel.put("title", "vertexLabels");
                metaVertexLabel.put("key", "vertexLabels");
                schemaMetaChildren.add(metaVertexLabel);

                ArrayNode vertexLabelArray = objectMapper.createArrayNode();
                for (VertexLabel vertexLabel: schema.getVertexLabels().values()) {
                    ObjectNode vertexLabelNode = objectMapper.createObjectNode();
                    vertexLabelNode.put("title", vertexLabel.getLabel());
                    vertexLabelNode.put("key", vertexLabel.getLabel());
                    vertexLabelArray.add(vertexLabelNode);

                    ArrayNode vertexLabelMetaChildren = objectMapper.createArrayNode();
                    vertexLabelNode.set("children", vertexLabelMetaChildren);
                    ObjectNode metaOutEdgeLabel = objectMapper.createObjectNode();
                    metaOutEdgeLabel.put("title", "outEdgeLabels");
                    metaOutEdgeLabel.put("key", "outEdgeLabels");
                    vertexLabelMetaChildren.add(metaOutEdgeLabel);
                    ObjectNode metaProperty = objectMapper.createObjectNode();
                    metaProperty.put("title", "properties");
                    metaProperty.put("key", "properties");
                    vertexLabelMetaChildren.add(metaProperty);
                    ObjectNode metaIndex = objectMapper.createObjectNode();
                    metaIndex.put("title", "indexes");
                    metaIndex.put("key", "indexes");
                    vertexLabelMetaChildren.add(metaIndex);

                    //out edges
                    ArrayNode outEdgeLabelArray = objectMapper.createArrayNode();
                    for (EdgeLabel edgeLabel : vertexLabel.getOutEdgeLabels().values()) {

                        ObjectNode edgeLabelNode = objectMapper.createObjectNode();
                        edgeLabelNode.put("title", edgeLabel.getLabel());
                        edgeLabelNode.put("key", edgeLabel.getLabel());
                        outEdgeLabelArray.add(edgeLabelNode);

                    }
                    metaOutEdgeLabel.set("children", outEdgeLabelArray);

                    //properties
                    ArrayNode propertiesArray = objectMapper.createArrayNode();
                    ArrayNode propertiesArrayForMetaProperties = objectMapper.createArrayNode();
                    for (PropertyColumn propertyColumn : vertexLabel.getProperties().values()) {

                        ObjectNode propertyColumnNode = objectMapper.createObjectNode();
                        propertyColumnNode.put("title", propertyColumn.getName());
                        propertyColumnNode.put("key", propertyColumn.getName());
                        propertyColumnNode.put("propertyType", propertyColumn.getPropertyType().name());
                        propertiesArray.add(propertyColumnNode);

                        ObjectNode propertyColumnNodeForMetaProperties = objectMapper.createObjectNode();
                        propertyColumnNodeForMetaProperties.put("name", propertyColumn.getName());
                        propertyColumnNodeForMetaProperties.put("propertyType", propertyColumn.getPropertyType().name());
                        propertiesArrayForMetaProperties.add(propertyColumnNodeForMetaProperties);

                    }
                    metaProperty.set("children", propertiesArray);
                    metaProperty.set("properties", propertiesArrayForMetaProperties);

                }
                metaVertexLabel.set("children", vertexLabelArray);
            }
            metaGraphChildren.set("children", schemaArray);
            graphArray.add(graph);
        }
        return graphArray.toString();
    }
}
