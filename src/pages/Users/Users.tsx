import React from 'react';
import { useApiContext } from "../../context/ApiContext";
import styles from './users.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Link } from 'react-router-dom';

const Users = () => {
  const apiContext = useApiContext();

  if (!apiContext || !apiContext.users || !apiContext.units) {
    return <div>Carregando...</div>;
  }

  const { users, units } = apiContext;


  const usersData = users.map(user => ({
    name: user.name,
    y: user.companyId,
  }));

  const unitsData = units.map(unit => ({
    name: unit.name,
    y: unit.companyId,
  }));


  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'User for Company',
    },
    series: [{
      name: 'User',
      data: usersData,
    }],
  };

 
  const unitsChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Units for Company',
    },
    series: [{
      name: 'Units',
      data: unitsData,
    }],
  };

  return (
    <div className={styles.container}>
      
      
      <div className={styles.tableContainer}>
        <h1 className={styles.title}>Users</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.companyId}</td>
                <td>{user.unitId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.chartContainer}>
        <HighchartsReact highcharts={Highcharts} options={unitsChartOptions} />
      </div>
      <div className={styles.tableContainer}>
        <h1 className={styles.title}>Units</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {units.map(unit => (
              <tr key={unit.id}>
                <td>{unit.name}</td>
                <td>{unit.companyId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
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
    </div>
  );
};

export default Users;
