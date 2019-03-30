console.log('custom trading view has started')

const script = document.createElement('script')

script.src = chrome.runtime.getURL('bundle.js')
script.onload = function() {
  this.remove()
};
(document.head || document.documentElement).appendChild(script);
