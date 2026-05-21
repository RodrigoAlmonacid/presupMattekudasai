import { useState, useEffect } from 'react';
import DatosGenerales from './../../Components/DatosGenerales/DatosGenerales';
import FormItem from './../../Components/FormItem/FormItem';
import TablaItems from './../../Components/TablaItems/TablaItems';
import BotonExport from './../../Components/BotonExport/BotonExport';
import Observaciones from '../../Components/Observaciones/Observaciones';

export default function NuevoPresupuesto() {
  const [datosGenerales, setDatosGenerales] = useState({ cliente: '', fecha: new Date().toLocaleDateString('es-AR').replace(/\//g, '-'), observacionesGenerales: '' });
  const [items, setItems] = useState([]);

  // Generamos un ID único para ESTE presupuesto entero apenas se entra a la pantalla
  const [idPresupuesto] = useState(() => crypto.randomUUID());

  // --- EFECTO DE AUTO-GUARDADO ---
  useEffect(() => {
    // Si todavía no agregaron ninguna línea, no guardamos nada en el historial
    if (items.length === 0) return;

    // 1. Calcular el neto actual del presupuesto para el resumen del historial
    const netoTotal = items.reduce((acc, item) => {
      const subtotal = item.precio;
      return acc + subtotal;
    }, 0);

    // 2. Traer el historial existente del localStorage (o crear un array vacío si es el primero)
    const historialPrevio = JSON.parse(localStorage.getItem('presupMattekudasai')) || [];

    // 3. Crear el objeto actualizado de este presupuesto
    const presupuestoActualizado = {
      id: idPresupuesto,
      cliente: datosGenerales.cliente.trim() || 'Cliente sin nombre',
      fecha: datosGenerales.fecha,
      observaciones: datosGenerales.observacionesGenerales,
      items: items,
      neto: netoTotal
    };

    // 4. Ver si este presupuesto ya existía en el historial
    const index = historialPrevio.findIndex(p => p.id === idPresupuesto);

    if (index !== -1) {
      // Si ya existía (porque agregamos una 2da o 3ra línea), lo reemplazamos
      historialPrevio[index] = presupuestoActualizado;
    } else {
      // Si es la primera línea, lo agregamos al principio de la lista (unshift)
      historialPrevio.unshift(presupuestoActualizado);
    }

    // 5. Guardar el array completo de vuelta en localStorage convertido a string
    localStorage.setItem('presupMattekudasai', JSON.stringify(historialPrevio));

  }, [items, datosGenerales, idPresupuesto]); // Se ejecuta cada vez que cambian las líneas o los datos del cliente/vendedor


  // Funciones de control
  const handleDatosGeneralesChange = (e) => {
    const { name, value } = e.target;
    setDatosGenerales({ ...datosGenerales, [name]: value });
  };

  const handleAgregarItem = (nuevoItem) => {
    setItems([...items, { ...nuevoItem, id: crypto.randomUUID() }]);
  };

  const handleEliminarItem = (id) => {
    const nuevaLista = items.filter(item => item.id !== id);
    setItems(nuevaLista);

    // SÚPER IMPORTANTE: Si borra la última línea de la tabla, deberíamos quitar el presupuesto completo del localStorage
    if (nuevaLista.length === 0) {
      const historialPrevio = JSON.parse(localStorage.getItem('presupMattekudasai')) || [];
      const historialFiltrado = historialPrevio.filter(p => p.id !== idPresupuesto);
      localStorage.setItem('presupMattekudasai', JSON.stringify(historialFiltrado));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen pb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Crear Nuevo Presupuesto</h2>

      <DatosGenerales onChangeDatos={handleDatosGeneralesChange} />
      <FormItem onAgregarItem={handleAgregarItem} />

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Resumen del Presupuesto</h3>
      <TablaItems items={items} onEliminarItem={handleEliminarItem} />

      <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-4">Observaciones Generales</h3>
      <Observaciones
        value={datosGenerales.observacionesGenerales}
        onChange={handleDatosGeneralesChange}
      />

      <div className="mt-6 flex justify-end">
        <BotonExport datosGenerales={datosGenerales} items={items} />
      </div>
    </div>
  );
}