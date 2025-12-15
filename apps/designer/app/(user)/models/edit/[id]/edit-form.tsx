// app/create-auction/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProductSchema, EditProductType, uploadDesignSchema, uploadProductSchema, UploadProductType } from '@/schema/product.schema';
import { useUploadAuction } from '@/queries/useAuction';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { EditFiles, UploadFiles, UploadImages } from '@/components/upload-files';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Spinner } from '@workspace/ui/components/spinner';
import { useCategories, useEditProduct, useProduct, useUploadProduct } from '@/queries/useProduct';
import { formatToLocalInput } from '@/lib/utils';


export default function EditForm({ id }: { id: string  }) 
{
  const priceStep =  1000;
  const router = useRouter();

  const {data: categories, isLoading: categoriesLoading} = useCategories();
  const [styles, setStyles] = useState<string[]>([]);

  const form = useForm<EditProductType>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
    title: "",
    description: "",
    categoryId: "",
    style: "",
    gender: "",
    images: [],
    oldImages: [],
    models: [],
    oldModels: [],
    type: "gallery",
    price: 0,
    startingPrice: 0,
    bidIncrement: 0,
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
          if(design)
          {
            form.setValue("style", design.style);
          }
        }
      }
  }, [form.watch("categoryId")])

  const {data: design, isLoading: loadingDesign} = useProduct(id)
  const editMutation = useEditProduct();

  const now = new Date().toISOString().slice(0, 16);
  
  useEffect(() => {
  if (design) {
    console.log(design);
    form.reset({
      title: design.title,
      description: design.description,
      categoryId: design.categoryId,
      style: design.style,
      gender: design.gender,
      type: design.type,
      oldImages: design.imageUrls || [],
      oldModels: design.modelFiles.map(m => m.publicId) || [],
        images: [],
        models: [],
      price: design.price || 0,
      startingPrice: design.startingPrice || 0,
      bidIncrement: design.bidIncrement || 1,
      startTime: formatToLocalInput(design.startTime) || "",
      endTime: formatToLocalInput(design.endTime) || "",
    });
  }
  }, [design, form]);
  

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

  const handleSubmit = async (data: EditProductType) => {

    const formData = new FormData();
    if(data.title)
      formData.append("title", data.title);
    
    if(data.description)
      formData.append("description", data.description ?? "");
    
    if(data.categoryId)
      formData.append("categoryId", data.categoryId);
    
    if(data.style)
      formData.append("style", data.style);

    if(data.gender)
      formData.append("gender", data.gender);

    if(data.images)
    data.images.map((file) => {
      formData.append("images", file);
    });

    if(data.models)
    data.models.map((file) => {
      formData.append("models", file);
    });

    if(data.oldImages)
    data.oldImages.map((file) => {
      formData.append("oldImages", file);
    });

    if(data.oldModels)
    data.oldModels.map((file) => {
      formData.append("oldModels", file);
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
        console.log(new Date(data.startTime ?? "").toISOString());
        console.log(design?.startTime);
    }

    if(editMutation.isPending) return

    try {
      const result = await editMutation.mutateAsync({data:formData, id: id})
        alert('Design edit successfully!');
   

    } catch(error) {
      console.log(error)
    }

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
                placeholder="e.g., Vintage Rolex Watch"
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
                required
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
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
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
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
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
                      <FieldLabel htmlFor={field.name} className="block text-sm font-medium text-gray-700">
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

          <EditFiles />
      
          <p>{`Type: ${design?.type}`}</p>

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
                min="0"
                step={priceStep}
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
                min="0"
                step={priceStep}
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
            {editMutation.isPending ? (<Spinner />) : 
            ("Edit")}
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
      
     
        </CardContent>
      </Card>
      
    </div>
  );
}




