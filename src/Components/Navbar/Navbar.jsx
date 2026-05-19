import { Link } from 'react-router-dom';
import logo from './../../assets/favicon.png'; // Ajustá la ruta según dónde quedó tu logo
import { Ruteo } from '../../const/routes';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm px-4 py-3">
      <div className="max-w-6xl mx-auto grid grid-cols-3 items-center">
        
        {/* IZQUIERDA: Logo (lleva al inicio) */}
        <div className="flex items-center">
          <Link to="/" className="transition-transform active:scale-95">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-32 w-32 object-contain rounded-lg"
            />
          </Link>
        </div>

        {/* CENTRO: Nuevo Presupuesto */}
        <div className="text-center">
          <Link 
            to={Ruteo.nuevo} // Si usás tu objeto de rutas, poné {Ruteo.nuevo}
            className="text-sm font-semibold text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors inline-block"
          >
            ✨ Nuevo
          </Link>
        </div>

        {/* DERECHA: Historial */}
        <div className="text-right">
          <Link 
            to={Ruteo.history} // Si usás tu objeto de rutas, poné {Ruteo.history}
            className="text-sm font-semibold text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors inline-block"
          >
            📋 Historial
          </Link>
        </div>

      </div>
    </nav>
  );
}