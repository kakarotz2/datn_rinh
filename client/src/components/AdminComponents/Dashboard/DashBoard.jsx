import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
  LineChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import Axios from 'axios'
import CountUp from "react-countup";
const data2 = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];
const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function DashBoard() {
  const [qorder, setQorder] = useState(0)
  const [quser, setQuser] = useState(0)
  const [qpro, setQpro] = useState(0)
  useEffect(() => {
    Axios.get('/admin/getall').then(data=>{
      setQorder(data.data.qorder)
      setQpro(data.data.qpro)
      setQuser(data.data.quser)
    })
  }, [])
  return (
    <div className="dashboard_info">
      <div className="dashboard_content">
        <i className="fab fa-asymmetrik"></i> <span>Analytics Dashboard</span>
      </div>
      <div className="card">
        <div className="card_header">Thông tin Wear</div>
        <div className="card_list">
          <div className="card_item">
            <div className="card_item_icon">
              <i className="fas fa-biohazard"></i>
            </div>
            <div className="card_item_info">
              <p>Sản phẩm</p>
              <CountUp start={0} end={qpro} duration={3} />
            </div>
          </div>
          <div className="card_item">
            <div className="card_item_icon">
              <i className="fas fa-cart-plus"></i>
            </div>
            <div className="card_item_info">
              <p>Đơn hàng</p>
              <CountUp start={0} end={qorder} duration={3} />
            </div>
          </div>
          <div className="card_item">
            <div className="card_item_icon">
              <i className="far fa-user"></i>
            </div>
            <div className="card_item_info">
              <p>Người dùng</p>
              <CountUp start={0} end={quser} duration={3} />
            </div>
          </div>
        </div>
      </div>
      <div className="chart">
        <div className="chart_left">
          <ComposedChart width={600} height={250} data={data1}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </div>
        <div className="chart_right">
          <LineChart
            width={600}
            height={250}
            data={data1}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
      <div className="chart_circle">
        <div className="chart_circle_item">
          <RadarChart outerRadius={90} width={400} height={250} data={data2}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Lily"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </div>
        <div className="chart_circle_item">
          <RadarChart outerRadius={90} width={400} height={250} data={data2}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#e84118"
              fill="#e84118"
              fillOpacity={0.6}
            />
            <Radar
              name="Lily"
              dataKey="B"
              stroke="#8c7ae6"
              fill="#8c7ae6"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </div>
        <div className="chart_circle_item">
          <RadarChart outerRadius={90} width={400} height={250} data={data2}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#EA2027"
              fill="#EA2027"
              fillOpacity={0.6}
            />
            <Radar
              name="Lily"
              dataKey="B"
              stroke="#00a8ff"
              fill="#00a8ff"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
