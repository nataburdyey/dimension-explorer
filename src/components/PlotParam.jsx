import { Select } from 'react-daisyui';

const Option = Select.Option;

const PlotParam = ({ label, values, value, ...args }) => {
  return (
    <label className='label'>
      <span className='label-text font-bold'>{label}:</span>
      <Select value={value} {...args}>
        <Option value={undefined}></Option>
        {values.map((val, i) => {
          return (
            <Option key={i} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
    </label>
  );
};

export default PlotParam;
