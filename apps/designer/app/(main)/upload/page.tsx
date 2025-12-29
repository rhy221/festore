// app/create-auction/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadDesignSchema, uploadProductSchema, UploadProductType } from '@/schemas/product.schema';
import { useUploadAuction } from '@/queries/useAuction';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { UploadFiles, UploadImages } from '@/components/upload-files';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Spinner } from '@workspace/ui/components/spinner';
import { useCategories, useUploadProduct } from '@/queries/useProduct';


export default function CreateAuctionPage() {
  const priceStep =  1000;
  const router = useRouter();

  const {data: categories, isLoading: categoriesLoading} = useCategories();
  const [styles, setStyles] = useState<string[]>([]);
  
 
  const form = useForm<UploadProductType>({
    resolver: zodResolver(uploadProductSchema),
    defaultValues: {
    title: "",
    description: "",
    categoryId: "",
    style: "",
    gender:"",
    images: [],
    models: [],
    type: "gallery",
    price: 1,
    startingPrice: 1,
    bidIncrement: 1,
    startTime: "",
    endTime: ""
    
  }
  })

   useEffect(() => {
      const category = form.watch("categoryId"); 
      if(category) {
        const currentCategory = categories?.find((ca) => ca._id === category)
        if(currentCategory) {
          setStyles(currentCategory.styles);
        }
      }
  }, [form.watch("categoryId")])
  const uploadMutation = useUploadProduct();

  const now = new Date().toISOString().slice(0, 16);
  

  

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleImageChange = (index: number, value: string) => {
  //   const newImages = [...formData.images];
  //   newImages[index] = value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: newImages,
  //   }));
  // };

  // const addImageField = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: [...prev.images, ''],
  //   }));
  // };

  // const removeImageField = (index: number) => {
  //   const newImages = formData.images.filter((_, i) => i !== index);
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: newImages.length > 0 ? newImages : [''],
  //   }));
  // };

  const handleSubmit = async (data: UploadProductType) => {
    console.log("in");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description ?? "");
    formData.append("categoryId", data.categoryId);
    formData.append("style", data.style);
    formData.append("gender", data.gender);

    formData.append("type", data.type);
    
    data.images.map((file) => {
      formData.append("images", file);
    });

    data.models.map((file) => {
      formData.append("models", file);
    });

    // data.tags?.map((tag) => {
    //   formData.append("tags", tag);
    // });


    if(data.type === "fixed") {
      formData.append("price", String(data.price));
    }

    if(data.type === "auction") {
      formData.append("startingPrice", String(data.startingPrice));
      formData.append("bidIncrement", String(data.bidIncrement));
      formData.append("startTime", new Date(data.startTime ?? "").toISOString());
      formData.append("endTime", new Date(data.endTime ?? "").toISOString())

    }

    if(uploadMutation.isPending) return

    try {
      const result = await uploadMutation.mutateAsync(formData)
      form.reset();
      if(result.type === "auction")
        router.push(`/auction/detail/${result._id}`)
      else 
        router.push(`/detail/${result._id}`)


    } catch(error) {
      console.log(error)
    }

    
    // try {
    //   const payload = {
    //     title: formData.title,
    //     description: formData.description,
    //     startingPrice: Number(formData.startingPrice),
    //     bidIncrement: Number(formData.bidIncrement) || 1000,
    //     startTime: new Date(formData.startTime).toISOString(),
    //     endTime: new Date(formData.endTime).toISOString(),
    //     images: formData.images.filter((img) => img.trim() !== ''),
    //   };

    //   const token = localStorage.getItem('accessToken');
    //   const res = await fetch('http://localhost:3003/auctions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + (token ?? "")
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!res.ok) {
    //     const error = await res.json();
    //     throw new Error(error.message || 'Failed to create auction');
    //   }

    //   const data = await res.json();
    //   alert('Auction created successfully!');
    //   router.push(`/auction/${data._id}`);
    // } catch (error: any) {
    //   console.error('Error creating auction:', error);
    //   alert(error.message || 'Failed to create auction');
    // } finally {
    //   // setLoading(false);
    // }
  };



  return (
    <div className="max-w-3xl w-[80%] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Upload your design</h1>
        <p className="text-gray-600">List your item for everyone to see</p>
      </div>
      <Card>
        <CardContent>
          <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} method='POST' className="space-y-6">
        {/* Title */}
        <FieldGroup>
          <Controller
          name='title'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Title
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type='text'
                required
                placeholder=""
              >
              </Input>
               {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
            </Field>
          )}>

          </Controller>

            {/* Description */}
          <Controller
          name='description'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                rows={6}
                placeholder="Describe your item in detail..."
              >
              </Textarea>
               {fieldState.invalid && (
                                          <FieldError errors={[fieldState.error]} />
                                        )}
            </Field>
          )}>

          </Controller>

           <Controller
                  name="categoryId"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium ">
                        Category
                      </FieldLabel>
                      <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange} required>
                  <SelectTrigger 
                  id={field.name}
                  name={field.name} 
                  className="w-full">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>

                  <SelectContent>
                      {categories && categories.map((ca => (
                        <SelectItem key={ca._id} value={ca._id}>{ca.name}</SelectItem>
                      )))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                    </Field>
                  )}>

                  </Controller>

                   <Controller
                  name="style"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium ">
                        Styles
                      </FieldLabel>
                      <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange} required>
                  <SelectTrigger 
                  id={field.name}
                  name={field.name} 
                  className="w-full">
                    <SelectValue placeholder="Choose style" />
                  </SelectTrigger>

                  <SelectContent>
                      {styles && styles.map((st => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      )))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                    </Field>
                  )}>

                  </Controller>

                   <Controller
                  name="gender"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium ">
                        Gender
                      </FieldLabel>
                      <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange} required>
                  <SelectTrigger 
                  id={field.name}
                  name={field.name} 
                  className="w-full">
                    <SelectValue placeholder="Choose gender" />
                  </SelectTrigger>

                  <SelectContent>
                      <SelectItem value={"Male"}>Male</SelectItem>
                      <SelectItem value={"Female"}>Female</SelectItem>
                      <SelectItem value={"Unisex"}>Unisex</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                    </Field>
                  )}>

                  </Controller>
        </FieldGroup>

          <UploadFiles />
        {/* Images */}
        {/* <div>
          <label className="block text-sm font-medium mb-2">Images (URLs)</label>
          <div className="space-y-3">
            {formData.images.map((img, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            + Add Another Image
          </button>
        </div> */}

           <Controller
                  name="type"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium ">
                        Format
                      </FieldLabel>
                      <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange} required>
                  <SelectTrigger 
                  id={field.name}
                  name={field.name} 
                  className="w-full">
                    <SelectValue placeholder="Choose format" />
                  </SelectTrigger>

                  <SelectContent>
                      <SelectItem value={"gallery"}>Gallery</SelectItem>
                      <SelectItem value={"fixed"}>Store</SelectItem>
                      <SelectItem value={"auction"}>Auction</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                    </Field>
                  )}>

                  </Controller>
          {form.watch("type") === "fixed" ? (
            <div>
              <Controller
          name='price'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Price (VND)
              </FieldLabel>
                <Input
                {...field}
                id={field.name}
                type='number'
                min="1"
                // step={priceStep}
                required={form.watch("type") === "fixed"}
                placeholder="1000000"
              >
              </Input>
               {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
            </Field>
          )}>

          </Controller>
            </div>
          ) : form.watch("type") === "auction" && (
            <FieldGroup>
 {/* Pricing */}
        <Controller
          name='startingPrice'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Starting Price (VND)
              </FieldLabel>
                <Input
                {...field}
                id={field.name}
                type='number'
                min="1"
                // step={priceStep}
                required={form.watch("type") === "auction"}
                placeholder="1000000"
              >
              </Input>
               {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
            </Field>
          )}>

          </Controller>

          <Controller
          name='bidIncrement'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
              Bid Increment (VND)
              </FieldLabel>
                <Input
                {...field}
                id={field.name}
                type='number'
                min={1}
                required={form.watch("type") === "auction"}
                placeholder="1000000"
              >
              </Input>
              <FieldDescription>Minimum amount for each bid increase</FieldDescription>
               {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
            </Field>
          )}>

          </Controller>

        {/* Timing */}
          <Controller
          name='startTime'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
              Start Time
              </FieldLabel>
                <Input
                {...field}
                id={field.name}
                type="datetime-local"
                min={now}
                required={form.watch("type") === "auction"}              
                >
              </Input>
               {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
            </Field>
          )}>

          </Controller>

          <Controller
          name='endTime'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
              End Time
              </FieldLabel>
                <Input
                {...field}
                id={field.name}
                type="datetime-local"
                min={form.watch("startTime") || now}
                required={form.watch("type") === "auction"}              
                >
              </Input>
               {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
            </Field>
          )}>

          </Controller>
          </FieldGroup>
          )}
          
       


        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="submit"
            // disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? (<Spinner />) : 
            form.watch("type") === "auction" ? 'Create':
            'Upload'}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>

      </FormProvider>
      
      {/* Preview */}
      {/* <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-2">{formData.title || 'Auction Title'}</h3>
          <p className="text-gray-700 mb-4">{formData.description || 'Auction description...'}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>
              Starting Price:{' '}
              <strong className="text-blue-600">
                {formData.startingPrice
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(Number(formData.startingPrice))
                  : '0 ₫'}
              </strong>
            </span>
            {formData.bidIncrement && (
              <span>
                Bid Increment:{' '}
                <strong>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(Number(formData.bidIncrement))}
                </strong>
              </span>
            )}
          </div>
        </div>
      </div> */}
        </CardContent>
      </Card>
      
    </div>
  );
}




// // app/create-auction/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function CreateAuctionPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     startingPrice: '',
//     bidIncrement: '',
//     startTime: '',
//     endTime: '',
//     images: [''],
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (index: number, value: string) => {
//     const newImages = [...formData.images];
//     newImages[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       images: newImages,
//     }));
//   };

//   const addImageField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ''],
//     }));
//   };

//   const removeImageField = (index: number) => {
//     const newImages = formData.images.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       images: newImages.length > 0 ? newImages : [''],
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         title: formData.title,
//         description: formData.description,
//         startingPrice: Number(formData.startingPrice),
//         bidIncrement: Number(formData.bidIncrement) || 1000,
//         startTime: new Date(formData.startTime).toISOString(),
//         endTime: new Date(formData.endTime).toISOString(),
//         images: formData.images.filter((img) => img.trim() !== ''),
//       };

//       const token = localStorage.getItem('accessToken');
//       const res = await fetch('http://localhost:3003/auctions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + (token ?? "")
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message || 'Failed to create auction');
//       }

//       const data = await res.json();
//       alert('Auction created successfully!');
//       router.push(`/auction/${data._id}`);
//     } catch (error: any) {
//       console.error('Error creating auction:', error);
//       alert(error.message || 'Failed to create auction');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Set minimum datetime to current time
//   const now = new Date();
//   const minDateTime = now.toISOString().slice(0, 16);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold mb-2">Create New Auction</h1>
//         <p className="text-gray-600">List your item for auction</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium mb-2">
//             Title *
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="e.g., Vintage Rolex Watch"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium mb-2">
//             Description *
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={6}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Describe your item in detail..."
//           />
//         </div>

//         {/* Images */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Images (URLs)</label>
//           <div className="space-y-3">
//             {formData.images.map((img, index) => (
//               <div key={index} className="flex gap-2">
//                 <input
//                   type="url"
//                   value={img}
//                   onChange={(e) => handleImageChange(index, e.target.value)}
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 {formData.images.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeImageField(index)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button
//             type="button"
//             onClick={addImageField}
//             className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//           >
//             + Add Another Image
//           </button>
//         </div>

//         {/* Pricing */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="startingPrice" className="block text-sm font-medium mb-2">
//               Starting Price (VND) *
//             </label>
//             <input
//               type="number"
//               id="startingPrice"
//               name="startingPrice"
//               value={formData.startingPrice}
//               onChange={handleChange}
//               required
//               min="0"
//               step="1000"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="1000000"
//             />
//           </div>

//           <div>
//             <label htmlFor="bidIncrement" className="block text-sm font-medium mb-2">
//               Bid Increment (VND)
//             </label>
//             <input
//               type="number"
//               id="bidIncrement"
//               name="bidIncrement"
//               value={formData.bidIncrement}
//               onChange={handleChange}
//               min="0"
//               step="1000"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="10000"
//             />
//             <p className="text-sm text-gray-600 mt-1">Minimum amount for each bid increase</p>
//           </div>
//         </div>

//         {/* Timing */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="startTime" className="block text-sm font-medium mb-2">
//               Start Time *
//             </label>
//             <input
//               type="datetime-local"
//               id="startTime"
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleChange}
//               required
//               min={minDateTime}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label htmlFor="endTime" className="block text-sm font-medium mb-2">
//               End Time *
//             </label>
//             <input
//               type="datetime-local"
//               id="endTime"
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleChange}
//               required
//               min={formData.startTime || minDateTime}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//           >
//             {loading ? 'Creating Auction...' : 'Create Auction'}
//           </button>
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="px-6 py-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>

//       {/* Preview */}
//       <div className="mt-12 p-6 bg-gray-50 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Preview</h2>
//         <div className="bg-white p-6 rounded-lg border border-gray-200">
//           <h3 className="text-2xl font-bold mb-2">{formData.title || 'Auction Title'}</h3>
//           <p className="text-gray-700 mb-4">{formData.description || 'Auction description...'}</p>
//           <div className="flex gap-4 text-sm text-gray-600">
//             <span>
//               Starting Price:{' '}
//               <strong className="text-blue-600">
//                 {formData.startingPrice
//                   ? new Intl.NumberFormat('vi-VN', {
//                       style: 'currency',
//                       currency: 'VND',
//                     }).format(Number(formData.startingPrice))
//                   : '0 ₫'}
//               </strong>
//             </span>
//             {formData.bidIncrement && (
//               <span>
//                 Bid Increment:{' '}
//                 <strong>
//                   {new Intl.NumberFormat('vi-VN', {
//                     style: 'currency',
//                     currency: 'VND',
//                   }).format(Number(formData.bidIncrement))}
//                 </strong>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }