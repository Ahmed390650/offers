import React from "react";
import { FormBase, FormControlProps } from "./BaseForm";
import { FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./hooks";

const FormInput = (props: FormControlProps & React.ComponentProps<"input">) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <FieldLabel>{props.label}</FieldLabel>
      <Input
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        autoComplete="off"
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
};

export default FormInput;
