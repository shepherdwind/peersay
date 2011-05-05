DROP TABLE IF EXISTS `peer_ci_sessions`;
CREATE TABLE IF NOT EXISTS  `peer_ci_sessions` (
  session_id varchar(40) DEFAULT '0' NOT NULL,
  ip_address varchar(16) DEFAULT '0' NOT NULL,
  user_agent varchar(50) NOT NULL,
  last_activity int(10) unsigned DEFAULT 0 NOT NULL,
  user_data text NOT NULL,
  PRIMARY KEY (session_id)
);

DROP TABLE IF EXISTS `peer_tests`;
CREATE TABLE peer_tests(
  id INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  created DATETIME NULL,
  updated DATETIME NULL,
  tDescribe TEXT NOT NULL COMMENT '测试描述',
  tTitle VARCHAR ( 150 ) NOT NULL COMMENT '标题'
);

DROP TABLE IF EXISTS `peer_topics`;
CREATE TABLE peer_topics(
  id INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  tocTitle VARCHAR ( 150 ) NULL,
  tocMax  SMALLINT( 1 ) NULL,
  tocMin  SMALLINT( 1 ) NULL,
  test_id INT( 10 ) NULL
);

DROP TABLE IF EXISTS `peer_answers`;
CREATE TABLE peer_answers(
  id INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  created DATETIME NULL,
  updated DATETIME NULL,
  aChoose VARCHAR( 200 ) NULL COMMENT '接受，用户之间用,分割',
  aRefuse VARCHAR( 200 ) NULL COMMENT '拒绝，用户之间用,分割',
  topic_id INT( 10 ) NULL,
  user_id INT( 10 ) NULL
);

DROP TABLE IF EXISTS `peer_users`;
CREATE TABLE peer_users(
  id INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  uName VARCHAR( 100 ) NOT NULL,
  uStudId INT( 12 ) NULL COMMENT '学号',
  uPassword VARCHAR( 40 ) NOT NULL,
  uType ENUM('research','admin','student','messenger') DEFAULT 'student'
);

/**关系表**/
DROP TABLE IF EXISTS `peer_tests_users` ;
CREATE TABLE peer_tests_users (
  id INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  test_id INT( 10 ) NULL,
  user_id INT( 10 ) NULL
)
