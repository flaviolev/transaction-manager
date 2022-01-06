package com.zuehlke.financemanager;

import org.testcontainers.containers.MySQLContainer;

public abstract class BaseTest {

     static MySQLContainer mySQLContainer = (MySQLContainer) new MySQLContainer("mysql:latest")
            .withDatabaseName("finance-manager-test-db")
            .withUsername("root")
            .withPassword("root")
            .withReuse(true);

    static {
        mySQLContainer.start();
    }
}
