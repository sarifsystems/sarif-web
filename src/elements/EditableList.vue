<template>
  <div v-if="!editing" v-on:click="edit()">
    <ul>
      <li v-for="(entry, index) in entries" v-bind:key="index">{{ entry.text }}</li>
    </ul>
  </div>
  <div v-else>
    <ul>
      <li v-for="(entry, index) in draft" v-bind:key="index">
        <input type="text" v-model="entry.text" />
      </li>
      <li>
        <input type="text" v-model="newEntry" v-on:blur="addEntry()"
          v-on:keyup.enter="addEntry()" />
      </li>
    </ul>

    <button v-on:click="cancel()">Cancel</button>
    <button v-on:click="save()">Save</button>
  </div>
</template>

<script>
export default {
  props: {
    entries: { default: [] }
  },

  data () {
    return {
      draft: [],
      newEntry: '',
      editing: false
    }
  },

  methods: {
    edit () {
      this.editing = true
      this.draft = this.entries.slice(0)
      this.newEntry = ''
    },

    save () {
      this.editing = false
      this.addEntry()
      this.entries.length = 0
      Array.prototype.push.apply(this.entries,
        this.draft.filter((n) => { return !!n }))
    },

    cancel () {
      this.editing = false
    },

    addEntry () {
      if (this.newEntry) {
        this.draft.push({text: this.newEntry})
      }
      this.newEntry = ''
    }
  }
}
</script>
