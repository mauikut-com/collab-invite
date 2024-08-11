-- migrate:up
CREATE TABLE event (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL
);


-- migrate:down
DROP TABLE event;
