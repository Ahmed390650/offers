import { DynamicSelect } from "../ui/dynamic-select";
import { FieldLabel } from "../ui/field";
import { FormBase, FormControlProps } from "./BaseForm";
import { useFieldContext } from "./hooks";

export function FormDynamicSelect({ ...props }: FormControlProps) {
  const field = useFieldContext<string[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <FieldLabel>{props.label}</FieldLabel>
      <DynamicSelect
        name={field.name}
        onChange={field.handleChange}
        value={field.state.value}
        defaultOptions={field.state.value}
      />
    </FormBase>
  );
}
export const FormSelect = ({ ...props }: FormControlProps) => {
  const field = useFieldContext<string[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <select></select>
    </FormBase>
  );
};
