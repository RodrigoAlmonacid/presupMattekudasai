import { useState } from 'react';

export default function FormItem({ onAgregarItem }) {
  const [form, setForm] = useState({
    descripcion: '',
    precio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pasamos los datos limpios al componente padre
    onAgregarItem({
      descripcion: form.descripcion,
      precio: parseFloat(form.precio) || 0,
    });

    // Resetear el formulario interno
    setForm({ descripcion: '', precio: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Detalle</label>
        <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
        <input type="number" name="precio" value={form.precio} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
      </div>
      
      {/* Botón de acción integrado aquí */}
      <div className="md:col-span-5 flex justify-end">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors shadow-sm">
          Agregar
        </button>
      </div>
    </form>
  );
}