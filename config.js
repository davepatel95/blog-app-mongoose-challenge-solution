'use strict';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-blog-app-mongoose-challenge'
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog-app-mongoose-challenge';
exports.PORT = process.env.PORT || 8080;