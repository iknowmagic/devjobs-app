const path = require('path')
const { createServer } = require('history-server')
const server = createServer([
  {
    path: '/agentmanager',
    root: path.resolve(__dirname, '../dist')
  }
])
