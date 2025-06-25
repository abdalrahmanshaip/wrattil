import { z } from 'zod'

export const TrackSchema = z.object({
  title: z.string().min(2, 'الاسم قصير جداً'),
})

export const defultTrackValues = { title: '' }