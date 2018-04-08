export const localStorage = {
  setItem (key, data = {}) {
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  getItem (key) {
    const data = window.localStorage.getItem(key)
    try {
      return JSON.parse(data) || {}
    } catch (e) {
      return data || {}
    }
  },
  removeItem (key) {
    return window.localStorage.removeItem(key)
  },
  hasItem (key) {
    return !!window.localStorage.getItem(key)
  },
  updateItem (key, data = {}) {
    return localStorage.setItem(key, Object.assign(localStorage.getItem(key), data))
  },
  addkey (key, childrenKey, data = {}) {
    const list = localStorage.getItem(key)
    list[childrenKey] = data
    return localStorage.setItem(key, list)
  },
  removeChilerenKey (key, childrenKey) {
    const data = localStorage.getItem(key)
    if (delete data[childrenKey]) {
      localStorage.setItem(key, data)
      return true
    }
    return false
  },
  updateChilerenKey (key, childrenKey, value) {
    const data = localStorage.getItem(key)
    data[childrenKey] = value
    return localStorage.setItem(key, data)
  },
  clear () {
    return window.localStorage.clear()
  },
  key (index) {
    return window.localStorage.key(index)
  }
}
export const sessionStorage = {
  setItem (key, data = {}) {
    window.sessionStorage.setItem(key, JSON.stringify(data))
  },
  getItem (key) {
    const data = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(data) || {}
    } catch (e) {
      return data || {}
    }
  },
  hasItem (key) {
    return !!window.sessionStorage.getItem(key)
  },
  removeItem (key) {
    return window.sessionStorage.removeItem(key)
  },
  removeChilerenKey (key, childrenKey) {
    const data = sessionStorage.getItem(key)
    if (delete data[childrenKey]) {
      sessionStorage.setItem(key, data)
      return true
    }
    return false
  },
  updateChilerenKey (key, childrenKey, value) {
    const data = sessionStorage.getItem(key)
    data[childrenKey] = value
    return sessionStorage.setItem(key, data)
  },
  addkey (key, childrenKey, data = {}) {
    const list = sessionStorage.getItem(key)
    list[childrenKey] = data
    return sessionStorage.setItem(key, list)
  },
  clear () {
    return window.sessionStorage.clear()
  },
  key (index) {
    return window.sessionStorage.key(index)
  }
}
