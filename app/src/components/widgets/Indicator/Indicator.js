export class Indicator {
  constructor({ count, label }) {
    this.el = document.createElement('div')
    this.el.style = 'padding:16px; font: 600 18px/1.2 system-ui'
    this.el.textContent = `${count} ${label}`
  }
}