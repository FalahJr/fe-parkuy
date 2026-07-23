import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="home-hero" id="home">
        <div className="home-hero__media">
          <img
            className="home-hero__image"
            src="assets/img/Content/Image.png"
            alt="Parkuy hero"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
          <div className="home-hero__overlay" />
        </div>

        <div className="home-hero__content">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow">Parkuy</p>
            <h1>Parkuy</h1>
            <h2>Digitalisasi Sistem Parkir</h2>
          </div>

          <div className="home-hero__actions">
            <h3>Bingung Mau Parkir Dimana?</h3>
            <button
              className="home-button home-button--primary"
              onClick={() => navigate("/pengendara/location-search")}
            >
              <i className="fa fa-map-marker"></i>
              Cari Area Parkir
            </button>
          </div>
        </div>
      </section>

      <div className="scroll" id="layanan"></div>
      <section className="home-section home-services">
        <div className="home-services__inner">
          <div className="home-section__header">
            <h1>Fokus Layanan Kami</h1>
          </div>

          <div className="home-services__grid">
            <article className="home-service-card">
              <img
                src="assets/img/Content/ilustrasi1.png"
                alt="Ilustrasi parkir di bahu jalan"
                width={240}
                height={240}
                loading="lazy"
                decoding="async"
              />
              <h2>Parkir di Bahu Jalan</h2>
              <p>Parkiran di bahu jalan terasa lebih nyaman dan aman.</p>
            </article>
            <article className="home-service-card">
              <img
                src="assets/img/Content/ilustrasi2.png"
                alt="Ilustrasi petugas parkir"
                width={240}
                height={240}
                loading="lazy"
                decoding="async"
              />
              <h2>Petugas Parkir</h2>
              <p>
                Petugas yang profesional dan memanfaatkan teknologi dalam
                pelayanannya.
              </p>
            </article>
            <article className="home-service-card">
              <img
                src="assets/img/Content/ilustrasi3.png"
                alt="Ilustrasi pembayaran cashless"
                width={240}
                height={240}
                loading="lazy"
                decoding="async"
              />
              <h2>Bayar Secara Cashless</h2>
              <p>
                Petugas akan menunjukkan QR Code dari QRIS dan bayar sesuai
                biaya parkir
              </p>
            </article>
          </div>
        </div>
      </section>

      <div className="scroll" id="benefit"></div>
      <section className="home-benefit">
        <div className="home-section__header home-section__header--light">
          <h1>Jadi Petugas Parkir</h1>
        </div>

        <div className="home-benefit__card">
          <div className="home-benefit__text">
            <h2>Petugas Parkir</h2>
            <button className="home-button home-button--secondary">
              Selengkapnya
            </button>
          </div>

          <div className="home-benefit__media">
            <img
              src="assets/img/Content/benefit-parkir.png"
              alt="Ilustrasi petugas parkir"
              width={420}
              height={360}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <div className="scroll" id="download"></div>
      <section className="home-download">
        <img
          className="home-download__image"
          src="assets/img/Content/download.png"
          alt="Ilustrasi unduh aplikasi Parkuy"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
        />
        <div className="home-download__overlay" />
        <div className="home-download__content">
          <h1>Unduh Aplikasi Parkuy di</h1>
          <button className="home-button home-button--primary home-button--play">
            <i className="fab fa-google-play"></i>
            Google Play
          </button>
        </div>
      </section>
    </main>
  );
};
export default Home;
