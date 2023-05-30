import { useContext, useEffect } from "react";
import { useApiContext } from "../../context/ApiContext";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { Link } from 'react-router-dom';

exporting(Highcharts);

function Assets() {
  const apiContext = useApiContext();

  if (!apiContext || !apiContext.companies || !apiContext.users || !apiContext.assets) {
    return <div>Carregando...</div>;
  }

  const { companies, users, assets } = apiContext;

  useEffect(() => {
    if (companies && users && assets) {
      const assetStatusCount: { [key: string]: number } = {
        inOperation: 0,
        inDowntime: 0,
        inAlert: 0,
        unplannedStop: 0,
        plannedStop: 0
      };

      assets.forEach((asset) => {
        assetStatusCount[asset.status]++;
      });
      const chartData = Object.entries(assetStatusCount).map(([status, count]) => ({
        name: status,
        y: count
      }));

      const options = {
        chart: {
          type: "bar"
        },
        title: {
          text: "Machine Status History"
        },
        xAxis: {
          categories: Object.keys(assetStatusCount)
        },
        yAxis: {
          title: {
            text: "Amount"
          }
        },
        series: [
          {
            name: "Amount",
            data: chartData
          }
        ]
      };

      Highcharts.chart("chart-container", options);
      const assetHealthData = assets.map((asset) => ({
        name: asset.name,
        y: asset.healthscore
      }));

      const pieChartOptions = {
        chart: {
          type: "pie"
        },
        title: {
          text: "Saúde das Máquinas"
        },
        series: [
          {
            name: "Saúde",
            data: assetHealthData
          }
        ]
      };

      Highcharts.chart("pie-chart-container", pieChartOptions);

      const assetUptimeData = assets.map((asset) => ({
        name: asset.name,
        y: asset.metrics.totalUptime
      }));

      const uptimeOptions = {
        chart: {
          type: "column"
        },
        title: {
          text: "Uptime das Máquinas"
        },
        xAxis: {
          categories: assets.map((asset) => asset.name)
        },
        yAxis: {
          title: {
            text: "Total Uptime"
          }
        },
        series: [
          {
            name: "Total Uptime",
            data: assetUptimeData
          }
        ]
      };

      Highcharts.chart("uptime-chart-container", uptimeOptions);
    }
  }, [companies, users, assets]);

  if (!companies || !users || !assets) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {/* <h1>Assets</h1> */}
      <div id="chart-container">
        <HighchartsReact highcharts={Highcharts} options={{}} />
      </div>
      <div id="pie-chart-container">
        <HighchartsReact highcharts={Highcharts} options={{}} />
      </div>
      <div id="uptime-chart-container">
        <HighchartsReact highcharts={Highcharts} options={{}} />
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
}

export default Assets;
