import { useState } from "react";

const initial = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  birthdate: "",
  province: "",
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(null);

  const provinces = [
    "กรุงเทพมหานคร",
    "เชียงใหม่",
    "เชียงราย",
    "ขอนแก่น",
    "นครราชสีมา",
    "ภูเก็ต",
  ];

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "โปรดใส่ชื่อ";
    if (!form.lastName.trim()) e.lastName = "โปรดใส่นามสกุล";

    if (!form.email.trim()) e.email = "โปรดใส่อีเมล";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "รูปแบบอีเมลไม่ถูกต้อง";

    if (!form.phone.trim()) e.phone = "โปรดใส่เบอร์โทร";
    else if (!/^\d{9,10}$/.test(form.phone))
      e.phone = "เบอร์โทรต้องเป็นตัวเลข 9–10 หลัก";

    if (!form.gender) e.gender = "โปรดเลือกเพศ";
    if (!form.birthdate) e.birthdate = "โปรดระบุวันเกิด";
    if (!form.province) e.province = "โปรดเลือกจังหวัด";

    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSaved(form);
      setForm(initial);
    }
  };

  const onChange = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleReset = () => {
    setForm(initial);   
    setErrors({});      
    setSaved(null);     
   
  };

  const inputCls =
    "border rounded-xl px-3 py-2 outline-none focus:ring w-full";

  return (
    <div id="user-form" className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-3">แบบฟอร์มผู้ใช้งาน</h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">ชื่อ *</label>
            <input
              className={inputCls}
              placeholder="เช่น ณัฐ"
              value={form.firstName}
              onChange={onChange("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">นามสกุล *</label>
            <input
              className={inputCls}
              placeholder="เช่น ชัยชนะ"
              value={form.lastName}
              onChange={onChange("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">อีเมล *</label>
            <input
              type="email"
              className={inputCls}
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">เบอร์โทร *</label>
            <input
              className={inputCls}
              placeholder="เช่น 0912345678"
              value={form.phone}
              onChange={onChange("phone")}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">เพศ *</label>
            <select
              className={inputCls}
              value={form.gender}
              onChange={onChange("gender")}
            >
              <option value="">-- เลือก --</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่น ๆ</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">วันเกิด *</label>
            <input
              type="date"
              className={inputCls}
              value={form.birthdate}
              onChange={onChange("birthdate")}
            />
            {errors.birthdate && (
              <p className="text-red-600 text-sm mt-1">{errors.birthdate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">จังหวัด *</label>
            <select
              className={inputCls}
              value={form.province}
              onChange={onChange("province")}
            >
              <option value="">-- เลือก --</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="text-red-600 text-sm mt-1">{errors.province}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-2xl px-4 py-2 bg-slate-900 text-white hover:opacity-90"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl px-4 py-2 border border-slate-300 hover:bg-slate-100"
          >
            รีเซ็ต
          </button>
        </div>
      </form>

      {saved && (
        <div className="mt-4 rounded-xl border p-3 bg-slate-50">
          <div className="font-medium mb-1">ตัวอย่างข้อมูลที่บันทึก</div>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(saved, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

