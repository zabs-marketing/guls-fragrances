'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormValues } from '@/lib/validators';
import {
  Plus, Pencil, Trash2, X, Package, Loader2, ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import ImageUpload from '@/components/admin/ImageUpload';

interface CategoryOption {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  stockQuantity: number;
  categoryId: number;
  imageURL: string | null;
  topNote: string | null;
  heartNote: string | null;
  baseNote: string | null;
  ingredients: string | null;
  isSpecialEdition: boolean;
  specialEditionType: string | null;
  category: { id: number; name: string };
}

// ─── Form field helpers ─────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
  className = '',
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all';

// ─── Product Form Modal ─────────────────────────────────────────────────────
interface ProductFormModalProps {
  product?: Product;
  categories: CategoryOption[];
  onClose: () => void;
  onSuccess: () => void;
}

function ProductFormModal({ product, categories, onClose, onSuccess }: ProductFormModalProps) {
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      brand: product?.brand ?? '',
      description: product?.description ?? '',
      price: product?.price?.toString() ?? '',
      stockQuantity: product?.stockQuantity?.toString() ?? '0',
      categoryId: product?.categoryId?.toString() ?? '',
      imageURL: product?.imageURL ?? '',
      topNote: product?.topNote ?? '',
      heartNote: product?.heartNote ?? '',
      baseNote: product?.baseNote ?? '',
      ingredients: product?.ingredients ?? '',
      isSpecialEdition: product?.isSpecialEdition ?? false,
      specialEditionType: product?.specialEditionType ?? '',
    },
  });

  const isSpecialEdition = watch('isSpecialEdition');

  const onSubmit = async (data: ProductFormValues) => {
    setServerError('');
    const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
    const method = product ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      onSuccess();
    } else {
      const json = await res.json();
      if (typeof json.error === 'object') {
        setServerError(Object.values(json.error).flat().join(' '));
      } else {
        setServerError(json.error ?? 'Something went wrong');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {product ? 'Edit Product' : 'New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-100 text-sm text-red-600 rounded-lg">
              {serverError}
            </div>
          )}

          {/* Section: Basic Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product Name" error={errors.name?.message} className="sm:col-span-2">
                <input {...register('name')} placeholder="e.g. Laizon Edition" className={inputCls} />
              </Field>
              <Field label="Brand" error={errors.brand?.message}>
                <input {...register('brand')} placeholder="e.g. Gul's Collection" className={inputCls} />
              </Field>
              <Field label="Category" error={errors.categoryId?.message}>
                <div className="relative">
                  <select {...register('categoryId')} className={`${inputCls} appearance-none pr-10`}>
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Price (PKR)" error={errors.price?.message}>
                <input {...register('price')} type="number" step="0.01" min="0" placeholder="2500" className={inputCls} />
              </Field>
              <Field label="Stock Quantity" error={errors.stockQuantity?.message}>
                <input {...register('stockQuantity')} type="number" min="0" placeholder="50" className={inputCls} />
              </Field>
              <Field label="Description" error={errors.description?.message} className="sm:col-span-2">
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="A rich, warm fragrance…"
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Section: Image */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Product Image</h3>
            <Controller
              name="imageURL"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <ImageUpload value={field.value ?? ''} onChange={field.onChange} />
                  <p className="text-xs text-gray-400">Or enter a URL manually:</p>
                  <input
                    type="url"
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="https://res.cloudinary.com/…"
                    className={inputCls}
                  />
                  {errors.imageURL && <p className="text-xs text-red-500">{errors.imageURL.message}</p>}
                </div>
              )}
            />
          </div>

          {/* Section: Fragrance Notes */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Fragrance Notes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Top Note" error={errors.topNote?.message}>
                <input {...register('topNote')} placeholder="e.g. Bergamot" className={inputCls} />
              </Field>
              <Field label="Heart Note" error={errors.heartNote?.message}>
                <input {...register('heartNote')} placeholder="e.g. Rose" className={inputCls} />
              </Field>
              <Field label="Base Note" error={errors.baseNote?.message}>
                <input {...register('baseNote')} placeholder="e.g. Oud" className={inputCls} />
              </Field>
              <Field label="Ingredients" error={errors.ingredients?.message} className="sm:col-span-3">
                <textarea
                  {...register('ingredients')}
                  rows={2}
                  placeholder="Alcohol, Parfum, Benzyl Alcohol…"
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Section: Special Edition */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Special Edition</h3>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isSpecialEdition"
                {...register('isSpecialEdition')}
                className="w-4 h-4 accent-[#d4af37]"
              />
              <label htmlFor="isSpecialEdition" className="text-sm text-gray-700">
                Mark as Special Edition
              </label>
            </div>
            {isSpecialEdition && (
              <Field label="Special Edition Type" error={errors.specialEditionType?.message} className="mt-3">
                <input
                  {...register('specialEditionType')}
                  placeholder="e.g. Limited Run, Anniversary"
                  className={inputCls}
                />
              </Field>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : (
                product ? 'Save Changes' : 'Create Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Products Page ──────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      if (!pRes.ok || !cRes.ok) throw new Error('Fetch failed');
      setProducts(await pRes.json());
      setCategories(await cRes.json());
    } catch {
      setError('Could not load data. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditingProduct(undefined); setShowModal(true); };
  const openEdit = (p: Product) => { setEditingProduct(p); setShowModal(true); };
  const closeModal = () => setShowModal(false);
  const handleSuccess = () => { closeModal(); fetchData(); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError('');
    const res = await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' });
    if (res.ok) {
      setDeleteTarget(null);
      fetchData();
    } else {
      const json = await res.json();
      setDeleteError(json.error ?? 'Delete failed');
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package size={22} />
              Products
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your fragrance catalogue.</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Plus size={16} /> New Product
          </button>
        </div>

        {deleteError && (
          <div className="p-3 bg-red-50 border border-red-200 text-sm text-red-600 rounded-lg">
            {deleteError}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-center py-12 text-sm text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No products yet.</p>
              <button onClick={openCreate} className="mt-3 text-sm text-black underline">
                Add your first product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3 font-medium text-gray-500">Product</th>
                    <th className="text-left px-6 py-3 font-medium text-gray-500">Category</th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">Price</th>
                    <th className="text-center px-6 py-3 font-medium text-gray-500">Stock</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.imageURL ? (
                            <div className="w-10 h-10 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                              <Image src={p.imageURL} alt={p.name} fill className="object-cover" unoptimized />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Package size={16} className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {p.name}
                              {p.isSpecialEdition && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                  Special
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400">{p.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{p.category.name}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        PKR {parseFloat(p.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            p.stockQuantity === 0
                              ? 'bg-red-100 text-red-700'
                              : p.stockQuantity < 10
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {p.stockQuantity === 0 ? 'Out of stock' : p.stockQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => { setDeleteError(''); setDeleteTarget(p); }}
                            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This will permanently remove the product. This cannot be undone."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

