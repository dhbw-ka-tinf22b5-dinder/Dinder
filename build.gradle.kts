allprojects {
    version = "1.0"
}

subprojects {
    apply(plugin = "java")
}

plugins {
  id("org.sonarqube") version "4.4.1.3373"
}

sonar {
  properties {
    property("sonar.projectKey", "dhbw-ka-tinf22b5-dinder_Dinder")
    property("sonar.organization", "dhbw-ka-tinf22b5-dinder")
    property("sonar.host.url", "https://sonarcloud.io")
  }
}
