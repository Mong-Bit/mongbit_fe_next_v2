import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import cx from 'classnames';
import { Bar } from 'react-chartjs-2';

import styles from './index.module.scss';
import RangePickerBox from '@/components/lib/Antd/RangePickerBox';

const ChartCard: React.FC = () => {
  // 카운트 카드 컴포넌트 생성
  const totalCount = [
    { name: 'Visit', count: 100 },
    { name: 'Play', count: 110 },
    { name: 'Login', count: 132 },
    { name: 'Share', count: 113 },
    { name: 'Link Copie', count: 104 },
    { name: 'Like', count: 98 },
    { name: 'Comment', count: 60 },
  ];

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '출근냥 하고싶다냥',
      },
    },
  };

  const data = {
    labels: totalCount.map((test) => test.name),
    datasets: [
      { label: 'test', data: totalCount.map((test) => test.count), backgroundColor: 'rgba(255, 99, 132, 0.5)' },
    ],
  };
  return (
    <div className={cx('contentCard', 'back_shadow', styles.wrap)}>
      <RangePickerBox />
      <Bar options={options} data={data} />
    </div>
  );
};
export default ChartCard;
