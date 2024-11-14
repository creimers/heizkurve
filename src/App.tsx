import * as React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [yNorm, setYNorm] = React.useState(35);
  const [yOffset, setYOffset] = React.useState(20);
  const [xNorm, setXNorm] = React.useState(-10);
  const [xStart, setXStart] = React.useState(16);

  const m = (yNorm - yOffset) / (xNorm - xStart);
  const temperature = [20, 10, 0, -10];
  const heatingCurve = temperature.map((t) => ({
    temperature: t,
    flowTemperature: m * (t - xStart) + yNorm,
  }));

  return (
    <div className="h-screen bg-gray-100 p-8">
      <div>
        <LineChart
          width={600}
          height={300}
          data={heatingCurve}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="temperature" />
          <YAxis domain={[0, 60]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="flowTemperature"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </div>
      <div>{m.toFixed(2)}</div>
      <div className="space-y-4">
        <div className="flex space-x-4 items-center">
          <label htmlFor="yNorm">Normaußentemperatur</label>
          <input
            id="yNorm"
            type="number"
            value={yNorm}
            onChange={(e) => setYNorm(parseInt(e.target.value))}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <label htmlFor="yOffset">Sockeltemperatur</label>
          <input
            id="yOffset"
            type="number"
            value={yOffset}
            onChange={(e) => setYOffset(parseInt(e.target.value))}
          />
        </div>

        <div className="flex space-x-4 items-center">
          <label htmlFor="xNorm">Normaußentemperatur</label>
          <input
            id="xNorm"
            type="number"
            value={xNorm}
            onChange={(e) => setXNorm(parseInt(e.target.value))}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <label htmlFor="xStart">Startpunkt der Heizkurve</label>
          <input
            id="xStart"
            type="number"
            value={xStart}
            onChange={(e) => setXStart(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
