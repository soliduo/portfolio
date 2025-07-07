import './Services.css';

const Services = () => {
  return (
    <section id="o-que-fazemos" className="services-section">
      <div className="container">
        <h2>O que Fazemos</h2>
        <p className="services-intro">
          Criamos soluções digitais sob medida para destacar sua presença online. Do design à publicação, cuidamos de tudo com dedicação e excelência.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <h3>Landing Pages</h3>
            <p>Páginas otimizadas para conversão, com foco em estética, velocidade e objetivos estratégicos.</p>
          </div>
          <div className="service-card">
            <h3>Identidade Visual</h3>
            <p>Do logo ao layout, criamos uma comunicação visual forte e alinhada ao propósito da sua marca.</p>
          </div>
          <div className="service-card">
            <h3>SEO Básico</h3>
            <p>Aplicamos boas práticas de SEO on-page para que sua página tenha visibilidade nos buscadores.</p>
          </div>
          <div className="service-card">
            <h3>Design Responsivo</h3>
            <p>Sites que funcionam e ficam lindos em qualquer dispositivo, do celular ao desktop.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
