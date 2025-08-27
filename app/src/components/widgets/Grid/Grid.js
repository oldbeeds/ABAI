export class Grid {
  constructor({ records, onLocate }) {
    this.el = document.createElement('div')
    this.el.innerHTML = `
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px;">Actions</th>
            <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px;">Status</th>
            <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px;">Priority</th>
            <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px;">Problem</th>
            <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px;">Date</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(r => `
            <tr>
              <td style="padding:8px;">
                ${r.lat != null && r.lng != null ? `<button data-id="${r.defect_Id}" class="locate">📍</button>` : ''}
              </td>
              <td style="padding:8px;">${r.status ?? ''}</td>
              <td style="padding:8px;">${r.priority ?? ''}</td>
              <td style="padding:8px;">${r.problem ?? ''}</td>
              <td style="padding:8px;">${r.date ?? ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
    this.el.querySelectorAll('.locate').forEach(btn => btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.getAttribute('data-id'))
      const rec = records.find(x => x.defect_Id === id)
      if (rec) onLocate(rec)
    }))
  }
}