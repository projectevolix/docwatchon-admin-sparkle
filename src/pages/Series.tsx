import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Star, Calendar, Clock, Tv } from "lucide-react";
import { SeriesForm } from "@/components/forms/SeriesForm";

const mockSeries = [
  {
    id: 1,
    title: "Stranger Things",
    poster: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=450&fit=crop",
    year: 2016,
    rating: 8.7,
    category: "Sci-Fi",
    language: "English",
    seasons: 4,
    episodes: 34,
    status: "Published",
  },
  {
    id: 2,
    title: "Breaking Bad",
    poster: "https://images.unsplash.com/photo-1594736797933-d0c501ba2fe7?w=300&h=450&fit=crop",
    year: 2008,
    rating: 9.5,
    category: "Crime",
    language: "English",
    seasons: 5,
    episodes: 62,
    status: "Published",
  },
  {
    id: 3,
    title: "Game of Thrones",
    poster: "https://images.unsplash.com/photo-1489599735854-648090bf0726?w=300&h=450&fit=crop",
    year: 2011,
    rating: 9.2,
    category: "Fantasy",
    language: "English",
    seasons: 8,
    episodes: 73,
    status: "Published",
  },
];

export default function Series() {
  const [searchTerm, setSearchTerm] = useState("");
  const [series, setSeries] = useState(mockSeries);
  const [editingSeries, setEditingSeries] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredSeries = series.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (show) => {
    setEditingSeries(show);
    setIsDialogOpen(true);
  };

  const handleDelete = (seriesId) => {
    setSeries(series.filter(show => show.id !== seriesId));
  };

  const handleSave = (seriesData) => {
    if (editingSeries) {
      setSeries(series.map(show => 
        show.id === editingSeries.id ? { ...show, ...seriesData } : show
      ));
    } else {
      const newSeries = {
        id: Date.now(),
        ...seriesData,
        status: "Draft"
      };
      setSeries([...series, newSeries]);
    }
    setIsDialogOpen(false);
    setEditingSeries(null);
  };

  const totalEpisodes = series.reduce((acc, show) => acc + show.episodes, 0);
  const totalSeasons = series.reduce((acc, show) => acc + show.seasons, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Series</h1>
          <p className="text-muted-foreground mt-2">
            Manage your TV series catalog and episodes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-button hover:shadow-button" onClick={() => setEditingSeries(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Series
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSeries ? "Edit Series" : "Add New Series"}</DialogTitle>
              <DialogDescription>
                {editingSeries ? "Update series information and episodes" : "Add a new TV series to your catalog"}
              </DialogDescription>
            </DialogHeader>
            <SeriesForm 
              series={editingSeries} 
              onSave={handleSave} 
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Series</p>
                <p className="text-2xl font-bold text-foreground">{series.length}</p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Tv className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Seasons</p>
                <p className="text-2xl font-bold text-foreground">{totalSeasons}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Episodes</p>
                <p className="text-2xl font-bold text-foreground">{totalEpisodes}</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">
                  {(series.reduce((acc, s) => acc + s.rating, 0) / series.length).toFixed(1)}
                </p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Series Catalog</CardTitle>
          <CardDescription>
            Search and manage your TV series collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search series by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-muted/50 border-border"
              />
            </div>
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[100px]">Poster</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Seasons</TableHead>
                  <TableHead>Episodes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSeries.map((show) => (
                  <TableRow key={show.id} className="hover:bg-muted/30">
                    <TableCell>
                      <img
                        src={show.poster}
                        alt={show.title}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{show.title}</TableCell>
                    <TableCell>{show.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {show.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{show.category}</Badge>
                    </TableCell>
                    <TableCell>{show.seasons}</TableCell>
                    <TableCell>{show.episodes}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={show.status === "Published" ? "default" : "secondary"}
                        className={show.status === "Published" ? "bg-green-500" : ""}
                      >
                        {show.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(show)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(show.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}