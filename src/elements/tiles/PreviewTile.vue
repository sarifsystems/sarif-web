<template>
  <div class="preview-tile">
    <img v-if="content && content.type.startsWith('image/')" :src="content.url" />
  </div>
</template>

<style>
.preview-tile {
  text-align: center;
}
.preview-tile img {
  object-fit: cover;
  width: 360px;
  max-height: 500px;
}
.expanded .preview-tile img {
  width: 100%;
  max-height: none;
}
</style>

<script>
function findContent (v, contents) {
  if (v instanceof Array) {
    for (var i = 0; i < v.length; i++) {
      findContent(v[i], contents)
    }
    return
  }

  if (typeof v === 'object') {
    if (v.url && v.type) {
      contents.push({
        url: v.url,
        type: v.type
      })
    }
    for (var key in v) {
      findContent(v[key], contents)
    }
  }
}

export default {
  props: ['data'],

  data () {
    return {
      contents: [],
      content: null
    }
  },

  methods: {
    updateContent () {
      var contents = []
      findContent(this.data.payload, contents)
      console.log(contents)
      console.log('sumthings')
      this.content = (contents.length > 0 ? contents[0] : null)
      this.contents = contents
    }
  },

  watch: {
    'data.payload': function () {
      this.updateContent()
    }
  },

  ready () {
    this.updateContent()
  }
}

