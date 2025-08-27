export class MapView {
  constructor({ records }) {
    this.el = document.createElement('div')
    this.el.style = 'height:320px; display:flex; align-items:center; justify-content:center; font: 14px system-ui;'
    this.records = records
    this.el.textContent = `Map placeholder — ${records.filter(r => r.lat != null && r.lng != null).length} markers`
  }
  centerOn(rec) {
    this.el.textContent = `Centered on (${rec.lat}, ${rec.lng})`
  }
}