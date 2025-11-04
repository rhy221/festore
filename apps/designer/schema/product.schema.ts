import { describe } from "node:test";
import z from "zod";

export type DesignResType =  {
    _id: string;

    designerId: string;

    title: string;

    description: string;

    imagesUrl: string[];

    fileUrl: string;

    categoryId: string;

    tags: string[];

    price: number;

    type: "auction" | "fixed";

    viewCount: number;

    likeCount: number;

    state: 'approved' | 'notApproved';
}

export type CommentType = {
    _id: string,
    customerId: string,
    customerName: string,
    customerAvatar: string,
    designId: string,
    content: string,
    rating: number,
    createdAt: string,
}

export type CategoryType = {
    _id: string,
   name: string,
   description: string,
   parentCategoryId: string
}

const fileSchema =
  typeof File !== "undefined" ? z.instanceof(File) : z.any();

export const uploadDesignSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),

  images: z
    .array(fileSchema)
    .min(1, "Vui lòng chọn ít nhất 1 ảnh"),

  model: fileSchema,

  categoryId: z.string().min(1),
  tags: z.array(z.string()).optional(),

  price: z.coerce.number().nonnegative(),

  type: z.enum(["fixed", "auction"]),
});

export type UploadDesignType = z.infer<typeof uploadDesignSchema>;

