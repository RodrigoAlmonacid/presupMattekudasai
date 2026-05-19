import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruteo } from '../../const/routes';

export default function Home() { // Supongamos que manejas la página con un estado en App.jsx
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50 flex flex-col justify-center items-center">

      {/* CARD BIENVENIDA */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center w-full max-w-md mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Presupuestador</h1>
        <p className="text-gray-500 mb-8 text-sm">Presupuestos detallados</p>

        {/* BOTONES DE NAVEGACIÓN */}
        <div className="space-y-4">
          <Link
            to={Ruteo.nuevo}
            className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 text-lg"
          >
            ➕ Nuevo Presupuesto
          </Link>

          <Link
            to={Ruteo.history}
            className="block text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 text-lg border border-gray-200"
          >
            📋 Ver Historial
          </Link>
        </div>
      </div>

      {/* MENSAJE DE ADVERTENCIA LOCALSTORAGE */}
      {mostrarAlerta && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl max-w-md shadow-sm relative">
          <div className="flex gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="font-bold text-amber-800 text-sm">Información Importante (Herramienta Local)</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Esta herramienta es <strong>libre y gratuita</strong>. Para proteger tu privacidad, los datos se guardan <strong>únicamente en este dispositivo y navegador</strong>.
              </p>
              <p className="text-xs text-amber-700 mt-2 font-medium">
                Si borrás el caché/historial del navegador o cambiás de celular, los presupuestos anteriores no estarán disponibles.
              </p>
            </div>
          </div>
          <button
            onClick={() => setMostrarAlerta(false)}
            className="absolute top-2 right-2 text-amber-500 hover:text-amber-800 text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
