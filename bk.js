 chrome.extension.onConnect.addListener(function(port) {
      port.onMessage.addListener(function(msg) {
           if (msg==0){localStorage['ddat']='{"ch":{},"nl":{},"nr":{}}';}else
           if (msg==1){port.postMessage(localStorage['ddat']);}else
           {localStorage['ddat']=msg}
      });
 })