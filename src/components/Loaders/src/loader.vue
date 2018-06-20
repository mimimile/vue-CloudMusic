<template>
  <transition name="mi-loader">
    <div class="mi-loader" v-show="visible" :class="customClass">
      <div class="loader-inner" :class="type">
        <div v-for="(item, index) in divLengths" :key="index"
          :style="{
            backgroundColor: color
          }">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    type: String,
    position: {
      type: String,
      default: 'middle'
    },
    color: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      divs: {
        'ball-pulse': 3,
        'ball-grid-pulse': 9,
        'ball-clip-rotate': 1,
        'ball-clip-rotate-pulse': 2,
        'square-spin': 1,
        'ball-clip-rotate-multiple': 2,
        'ball-pulse-rise': 5,
        'ball-rotate': 1,
        'cube-transition': 2,
        'ball-zig-zag': 2,
        'ball-zig-zag-deflect': 2,
        'ball-triangle-path': 3,
        'ball-scale': 1,
        'line-scale': 5,
        'line-scale-party': 4,
        'ball-scale-multiple': 3,
        'ball-pulse-sync': 3,
        'ball-beat': 3,
        'line-scale-pulse-out': 5,
        'line-scale-pulse-out-rapid': 5,
        'ball-scale-ripple': 1,
        'ball-scale-ripple-multiple': 3,
        'ball-spin-fade-loader': 8,
        'line-spin-fade-loader': 8,
        'triangle-skew-spin': 1,
        'pacman': 5,
        'ball-grid-beat': 9,
        'semi-circle-spin': 1,
        'ball-scale-random': 3
      },
      visible: false
    }
  },
  computed: {
    divLengths () {
      const n = this.divs[this.type]
      return Array.from(new Array(n), (val, index) => index)
    },
    customClass () {
      let classes = []
      switch (this.position) {
        case 'top':
          classes.push('placetop')
          break
        case 'bottom':
          classes.push('placebottom')
          break
        default:
          classes.push('placemiddle')
      }
      classes.push(this.className)

      return classes.join(' ')
    }
  }
}
</script>

<style>
.mi-loader {
  position: fixed;
  z-index: 99999;
  max-width: 80%;
  border-radius: 5px;
  color: #000;
  box-sizing: border-box;
  text-align: center;
  transition: opacity .3s linear;
}
.mi-loader-enter, .mi-loader-leave-active {
    opacity: 0
}
.placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}

.placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
