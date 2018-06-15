'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"/v1"',
  OSS_PREFIX: '"//music.163.com/api/img"',
  GIT_URL: '"https://github.com/mimimile/vue-CloudMusic"'
})
