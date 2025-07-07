import Slider from 'react-slick';
import './Portfolio.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import casamentoImg from '../assets/casamento.png';
import aniversarioImg from '../assets/aniversario.png';
import landingImg from '../assets/landing.png';
import portfolioImg from '../assets/portfolio.png';

const portfolioItems = [
  {
    title: 'Casamento',
    image: casamentoImg,
    link: '/portfolio/casamento'
  },
  {
    title: 'Aniversário',
    image: aniversarioImg,
    link: '/portfolio/aniversario'
  },
  {
    title: 'Landing Page',
    image: landingImg,
    link: '/portfolio/landing'
  },
  {
    title: 'Portfólio Pessoal',
    image: portfolioImg,
    link: '/portfolio/pessoal'
  },
];

const Portfolio = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <h2>Portfólio</h2>
        <Slider {...settings}>
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-slide">
              <a href={item.link}>
                <div className="portfolio-image" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="overlay">
                    <span>{item.title}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Portfolio;
