
import { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Calendar,
  Upload,
  FileText,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useMagazines, useCreateMagazine, useUpdateMagazine, useDeleteMagazine } from "@/hooks/useMagazines";
import { useImageUpload } from "@/hooks/useImageUpload";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  publish_date: z.date({
    required_error: "Publication date is required",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  featured: z.boolean().default(false),
  issue_number: z.coerce.number().min(1, "Issue number must be at least 1").optional(),
});

const MagazineManager = () => {
  return (
    <Routes>
      <Route path="/" element={<MagazineList />} />
      <Route path="/create" element={<MagazineForm />} />
      <Route path="/edit/:id" element={<MagazineForm />} />
    </Routes>
  );
};

const MagazineList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("publish_date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const { data: magazines = [], isLoading } = useMagazines();
  const deleteMutation = useDeleteMagazine();
  
  const filteredMagazines = magazines
    .filter(magazine => 
      magazine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (magazine.description && magazine.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      return sortDirection === 'asc' 
        ? (fieldA > fieldB ? 1 : -1)
        : (fieldA < fieldB ? 1 : -1);
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this magazine?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-insightRed" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Magazines</h1>
        <Button onClick={() => navigate("/admin/magazines/create")}>
          <Plus className="mr-2 h-4 w-4" /> Create Magazine
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search magazines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMagazines.map(magazine => (
          <div 
            key={magazine.id} 
            className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm"
          >
            <div className="relative aspect-[4/5] bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <ImageIcon className="h-10 w-10" />
              </div>
              {magazine.cover_image_url && (
                <img
                  src={magazine.cover_image_url}
                  alt={magazine.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute right-2 top-2">
                <div className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  magazine.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {magazine.featured ? 'Featured' : 'Standard'}
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-lg font-semibold">{magazine.title}</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                {format(new Date(magazine.publish_date), "MMMM yyyy")}
                {magazine.issue_number && ` • Issue ${magazine.issue_number}`}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-3">{magazine.description}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate(`/admin/magazines/edit/${magazine.id}`)}
                >
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500" 
                  onClick={() => handleDelete(magazine.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMagazines.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">No magazines found.</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => navigate("/admin/magazines/create")}
            >
              Create your first magazine
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const MagazineForm = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [uploadedPdf, setUploadedPdf] = useState<string | null>(null);
  
  const createMutation = useCreateMagazine();
  const { uploadImage, uploading } = useImageUpload();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      featured: false,
      publish_date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Generate slug from title
      const slug = values.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const magazineData = {
        ...values,
        slug,
        cover_image_url: coverImage,
        pdf_url: uploadedPdf,
        publish_date: values.publish_date.toISOString().split('T')[0],
      };

      await createMutation.mutateAsync(magazineData);
      navigate("/admin/magazines");
    } catch (error) {
      console.error("Error creating magazine:", error);
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const imageUrl = await uploadImage(e.target.files[0], 'magazines');
        setCoverImage(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedPdf(e.target.files[0].name);
      toast.success("PDF file selected");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate("/admin/magazines")}>
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <h1 className="text-3xl font-bold">New Magazine</h1>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="content" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Magazine title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="publish_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Publication Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Magazine description" 
                        className="h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="issue_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Number (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Issue number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Mark as featured magazine
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  PDF Upload
                </label>
                <div className="mt-2 flex items-center space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose PDF
                  </Button>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handlePdfUpload}
                  />
                  {uploadedPdf && (
                    <span className="text-sm text-muted-foreground">
                      <FileText className="mr-1 inline h-4 w-4" />
                      {uploadedPdf}
                    </span>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Cover Design</h2>
                <p className="text-sm text-muted-foreground">
                  Upload and customize your magazine cover.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Cover Image
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 px-6 py-6 rounded-md">
                      {coverImage ? (
                        <div className="relative">
                          <img 
                            src={coverImage}
                            alt="Cover preview" 
                            className="h-40 object-contain"
                          />
                          <Button 
                            type="button"
                            variant="destructive" 
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setCoverImage(null)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2 flex justify-center text-sm text-gray-600">
                            <Button 
                              type="button"
                              variant="outline" 
                              onClick={() => document.getElementById('cover-upload')?.click()}
                              disabled={uploading}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              {uploading ? 'Uploading...' : 'Upload Cover'}
                            </Button>
                            <input
                              id="cover-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <div className="flex items-center justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate("/admin/magazines")}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Creating...' : 'Create Magazine'}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default MagazineManager;
