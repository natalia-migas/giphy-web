import { z } from "zod";

const ImageDetailsSchema = z.object({
  url: z.string(),
  //todo: needed?
  width: z.string(),
  height: z.string(),
  size: z.string().optional(),
});

const ImagesSchema = z.object({
  downsized_medium: ImageDetailsSchema,
});

const GiphyImageSchema = z.object({
  images: ImagesSchema,
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
