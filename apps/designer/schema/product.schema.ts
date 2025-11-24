import { describe } from "node:test";
import z, { string } from "zod";

const fileSchema =
  typeof File !== "undefined" ? z.instanceof(File) : z.any();

// export const uploadProductSchema = z
//   .object({
//     title: z.string().min(1, "Title is required"),
//     description: z.string().min(1, "Description is required"),
//     type: z.enum(["fixed", "auction", "gallery"]),
//     images: z
//     .array(fileSchema)
//     .min(1, "Please upload at least one image"),

//     models:  z
//     .array(fileSchema)
//     .min(1, "Please upload model file"),

//     // Price cho buy now
//     price: z.coerce.number().positive().optional(),

//     // Các field cho auction
//     startingPrice: z.coerce.number().positive().optional(),
//     bidIncrement: z.coerce.number().positive().optional(),
//     startTime: z.string().optional(),    
//     endTime: z.string().optional(),  
//   })
//   .superRefine((data, ctx) => {
//     if (data.type === "fixed") {
//       if (data.price === undefined || data.price <= 0) {
//         ctx.addIssue({
//           path: ["price"],
//           message: "Price is required and must be positive",
//           code: z.ZodIssueCode.custom,
//         });
//       }
//     } else if (data.type === "auction") {
//       const requiredFields = ["startingPrice", "bidIncrement", "startTime", "endTime"];
//       requiredFields.forEach((field) => {
//         const value = data[field as keyof typeof data];
//         if (value === undefined || value === "") {
//           ctx.addIssue({
//             path: [field],
//             message: `${field} is required`,
//             code: z.ZodIssueCode.custom,
//           });
//         }
//       });

//     //   if (data.startTime) {
//     //   const startTimeDate = new Date(data.startTime);
//     //   const now = new Date();
//     //   if (startTimeDate < now) {
//     //     ctx.addIssue({
//     //       path: ["startTime"],
//     //       message: "Start time cannot be in the past",
//     //       code: z.ZodIssueCode.custom,
//     //     });
//     //   }
//     // }

//       if (data.startTime && data.endTime) {
//         const start = new Date(data.startTime);
//         const end = new Date(data.endTime);
//         if (end <= start) {
//           ctx.addIssue({
//             path: ["endTime"],
//             message: "End time must be after start time",
//             code: z.ZodIssueCode.custom,
//           });
//         }
//       }
//     }
//   });


// Schema
export const editProductSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["fixed", "auction", "gallery"]),
    
    images: z
    .array(fileSchema).optional(),
    

    oldImages: z
    .array(z.string()),

    models:  z
    .array(fileSchema).optional(),

    oldModels:  z
    .array(z.string()),

    // BỎ .positive() ở đây. Để coerce xử lý input.
    // Nếu input rỗng "" -> thành 0. 0 là number hợp lệ (tạm thời).
    price: z.coerce.number().optional(),
    startingPrice: z.coerce.number().optional(),
    bidIncrement: z.coerce.number().optional(),
    
    startTime: z.string().optional(),    
    endTime: z.string().optional(),  
  })
  .superRefine((data, ctx) => {
    // 1. VALIDATION CHO FIXED PRICE (STORE)
    if (data.type === "fixed") {
      // Kiểm tra: undefined, null, hoặc <= 0 (bao gồm cả trường hợp input rỗng bị coerce thành 0)
      if (!data.price || data.price <= 0) {
        ctx.addIssue({
          path: ["price"],
          message: "Price is required and must be positive",
          code: z.ZodIssueCode.custom,
        });
      }
    } 
    
    // 2. VALIDATION CHO AUCTION
    else if (data.type === "auction") {
      // -- Validate Starting Price --
      if (!data.startingPrice || data.startingPrice <= 0) {
        ctx.addIssue({
          path: ["startingPrice"],
          message: "Starting price is required and must be positive",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Validate Bid Increment --
      if (!data.bidIncrement || data.bidIncrement <= 0) {
        ctx.addIssue({
          path: ["bidIncrement"],
          message: "Bid increment is required and must be positive",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Validate Start Time --
      if (!data.startTime) {
        ctx.addIssue({
          path: ["startTime"],
          message: "Start time is required",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Validate End Time --
      if (!data.endTime) {
        ctx.addIssue({
          path: ["endTime"],
          message: "End time is required",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Logic so sánh ngày tháng --
      if (data.startTime && data.endTime) {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);
        const now = new Date();

        // (Tuỳ chọn) Kiểm tra ngày bắt đầu không được trong quá khứ quá xa (cho phép sai số 1 chút)
        // if (start < now) { ... }

        if (end <= start) {
          ctx.addIssue({
            path: ["endTime"],
            message: "End time must be after start time",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    }
  });


export const uploadProductSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["fixed", "auction", "gallery"]),
    
      images: z
    .array(fileSchema)
    .min(1, "Please upload at least one image"),

    models:  z
    .array(fileSchema)
    .min(1, "Please upload model file"),

    // BỎ .positive() ở đây. Để coerce xử lý input.
    // Nếu input rỗng "" -> thành 0. 0 là number hợp lệ (tạm thời).
    price: z.coerce.number().optional(),
    startingPrice: z.coerce.number().optional(),
    bidIncrement: z.coerce.number().optional(),
    
    startTime: z.string().optional(),    
    endTime: z.string().optional(),  
  })
  .superRefine((data, ctx) => {
    // 1. VALIDATION CHO FIXED PRICE (STORE)
    if (data.type === "fixed") {
      // Kiểm tra: undefined, null, hoặc <= 0 (bao gồm cả trường hợp input rỗng bị coerce thành 0)
      if (!data.price || data.price <= 0) {
        ctx.addIssue({
          path: ["price"],
          message: "Price is required and must be positive",
          code: z.ZodIssueCode.custom,
        });
      }
    } 
    
    // 2. VALIDATION CHO AUCTION
    else if (data.type === "auction") {
      // -- Validate Starting Price --
      if (!data.startingPrice || data.startingPrice <= 0) {
        ctx.addIssue({
          path: ["startingPrice"],
          message: "Starting price is required and must be positive",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Validate Bid Increment --
      if (!data.bidIncrement || data.bidIncrement <= 0) {
        ctx.addIssue({
          path: ["bidIncrement"],
          message: "Bid increment is required and must be positive",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Validate Start Time --
      if (!data.startTime) {
        ctx.addIssue({
          path: ["startTime"],
          message: "Start time is required",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Validate End Time --
      if (!data.endTime) {
        ctx.addIssue({
          path: ["endTime"],
          message: "End time is required",
          code: z.ZodIssueCode.custom,
        });
      }

      // -- Logic so sánh ngày tháng --
      if (data.startTime && data.endTime) {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);
        const now = new Date();

        // (Tuỳ chọn) Kiểm tra ngày bắt đầu không được trong quá khứ quá xa (cho phép sai số 1 chút)
        // if (start < now) { ... }

        if (end <= start) {
          ctx.addIssue({
            path: ["endTime"],
            message: "End time must be after start time",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    }
  });

export type DesignerProfile = {
  name: string;
  email: string;
  avatarUrl: string;
}

export type ModelFile ={
  publicId: string;

  format: string;  

  originalName: string;

  size: number;
}

export type DesignResType =  {
    _id: string;

    designerId: string;

    designerProfile: DesignerProfile;

    title: string;

    description: string;

    imageUrls: string[];

    modelFiles: ModelFile[];

    purchaseCount: number;

    totalEarning: number;

    categoryId: string;

    tags: string[];

    price: number;

    type: "auction" | "fixed" | "gallery";

    startingPrice: number;
    
    bidIncrement: number;

    startTime: string;

    endTime: string;

    viewCount: number;

    likeCount: number;

    isDesignerFollowed: boolean

    isLiked: boolean

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
export type UploadProductType = z.infer<typeof uploadProductSchema>;
export type EditProductType = z.infer<typeof editProductSchema>;
export type GetGalleryItemsResType = DesignResType[];
export type GetStoreItemsResType = DesignResType[];
