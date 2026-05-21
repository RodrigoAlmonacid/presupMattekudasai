import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatosGenerales from './../../Components/DatosGenerales/DatosGenerales';
import FormItem from './../../Components/FormItem/FormItem';
import TablaItems from './../../Components/TablaItems/TablaItems';
import BotonExport from './../../Components/BotonExport/BotonExport';
import Observaciones from '../../Components/Observaciones/Observaciones'; // <-- Importamos Observaciones

export default function EditarPresupuesto() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Nombre de la Key unificada para tu hermano
  const LOCAL_STORAGE_KEY = 'presupMattekudasai';

  // 1. Precargamos los datos generales buscando por ID (incluyendo observaciones)
  const [datosGenerales, setDatosGenerales] = useState(() => {
    const historial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const encontrado = historial.find(p => p.id === id);
    return encontrado 
      ? { 
          cliente: encontrado.cliente, 
          fecha: encontrado.fecha, 
          observacionesGenerales: encontrado.observaciones || '' // <-- Cargamos la nota guardada
        }
      : { cliente: '', fecha: new Date().toISOString().split('T')[0], observacionesGenerales: '' };
  });

  // 2. Precargamos los renglones (ítems) buscando por ID
  const [items, setItems] = useState(() => {
    const historial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const encontrado = historial.find(p => p.id === id);
    return encontrado ? encontrado.items : [];
  });

  // --- EFECTO DE AUTO-GUARDADO AL EDITAR ---
  useEffect(() => {
    if (items.length === 0) return;

    const netoTotal = items.reduce((acc, item) => acc + item.precio, 0);

    const historialPrevio = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    const presupuestoActualizado = {
      id: id, 
      cliente: datosGenerales.cliente.trim() || 'Cliente sin nombre',
      fecha: datosGenerales.fecha,
      observaciones: datosGenerales.observacionesGenerales, // <-- Se actualiza en el historial
      items: items,
      neto: netoTotal
    };

    // Buscamos la posición en el array y lo reemplazamos
    const index = historialPrevio.findIndex(p => p.id === id);
    if (index !== -1) {
      historialPrevio[index] = presupuestoActualizado;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(historialPrevio));
    }
  }, [items, datosGenerales, id]);

  // Manejador para los inputs
  const handleDatosGeneralesChange = (e) => {
    const { name, value } = e.target;
    setDatosGenerales({ ...datosGenerales, [name]: value });
  };

  const handleAgregarItem = (nuevoItem) => {
    setItems([...items, { ...nuevoItem, id: crypto.randomUUID() }]);
  };

  const handleEliminarItem = (itemId) => {
    const nuevaLista = items.filter(item => item.id !== itemId);
    setItems(nuevaLista);

    // Si borra todo, limpiamos el presupuesto entero del historial
    if (nuevaLista.length === 0) {
      const historialPrevio = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const historialFiltrado = historialPrevio.filter(p => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(historialFiltrado));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen pb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">✏️ Editar Presupuesto</h2>
      
      {/* Mantenemos la consistencia de props con la pantalla NuevoPresupuesto */}
      <DatosGenerales onChangeDatos={handleDatosGeneralesChange} datos={datosGenerales} />
      <FormItem onAgregarItem={handleAgregarItem} />
      
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Resumen del Presupuesto</h3>
      <TablaItems items={items} onEliminarItem={handleEliminarItem} />

      {/* Bloque de observaciones generales por si quiere modificarlas */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-4">Observaciones Generales</h3>
      <Observaciones 
        value={datosGenerales.observacionesGenerales} 
        onChange={handleDatosGeneralesChange} 
      />
      
      <div className="mt-6 flex justify-end gap-4">
        <BotonExport datosGenerales={datosGenerales} items={items} />
        
        <button 
          onClick={() => navigate('/historial')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
        >
          Volver al Historial
        </button>
      </div>
    </div>
  );
}