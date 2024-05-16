import { Card, Flex, Radio, RadioChangeEvent } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import { useCounts } from '@/hooks/useCounts';
import { SelectOptionType } from '@/types/options';

dayjs.extend(customParseFormat);

const CountChart = ({ selectOptions }: { selectOptions: SelectOptionType }) => {
  const { dateRangeCountData } = useCounts();
  const [radioValue, setRadioValue] = useState(1);
  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, PointElement, Legend);

  const data = {
    labels: dateRangeCountData.map((count) => count['date']),
    datasets: [
      {
        label: selectOptions.label,
        data: dateRangeCountData.map((count) => count[selectOptions.value as keyof typeof count]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Card>
      <Flex vertical align="end" style={{ width: '100%' }}>
        <Radio.Group onChange={onChangeRadio} value={radioValue}>
          <Radio value={1}>Bar</Radio>
          <Radio value={2}>Line</Radio>
        </Radio.Group>

        <div style={{ minWidth: 600 }}>{radioValue === 1 ? <Bar data={data} /> : <Line data={data} />}</div>
      </Flex>
    </Card>
  );
};
export default CountChart;
