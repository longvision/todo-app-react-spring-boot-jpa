DROP DATABASE IF EXISTS tododb;

CREATE DATABASE tododb;

/* USE tododb; */
GRANT
SELECT
,
INSERT
,
    DELETE,
UPDATE
    ON tododb.* TO 'admin@localhost' IDENTIFIED BY 'pass@word';