<template>
  <div>
    <div class="not-found">
      <h1>哦买噶得儿</h1>
      <h2>页面不见了</h2>
    </div>
  </div>
</template>

<script>
import textures from '@/assets/haruna/textures.json'
import Models from '@/assets/haruna/models.json'

export default {
  name: 'notFound',
  data () {
    return {
      list33: []
    }
  },
  async created () {
    await this.formatModels()
    console.log(this.list33)
    await this.randomModel('33')
  },
  mounted () {

  },
  methods: {
    init (model) {
      window.L2Dwidget.init({
        model: {
          jsonPath: model
        },
        react: {
          opacityDefault: 1,
          opacityOnHover: 1
        }
      })
    },
    formatModels () {
      const list = Models.list.slice(0)
      this.list33 = list.map((it) => {
        return {
          name: it.name.replace('22', '33'),
          model: it.model.replace('22', '33')
        }
      })
    },
    randomTexture (type) {
      const list = textures.filter((it) => {
        return it.indexOf('texture_0' + type) > 0
      })
      const idx = Math.random() * list.length | 0
      return list[idx]
    },
    random (type) {
      const url = location.origin + '/static/haruna/' + type
      const model = {
        type: 'Live2D Model Setting',
        name: type + '-random-model',
        label: type,
        model: url + '/' + type + '.v2.moc',
        textures: [
          url + '/' + type + '.1024/closet.default.v2/texture_00.png',
          url + '/' + type + '.1024/' + this.randomTexture(1),
          url + '/' + type + '.1024/' + this.randomTexture(2),
          url + '/' + type + '.1024/' + this.randomTexture(3)
        ],
        layout: { center_x: 0, center_y: 0.1, width: 2.3, height: 2.3 },
        motions: {
          idle: [
            {
              file: url + '/motions/' + type + '.v2.idle-01.mtn',
              fade_in: 2000,
              fade_out: 2000
            },
            {
              file: url + '/motions/' + type + '.v2.idle-02.mtn',
              fade_in: 2000,
              fade_out: 2000
            },
            {
              file: url + '/motions/' + type + '.v2.idle-03.mtn',
              fade_in: 100,
              fade_out: 100
            }
          ],
          tap_body: [
            {
              file: url + '/motions/' + type + '.v2.touch.mtn',
              fade_in: 500,
              fade_out: 200
            }
          ],
          thanking: [
            {
              file: url + '/motions/' + type + '.v2.thanking.mtn',
              fade_in: 2000,
              fade_out: 2000
            }
          ]
        }
      }
      var blob = new Blob([JSON.stringify(model)], {type: 'application/json'})
      return URL.createObjectURL(blob)
    },
    randomModel (type) {
      this.init(this.random(type))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.not-found {
  padding-top: 80px;
  padding-left: 50px;
}
h1 {
  font-size: 32px;
  text-align: left;
  color: #2ac4ea;
}
h2 {
  font-size: 40px;
  padding-left: 80px;
  color: #2ac4ea;
}
</style>
