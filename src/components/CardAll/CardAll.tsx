import React, { useEffect, useRef, useState } from 'react';
import { Asset } from "../../context/ApiContext";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './CardAll.module.scss';
import Modal from 'react-modal';

interface CardProps {
  asset: Asset;
}

const CardAll: React.FC<CardProps> = ({ asset }) => {
  const chartRef = useRef<any>(null);
  const lastHealthStatus = asset.healthHistory.length > 0
    ? asset.healthHistory[asset.healthHistory.length - 1].status
    : '';

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState(false); 

  useEffect(() => {
    if (modalOpen) {
      setModalOpened(true); 
    }
  }, [modalOpen]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
  
      const healthHistoryData = asset.healthHistory.map((entry) => ({
        x: new Date(entry.timestamp).getTime(),
        y: entry.status === 'inOperation' ? 1 : 0,
      }));
  
      chart.addSeries({
        type: 'line',
        name: 'Histórico de Saúde',
        data: healthHistoryData,
      });
    }
  }, [asset]);
  
  const cardClassName = `${styles.card} ${lastHealthStatus === 'inOperation' ? styles.green : styles.red}`;

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalOpened(false); 
  };

  return (
    <div className={styles.container}>
      <div className={cardClassName} onClick={handleCardClick}>
        <h1>{asset.name}</h1>
        <h2>Last Status: {lastHealthStatus}</h2>
        <HighchartsReact
              highcharts={Highcharts}
              options={{
                title: {
                  text: 'Histórico de Saúde',
                },
                xAxis: {
                  type: 'datetime',
                },
                yAxis: {
                  title: {
                    text: 'Status',
                  },
                  categories: ['In Operation', 'Not in Operation'],
                },
                series: [],
              }}
              ref={chartRef}
            />
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h1>{asset.name}</h1>
        <h2>Last Status: {lastHealthStatus}</h2>
        <section className={styles.flex}>
          <div className={styles.divImg}>
            <img src={asset.image} alt={asset.name} className={styles.image} />
          </div>
          <div className={styles.divParagrafos}>
            <p className={styles.healthscore}>Healthscore: {asset.healthscore}</p>
            <p className={styles.title}>Especificações:</p>
            <ul className={styles.specifications}>
              <li>Temperatura Máxima: {asset.specifications.maxTemp} ºC</li>
              <li>Potência: {asset.specifications.power} kWh</li>
              <li>RPM: {asset.specifications.rpm}</li>
            </ul>
            <p className={styles.title}>Métricas:</p>
            <ul className={styles.metrics}>
              <li>Total de Coletas Uptime: {asset.metrics.totalCollectsUptime}</li>
              <li>Total de Horas de Coletas Uptime: {asset.metrics.totalUptime}h</li>
              <li>Data da Última Coleta Uptime: {asset.metrics.lastUptimeAt}</li>
            </ul>
          </div>
        </section>
        <div className={styles.chartContainer}>
          
            
          
        </div>
        <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
};

export default CardAll;
