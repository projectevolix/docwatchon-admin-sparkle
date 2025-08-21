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
import { Plus, Search, Edit, Trash2, Star, Calendar, Clock } from "lucide-react";
import { MovieForm } from "@/components/forms/MovieForm";

const mockMovies = [
  {
    id: 1,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1489599735854-648090bf0726?w=300&h=450&fit=crop",
    year: 2014,
    rating: 8.6,
    category: "Sci-Fi",
    language: "English",
    duration: "169 min",
    status: "Published",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1509564324749-471bd272e1ff?w=300&h=450&fit=crop",
    year: 2008,
    rating: 9.0,
    category: "Action",
    language: "English", 
    duration: "152 min",
    status: "Published",
  },
  {
    id: 3,
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    year: 2010,
    rating: 8.8,
    category: "Thriller",
    language: "English",
    duration: "148 min",
    status: "Draft",
  },
];

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState(mockMovies);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setIsDialogOpen(true);
  };

  const handleDelete = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  const handleSave = (movieData) => {
    if (editingMovie) {
      setMovies(movies.map(movie => 
        movie.id === editingMovie.id ? { ...movie, ...movieData } : movie
      ));
    } else {
      const newMovie = {
        id: Date.now(),
        ...movieData,
        status: "Draft"
      };
      setMovies([...movies, newMovie]);
    }
    setIsDialogOpen(false);
    setEditingMovie(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Movies</h1>
          <p className="text-muted-foreground mt-2">
            Manage your movie catalog and content
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-button hover:shadow-button" onClick={() => setEditingMovie(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMovie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
              <DialogDescription>
                {editingMovie ? "Update movie information" : "Add a new movie to your catalog"}
              </DialogDescription>
            </DialogHeader>
            <MovieForm 
              movie={editingMovie} 
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
                <p className="text-sm text-muted-foreground">Total Movies</p>
                <p className="text-2xl font-bold text-foreground">{movies.length}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Star className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-foreground">
                  {movies.filter(m => m.status === "Published").length}
                </p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-foreground">
                  {movies.filter(m => m.status === "Draft").length}
                </p>
              </div>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-orange-500" />
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
                  {(movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1)}
                </p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Star className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Movie Catalog</CardTitle>
          <CardDescription>
            Search and manage your movie collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movies by title or category..."
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
                  <TableHead>Language</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovies.map((movie) => (
                  <TableRow key={movie.id} className="hover:bg-muted/30">
                    <TableCell>
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{movie.title}</TableCell>
                    <TableCell>{movie.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {movie.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{movie.category}</Badge>
                    </TableCell>
                    <TableCell>{movie.language}</TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={movie.status === "Published" ? "default" : "secondary"}
                        className={movie.status === "Published" ? "bg-green-500" : ""}
                      >
                        {movie.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(movie)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(movie.id)}
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