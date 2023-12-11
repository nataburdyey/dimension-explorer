import { useEffect, useRef } from 'react';
import { plot } from '@observablehq/plot';

const ObservablePlot = ({ config, ...args }) => {
  const ref = useRef();

  useEffect(() => {
    if (config) {
      const svg = plot(config);
      ref.current.append(svg);
      return () => svg.remove();
    }
  }, [config]);

  return <div ref={ref} {...args}></div>;
};

export default ObservablePlot;
