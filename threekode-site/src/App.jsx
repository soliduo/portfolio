import Header from './components/Header';
import Navbar from './components/Navbar';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Hero from './components/Hero';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main style={{ paddingTop: '200px' }} className="main-content">
        <section id="hero">
          <h2>Home</h2>
          <Hero />
        </section>
        <section id="quem-somos">
          <h2>Quem Somos</h2>
          <about> ffwefwefwef fwefwefwef</about>
          <About />
        </section>
        <section id="o-que-fazemos">
          <h2>O que Fazemos</h2>
          <Services />
        </section>
        <section id="portfolio">
          <h2>Portfólio</h2>
          <Portfolio />
        </section>
        <section id="contato">
          <h2>Contato</h2>
        </section>
      </main>
    </>
  );
}

export default App;
