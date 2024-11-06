import React from 'react';
import { DualAxes } from '@ant-design/plots';

const DemoDualAxes = ({data1}) => {
  const data = [
    {
      jour: '1991',
      Eligible: 3,
      Exemption: 10,
    },
    {
      jour: '1992',
      Eligible: 4,
      Exemption: 4,
    },
    {
      jour: '1993',
      Eligible: 3.5,
      Exemption: 5,
    },
    {
      jour: '1994',
      Eligible: 5,
      Exemption: 5,
    },
    {
      jour: '1995',
      Eligible: 4.9,
      Exemption: 4.9,
    },
    {
      jour: '1996',
      Eligible: 6,
      Exemption: 35,
    },
    {
      jour: '1997',
      Eligible: 7,
      Exemption: 7,
    },
    {
      jour: '1998',
      Eligible: 9,
      Exemption: 1,
    },
    {
      jour: '1999',
      Eligible: 13,
      Exemption: 20,
    },
  ];
  const config = {
    data: [data, data],
    xField: 'jour',
    yField: ['Eligible', 'Exemption'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
  };
  return <DualAxes style={{height:"325px"}} {...config} />;
};

export default DemoDualAxes;