import { z } from "zod";

const ImageDetailsSchema = z.object({
  url: z.string(),
});

const ImagesSchema = z.object({
  downsized_medium: ImageDetailsSchema,
});

const GiphyImageSchema = z.object({
  images: ImagesSchema,
  title: z.string(),
});

export const ImageAPIResponseSchema = z.object({
  data: z.array(GiphyImageSchema),
  //todo: needed?
  meta: z.object({
    status: z.number(),
    msg: z.string(),
    response_id: z.string(),
  }),
  pagination: z.object({
    total_count: z.number(),
    count: z.number(),
    offset: z.number(),
  }),
});
