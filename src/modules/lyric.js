
const STATE_PAUSE = 0
const STATE_PLAYING = 1

function noop () {}

export default class Lyric {
  constructor (lines, handler = noop) {
    this.lines = lines
    this.handler = handler
    this.state = STATE_PAUSE
    this.curLine = 0
  }

  _findCurNum (time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  _callHandler (i) {
    if (i < 0) return
    this.handler({
      text: this.lines[i].text,
      lineNum: i
    })
  }

  _playRest () {
    let line = this.lines[this.curNum]
    let delay = line.time - (+new Date() - this.startStamp)

    this.timer = setTimeout(() => {
      this._callHandler(this.curNum++)
      if (this.curNum < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest()
      }
    }, delay)
  }

  play (startTime = 0, skipLast) {
    if (!this.lines.length) return
    this.state = STATE_PLAYING

    this.curNum = this._findCurNum(startTime)
    this.startStamp = +new Date() - startTime

    if (!skipLast) {
      this._callHandler(this.curNum - 1)
    }

    if (this.curNum < this.lines.length) {
      clearTimeout(this.timer)
      this._playRest()
    }
  }

  togglePlay () {
    const now = +new Date()
    if (this.state === STATE_PLAYING) {
      this.stop()
      this.pauseStamp = now
    } else {
      this.state = STATE_PLAYING
      this.play((this.pauseStamp || now) - (this.startStamp || now), true)
      this.pauseStamp = 0
    }
  }

  stop () {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }

  seek (offset) {
    this.play(offset)
  }
}
