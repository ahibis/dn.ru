var port = chrome.extension.connect({
      name: "Sample Communication"
 });
$('#bt1').click(function(){port.postMessage(0);})
$('#bt2').click(function(){port.postMessage(1);})
$('#bt3').click(function(){port.postMessage(document.getElementById('pk').value);})
 port.onMessage.addListener(function(msg) {
      document.getElementById('pk').value=msg;
 });