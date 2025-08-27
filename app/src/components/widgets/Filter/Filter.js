export class Filter {
  constructor({ onChange, records }) {
    this.onChange = onChange
    const statuses = [...new Set(records.map(r => r.status).filter(Boolean))]
    const priorities = [...new Set(records.map(r => r.priority).filter(Boolean))]

    this.el = document.createElement('div')
    this.el.innerHTML = `
      <label>Status <select id="f-status"><option value="">All</option>${statuses.map(s=>`<option>${s}</option>`).join('')}</select></label>
      <label>Priority <select id="f-priority"><option value="">All</option>${priorities.map(s=>`<option>${s}</option>`).join('')}</select></label>
      <label>Problem <input id="f-problem" placeholder="contains..."></label>
    `
    const fire = () => this.onChange({
      status: this.el.querySelector('#f-status').value,
      priority: this.el.querySelector('#f-priority').value,
      problem: this.el.querySelector('#f-problem').value
    })
    this.el.querySelector('#f-status').addEventListener('change', fire)
    this.el.querySelector('#f-priority').addEventListener('change', fire)
    this.el.querySelector('#f-problem').addEventListener('input', fire)
  }
}