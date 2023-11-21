create schema if not exists dinder;
SET search_path TO dinder;

CREATE TABLE users
(
    email    VARCHAR(255) NOT NULL PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    pwdHash  VARCHAR(255) NOT NULL,
    UNIQUE (userName)
);

CREATE TABLE advertisement
(
    advertisementId SERIAL       NOT NULL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    price           float8       NOT NULL,
    location        VARCHAR(255) NULL,
    postalCode      INT          NOT NULL,
    description     VARCHAR(255) NULL,
    image           VARCHAR(255) NULL,
    advertiser      VARCHAR(255) NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    contractor      VARCHAR(255) NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    creationTime    timestamp    NULL
);

CREATE TABLE swipe_information
(
    swipeId         SERIAL       NOT NULL PRIMARY KEY,
    swipeTime       timestamp    NOT NULL,
    contractorEmail VARCHAR(255) NOT NULL REFERENCES users (email),
    advertisementId INT          NOT NULL REFERENCES advertisement (advertisementId),
    UNIQUE (contractorEmail,advertisementId)
);

CREATE TABLE chat_messages
(
    messageId   SERIAL       NOT NULL PRIMARY KEY,
    message     VARCHAR(255) NULL,
    dateTime    timestamp    NOT NULL,
    swipeId     INT          NOT NULL REFERENCES swipe_information (swipeId) ON DELETE CASCADE  ON UPDATE CASCADE,
    senderEmail VARCHAR(255) NOT NULL REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE
);

