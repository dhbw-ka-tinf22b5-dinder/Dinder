CREATE TABLE advertisement
(
    advertisement_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title            VARCHAR(255)       NULL,
    price            DOUBLE             NOT NULL,
    location         VARCHAR(255)       NULL,
    postal_code              INT        NOT NULL,
    `description`    VARCHAR(255)       NULL,
    image            VARCHAR(16384)     NULL,
    creator_email    VARCHAR(255)       NOT NULL REFERENCES user (email) ON DELETE CASCADE ON UPDATE CASCADE,
    creation_time    datetime           NULL
);

CREATE TABLE chat
(
    id INT NOT NULL PRIMARY KEY,
    advertisement_id INT          NOT NULL REFERENCES advertisement (advertisement_id) ON DELETE CASCADE ON UPDATE CASCADE,
    contractor_email VARCHAR(255) NOT NULL REFERENCES user (email) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(advertisement_id, contractor_email)
);

CREATE TABLE chat_messages
(
    message_id   INT          NOT NULL PRIMARY KEY,
    message      VARCHAR(255) NULL,
    date_time    datetime     NULL,
    sender_email VARCHAR(255) NOT NULL REFERENCES user (email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE swipe_information
(
    swipe_time       datetime     NULL,
    user_email       VARCHAR(255) NOT NULL REFERENCES user (email),
    advertisement_id INT          NOT NULL REFERENCES advertisement (advertisement_id),
    PRIMARY KEY (user_email, advertisement_id)
    CONSTRAINT pk_swipeinformation PRIMARY KEY (user_email, advertisement_id)
);

CREATE TABLE user
(
    email     VARCHAR(255) NOT NULL PRIMARY KEY,
    user_name VARCHAR(255) NULL,
    pwd_hash  VARCHAR(255) NULL
);