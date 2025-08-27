// TS-convertible, no TS syntax yet.
import { Indicator } from './components/widgets/Indicator/Indicator.js'
import { Filter } from './components/widgets/Filter/Filter.js'
import { Grid } from './components/widgets/Grid/Grid.js'
import { MapView } from './components/widgets/Map/Map.js'
import { DefectForm } from './components/widgets/Form/Form.js'

export class App {
  constructor(opts) {
    this.mount = opts.mount
    this.config = opts.config
    this.state = { route: '#/home', data: { defects: [] }, filters: {} }
    window.addEventListener('hashchange', () => this._route())
  }

  async start() {
    await this._route()
  }

  async _route() {
    const hash = location.hash || '#/home'
    if (hash.startsWith('#/home')) {
      await this._renderHome()
    } else {
      this.mount.innerHTML = '<p>Not found</p>'
    }
  }

  async _fetchDefects() {
    const res = await fetch(`${this.config.apiBaseUrl}/api/defects`)
    const list = await res.json()
    this.state.data.defects = list
  }

  _applyFilters(records) {
    const f = this.state.filters || {}
    return records.filter(r => {
      const sOk = !f.status || r.status === f.status
      const pOk = !f.priority || r.priority === f.priority
      const probOk = !f.problem || r.problem?.toLowerCase().includes(f.problem.toLowerCase())
      return sOk && pOk && probOk
    })
  }

  async _renderHome() {
    await this._fetchDefects()
    const defects = this._applyFilters(this.state.data.defects)

    // components
    const indicator = new Indicator({ count: defects.length, label: 'Defects' })
    const filter = new Filter({
      onChange: (filters) => {
        this.state.filters = filters
        this._renderHome()
      },
      records: this.state.data.defects
    })
    const grid = new Grid({
      records: defects,
      onLocate: (rec) => {
        this._map?.centerOn(rec)
      }
    })
    this._map = new MapView({ records: defects })
    const form = new DefectForm({ apiBaseUrl: this.config.apiBaseUrl, onSaved: () => this._renderHome() })

    this.mount.innerHTML = `
      <div style="display:grid; gap:12px; grid-template-columns: 1fr;">
        <section id="indicator"></section>
        <section id="filter"></section>
        <section id="grid" style="min-height:240px; border:1px solid #ddd;"></section>
        <section id="map" style="min-height:320px; border:1px solid #ddd;"></section>
        <section id="form" style="border:1px solid #ddd; padding:12px;"></section>
      </div>
    `

    document.getElementById('indicator').appendChild(indicator.el)
    document.getElementById('filter').appendChild(filter.el)
    document.getElementById('grid').appendChild(grid.el)
    document.getElementById('map').appendChild(this._map.el)
    document.getElementById('form').appendChild(form.el)
  }
}
