
export default function DatosGenerales({ onChangeDatos }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
        <input
          type="text"
          name="cliente"
          placeholder="Nombre del cliente"
          onChange={onChangeDatos}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
        <input
          type="date"
          name="fecha"
          defaultValue={new Date().toISOString().split('T')[0]}
          onChange={onChangeDatos}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
}