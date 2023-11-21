SET search_path TO dinder;

INSERT INTO users(email, userName, pwdHash)
VALUES('test@yahoo.de', 'userTest', '$2y$10$8wR8gYNArMJnPcVYXSAXAeUqMsh.tWe/nUFsgQ16ULrpka2urp45q'), --1234
      ('mustermann@max.de', 'maxMustermann', '$2y$10$ehTN4SlDUf6DPfVV7sFum.S.ubODwY1B47aRgyFm5GtKZerbFnApq'), --MAX
      ('user123@user.de', 'user123', '$2y$10$PDrtl0YGLHIkR91Pn8kJSutIDFr.5oiN5bOtvSQsZoLdxuQRqSbDe'); --user123

INSERT INTO advertisement(title, price, location, postalCode, description, image, advertiser, contractor, creationTime)
VALUES ('Rasenmähen', 13.5, 'Karlsruhe', 12345, 'description', null, 'test@yahoo.de', null, '2023-11-12 04:05:06'),
       ('Haus bauen', 17.5, 'Karlsruhe', 12345, 'description123', null, 'mustermann@max.de', null, '2023-11-12 08:09:10');

INSERT INTO swipe_information(swipeTime, contractorEmail, advertisementId)
VALUES('2023-11-13 08:09:10', 'test@yahoo.de', 2),
      ('2023-11-12 08:09:11', 'user123@user.de', 2);

INSERT INTO chat_messages(message, dateTime, swipeId, senderEmail)
VALUES ('Hi', '2023-11-12 08:09:11', 1, 'test@yahoo.de'),
       ('Moin', '2023-11-12 08:09:15', 2, 'mustermann@max.de'),
       ('Servus', '2023-11-12 08:09:17', 1, 'user123@user.de');