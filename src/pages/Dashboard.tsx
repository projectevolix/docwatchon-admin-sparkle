import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Film, 
  Tv, 
  Users, 
  Play, 
  TrendingUp, 
  Clock,
  Star,
  Download
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Movies",
      value: "1,234",
      change: "+12.5%",
      icon: Film,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Series", 
      value: "567",
      change: "+8.2%",
      icon: Tv,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Active Users",
      value: "89,012",
      change: "+23.1%",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Total Views",
      value: "2.4M",
      change: "+15.7%",
      icon: Play,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  const recentActivity = [
    { action: "New movie added", item: "Interstellar", time: "2 hours ago", type: "movie" },
    { action: "Series updated", item: "Breaking Bad", time: "4 hours ago", type: "series" },
    { action: "User registered", item: "john.doe@email.com", time: "6 hours ago", type: "user" },
    { action: "Movie deleted", item: "Old Movie", time: "8 hours ago", type: "movie" },
  ];

  const topContent = [
    { title: "Stranger Things", views: "1.2M", rating: 4.8, type: "series" },
    { title: "The Dark Knight", views: "987K", rating: 4.9, type: "movie" },
    { title: "Game of Thrones", views: "865K", rating: 4.7, type: "series" },
    { title: "Inception", views: "743K", rating: 4.8, type: "movie" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Last updated: 2 minutes ago
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest changes and updates to your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'movie' ? 'bg-blue-500/10 text-blue-500' :
                    activity.type === 'series' ? 'bg-green-500/10 text-green-500' :
                    'bg-purple-500/10 text-purple-500'
                  }`}>
                    {activity.type === 'movie' ? <Film className="h-4 w-4" /> :
                     activity.type === 'series' ? <Tv className="h-4 w-4" /> :
                     <Users className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Content */}
        <Card className="shadow-card bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-primary" />
              Top Content
            </CardTitle>
            <CardDescription>
              Most watched movies and series this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContent.map((content, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-foreground">{content.title}</p>
                      <Badge variant={content.type === 'movie' ? 'default' : 'secondary'} className="text-xs">
                        {content.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Play className="h-3 w-3 mr-1" />
                        {content.views} views
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        {content.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="shadow-card bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system performance and health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Server Load</span>
                <span className="text-sm text-muted-foreground">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Bandwidth</span>
                <span className="text-sm text-muted-foreground">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}