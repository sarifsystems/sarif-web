var flattenObject = function (ob) {
  var toReturn = {}

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if (Object.prototype.toString.call(ob[i]) === '[object Object]') {
      var flatObject = flattenObject(ob[i])
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

export default {
  aggregateMessages (msgs) {
    var prefixCount = {}

    for (var i = 0; i < msgs.length; i++) {
      var msg = msgs[i]
      if (!msg.action) {
        continue
      }

      var parts = msg.action.split('/')
      var action = ''
      for (var j = 0; j < parts.length; j++) {
        action += (j > 0 ? '/' : '') + parts[j]
        prefixCount[action] = (prefixCount[action] || 0) + 1
      }
    }

    var byPrefix = {}
    for (i = 0; i < msgs.length; i++) {
      msg = msgs[i]
      if (!msg.action) {
        continue
      }

      parts = msg.action.split('/')
      action = ''
      for (j = 0; j < parts.length; j++) {
        var suffix = (j > 0 ? '/' : '') + parts[j]
        if (prefixCount[action + suffix] === 1) {
          break
        }
        action += suffix
      }
      if (action === '') {
        continue
      }
      byPrefix[action] = byPrefix[action] || []
      byPrefix[action].push(msg)
    }

    return byPrefix
  },

  flattenObject
}
