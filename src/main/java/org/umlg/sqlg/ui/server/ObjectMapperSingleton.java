package org.umlg.sqlg.ui.server;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Date: 2016/12/31
 * Time: 8:24 AM
 */
public class ObjectMapperSingleton {

    public static final ObjectMapperSingleton INSTANCE = new ObjectMapperSingleton();
    private ObjectMapper objectMapper = new ObjectMapper();

    private ObjectMapperSingleton() {
    }

    public ObjectMapper getObjectMapper() {
        return this.objectMapper;
    }

}
