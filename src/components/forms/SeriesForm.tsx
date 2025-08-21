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
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

export function SeriesForm({ series, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: series?.title || "",
    poster: series?.poster || "",
    backdrop: series?.backdrop || "",
    backdropUrl: series?.backdropUrl || "",
    rating: series?.rating || "",
    tagline: series?.tagline || "",
    overview: series?.overview || "",
    year: series?.year || "",
    category: series?.category || "",
    language: series?.language || "",
    seasons: series?.seasons || [
      {
        seasonNumber: 1,
        title: "Season 1",
        episodes: [
          { episodeNumber: 1, title: "", videoLink: "", subtitleLink: "", quality: "", provider: "" }
        ]
      }
    ],
  });

  const [openSeasons, setOpenSeasons] = useState([0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addSeason = () => {
    const newSeasonNumber = formData.seasons.length + 1;
    setFormData({
      ...formData,
      seasons: [...formData.seasons, {
        seasonNumber: newSeasonNumber,
        title: `Season ${newSeasonNumber}`,
        episodes: [
          { episodeNumber: 1, title: "", videoLink: "", subtitleLink: "", quality: "", provider: "" }
        ]
      }]
    });
  };

  const removeSeason = (seasonIndex) => {
    const newSeasons = formData.seasons.filter((_, i) => i !== seasonIndex);
    setFormData({ ...formData, seasons: newSeasons });
  };

  const updateSeason = (seasonIndex, field, value) => {
    const newSeasons = [...formData.seasons];
    newSeasons[seasonIndex][field] = value;
    setFormData({ ...formData, seasons: newSeasons });
  };

  const addEpisode = (seasonIndex) => {
    const newSeasons = [...formData.seasons];
    const newEpisodeNumber = newSeasons[seasonIndex].episodes.length + 1;
    newSeasons[seasonIndex].episodes.push({
      episodeNumber: newEpisodeNumber,
      title: "",
      videoLink: "",
      subtitleLink: "",
      quality: "",
      provider: ""
    });
    setFormData({ ...formData, seasons: newSeasons });
  };

  const removeEpisode = (seasonIndex, episodeIndex) => {
    const newSeasons = [...formData.seasons];
    newSeasons[seasonIndex].episodes = newSeasons[seasonIndex].episodes.filter((_, i) => i !== episodeIndex);
    setFormData({ ...formData, seasons: newSeasons });
  };

  const updateEpisode = (seasonIndex, episodeIndex, field, value) => {
    const newSeasons = [...formData.seasons];
    newSeasons[seasonIndex].episodes[episodeIndex][field] = value;
    setFormData({ ...formData, seasons: newSeasons });
  };

  const toggleSeason = (seasonIndex) => {
    setOpenSeasons(prev => 
      prev.includes(seasonIndex) 
        ? prev.filter(i => i !== seasonIndex)
        : [...prev, seasonIndex]
    );
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
              placeholder="Enter series tagline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="Enter series description"
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

      {/* Seasons & Episodes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Seasons & Episodes</CardTitle>
            <Button type="button" onClick={addSeason} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Season
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.seasons.map((season, seasonIndex) => (
            <Card key={seasonIndex} className="border border-border/50">
              <Collapsible 
                open={openSeasons.includes(seasonIndex)} 
                onOpenChange={() => toggleSeason(seasonIndex)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {openSeasons.includes(seasonIndex) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                        <CardTitle className="text-lg">
                          Season {season.seasonNumber}
                        </CardTitle>
                        <Badge variant="secondary">
                          {season.episodes.length} episodes
                        </Badge>
                      </div>
                      {formData.seasons.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSeason(seasonIndex);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Season Title</Label>
                        <Input
                          value={season.title}
                          onChange={(e) => updateSeason(seasonIndex, "title", e.target.value)}
                          placeholder="e.g., Season 1"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Episodes</h4>
                          <Button
                            type="button"
                            onClick={() => addEpisode(seasonIndex)}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Episode
                          </Button>
                        </div>

                        {season.episodes.map((episode, episodeIndex) => (
                          <Card key={episodeIndex} className="border border-border/30">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant="outline">Episode {episode.episodeNumber}</Badge>
                                {season.episodes.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeEpisode(seasonIndex, episodeIndex)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Episode Title</Label>
                                  <Input
                                    value={episode.title}
                                    onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "title", e.target.value)}
                                    placeholder="Enter episode title"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Video Link</Label>
                                  <Input
                                    value={episode.videoLink}
                                    onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "videoLink", e.target.value)}
                                    placeholder="https://example.com/episode.mp4"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Subtitle Link</Label>
                                  <Input
                                    value={episode.subtitleLink}
                                    onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "subtitleLink", e.target.value)}
                                    placeholder="https://example.com/subtitles.vtt"
                                  />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Quality</Label>
                                    <Select 
                                      value={episode.quality} 
                                      onValueChange={(value) => updateEpisode(seasonIndex, episodeIndex, "quality", value)}
                                    >
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
                                  <div className="space-y-2">
                                    <Label>Provider</Label>
                                    <Select 
                                      value={episode.provider} 
                                      onValueChange={(value) => updateEpisode(seasonIndex, episodeIndex, "provider", value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select provider" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {providers.map((provider) => (
                                          <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
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
          {series ? "Update Series" : "Create Series"}
        </Button>
      </div>
    </form>
  );
}