import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { getSupportsCommunes } from 'src/api/supports/supports';

const Statistiques = () => {
  const [data, setData] = useState([]);

  const {data:dataCommune} = useQueryErrorResetBoundary({
    queryKey: ["suppots-commune"],
    queryFn: getSupportsCommunes
  })
  
  const formatDataForChart = () => {
    const formattedData = [];

    for (const commune in data) {
      const communeData = {
        commune,
        Bon: data[commune].Bon.nombre_total,
        Défraichis: data[commune].Défraichis.nombre_total,
        Détérioré: data[commune].Détérioré.nombre_total,
      };
      formattedData.push(communeData);
    }

    return formattedData;
  };

  const renderBarCharts = () => {
    const chartData = formatDataForChart();

    return (
      <BarChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="commune" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Bon" fill="#8884d8" />
        <Bar dataKey="Défraichis" fill="#82ca9d" />
        <Bar dataKey="Détérioré" fill="#ffc658" />
      </BarChart>
    );
  };

  useEffect(()=>{
    setData(dataCommune?.communes_aggregations);
  },[dataCommune])

  return (
    <div>
      <h2>Graphiques de données par commune</h2>
      {renderBarCharts()}
    </div>
  );
};

export default Statistiques;
