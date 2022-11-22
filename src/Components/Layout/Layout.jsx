import { NavBar } from "../NavBar/NavBar";

export const Layout = ({ children }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};
