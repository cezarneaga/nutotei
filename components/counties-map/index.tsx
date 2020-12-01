
import ReactEcharts from 'echarts-for-react';

export const CountiesMap = ({ onClick, data }: { onClick: (mapEvent: unknown) => void, data: unknown }) => {
  const getChartOptions = (data) => {
    return {
      tooltip: {
        show: true,
      },
      series: [
        {
          name: 'Judet',
          type: 'map',
          mapType: 'RO',
          itemStyle: {
            areaColor: '#fff',
          },
          emphasis: {
            label: {
              show: false,
              color: '#fff',
              offset: [0, 20],
            },
            itemStyle: {
              areaColor: 'rgba(220, 38, 38)',
            }
          },
          data: data
        }]
    };
  }


  const onEvents = {
    'click': onClick,
  }

  return (data &&
    <ReactEcharts
      option={getChartOptions(data)}
      style={{ height: '600px' }}
      className="react_for_echarts"
      onEvents={onEvents}
    />
  );
}
