const { spawn } = require('child_process')
const encoding = require('text-encoding')

const Circuit = {
  process: null,
  speedProcess: null,
  isStopped: false,

  fetch: (_e) => {
    this.isStopped = false
    this.process = spawn('python3', ['../hardware/fake.py'])
    this.speedProcess = spawn('python3', ['../hardware/fake-speed.py'])

    this.process.stdout.on('data', (_data) => {
      const str = new encoding.TextDecoder('utf-8').decode(_data)
      const elements = str.split(':')

      const decoded = {
        lane: elements[0],
        value: parseInt(elements[1]),
      }

      if (!this.isStopped) _e.sender.send('data', decoded)
    })

    this.speedProcess.stdout.on('data', (_data) => {
      const str = new encoding.TextDecoder('utf-8').decode(_data)
      const elements = str.split(':')

      const decoded = {
        lane: elements[0],
        value: parseFloat(elements[1]),
      }

      if (!this.isStopped) _e.sender.send('speed', decoded)
    })
  },

  stop: () => {
    console.log('kill')
    this.process.stdin.pause()
    this.process.kill()
    this.speedProcess.stdin.pause()
    this.speedProcess.kill()
    this.isStopped = true
  },
}

module.exports = Circuit
