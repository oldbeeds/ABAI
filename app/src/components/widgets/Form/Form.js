export class DefectForm {
  constructor({ apiBaseUrl, onSaved }) {
    this.apiBaseUrl = apiBaseUrl
    this.onSaved = onSaved
    this.el = document.createElement('form')
    this.el.innerHTML = `
      <div style="display:grid; gap:8px; grid-template-columns: repeat(2, 1fr);">
        <label>Status <input id="df-status"></label>
        <label>Priority <input id="df-priority"></label>
        <label>Problem <input id="df-problem" style="grid-column: 1 / -1;"></label>
        <label>Date <input id="df-date" type="date"></label>
        <label>Lat <input id="df-lat" type="number" step="any"></label>
        <label>Lng <input id="df-lng" type="number" step="any"></label>
        <div style="grid-column: 1 / -1;">
          <button type="submit">Add Defect</button>
        </div>
      </div>
    `
    this.el.addEventListener('submit', async (e) => {
      e.preventDefault()
      const body = {
        status: this.el.querySelector('#df-status').value,
        priority: this.el.querySelector('#df-priority').value,
        problem: this.el.querySelector('#df-problem').value,
        date: this.el.querySelector('#df-date').value,
        lat: this.el.querySelector('#df-lat').value ? Number(this.el.querySelector('#df-lat').value) : null,
        lng: this.el.querySelector('#df-lng').value ? Number(this.el.querySelector('#df-lng').value) : null,
      }
      // This demo does not include POST endpoint yet.
      alert('Stub: would POST to API with ' + JSON.stringify(body))
      this.onSaved?.()
      this.el.reset()
    })
  }
}