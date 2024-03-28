import { Radio, RadioChangeEvent } from 'antd';
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

import styles from './index.module.scss';

dayjs.extend(customParseFormat);

const ComparisonChart: React.FC<{ selectOptions: string }> = ({ selectOptions }) => {
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
        label: selectOptions,
        data: dateRangeCountData.map((count) => count[selectOptions as keyof typeof count]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.chartWrap}>
      <div>
        <Radio.Group onChange={onChangeRadio} value={radioValue}>
          <Radio value={1}>Bar</Radio>
          <Radio value={2}>Line</Radio>
        </Radio.Group>
      </div>
      <div className={styles.overFlow_x}>
        <div>{radioValue === 1 ? <Bar data={data} /> : <Line data={data} />}</div>
      </div>
    </div>
  );
};
export default ComparisonChart;
