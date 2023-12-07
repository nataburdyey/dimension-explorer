import { useEffect, useState } from 'react'
import * as Plot from "@observablehq/plot";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import usePlotParam from '../usePlotParam';
import ObservablePlot from './ObservablePlot'

const types = ['auto', 'barX', 'barY', 'dot', 'lineX', 'lineY']

const Graph = ({ data }) => {
  const dimensions = Object.keys(data[0]);
  const [type, SelectType] = usePlotParam({ values: types, label: 'Graph Type', init: types[0] })
  const [axisX, SelectAxisX] = usePlotParam({ values: dimensions, label: 'Axis X', init: dimensions[0] })
  const [axisY, SelectAxisY] = usePlotParam({ values: dimensions, label: 'Axis Y', init: dimensions[1] })
  const [color, SelectColor] = usePlotParam({ values: dimensions, label: 'Color', init: dimensions[2] })

  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  const [xMin, setXMin] = useState(0);
  const [xMax, setXMax] = useState(0);
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(0);

  useEffect(() => {
    const xVals = data.map(d => d[axisX]);
    setXValues(xVals);
    setXMin(Math.min(...xVals));
    setXMax(Math.max(...xVals));
  }, [axisX])

  useEffect(() => {
    const yVals = data.map(d => d[axisY]);
    setYValues(yVals);
    setYMin(Math.min(...yVals));
    setYMax(Math.max(...yVals));
  }, [axisY])

  const xMIN = Math.min(...xValues);
  const xMAX = Math.max(...xValues);
  const xSTEP = (xMAX - xMIN) / 100;
  const yMIN = Math.min(...yValues);
  const yMAX = Math.max(...yValues);
  const ySTEP = (yMAX - yMIN) / 100;
  // console.log({ xMin, xMax, yMin, yMax }, { xMIN, xMAX, yMIN, yMAX }, { xSTEP, ySTEP });

  const filtered = data.filter(d => d[axisX] >= xMin && d[axisX] <= xMax && d[axisY] >= yMin && d[axisY] <= yMax);

  /** @type {Plot.PlotOptions} */
  const config = {
    marks: [
      Plot[type](filtered, {
        x: axisX,
        y: axisY,
        color: color,
        fill: color,
      })
    ],
    grid: true,
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 20,
  };

  return (
    <div className='border-2 '>
      <div className="flex justify-between">
        <SelectAxisY />
        <SelectType />
      </div>
      <div class="grid grid-cols-[30px_auto]">
        <div class="flex flex-col gap-1 justify-items-center">
          <div className="badge badge-outline badge-sm mx-auto">{yMin}</div>
          <RangeSlider orientation='vertical' className="mx-auto" min={yMIN} max={yMAX} step={ySTEP} value={[yMin, yMax]} onInput={([min, max]) => { console.log({ min, max }); setYMin(min); setYMax(max) }} />
          <div className="badge badge-outline badge-sm mx-auto">{yMax}</div>
        </div>
        <ObservablePlot config={config} className="p-3 grow" />
        <div class="h-1"></div>
        <div class="flex flex-row gap-1">
          <div className="badge badge-outline badge-sm">{xMin}</div>
          <RangeSlider className="mt-1" min={xMIN} max={xMAX} step={xSTEP} value={[xMin, xMax]} onInput={([min, max]) => { setXMin(min); setXMax(max) }} />
          <div className="badge badge-outline badge-sm">{xMax}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <SelectColor />
        <SelectAxisX />
      </div>
    </div>
  )

}
export default Graph