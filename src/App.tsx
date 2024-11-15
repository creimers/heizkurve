import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

import { Input } from "@/components/ui/input";
import { useMeasure } from "react-use";

function App() {
  const [yNorm, setYNorm] = React.useState(35); // vorlauftemperatur
  const [yOffset, setYOffset] = React.useState(20); // sockeltemperatur
  const [xNorm, setXNorm] = React.useState(-10);
  const [xStart, setXStart] = React.useState(16); // startpunkt der heizkurve

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const steps = Math.ceil((yOffset + Math.abs(xNorm)) / 5);

  const m = (yNorm - yOffset) / (xNorm - xStart);
  const temperature = [...Array(steps + 1).keys()].map((i) => xNorm + i * 5);
  const heatingCurve = temperature.map((t) => {
    const flowTemp = Number((m * (t - xStart) + yOffset).toFixed(2));
    return {
      temperature: t,
      flowTemperature: flowTemp < yOffset ? yOffset : flowTemp,
    };
  });

  return (
    <div className="h-screen bg-gray-100 p-8 flex flex-col items-center space-y-8">
      <h1 className="text-2xl font-semibold">Heizkurve</h1>
      <div className="w-full max-w-xl" ref={ref}>
        <LineChart
          width={width}
          height={300}
          data={heatingCurve}
          margin={{ top: 5, right: 20, left: 0, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <ReferenceLine
            x={0}
            stroke="gray"
            strokeWidth={1.5}
            strokeOpacity={0.65}
          />
          <XAxis
            dataKey="temperature"
            type="number"
            domain={[temperature[0], temperature[temperature.length - 1]]}
            tickCount={steps + 1}
          >
            <Label
              value="Außentemperatur [°C]"
              position="insideBottom"
              offset={-10}
              style={{ textAnchor: "middle" }}
            />
          </XAxis>
          <YAxis domain={[0, 60]}>
            <Label
              value="Vorlauftemperatur [°C]"
              angle={-90}
              position="insideLeft"
              offset={20}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="flowTemperature"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </div>
      <div className="space-y-4 w-full max-w-xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center col-span-2">Steigung</div>
          <div>{Math.abs(m).toFixed(2)}</div>

          <div className="col-span-2 flex items-center">
            <label htmlFor="yOffset">Sockeltemperatur Heizkurve</label>
          </div>
          <Input
            id="yOffset"
            type="number"
            value={yOffset}
            onChange={(e) => setYOffset(parseInt(e.target.value))}
          />

          <div className="col-span-2 flex items-center">
            <label htmlFor="xStart">Startpunkt der Heizkurve</label>
          </div>
          <Input
            id="xStart"
            type="number"
            value={xStart}
            onChange={(e) => setXStart(parseInt(e.target.value))}
          />

          <div className="col-span-2 flex items-center">
            <label htmlFor="xNorm">Normaußentemperatur</label>
          </div>
          <Input
            id="xNorm"
            type="number"
            value={xNorm}
            onChange={(e) => setXNorm(parseInt(e.target.value))}
          />

          <div className="flex items-center col-span-2">
            <label htmlFor="yNorm">Vorlauftemperatur Heizkurve</label>
          </div>
          <Input
            id="yNorm"
            type="number"
            value={yNorm}
            onChange={(e) => setYNorm(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
