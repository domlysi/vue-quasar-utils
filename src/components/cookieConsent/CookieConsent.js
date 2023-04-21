import {Cookies} from 'quasar'

class CookieConsentCls {
  cookieScripts = []
  isProcessed = false

  getAll() {
    return this.cookieScripts
  }

  add(cookieScript) {
    this.cookieScripts.push(cookieScript)
  }

  removeNotRequiredCookies() {
    this.cookieScripts.forEach(item => {
      if (!item.required) {
        item.removeCookie()
      }
    })
  }

  processScripts() {
    if (this.isProcessed) return
    this.cookieScripts.forEach(item => {
      // if cookie is essential: set true
      if (item.required || item.isActive()) {
        item.onAccept()
      } else {
        item.onDecline()
      }
    })
    this.isProcessed = true
  }

  init() {
    if (!Cookies.get('cookieConsentDialog')) return
    this.processScripts()
  }

  accept({all}) {
    if (!Cookies.has('cookieConsentDialog')) {
      Cookies.set('cookieConsentDialog', true, {path: '/', sameSite: "Lax", expires: 90},)
    }

    // set all cookies separately true
    if (all) {
      this.cookieScripts.forEach(item => {
        item.setCookie(true)
      })
    }

    this.processScripts()
  }
}

class CookieScript {
  name
  description
  label
  slug
  required

  constructor({name, slug, description, label, onAccept, onDecline, required}) {
    this.name = name
    this.slug = slug
    this.required = required
    this.description = description
    this.label = label
    this.onAccept = onAccept || function () {
    }
    this.onDecline = onDecline || this.onDecline
  }

  isActive() {
    if (!this.slug) {
      throw new Error('no slug set')
    }
    const cookie = Cookies.get(this.slug)
    return !!cookie
  }

  setCookie(val) {
    if (!this.slug) {
      throw new Error('no slug set')
    }
    return Cookies.set(this.slug, val, {path: '/', sameSite: "Lax"},)
  }

  removeCookie() {
    if (!this.slug) {
      throw new Error('no slug set')
    }
    Cookies.remove(this.slug)
  }

  onAccept() {
  }

  onDecline() {
  }
}

export const cookieConsent = new CookieConsentCls()

export default {
  cookieConsent,
  CookieScript
}
