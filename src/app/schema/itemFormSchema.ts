import { supplementFormSchema } from "./supplementFormSchema";

export const itemFormSchema = supplementFormSchema.omit({
  supplementName: true,
});
