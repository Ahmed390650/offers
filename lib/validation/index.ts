import { z } from "zod";

const TEXTAREA = z.string().min(10); // كل الـ textarea fields لها min 10

export const droneSchema = z.object({
  company: z
    .object({
      company_name: z.string().min(1).describe("اسم الشركة"),
      country: z.array(z.string()).describe("اسم البلد"),
      company_notes: TEXTAREA.describe("ملاحظات الشركة"),
    })
    .describe("بيانات الشركة"),

  BasicInfo: z
    .object({
      drone_name: z.string().describe("اسم الطائرة"),
      drone_type: z.string().describe("نوع الطائرة"),
      primary_mission: z.string().describe("المهمة الأساسية"),
      drone_info_notes: TEXTAREA.describe("ملاحظات معلومات الطائرة"),
    })
    .describe("البيانات الأساسية"),

  flight_performance: z
    .object({
      max_range_km: z.number().describe("أقصى مدى بالكيلومتر"),
      endurance_min: z.number().describe("مدة الطيران بالدقائق"),
      max_speed_kmh: z.number().describe("أقصى سرعة كم/س"),
      max_altitude_m: z.number().describe("أقصى ارتفاع متر"),
      flight_notes: TEXTAREA.describe("ملاحظات الطيران"),
    })
    .describe("أداء الطيران"),

  weights: z
    .object({
      empty_weight_kg: z.number().describe("الوزن الفارغ كجم"),
      payload_weight_kg: z.number().describe("وزن الحمولة كجم"),
      takeoff_weight_kg: z.number().describe("وزن الإقلاع كجم"),
      length_cm: z.number().describe("الطول سم"),
      width_cm: z.number().describe("العرض سم"),
      weight_notes: TEXTAREA.describe("ملاحظات الأوزان"),
    })
    .describe("الأوزان والأبعاد"),

  payload: z
    .object({
      max_payload_capacity_kg: z.number().describe("أقصى حمولة كجم"),
      payload_type: z.string().describe("نوع الحمولة"),
      payload_notes: TEXTAREA.describe("ملاحظات الحمولة"),
    })
    .describe("الحمولة"),

  motor_system: z
    .object({
      motor_type: z.array(z.string()).describe("نوع المحرك"),
      motor_count: z.number().describe("عدد المحركات"),
      motor_notes: TEXTAREA.describe("ملاحظات المحرك"),
    })
    .describe("نظام المحرك"),

  communication: z
    .object({
      communication_type: z.string().describe("نوع الاتصال"),
      encryption_type: z.string().describe("نوع التشفير"),
      control_link_range_km: z.number().describe("مدى رابط التحكم كم"),
      communication_notes: TEXTAREA.describe("ملاحظات الاتصال"),
    })
    .describe("الاتصالات"),

  navigation: z
    .object({
      gps_type: z.string().describe("نوع GPS"),
      ins_type: z.string().describe("نوع INS"),
      navigation_accuracy_m: z.number().describe("دقة الملاحة متر"),
      navigation_notes: TEXTAREA.describe("ملاحظات الملاحة"),
    })
    .describe("الملاحة"),

  anti_jamming: z
    .object({
      anti_gps_spoofing: z.boolean().describe("مضاد للتزييف GPS"),
      anti_gps_jamming: z.boolean().describe("مضاد للتشويش GPS"),
      anti_link_jamming: z.boolean().describe("مضاد لتشويش الرابط"),
      anti_signal_interference: z.boolean().describe("مضاد لتداخل الإشارة"),
      antijamming_notes: TEXTAREA.describe("ملاحظات مكافحة التشويش"),
    })
    .describe("نظام الاعاقة"),

  extra_features: z
    .object({
      list: z.array(z.string()).describe("ميزات إضافية"),
      extra_features_notes: TEXTAREA.describe("ملاحظات الميزات الإضافية"),
    })
    .describe("ميزات إضافية"),

  files: z
    .object({
      images: z.file().describe("صور"),
      pdfs: z.file().describe("ملفات PDF"),
      global_notes: TEXTAREA.describe("ملاحظات عامة"),
    })
    .describe("الملفات"),
});
export const defaultValues = {
  company: {
    company_name: "AeroTech Systems",
    country: ["USA"],
    company_notes: "شركة متخصصة في أنظمة الطائرات بدون طيار منذ 2005.",
  },

  BasicInfo: {
    drone_name: "Falcon X4",
    drone_type: "Quadcopter",
    primary_mission: "استطلاع ومراقبة",
    drone_info_notes: "مستخدمة في مهام المراقبة المدنية والأمنية.",
  },

  flight_performance: {
    max_range_km: 12, // المدى 12 كم
    endurance_min: 35, // زمن الطيران 35 دقيقة
    max_speed_kmh: 72, // السرعة 72 كم/س
    max_altitude_m: 1500, // أقصى ارتفاع
    flight_notes: "مزودة ببطارية ليثيوم عالية الكفاءة.",
  },

  weights: {
    empty_weight_kg: 3.2,
    payload_weight_kg: 0.8,
    takeoff_weight_kg: 4.0,
    length_cm: 45,
    width_cm: 45,
    weight_notes: "مصنوعة من ألياف الكربون.",
  },

  payload: {
    max_payload_capacity_kg: 1.2,
    payload_type: "Electro-Optical Camera",
    payload_notes: "تدعم كاميرا 4K مع تثبيت ثلاثي المحاور.",
  },

  motor_system: {
    motor_type: ["محرك كهربائي", "محرك بنزين", "محرك هجين"],
    motor_count: 4,
    motor_notes: "محركات بدون فرش عالية الكفاءة بقدرة 920KV.",
  },

  communication: {
    communication_type: "Digital 2.4GHz",
    encryption_type: "AES-256",
    control_link_range_km: 10,
    communication_notes: "نظام اتصال مقاوم للتشويش مع بث فيديو حي.",
  },

  navigation: {
    gps_type: "GPS + GLONASS",
    ins_type: "3-Axis MEMS INS",
    navigation_accuracy_m: 0.5,
    navigation_notes: "دقة عالية في تحديد الموقع حتى في بيئات صعبة.",
  },

  anti_jamming: {
    anti_gps_spoofing: true,
    anti_gps_jamming: true,
    anti_link_jamming: false,
    anti_signal_interference: true,
    antijamming_notes: "نظام حماية GPS مدمج.",
  },

  extra_features: {
    list: ["إقلاع وهبوط تلقائي", "Return-To-Home"],
    extra_features_notes: "الطائرة مزودة بخوارزميات ذكية للعودة التلقائية.",
  },

  files: {
    images: undefined,
    pdfs: undefined,
    global_notes: "هذه المواصفات خاصة بالإصدار المدني للطائرة.",
  },
};

export type DroneForm = z.infer<typeof droneSchema>;
