import Vue from 'vue'
import loader from './loader.vue'
import 'loaders.css/loaders.css'

const LoaderConstructor = Vue.extend(loader)
let loaderPool = []

const typeList = [
  'ball-pulse',
  'ball-grid-pulse',
  'ball-clip-rotate',
  'ball-clip-rotate-pulse',
  'square-spin',
  'ball-clip-rotate-multiple',
  'ball-pulse-rise',
  'ball-rotate',
  'cube-transition',
  'ball-zig-zag',
  'ball-zig-zag-deflect',
  'ball-triangle-path',
  'ball-scale',
  'line-scale',
  'line-scale-party',
  'ball-scale-multiple',
  'ball-pulse-sync',
  'ball-beat',
  'line-scale-pulse-out',
  'line-scale-pulse-out-rapid',
  'ball-scale-ripple',
  'ball-scale-ripple-multiple',
  'ball-spin-fade-loader',
  'line-spin-fade-loader',
  'triangle-skew-spin',
  'pacman',
  'semi-circle-spin',
  'ball-grid-beat',
  'ball-scale-random'
]

let getAnInstance = () => {
  if (loaderPool.length > 0) {
    let instance = loaderPool[0]
    loaderPool.splice(0, 1)
    return instance
  }
  return new LoaderConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    loaderPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

LoaderConstructor.prototype.finish = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  // removeDom()
  this.finished = true
  returnAnInstance(this)
}

let Loader = (options = {}) => {
  let duration = options.duration || null

  let instance = getAnInstance()
  instance.finished = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.type = typeList.indexOf(options.type || '') > -1 ? options.type : 'ball-pulse'
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  instance.color = options.color || 'red'

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    if (!duration) return
    ~duration && (instance.timer = setTimeout(function () {
      if (instance.finished) return
      instance.finish()
    }, duration))
  })
  return instance
}

export default Loader
