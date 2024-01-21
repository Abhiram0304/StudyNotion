import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables);

const PieChart = ({data,activeTab}) => {

    const generateRandomColours = (num) => {
        const colors = [];
        for(let i=0; i<num; i++){
            const color = `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256})`;
            colors.push(color);
        }
        return colors;
    }

    const studentChartData = {
        labels : data.map((course) => course?.courseName),
        datasets : [
          {
            data : data?.map((course) => course?.totalEnrolledStudent),
            backgroundColor : generateRandomColours(data.length),
          }
        ]
    }

    const incomeChartData = {
      labels : data.map((course) => course?.courseName),
      datasets : [
        {
          data : data?.map((course) => course?.totalIncome),
          backgroundColor : generateRandomColours(data.length),
        }
      ]
  }

  const options = {
    maintainAspectRatio : false,
  }

  return (
    <div className='aspect-square h-full lg:w-[60%] md:w-[80%] w-[100%] mx-auto'>
      <Pie data={activeTab===1 ? studentChartData : incomeChartData} />
    </div>
  )
}

export default PieChart