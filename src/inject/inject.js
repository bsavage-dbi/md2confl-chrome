chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method == 'getSelection') {
    const iframe = document.getElementById('wysiwygTextarea_ifr')
    const text = iframe.contentDocument.getSelection().toString()

    sendResponse({data: text})
  } else {
    sendResponse({})
  }
  return true
})