"use client";
import { Button } from "@/components/ui/button";
import { defaultValues, droneSchema } from "@/lib/validation";
import z from "zod";
import { useAppForm } from "./Form/hooks";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Field, FieldGroup } from "./ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import supabase from "@/lib/supabase/server";
import React from "react";

const instruction = [
  "تأكد من ملء جميع الحقول المطلوبة .",
  'راجع المعلومات المدخلة قبل الضغط على زر "حفظ" لضمان الدقة.',
  'بعد الحفظ، يمكنك مراجعة البيانات المدخلة في قسم "عرض الطائرات".',
  "اقصي تحميل للصور او الملفات هوا 100 ميجا بايت.",
];
const getZodType = (schema: z.ZodSchema) => {
  if (schema.def?.checks?.[0]?._zod.def?.minimum === 10) {
    return "textarea";
  }
  return schema.def.type;
};

const parsedSections = Object.entries(droneSchema.shape).map(
  ([sectionName, sectionValue]) => {
    // لو القسم عبارة عن object
    const innerShape = sectionValue.shape;
    const keys = Object.entries(innerShape).map(([fieldName, fieldSchema]) => ({
      name: fieldName,
      typeName: getZodType(fieldSchema),
      label: fieldSchema.description || fieldName,
    }));

    return {
      sectionName,
      label: sectionValue.description,
      keys,
    };
  }
);
type droneForm = z.infer<typeof droneSchema>;
export function DroneForm({
  defaultValuesId,
}: {
  defaultValuesId?: droneForm;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const FormApp = useAppForm({
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const {
        BasicInfo,
        anti_jamming,
        communication,
        company,
        extra_features,
        flight_performance,
        motor_system,
        navigation,
        payload,
        weights,
      } = value;

      const { data, error } = await supabase.from("drones").insert([
        {
          ...BasicInfo,
          ...company,
          ...flight_performance,
          ...motor_system,
          ...navigation,
          ...payload,
          ...weights,
          ...communication,
          ...anti_jamming,
          ...extra_features,
          image_urls: value.files.images,
          pdf_urls: value.files.pdfs,
          global_notes: value.files.global_notes,
        },
      ]);
      if (error) {
        throw new Error(error.message);
      }
      setIsLoading(false);
      window.alert("تم حفظ البيانات بنجاح!");
    },
    onSubmitInvalid(props) {
      console.log(props.formApi.getAllErrors());
    },
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FieldGroup>
              <Tabs dir="rtl" defaultValue="company">
                <TabsList className="max-w-7xl flex flex-wrap h-full gap-2 lg:w-full">
                  {parsedSections.map(({ sectionName, label }) => (
                    <TabsTrigger value={sectionName} key={sectionName}>
                      {label ?? sectionName}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {parsedSections.map(({ keys, sectionName, label }, i) => {
                  return (
                    <TabsContent key={sectionName} value={sectionName}>
                      <Card>
                        <CardHeader>{label}</CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
                          {keys.map(({ name, typeName, label }) => {
                            if (typeName === "textarea") {
                              return (
                                <FormApp.AppField
                                  key={name}
                                  name={sectionName + "." + name}
                                >
                                  {(form) => (
                                    <form.textArea
                                      label={label}
                                      className="col-span-10 "
                                    />
                                  )}
                                </FormApp.AppField>
                              );
                            }
                            if (typeName === "boolean") {
                              return (
                                <FormApp.AppField
                                  key={name}
                                  name={sectionName + "." + name}
                                >
                                  {(form) => <form.checkBox label={label} />}
                                </FormApp.AppField>
                              );
                            }
                            if (typeName === "array") {
                              return (
                                <FormApp.AppField
                                  key={name}
                                  name={sectionName + "." + name}
                                >
                                  {(form) => (
                                    <form.dynamicSelet label={label} />
                                  )}
                                </FormApp.AppField>
                              );
                            }
                            if (typeName === "file") {
                              return (
                                <FormApp.AppField
                                  key={name}
                                  name={sectionName + "." + name}
                                >
                                  {(form) => (
                                    <form.upload
                                      label={label}
                                      type="file"
                                      multiple
                                    />
                                  )}
                                </FormApp.AppField>
                              );
                            }
                            return (
                              <FormApp.AppField
                                key={name}
                                name={sectionName + "." + name}
                              >
                                {(form) => (
                                  <form.input label={label} type={typeName} />
                                )}
                              </FormApp.AppField>
                            );
                          })}
                        </CardContent>
                        {parsedSections.length === i + 1 && (
                          <CardFooter className="flex justify-end ">
                            <Field>
                              <div
                                dir="rtl"
                                className="w-full p-4 flex flex-col gap-2 bg-white border border-gray-200 rounded-md shadow-sm"
                              >
                                <h1>تعليمات أستخدام البرنامج</h1>
                                <ul className="list-disc list-inside">
                                  {instruction.map((inst, index) => (
                                    <li key={index}>{inst}</li>
                                  ))}
                                </ul>
                                <Button
                                  disabled={isLoading}
                                  onClick={() => FormApp.handleSubmit()}
                                  type="submit"
                                  className=""
                                >
                                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                                </Button>
                              </div>
                            </Field>
                          </CardFooter>
                        )}
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>

              <Field></Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
