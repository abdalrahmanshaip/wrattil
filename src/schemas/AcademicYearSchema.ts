import { z } from "zod";

export const AcademicYearSchema = z.object({
  quranTrackId: z.number({ required_error: 'المسار مطلوب' }),
  title: z.string().min(2, 'العنوان قصير جداً'),
})