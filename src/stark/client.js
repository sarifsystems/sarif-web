function StarkClient(host, deviceId) {
  this.host = host;
  this.deviceId = deviceId;
  this.replyHandlers = {};
  this.pubQueue = [];

  if ((typeof host == "object") && (typeof host.NewSocketConn == "function")) {
      this.socket = host.NewSocketConn()
  } else {
	  this.socket = new WebSocket("ws://" + host + "/stream/stark");
  }
  var client = this

  this.socket.onopen = function() {
    console.log('open');
    client.subscribe("ping", "");
    client.subscribe("", "self");

    var raw;
    while (raw = client.pubQueue.pop()) {
      console.log("publishq", raw);
      this.send(raw);
    }
    if (client.onOpen) {
      client.onOpen();
    }
  }

  this.socket.onmessage = function(raw) {
    console.log("receive", raw.data);
    var msg = JSON.parse(raw.data);

    if (msg.action == "ping") {
      client.publish({
        action: "ack",
        dst: msg.src,
        corr: msg.id,
      });
    }
    if (msg.corr) {
      var handler = client.replyHandlers[msg.corr]
      if (handler) {
        return handler(msg)
      }
    }
    if (client.onMessage) {
      client.onMessage(msg);
    }
  }

  this.socket.onclose = function() {
    if (client.onClose) {
      client.onClose();
    }
    console.log('closed');
  }
}

StarkClient.prototype.publish = function(msg) {
  msg.stark = msg.stark || "0.5"
  msg.id = msg.id || generateId()
  msg.src = msg.src || this.deviceId

  var raw = JSON.stringify(msg);
  if (this.socket.readyState != WebSocket.OPEN) {
    this.pubQueue.push(raw);
    return;
  }
  console.log("publish", raw);
  this.socket.send(raw);
}

StarkClient.prototype.subscribe = function(action, device) {
  if (!device) {
    this.subscribe(action, this.deviceId)
  }
  var msg = {
    action: "proto/sub",
    p: {
      action: action
    }
  }
  if (device) {
    msg.p.device = (device == "self" ? this.deviceId : device)
  }
  this.publish(msg)
}

StarkClient.prototype.request = function(msg, onReply) {
  msg.id = msg.id || generateId()
  this.replyHandlers[msg.id] = onReply;
  var client = this
  window.setTimeout(function() {
    delete client.replyHandlers[msg.id];
  }, 300000)
  return this.publish(msg)
}

function generateId() {
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var text = "";
  for( var i = 0; i < 8; i++ )
  text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

if (typeof module != "undefined") {
  module.exports = StarkClient
}
