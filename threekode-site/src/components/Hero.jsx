import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <h1>Seu código. Nosso talento.</h1>
        <p className="hero-subtitle">
          Desenvolvemos páginas incríveis com design inteligente e foco em conversão.
        </p>
        <button onClick={() => {
          const contato = document.getElementById('contato');
          if (contato) contato.scrollIntoView({ behavior: 'smooth' });
        }}>
          Fale com a gente
        </button>
      </div>
    </section>
  );
};

export default Hero;
