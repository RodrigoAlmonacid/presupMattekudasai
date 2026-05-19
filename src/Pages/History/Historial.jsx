import { useState } from 'react';
import { Link } from 'react-router-dom';
import BotonExport from './../../Components/BotonExport/BotonExport'; // ¡Reutilizamos tu super botón!
import { Ruteo } from '../../const/routes';

export default function Historial() {

  // 2. Usamos Lazy Initialization: le pasamos una función flecha al useState
  // Esto hace que React lea el localStorage SOLO la primera vez que carga la pantalla
  const [historial, setHistorial] = useState(() => {
    const datosGuardados = localStorage.getItem('presupMattekudasai');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  // (El useEffect que estaba acá, lo borrás por completo)

  const eliminarDelHistorial = (idParaBorrar) => {
    if (window.confirm("¿Estás segura de que querés borrar este presupuesto?")) {
      const nuevoHistorial = historial.filter(presupuesto => presupuesto.id !== idParaBorrar);
      setHistorial(nuevoHistorial);
      localStorage.setItem('presupuestos', JSON.stringify(nuevoHistorial));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Historial de Presupuestos</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg transition-colors">
          Volver al Inicio
        </Link>
      </div>

      {/* LISTA DE PRESUPUESTOS */}
      {historial.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 mb-4 text-lg">Aún no hay presupuestos guardados.</p>
          <Link to={Ruteo.nuevo} className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {historial.map((presupuesto) => (
            <div key={presupuesto.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              {/* INFO DEL PRESUPUESTO */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{presupuesto.cliente}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {presupuesto.fecha}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  Vendedor: {presupuesto.vendedor} | Ítems: {presupuesto.items.length}
                </p>
                <p className="text-lg font-bold text-green-600">
                  Total: ${presupuesto.neto.toFixed(2)}
                </p>
              </div>

              {/* ACCIONES */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-4">

                {/* BOTÓN: EDITAR */}
                <Link
                  to={`${Ruteo.edit.replace(':id', presupuesto.id)}`}
                  className="flex items-center justify-center w-full sm:flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl text-sm transition-all active:scale-[0.98] text-center shadow-sm"
                >
                  ✏️ Editar
                </Link>

                {/* BOTÓN: ELIMINAR */}
                <button
                  onClick={() => eliminarDelHistorial(presupuesto.id)}
                  className="flex items-center justify-center w-full sm:flex-1 bg-white text-red-500 border border-red-200 hover:bg-red-50 font-semibold py-2 px-4 rounded-xl transition-all active:scale-[0.98] text-sm shadow-sm"
                >
                  🗑️ Eliminar
                </button>

                {/* BOTÓN: EXPORTAR (Le sacamos el scale raro para que use el mismo ancho) */}
                <div className="w-full sm:flex-1">
                  <BotonExport
                    datosGenerales={{
                      cliente: presupuesto.cliente,
                      vendedor: presupuesto.vendedor,
                      fecha: presupuesto.fecha
                    }}
                    items={presupuesto.items}
                  />
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}