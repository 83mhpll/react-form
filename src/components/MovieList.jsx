export default function MovieList({ items = [] }) {
    if (!items.length) {
      return (
        <div className="p-4 text-sm text-slate-600">
          ไม่พบข้อมูลที่ตรงกับคำค้นหา
        </div>
      );
    }
  
    return (
      <ul className="divide-y rounded-2xl overflow-hidden bg-white shadow">
        {items.map((m, idx) => (
          <li key={`${m.title}-${idx}`} className="p-4 hover:bg-slate-50">
            <div className="text-base font-semibold">{m.title}</div>
            <div className="text-sm text-slate-600">
              ปี {m.year} • ผู้กำกับ {m.director}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  