#!/bin/sh
MAVEN=target/finance-manager-0.0.1-SNAPSHOT.jar
GRADLE=build/libs/finance-manager-0.0.1-SNAPSHOT.jar
ls -hl $MAVEN  | awk '{print $9, $5}'
ls -hl $GRADLE  | awk '{print $9, $5}'