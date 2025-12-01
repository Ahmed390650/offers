import { useFieldContext } from "./hooks";
import { Checkbox } from "../ui/checkbox";
import { FormBase, FormControlProps } from "./BaseForm";
import { Label } from "../ui/label";

export function FormCheckbox(props: FormControlProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props} controlFirst horizontal>
      <Label htmlFor={field.name}>
        <Checkbox
          id={field.name}
          name={field.name}
          checked={field.state.value}
          onBlur={field.handleBlur}
          onCheckedChange={(e) => field.handleChange(e === true)}
          aria-invalid={isInvalid}
        />
        {props.label}
      </Label>
    </FormBase>
  );
}
