var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.baseurl = 'http://localhost:8000';
config.signingKey = 'a8f35732-f700-48de-a05a-dccb7a2e517a'

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;