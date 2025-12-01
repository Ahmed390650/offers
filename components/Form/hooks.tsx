"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "./FormInput";
import { FormDynamicSelect, FormSelect } from "./FormSelect";
import { FormCheckbox } from "./FormCheckBox";
import { FormTextArea } from "./FormTextArea";
import FormUpload from "./FormUpload";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    input: FormInput,
    dynamicSelet: FormDynamicSelect,
    checkBox: FormCheckbox,
    textArea: FormTextArea,
    select: FormSelect,
    upload: FormUpload,
  },
  fieldContext,
  formContext,
  formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext };
