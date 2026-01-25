import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#4f8cff', '#a259ff', '#34d399', '#fbbf24', '#f472b6'];

export default function DeviceTypeChart() {
  const data = [
    { name: 'Desktop', value: 35 },
    { name: 'Tablet', value: 48 },
    { name: 'Mobile', value: 27 },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Device Type</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-4 text-sm">
        {data.map((entry, idx) => (
          <span key={entry.name} className="flex items-center gap-1">
            <span style={{ background: COLORS[idx], width: 10, height: 10, borderRadius: '50%' }} />
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  );
}
