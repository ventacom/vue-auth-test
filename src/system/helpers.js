export const capsLock = function (event) {
  const keyCode = event.keyCode ? event.keyCode : event.which
  const shiftKey = event.shiftKey ? event.shiftKey : keyCode === 16
  return ((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey)
}

export const capsLockAlt = function (event) {
  const n = event.keyCode ? event.keyCode : event.charCode
  const c = String.fromCharCode(n)
  const cUC = c.toUpperCase()
  const cLC = c.toLowerCase()
  return (event.shiftKey && cLC === c) || (!event.shiftKey && cUC === c)
}
export const uploadProgress = function (progressEvent) {
  return parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
}
export const fileUpload = function (file, callback) {
  // const file = fileNew || fileOld
  const reader = new window.FileReader()

  reader.onload = (e) => {
    callback(e.target.result)
  }
  if (file) {
    reader.readAsDataURL(file)
  }
}
