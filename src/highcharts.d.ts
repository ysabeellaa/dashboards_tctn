declare module "highcharts" {
    const Highcharts: typeof Highcharts;
    export = Highcharts;
    
    interface Highcharts {
      chart(container: string | HTMLElement, options: Highcharts.Options): Highcharts.ChartObject;
    }
  }
  