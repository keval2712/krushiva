'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const units = ['KG', 'QUINTAL', 'TON', 'PIECE', 'DOZEN', 'LITER', 'BAG', 'BUNDLE'];
const categories = [
  'Cereals', 'Vegetables', 'Fruits', 'Pulses', 'Spices', 'Oilseeds', 'Cotton', 'Dairy', 'Other'
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', categoryId: '', description: '',
    quantity: '', unit: 'QUINTAL', pricePerUnit: '',
    harvestDate: '', city: '', state: '', district: '',
    isOrganic: false, certifications: [] as string[],
    tags: [] as string[],
  });
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.categoryId) errs.categoryId = 'Category is required';
    if (!form.quantity || parseFloat(form.quantity) <= 0) errs.quantity = 'Valid quantity required';
    if (!form.pricePerUnit || parseFloat(form.pricePerUnit) <= 0) errs.pricePerUnit = 'Valid price required';
    return errs;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    return errs;
  };

  const handleNext = () => {
    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    if (step === 2) {
      const errs = validateStep2();
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    router.push('/farmer/products');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <Link href="/farmer/products" className="btn btn-ghost btn-icon btn-sm">←</Link>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
            Add New Product
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>List your produce on the marketplace</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 'var(--space-8)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        {[
          { n: 1, label: 'Product Details' },
          { n: 2, label: 'Location' },
          { n: 3, label: 'Photos' },
          { n: 4, label: 'Review' },
        ].map((s, i) => (
          <div key={s.n} style={{
            flex: 1, padding: 'var(--space-4)',
            background: step === s.n ? 'var(--color-primary)' : step > s.n ? 'var(--color-primary-50)' : 'transparent',
            color: step === s.n ? 'white' : step > s.n ? 'var(--color-primary)' : 'var(--color-text-muted)',
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            borderRight: i < 3 ? '1px solid var(--color-border)' : 'none',
            fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
            transition: 'all 200ms',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: step === s.n ? 'rgba(255,255,255,0.2)' : step > s.n ? 'var(--color-primary)' : 'var(--color-surface-3)',
              color: step === s.n ? 'white' : step > s.n ? 'white' : 'var(--color-text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 'bold', flexShrink: 0,
            }}>
              {step > s.n ? '✓' : s.n}
            </div>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)' }}>
        {/* Step 1: Product Details */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Product Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div className="form-group">
                <label className="form-label required" htmlFor="name">Product Name</label>
                <input id="name" name="name" className={`input input-lg ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Wheat Grade A, Organic Tomato" value={form.name} onChange={handleChange} />
                {errors.name && <span className="form-error">⚠ {errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label required" htmlFor="categoryId">Category</label>
                <select id="categoryId" name="categoryId" className={`input input-lg select ${errors.categoryId ? 'input-error' : ''}`} value={form.categoryId} onChange={handleChange}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                </select>
                {errors.categoryId && <span className="form-error">⚠ {errors.categoryId}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label required" htmlFor="quantity">Available Quantity</label>
                  <input id="quantity" name="quantity" type="number" min={0} className={`input input-lg ${errors.quantity ? 'input-error' : ''}`}
                    placeholder="e.g. 100" value={form.quantity} onChange={handleChange} />
                  {errors.quantity && <span className="form-error">⚠ {errors.quantity}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label required" htmlFor="unit">Unit</label>
                  <select id="unit" name="unit" className="input input-lg select" value={form.unit} onChange={handleChange}>
                    {units.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required" htmlFor="pricePerUnit">Price per {form.unit} (₹)</label>
                <div className="input-group">
                  <span className="input-icon" style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>₹</span>
                  <input id="pricePerUnit" name="pricePerUnit" type="number" min={0} className={`input input-lg ${errors.pricePerUnit ? 'input-error' : ''}`}
                    placeholder="0.00" value={form.pricePerUnit} onChange={handleChange} />
                </div>
                {errors.pricePerUnit && <span className="form-error">⚠ {errors.pricePerUnit}</span>}
                {form.quantity && form.pricePerUnit && (
                  <span className="form-hint">
                    Total value: ₹{(parseFloat(form.quantity) * parseFloat(form.pricePerUnit)).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="harvestDate">Harvest Date</label>
                <input id="harvestDate" name="harvestDate" type="date" className="input input-lg" value={form.harvestDate} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea id="description" name="description" className="textarea" rows={4}
                  placeholder="Describe your product — quality, grade, growing method, etc."
                  value={form.description} onChange={handleChange} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
                <input type="checkbox" id="isOrganic" name="isOrganic" checked={form.isOrganic}
                  onChange={e => setForm({ ...form, isOrganic: e.target.checked })} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                <label htmlFor="isOrganic" style={{ cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                  🌿 This is an organic product (certified/uncertified)
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Pickup Location</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label required" htmlFor="state">State</label>
                  <input id="state" name="state" className={`input input-lg ${errors.state ? 'input-error' : ''}`}
                    placeholder="e.g. Rajasthan" value={form.state} onChange={handleChange} />
                  {errors.state && <span className="form-error">⚠ {errors.state}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label required" htmlFor="city">City / Taluka</label>
                  <input id="city" name="city" className={`input input-lg ${errors.city ? 'input-error' : ''}`}
                    placeholder="e.g. Ajmer" value={form.city} onChange={handleChange} />
                  {errors.city && <span className="form-error">⚠ {errors.city}</span>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="district">District</label>
                <input id="district" name="district" className="input input-lg"
                  placeholder="District name" value={form.district} onChange={handleChange} />
              </div>
              <div className="alert alert-info">
                <span>📍</span>
                <span>Your approximate location helps buyers find your produce. Exact address is shared only after order confirmation.</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Product Photos</h2>
            <div className="dropzone" style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>📸</div>
              <div style={{ fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)' }}>Upload Product Photos</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                Drag & drop or click to upload. Max 10 photos. JPG, PNG up to 10MB each.
              </div>
              <button className="btn btn-outline btn-sm" id="btn-upload-photos">Choose Photos</button>
            </div>
            <div className="alert alert-info">
              <span>💡</span>
              <span>Products with 3+ clear photos get <strong>47% more buyer inquiries</strong>. Show the product from multiple angles.</span>
            </div>
            <div style={{ marginTop: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', color: 'var(--color-text-tertiary)' }}>PHOTO TIPS</h3>
              {['Take photos in natural daylight', 'Show the full quantity or a representative sample', 'Include close-up of quality/grade', 'Add a scale/measuring reference if possible'].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ color: 'var(--color-success)' }}>✓</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Review & Publish</h2>
            <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', marginBottom: 'var(--space-2)' }}>{form.name || '—'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                {[
                  { label: 'Category', value: form.categoryId || '—' },
                  { label: 'Quantity', value: form.quantity ? `${form.quantity} ${form.unit}` : '—' },
                  { label: 'Price', value: form.pricePerUnit ? `₹${parseFloat(form.pricePerUnit).toLocaleString()}/${form.unit}` : '—' },
                  { label: 'Location', value: form.city && form.state ? `${form.city}, ${form.state}` : '—' },
                  { label: 'Harvest Date', value: form.harvestDate || '—' },
                  { label: 'Organic', value: form.isOrganic ? 'Yes 🌿' : 'No' },
                ].map(d => (
                  <div key={d.label}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>{d.label}</div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', textTransform: 'capitalize' }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="alert alert-success">
              <span>✅</span>
              <span>Your listing will go live immediately and be visible to <strong>5,000+ buyers</strong> on the marketplace.</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', justifyContent: 'space-between' }}>
          {step > 1 ? (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Back</button>
          ) : (
            <div />
          )}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {step < 4 ? (
              <>
                <button className="btn btn-ghost" id={`btn-save-draft-step${step}`} onClick={() => router.push('/farmer/products')}>Save Draft</button>
                <button className="btn btn-primary" id={`btn-next-step${step}`} onClick={handleNext}>Continue →</button>
              </>
            ) : (
              <button className={`btn btn-primary btn-lg ${loading ? 'btn-loading' : ''}`} id="btn-publish-product" onClick={handleSubmit} disabled={loading}>
                {loading ? '' : '🚀 Publish Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
