import { FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { FormBase, FormControlProps } from "./BaseForm";
import { useFieldContext } from "./hooks";

export function FormTextArea({
  label,
  ...props
}: FormControlProps & React.ComponentProps<"textarea">) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase>
      <FieldLabel>{label}</FieldLabel>
      {/* <Input
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        autoComplete="off"
        aria-invalid={isInvalid}
      /> */}
      <Textarea
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value}
        aria-invalid={isInvalid}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FormBase>
  );
}
