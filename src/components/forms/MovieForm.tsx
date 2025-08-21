import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload } from "lucide-react";

const categories = [
  "Action", "Adventure", "Comedy", "Drama", "Horror", "Sci-Fi", 
  "Thriller", "Romance", "Documentary", "Animation", "Fantasy", "Crime"
];

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Japanese", "Korean", "Chinese", "Hindi", "Arabic", "Russian"
];

const qualities = ["480p", "720p", "1080p", "4K"];
const providers = ["Netflix", "Amazon Prime", "Hulu", "Disney+", "HBO Max", "Custom"];

export function MovieForm({ movie, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    poster: movie?.poster || "",
    backdrop: movie?.backdrop || "",
    backdropUrl: movie?.backdropUrl || "",
    rating: movie?.rating || "",
    tagline: movie?.tagline || "",
    overview: movie?.overview || "",
    year: movie?.year || "",
    category: movie?.category || "",
    language: movie?.language || "",
    providers: movie?.providers || [{ name: "", videoLink: "", subtitleLink: "", quality: "", provider: "" }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addProvider = () => {
    setFormData({
      ...formData,
      providers: [...formData.providers, { name: "", videoLink: "", subtitleLink: "", quality: "", provider: "" }]
    });
  };

  const removeProvider = (index) => {
    const newProviders = formData.providers.filter((_, i) => i !== index);
    setFormData({ ...formData, providers: newProviders });
  };

  const updateProvider = (index, field, value) => {
    const newProviders = [...formData.providers];
    newProviders[index][field] = value;
    setFormData({ ...formData, providers: newProviders });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Release Year *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-10)</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="1"
              max="10"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="Enter movie tagline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="Enter movie description"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media & Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="poster">Poster URL</Label>
              <Input
                id="poster"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                placeholder="https://example.com/poster.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backdrop">Backdrop Poster URL</Label>
              <Input
                id="backdrop"
                value={formData.backdrop}
                onChange={(e) => setFormData({ ...formData, backdrop: e.target.value })}
                placeholder="https://example.com/backdrop.jpg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="backdropUrl">Backdrop URL</Label>
            <Input
              id="backdropUrl"
              value={formData.backdropUrl}
              onChange={(e) => setFormData({ ...formData, backdropUrl: e.target.value })}
              placeholder="https://example.com/backdrop-large.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Providers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Streaming Providers</CardTitle>
            <Button type="button" onClick={addProvider} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.providers.map((provider, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Provider {index + 1}</Badge>
                  {formData.providers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProvider(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Provider Name</Label>
                    <Input
                      value={provider.name}
                      onChange={(e) => updateProvider(index, "name", e.target.value)}
                      placeholder="e.g., Netflix"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Select value={provider.provider} onValueChange={(value) => updateProvider(index, "provider", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((prov) => (
                          <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Video Link</Label>
                    <Input
                      value={provider.videoLink}
                      onChange={(e) => updateProvider(index, "videoLink", e.target.value)}
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle Link</Label>
                    <Input
                      value={provider.subtitleLink}
                      onChange={(e) => updateProvider(index, "subtitleLink", e.target.value)}
                      placeholder="https://example.com/subtitles.vtt"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Quality</Label>
                  <Select value={provider.quality} onValueChange={(value) => updateProvider(index, "quality", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualities.map((quality) => (
                        <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-button">
          {movie ? "Update Movie" : "Create Movie"}
        </Button>
      </div>
    </form>
  );
}