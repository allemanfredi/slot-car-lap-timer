const { spawn } = require('child_process')
const encoding = require('text-encoding')

const Circuit = {
  process: null,
  isStopped: false,

  fetch: _e => {
    this.isStopped = false
    this.process = spawn('python', ['../hardware/fake.py'])

    this.process.stdout.on('data', _data => {
      const str = new encoding.TextDecoder('utf-8').decode(_data)
      const elements = str.split(':')

      const decoded = {
        lane: elements[0],
        value: parseInt(elements[1])
      }

      if (!this.isStopped) _e.sender.send('data', decoded)
    })
  },

  stop: () => {
    console.log('kill')
    this.process.stdin.pause()
    this.process.kill()
    this.isStopped = true
  }
}

module.exports = Circuit
