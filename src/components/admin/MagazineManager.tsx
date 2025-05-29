import React, { useState, useEffect } from 'react';
import { useMagazines, useCreateMagazine, useUpdateMagazine, useDeleteMagazine } from '@/hooks/useMagazines';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit2, Trash2, Plus, Upload, FileText, Calendar, Hash, Star, ExternalLink } from 'lucide-react';
import { slugify } from '@/lib/slugify';

interface Magazine {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  issue_number: number;
  featured: boolean;
}

const MagazineManager = () => {
  const { data: magazines, isLoading, refetch } = useMagazines();
  const { mutate: createMagazine } = useCreateMagazine();
  const { mutate: updateMagazine } = useUpdateMagazine();
  const { mutate: deleteMagazine } = useDeleteMagazine();
  const { uploadImage, uploadPdf, uploading } = useImageUpload();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [issueNumber, setIssueNumber] = useState<number | ''>('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (selectedMagazine) {
      setEditMode(true);
      setTitle(selectedMagazine.title);
      setSlug(selectedMagazine.slug);
      setDescription(selectedMagazine.description);
      setCoverImageUrl(selectedMagazine.cover_image_url);
      setPdfUrl(selectedMagazine.pdf_url);
      setPublishDate(selectedMagazine.publish_date);
      setIssueNumber(selectedMagazine.issue_number);
      setFeatured(selectedMagazine.featured);
    } else {
      setEditMode(false);
      setTitle('');
      setSlug('');
      setDescription('');
      setCoverImageUrl('');
      setPdfUrl('');
      setPublishDate('');
      setIssueNumber('');
      setFeatured(false);
    }
  }, [selectedMagazine]);

  const handleCreateMagazine = async () => {
    if (!title || !description || !publishDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    const newMagazine = {
      title,
      slug: slug || slugify(title),
      description,
      cover_image_url: coverImageUrl,
      pdf_url: pdfUrl,
      publish_date: publishDate,
      issue_number: issueNumber !== '' ? Number(issueNumber) : null,
      featured,
    };

    createMagazine(newMagazine);
    setOpen(false);
    refetch();
  };

  const handleUpdateMagazine = async () => {
    if (!selectedMagazine?.id) return;

    const updatedMagazine = {
      id: selectedMagazine.id,
      title,
      slug: slug || slugify(title),
      description,
      cover_image_url: coverImageUrl,
      pdf_url: pdfUrl,
      publish_date: publishDate,
      issue_number: issueNumber !== '' ? Number(issueNumber) : null,
      featured,
    };

    updateMagazine(updatedMagazine);
    setOpen(false);
    refetch();
  };

  const handleDeleteMagazine = async (id: string) => {
    deleteMagazine(id);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file, "magazines");
      setCoverImageUrl(imageUrl);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handlePdfUpload = async (file: File) => {
    try {
      const pdfUrl = await uploadPdf(file, "magazines");
      setPdfUrl(pdfUrl);
    } catch (error) {
      toast.error("Failed to upload PDF");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Magazines</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Magazine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Magazine' : 'Create New Magazine'}</DialogTitle>
              <DialogDescription>
                {editMode ? 'Edit the magazine details.' : 'Add a new magazine to the website.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">
                  Description
                </Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coverImage" className="text-right">
                  Cover Image
                </Label>
                <div className="col-span-3">
                  <Input type="file" id="coverImage" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }} className="hidden" />
                  <Label htmlFor="coverImage" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md px-3 py-2 text-sm cursor-pointer">
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </Label>
                  {coverImageUrl && <a href={coverImageUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">View Image</a>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pdf" className="text-right">
                  PDF File
                </Label>
                <div className="col-span-3">
                  <Input type="file" id="pdf" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handlePdfUpload(e.target.files[0]);
                    }
                  }} className="hidden" />
                  <Label htmlFor="pdf" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md px-3 py-2 text-sm cursor-pointer">
                    {uploading ? 'Uploading...' : 'Upload PDF'}
                  </Label>
                  {pdfUrl && <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">View PDF</a>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishDate" className="text-right">
                  Publish Date
                </Label>
                <Input type="date" id="publishDate" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issueNumber" className="text-right">
                  Issue Number
                </Label>
                <Input
                  type="number"
                  id="issueNumber"
                  value={issueNumber}
                  onChange={(e) => setIssueNumber(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="featured" className="text-right">
                  Featured
                </Label>
                <div className="col-span-3 flex items-center">
                  <Switch id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(checked)} />
                </div>
              </div>
            </div>
            <Button onClick={editMode ? handleUpdateMagazine : handleCreateMagazine}>
              {editMode ? 'Update Magazine' : 'Create Magazine'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6">
        {magazines?.map((magazine) => (
          <Card key={magazine.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{magazine.title}</CardTitle>
              <CardDescription>{magazine.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published: {new Date(magazine.publish_date).toLocaleDateString()}</p>
                {magazine.issue_number && <p className="text-sm text-gray-500">Issue: {magazine.issue_number}</p>}
                <div className="flex gap-2 mt-2">
                  {magazine.cover_image_url && (
                    <a href={magazine.cover_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Cover Image
                    </a>
                  )}
                  {magazine.pdf_url && (
                    <a href={magazine.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      PDF
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="icon" onClick={() => setSelectedMagazine(magazine)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteMagazine(magazine.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
    </div>
  );
};

export default MagazineManager;
