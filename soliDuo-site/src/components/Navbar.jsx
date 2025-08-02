import './Navbar.css';

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            Home
          </a>
        </li>
        <li>
          <a href="#quem-somos" onClick={(e) => {
            e.preventDefault();
            scrollToSection('quem-somos');
          }}>
            Quem Somos
          </a>
        </li>
        <li>
          <a href="#o-que-fazemos" onClick={(e) => {
            e.preventDefault();
            scrollToSection('o-que-fazemos');
          }}>
            O que Fazemos
          </a>
        </li>
        <li>
          <a href="#portfolio" onClick={(e) => {
            e.preventDefault();
            scrollToSection('portfolio');
          }}>
            Portfólio
          </a>
        </li>
        <li>
          <a href="#contato" onClick={(e) => {
            e.preventDefault();
            scrollToSection('contato');
          }}>
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
