import ReactEcharts from 'echarts-for-react'
interface Data {
  name: string
  slug: string
  pretty: string
  label: { color: string } | {}
  itemStyle: { areaLabel: string } | {}
}
export const CountiesMap = ({ onClick, data }: { onClick: (mapEvent: unknown) => void; data: Data[] }) => {
  const getChartOptions = (data: Data[]) => {
    return {
      tooltip: {
        show: true,
        trigger: 'item' as 'item',
        formatter: (item: any) => {
          return `<strong style="color:#fff">${item.data.pretty}</strong></br>`
        },
      },
      series: [
        {
          name: 'Judet',
          type: 'map',
          mapType: 'RO',
          nameProperty: 'mnemonic',
          itemStyle: {
            areaColor: '#fff',
          },
          label: {
            show: true,
            fontWeight: 'lighter',
            fontSize: 10,
            color: '#888',
          },
          emphasis: {
            label: {
              show: false,
              color: '#fff',
              offset: [0, 20],
            },
            itemStyle: {
              areaColor: 'rgba(220, 38, 38)',
            },
          },
          data,
        },
      ],
    }
  }

  const onEvents = {
    click: onClick,
  }

  return (
    data && (
      <div className='h-96 md:h-144 lg:h-150'>
        <ReactEcharts
          option={getChartOptions(data)}
          style={{ height: '100%' }}
          className='react_for_echarts'
          onEvents={onEvents}
        />
      </div>
    )
  )
}
