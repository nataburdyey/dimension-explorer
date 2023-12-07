import { useState, useEffect } from "react";
import PlotParam from './components/PlotParam';

const usePlotParam = ({ values, label, init }) => {
  const [data, setData] = useState(init);

  const Select = () => <>
    <PlotParam label={label} values={values} value={data} onChange={e => setData(e.target.value)} />
  </>
  return [data, Select];
};

export default usePlotParam;