import md2conf from '../../node_modules/md2conf/index.js'

chrome.contextMenus.create({
  id: 'md2confl',
  title: 'md2confl',
  type: 'normal',
  contexts: ['selection']
})

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab) {
    copy(tab)
  }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab) {
    if (info.menuItemId === 'md2confl') {
      copy(tab)
    }
  }
})

function copy(tab) {
  chrome.tabs.sendMessage(tab.id, {method: 'getSelection'}, (res) => {
    if (res) {
      const textArea = document.createElement('textarea')
      textArea.style.cssText = 'position:absolute;left:-100%'

      document.body.appendChild(textArea)
      console.log(md2conf(res.data))

      textArea.value = md2conf(res.data)
      textArea.select()
      document.execCommand('copy')

      document.body.removeChild(textArea)
    }
  })
}