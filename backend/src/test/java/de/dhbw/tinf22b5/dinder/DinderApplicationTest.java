/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package de.dhbw.tinf22b5.dinder;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class DinderApplicationTest {
    @Test void appHasAGreeting() {
        DinderApplication classUnderTest = new DinderApplication();
        Assertions.assertNotNull("app should have a greeting", classUnderTest.getGreeting());
    }
}
