export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-150 mt-auto py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        
        {/* Izquierda: Nombre y Copyright */}
        <div className="text-center md:text-left">
          <p className="font-medium text-gray-500 text-sm">
            Mattekudasai <span className="text-blue-600">Servicio de Pintura</span>
          </p>
          <p className="mt-0.5">© {new Date().getFullYear()} - Todos los derechos reservados.</p>
        </div>

        {/* Derecha: Redes Sociales Estilizadas */}
        <div className="flex flex-col items-center md:items-end gap-1.5">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Contacto & Redes
          </span>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/mattekudasai.servicios/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-pink-600 transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
            </a>
            
            <span className="text-gray-200">|</span>

            {/* WhatsApp o Teléfono */}
            <a 
              href="https://wa.me/+5492995476148" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-green-600 transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}