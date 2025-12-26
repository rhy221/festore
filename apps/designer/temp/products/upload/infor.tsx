// "use client"
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@workspace/ui/components/input";
// import { Textarea } from "@workspace/ui/components/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@workspace/ui/components/select";

// import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
// import { Card, CardContent } from "@workspace/ui/components/card";
// import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
// import { useCategories } from "@/queries/useProduct";
// import { Skeleton } from "@workspace/ui/components/skeleton";

// export function Infor() {

//   const {control} = useFormContext();
//   const query = useCategories();

//   if(query.isLoading)
//     return(<InforSkeleton />)
//   return( 

//           <Card>
//               <CardContent>
//                 <div className="space-y-6">
//               {/* tên mẫu */}
//                 <FieldGroup>
//                   <Controller
//                   name="title"
//                   control={control}
//                   render={({field, fieldState}) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//                         Tên mẫu
//                       </FieldLabel>
//                       <Input
//                       {...field}
//                       id={field.name}
//                       name={field.name}
//                       required
//                       className="w-full"
//                      placeholder="Nhập tên mẫu thiết kế"
//                     />
//                     {fieldState.invalid && (
//                                             <FieldError errors={[fieldState.error]} />
//                                               )}
//                     </Field>
//                   )}>

//                   </Controller>
               
//               {/* mô tả */}
//                   <Controller
//                   name="description"
//                   control={control}
//                   render={({field, fieldState}) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//                         Mô tả
//                       </FieldLabel>
//                       <Textarea
//                       {...field}
//                   id={field.name}
//                   name={field.name}
//                   rows={6}
//                   className="w-full resize-none"
//                   placeholder="Mô tả chi tiết về mẫu thiết kế..."
//                 />
//                     </Field>
//                   )}>

//                   </Controller>

//                   <Controller
//                   name="categoryId"
//                   control={control}
//                   render={({field, fieldState}) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//                         Thể loại
//                       </FieldLabel>
//                       <Select
//                       name={field.name}
//                       value={field.value}
//                       onValueChange={field.onChange} required>
//                   <SelectTrigger 
//                   id={field.name}
//                   name={field.name} 
//                   className="w-full">
//                     <SelectValue placeholder="Chọn thể loại" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     {query.data?.map((c) => (
//                       <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
//                     ))}
                
//                   </SelectContent>
//                 </Select>
//                 {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                     </Field>
//                   )}>

//                   </Controller>

//               {/* Select thể loại */}
//                    <Controller
//                   name="type"
//                   control={control}
//                   render={({field, fieldState}) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//                   Hình thức
//                       </FieldLabel>
//                       <Select
//                       name={field.name}
//                       value={field.value}
//                       onValueChange={field.onChange}
//                       required>
//                   <SelectTrigger 
//                   id={field.name}
//                   name={field.name} 
//                   className="w-full">
//                     <SelectValue placeholder="Chọn hình thức" />
//                   </SelectTrigger>

//                    <SelectContent>
//                       <SelectItem value={"fixed"}>Trực tiếp</SelectItem>
//                       <SelectItem value={"auction"}>Đấu giá</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {fieldState.invalid && (
//                                             <FieldError errors={[fieldState.error]} />
//                                           )}
//                     </Field>
//                   )}>

//                   </Controller>

//                       {/* giá */}
//                   <Controller
//                   name="price"
//                   control={control}
//                   render={({field, fieldState}) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//                         Giá
//                       </FieldLabel>
//                       <Input
//                       {...field}
//                       id={field.name}
//                       name={field.name}
//                       type="number"
//                       min={1}
//                       className="w-full"
//                       required
//                      placeholder="Nhập tên mẫu thiết kế"
//                     />
//                     {fieldState.invalid && (
//                                                 <FieldError errors={[fieldState.error]} />
//                                               )}
//                     </Field>
//                   )}>

//                   </Controller>
                
//                 </FieldGroup>
        
//                 </div>
//               </CardContent>
//             </Card>)
// }

// export function InforSkeleton() {
//   return(
//      <Card>
//       <CardContent className="space-y-6 py-6">
//         {/* Tên mẫu */}
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-20" /> {/* label */}
//           <Skeleton className="h-10 w-full rounded-md" /> {/* input */}
//         </div>

//         {/* Mô tả */}
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-16" /> {/* label */}
//           <Skeleton className="h-32 w-full rounded-md" /> {/* textarea */}
//         </div>

//         {/* Thể loại */}
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-20" /> {/* label */}
//           <Skeleton className="h-10 w-full rounded-md" /> {/* select */}
//         </div>

//         {/* Hình thức */}
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-20" /> {/* label */}
//           <Skeleton className="h-10 w-full rounded-md" /> {/* select */}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }