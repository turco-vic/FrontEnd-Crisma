"use client";
import { useRef } from 'react';
import { Carousel, Button, Card } from 'antd';
import { LeftOutlined, RightOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from '../styles/Carousel.module.css';

const eventBanners = [
  {
    id: 1,
    title: "Preparação para Crisma 2025",
    description: "Jornada de fé quase finalizada!",
    date: "Fevereiro 2025 - Fevereiro 2026",
    time: "Sábados 09h00 às 10h30",
    gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
  },
  {
    id: 2,
    title: "Retiro Espiritual",
    description: "Um fim de semana especial de reflexão e fortalecimento da fé para os jovens crismandos.",
    date: "05-07 de Outubro",
    time: "Sexta 19h até Domingo 18h",
    gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
  },
  {
    id: 3,
    title: "Celebração da Crisma",
    description: "Cerimônia solene de confirmação com a presença do Bispo. Uma data especial para toda a comunidade.",
    date: "26 de Outubro",
    time: "Domingo às 10h00",
    gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
  },
  {
    id: 4,
    title: "Encontro de Jovens",
    description: "Palestras, atividades, dinâmicas e momentos de partilha entre os jovens da comunidade.",
    date: "Todo 1º Sábado do mês",
    time: "Sábados 18h00 às 22h30",
    gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
  }
];

export default function CarouselComponent() {
  const carouselRef = useRef();

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <Carousel 
          ref={carouselRef}
          autoplay
          autoplaySpeed={5000}
          dots={{ className: styles.customDots }}
          effect="fade"
          className={styles.antdCarousel}
        >
          {eventBanners.map((event) => (
            <div key={event.id}>
              <div 
                className={styles.slideContent}
                style={{ background: event.gradient }}
              >
                <div className={styles.slideInner}>
                  <div className={styles.slideText}>
                    <div className={styles.eventBadge}>
                      <CalendarOutlined className={styles.badgeIcon} />
                      <span>{event.date}</span>
                    </div>
                    
                    <h2 className={styles.slideTitle}>{event.title}</h2>
                    
                    <p className={styles.slideDescription}>{event.description}</p>
                    
                    <div className={styles.eventTime}>
                      <ClockCircleOutlined className={styles.timeIcon} />
                      <span>{event.time}</span>
                    </div>
                    
                    <Button 
                      type="primary" 
                      size="large"
                      className={styles.slideButton}
                    >
                      Saiba Mais
                    </Button>
                  </div>
                  
                  <div className={styles.slideImage}>
                    <Card 
                      className={styles.eventCard}
                      bodyStyle={{ padding: 0 }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.eventIcon}>📅</div>
                        <div className={styles.cardText}>
                          <h4>Evento</h4>
                          <p>Crisma Sousas</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        
        <Button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prev}
          icon={<LeftOutlined />}
          shape="circle"
          size="large"
        />
        
        <Button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={next}
          icon={<RightOutlined />}
          shape="circle"
          size="large"
        />
      </div>
    </div>
  );
}
