import Chart from 'react-apexcharts'


export default function ApexPie() {

        const series = [4, 5, 6, 1, 5]; //our data
        const options = { 
            labels: ["Comedy", "Action", "Romance", "Drama", "SciFi"],
            legend: {
                formatter: function(label, opts) {
                    return label + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            plotOptions: {
                pie: {
                        size: 10,
                        donut: {
                          size: '55',
                          labels:{
                            show:true,
                            total:{
                                show:true,
                                showAlways:true,
                                //formatter: () => '343',
                                fontSize:15,
                                //color: '#f90000',
                                }
                            }
                        }
                    }
                }
            }
            
            return (
            <div className="donut">
                <Chart options={options} series={series} 
                type="donut" width="310" />
            </div>
            );
}



