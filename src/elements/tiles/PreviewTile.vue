<template>
  <div class="preview-tile">
    <img v-if="content && content.type.startsWith('image/')" :src="content.url" />

    <div class="attachment" v-for="attach in attachments">
      <div class="author" v-if="attach.author_name">
        <img class="icon" v-if="attach.author_icon" :src="attach.author_icon" />
        <a v-if="attach.author_link" :href="attach.author_link" target="_blank">{{ attach.author_name }}</a>
        <span v-else>{{ attach.author_name }}</span>
      </div>

      <div class="title" v-if="attach.title">
        <a v-if="attach.title_link" :href="attach.title_link" target="_blank">{{ attach.title }}</a>
        <span v-else>{{ attach.title }}</span>
      </div>
      <div class="text" v-if="attach.text">{{ attach.text }}</div>

      <div class="fields" v-if="attach.fields">
        <div class="field" v-for="field in attach.fields" v-bind:class="{'short': short}">
          <div class="field-title">{{field.title}}</div>
          <div class="field-value">{{field.value}}</div>
        </div>
      </div>

      <img class="image" v-if="attach.image_url" :src="attach.image_url" />

      <div class="footer" v-if="attach.footer">
        <img class="icon" v-if="attach.footer_icon" :src="attach.footer_icon" />
        <a v-if="attach.footer_link" :href="attach.footer_link">{{ attach.footer }}</a>
        <span v-else>{{ attach.footer }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.preview-tile {
  text-align: center;
}
.preview-tile img {
  object-fit: contain;
  width: 360px;
  max-height: 500px;
}
.expanded .preview-tile img {
  width: 100%;
  max-height: none;
}

.preview-tile .attachment {
  text-align: left;
}

.preview-tile .attachment .author,
.preview-tile .attachment .footer,
.preview-tile .attachment .title,
.preview-tile .attachment .text,
.preview-tile .attachment .fields {
  padding: 4px 10px;
}

.preview-tile .attachment .author,
.preview-tile .attachment .footer {
  color: #aaa;
}

.preview-tile .attachment .footer {
  font-size: 13px;
}

.preview-tile .attachment .title {
  font-weight: bold;
}

.preview-tile .attachment .image {
  max-width: 400px;
  max-height: 500px;
  object-fit: contain;
}

.preview-tile .fields {
  display: flex;
  justify-content: space-around;
}

.preview-tile .fields .short {
  flex: 1;
}

.preview-tile .field-title {
  font-weight: bold;
}

.preview-tile .icon {
  max-width: 16px;
  max-height: 16px;
  object-fit: contain;
}

.preview-tile .thumb {
  max-width: 75px;
  max-height: 75px;
  object-fit: contain;
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
      attachments: []
    }
  },

  methods: {
    updateContent () {
      if (this.data.payload.attachments && this.data.payload.attachments.length > 0) {
        this.attachments = this.data.payload.attachments
        return
      }

      var contents = []
      findContent(this.data.payload, contents)
      if (contents.length > 0 && contents[0].url.startsWith('image/')) {
        this.attachments = [{
          image_url: contents[0].url
        }]
      }
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

