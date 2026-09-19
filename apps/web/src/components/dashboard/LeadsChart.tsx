import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export interface LeadsChartDatum {
  /** e.g. "Sem. 1" or an ISO week label */
  period: string;
  leads: number;
}

interface LeadsChartProps {
  data: LeadsChartDatum[];
}

/**
 * Ready-to-use chart for the future partner dashboard (leads over time).
 * Not rendered anywhere on the public vitrine yet.
 */
export default function LeadsChart({ data }: LeadsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#163B4D1A" />
        <XAxis dataKey="period" stroke="#2B2B28" fontSize={12} />
        <YAxis stroke="#2B2B28" fontSize={12} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#C79A4B', fontSize: 13 }}
          labelStyle={{ color: '#163B4D', fontWeight: 600 }}
        />
        <Line type="monotone" dataKey="leads" stroke="#C79A4B" strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
