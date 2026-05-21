import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from './../../assets/favicon.png'

export default function BotonExport({ datosGenerales, items }) {

  const exportarAPdf = () => {
    // 1. Inicializar jsPDF (formato A4, medición en milímetros)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // 2. Configurar fuentes y Diseñar Cabecera (Datos generales)
    doc.addImage(logo, 'PNG', 14, 12, 25, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55); // Color gris oscuro
    doc.text("PRESUPUESTO", 82, 25);

    // Línea decorativa superior
    doc.setDrawColor(37, 99, 235); // Azul primario
    doc.setLineWidth(1);
    doc.line(14, 34, 196, 34);

    // Bloque de metadatos (Fecha, hora, etc.)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);

    const fechaFormateada = datosGenerales.fecha || new Date().toLocaleDateString('es-AR').replace(/\//g, '-');

    doc.text(`Fecha: ${fechaFormateada}`, 14, 32);

    // Ajustado a la altura del cuadro del cliente
    // Cuadro destacado para el Cliente
    doc.setFillColor(243, 244, 246); // Gris muy claro
    doc.roundedRect(14, 40, 182, 12, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(55, 65, 81);
    doc.text(`Cliente: ${datosGenerales.cliente || 'Consumidor Final'}`, 18, 47.5);

    // 3. Preparar las columnas reales basadas en tus componentes previos
    // Eliminamos columnas de cantidad/descuento e incorporamos la Nota si la usás por ítem
    const columnas = ["Detalle / Nota", "Total"];

    let netoAPagar = 0;

    const filas = items.map(item => {
      netoAPagar += item.precio;

      // Opción por Ítem: Si hay observación, la concatenamos abajo con un salto de línea
      const detalleCelda = item.observacion
        ? `${item.descripcion}\n📌 Nota: ${item.observacion}`
        : item.descripcion;

      return [
        detalleCelda,
        `$${item.precio.toFixed(2)}`
      ];
    });

    // 4. Renderizar la tabla en el PDF
    autoTable(doc, {
      startY: 58,
      head: [columnas],
      body: filas,
      theme: 'striped',
      headStyles: {
        fillColor: [37, 99, 235],  // Un azul brillante (RGB)
        textColor: [255, 255, 255], // Blanco (RGB)
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'right', cellWidth: 40 } // Columna de precios alineada a la derecha
      },
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 4
      }
    });

    // 5. Bloque de Totales al final de la tabla
    let finalY = doc.lastAutoTable.finalY + 10;
    const xTotalesLabel = 140;
    const xTotalesValor = 196;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235); // Azul primario
    doc.text("Neto a Pagar:", xTotalesLabel, finalY);
    doc.text(`$${netoAPagar.toFixed(2)}`, xTotalesValor, finalY, { align: 'right' });

    // 6. BLOQUE DE OBSERVACIONES GENERALES
    if (datosGenerales.observacionesGenerales && datosGenerales.observacionesGenerales.trim() !== "") {
      finalY += 15;

      // Validación para que no se pise si estamos al final de la hoja
      if (finalY > 240) {
        doc.addPage();
        finalY = 20;
      }

      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.5);
      doc.line(14, finalY, 196, finalY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(55, 65, 81);
      doc.text("Observaciones:", 14, finalY + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      
      const observacionesDivididas = doc.splitTextToSize(datosGenerales.observacionesGenerales, 182);
      doc.text(observacionesDivididas, 14, finalY + 12);
    }

    // 7. --- NUEVO: PIE DE PÁGINA FIJO CON DATOS DE CONTACTO ---
    // Recorremos todas las hojas que tenga el PDF para estamparle el contacto abajo de todo
    const totalPaginas = doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= totalPaginas; i++) {
      doc.setPage(i); // Nos paramos en la hoja actual
      
      const posicionFooterY = 285; // A4 mide 297mm de alto. Dejamos un margen de 12mm de abajo

      // Línea divisoria del footer
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.4);
      doc.line(14, posicionFooterY - 4, 196, posicionFooterY - 4);

      // Texto izquierdo: Nombre del servicio
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      doc.text("Mattekudasai Servicio de Pintura", 14, posicionFooterY);

      // Texto derecho: Redes y WhatsApp alineados a la derecha
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(107, 114, 128);
      
      const textoContacto = "WhatsApp: +54 9 299-476148  |  Instagram: mattekudasai.servicios";
doc.text(textoContacto, 196, posicionFooterY, { align: 'right' });
      
      // Opcional: Número de página en el extremo inferior central
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${totalPaginas}`, 105, posicionFooterY + 5, { align: 'center' });
    }

    // 8. Descargar el archivo
    const nombreArchivo = `Presupuesto_${(datosGenerales.cliente || 'Cliente').replace(/\s+/g, '_')}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <button
      onClick={exportarAPdf}
      disabled={items.length === 0}
      className={`w-full md:w-auto font-semibold px-6 py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${items.length === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
          : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer active:scale-95'
        }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Exportar Presupuesto (PDF)
    </button>
  );
}