
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-progress-bar-timer.cjs.production.min.js')
} else {
  module.exports = require('./react-progress-bar-timer.cjs.development.js')
}
