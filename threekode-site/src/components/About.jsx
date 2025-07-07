import './About.css';

const About = () => {
  return (
    <section id="quem-somos" className="about-section">
      <h2>Quem Somos</h2>
      <p className="about-intro">
        A <strong>ThreeKode</strong> nasceu da paixão de três desenvolvedores por transformar ideias em soluções digitais impactantes. 
        Unimos criatividade, código limpo e estratégia para entregar páginas que realmente fazem a diferença.
      </p>

      <div className="about-team">
        <div className="member">
          <h3>Carolina Koike</h3>
          <p>Especialista em back-end com paixão por organização e performance. Sempre pronta pra trazer soluções inteligentes com Java, Spring Boot e um toque de carinho.</p>
        </div>
        <div className="member">
          <h3>Luan Santos Sampaio</h3>
          <p>O cara das interfaces. Atua no front com foco em usabilidade e responsividade. Se algo ficou bonito e funciona bem, tem dedo dele.</p>
        </div>
        <div className="member">
          <h3>Matheus Rossi</h3>
          <p>O fullstack dos stacks. Conecta tudo, do banco ao botão, com domínio técnico e senso estético afiado.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
