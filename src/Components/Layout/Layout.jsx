import { NavbarComponent } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";

/* Componente layout que incluye la barra de navegación
el contenido y el pie de página*/
export const Layout = ({ children }) => {
  return (
    <main>
      <NavbarComponent />
      {/* Mostramos el contenido pasado como propiedad */}
      {children}
      <Footer />
    </main>
  );
};
