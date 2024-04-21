import { z } from "zod";

const ImageDetailsSchema = z.object({
  url: z.string(),
});

const imagesSchema = z.object({
  downsized_medium: ImageDetailsSchema,
});

const giphyImageSchema = z.object({
  images: imagesSchema,
  title: z.string(),
});

export const imageAPIResponseSchema = z.object({
  data: z.array(giphyImageSchema),
  pagination: z.object({
    total_count: z.number(),
    count: z.number(),
    offset: z.number(),
  }),
});

export type ImagesResponse = z.infer<typeof imageAPIResponseSchema>;
