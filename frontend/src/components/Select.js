import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export const Select = ({ label = "", value, options = [], onChange }) => {
  return (
    <label className="d-flex align-items-center">
      {label && <span>{label}：</span>}
      <Form.Select value={value} onChange={onChange}>
        {options.map((item, key) => {
          const optionProps = {};
          if (value === item) {
            optionProps.value = item;
          }
          return (
            <option key={key} {...optionProps}>
              {item}
            </option>
          );
        })}
      </Form.Select>
    </label>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};
