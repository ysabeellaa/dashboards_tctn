import React from 'react';
import { useApiContext, Asset } from "../../context/ApiContext";
import CardAll from '../../components/CardAll/CardAll';
import styles from './All.module.scss'
import { Link } from 'react-router-dom';

const All: React.FC = () => {
  const apiContext = useApiContext();

  if (!apiContext) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>All Machines: click for more</h1>
      <div className={styles.container}>
      {apiContext.assets.map((asset: Asset) => (
        <CardAll key={asset.id} asset={asset} />
      ))}
    </div>
    <Link to="/">
        <button>Machines</button>
      </Link>
      
      <Link to="/users">
        <button>Users and Units</button>
      </Link>
      <Link to="/assets">
        <button>Dashborads</button>
      </Link>
    </div>
  );
};

export default All;
