export default function Observaciones({ value, onChange }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <textarea
        name="observacionesGenerales"
        value={value}
        onChange={onChange}
        placeholder="Escribí acá las aclaraciones de este presupuesto, validez de los precios, de dónde se cotizaron los materiales, etc..."
        rows="4"
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-700"
      />
    </div>
  );
}