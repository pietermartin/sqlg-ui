package org.umlg.sqlg.ui.server;

import org.umlg.sqlg.structure.SqlgGraph;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Date: 2016/12/30
 * Time: 7:05 PM
 */
public class SqlgGraphSingleton {

    public static SqlgGraphSingleton INSTANCE = new SqlgGraphSingleton();
    private Map<String, SqlgGraph> sqlgGraphs = new HashMap<>();

    private SqlgGraphSingleton() {
    }

    public void addSqlgGraph(String jdbcUrl, SqlgGraph sqlgGraph) {
        this.sqlgGraphs.put(jdbcUrl, sqlgGraph);
    }

    public SqlgGraph getSqlgGraph(String jdbcUrl) {
        return sqlgGraphs.get(jdbcUrl);
    }

    public Set<SqlgGraph> getSqlgGraphs() {
        return new HashSet<>(this.sqlgGraphs.values());
    }

    public void close() throws Exception {
        for (SqlgGraph sqlgGraph : this.sqlgGraphs.values()) {
            sqlgGraph.close();
        }
        this.sqlgGraphs.clear();
    }
}
