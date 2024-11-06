import React from 'react';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
  const data = [
    {
      type: 'Marcory',
      value: 27,
    },
    {
      type: 'Plateau',
      value: 25,
    },
    {
      type: 'Treichville',
      value: 18,
    },
    {
      type: 'Bassam',
      value: 15,
    },
    {
      type: 'Adjamé',
      value: 10,
    },
    {
      type: 'Cocody',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default DemoPie;

