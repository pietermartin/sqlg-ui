package org.umlg.sqlg.ui.server;

import org.umlg.sqlg.resources.connect.ConnectResource;
import org.umlg.sqlg.resources.topology.TopologyResource;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.staticFiles;

/**
 * Date: 2016/12/19
 * Time: 9:28 AM
 */
public class SqlgSpark {

    public static void main(String[] args) {
        staticFiles.externalLocation("/home/pieter/Projects/sqlg-ui");
        post(ConnectResource.PATH, ConnectResource::handle);
        get(TopologyResource.PATH, TopologyResource::handle);
    }

}
