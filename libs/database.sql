CREATE TABLE IF NOT EXISTS  `peer_ci_sessions` (
  session_id varchar(40) DEFAULT '0' NOT NULL,
  ip_address varchar(16) DEFAULT '0' NOT NULL,
  user_agent varchar(50) NOT NULL,
  last_activity int(10) unsigned DEFAULT 0 NOT NULL,
  user_data text NOT NULL,
  PRIMARY KEY (session_id)
);

CREATE TABLE peer_test(
  testId INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  tDescribe TEXT NOT NULL COMMENT '测试描述',
  tTitle VARCHAR ( 150 ) NOT NULL COMMENT '文件标题'
);

CREATE TABLE peer_topic(
  topicId INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  testId  INT( 10 ) NOT NULL,
  tocTitle VARCHAR ( 150 ) NULL,
  tocMax  SMALLINT( 1 ),
  tocMin  SMALLINT( 1 ),
  index testId(testId)
);

CREATE TABLE peer_answer(
  answer INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
  aChoose VARCHAR( 200 ) NULL COMMENT '接受，用户之间用,分割',
  aRefuse VARCHAR( 200 ) NULL COMMENT '拒绝，用户之间用,分割',
  aOwner INT( 10 ) NOT NULL COMMENT '用户id',
  topicId INT( 10 ) NOT NULL COMMENT '题目id',
  index aOwner(aOwner) topicId(topicId)
);
