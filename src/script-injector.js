console.info('custom trading view has started')

const script = document.createElement('script')
const rootElement = document.head || document.documentElement

script.src = chrome.runtime.getURL('bundle.js')
rootElement.appendChild(script)
