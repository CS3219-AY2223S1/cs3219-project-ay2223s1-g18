/* eslint-disable */
import React from "react";
import Form from "react-bootstrap/Form";

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
