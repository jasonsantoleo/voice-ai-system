import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Mldashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      fetchData();
    }, [])
    
    const fetchData = () => {
        try {
            const itemsData = [
                { name: "Item A", category: "Category 1", wasteRiskPrediction: 20 },
                { name: "Item B", category: "Category 1", wasteRiskPrediction: 35 },
                { name: "Item C", category: "Category 2", wasteRiskPrediction: 50 },
            ];
            setItems(itemsData);
        } catch (error) {
            console.error(error);
        }
    }
    
    const riskData = items.map((item) => ({
        name: item.name,
        wasteRiskPrediction: item.wasteRiskPrediction
  }))

  return (
    <div className='p-4 space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Waste Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='w-full h-72 flex justify-center'>
          <LineChart width={400} height={300} data={riskData}>
          <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Risk Score (%)",
                  angle: -90,
                  position: "insideLeft",
                }}/>
            <Line type="monotone" dataKey="wasteRiskPrediction" stroke="#8884d8" />
          </LineChart>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Mldashboard