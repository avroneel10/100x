
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  MessageSquare, 
  Heart,
  Instagram,
  Youtube
} from "lucide-react";

interface Creator {
  id: number;
  name: string;
  handle: string;
  platform: string;
  followers: string;
  engagement: string;
  niche: string;
  rate: string;
  avatar: string;
  verified: boolean;
  languages: string[];
  location: string;
}

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard = ({ creator }: CreatorCardProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "youtube":
        return "bg-red-500";
      case "tiktok":
        return "bg-black";
      default:
        return "bg-blue-500";
    }
  };

  // Mock additional data for profile
  const mockData = {
    recentPosts: [
      { id: 1, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop", likes: "12.3K", comments: "567" },
      { id: 2, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=300&fit=crop", likes: "8.9K", comments: "234" },
      { id: 3, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop", likes: "15.2K", comments: "891" }
    ],
    audienceInsights: {
      ageGroups: [
        { age: "18-24", percentage: 35 },
        { age: "25-34", percentage: 42 },
        { age: "35-44", percentage: 18 },
        { age: "45+", percentage: 5 }
      ],
      topCountries: ["United States", "Canada", "United Kingdom", "Australia"],
      genderSplit: { male: 45, female: 55 }
    },
    pastCollaborations: [
      { brand: "Nike", campaign: "Summer Collection", performance: "+23% engagement" },
      { brand: "Apple", campaign: "iPhone Launch", performance: "+18% reach" },
      { brand: "Starbucks", campaign: "Holiday Special", performance: "+31% conversion" }
    ]
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                    {creator.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{creator.handle}</p>
                </div>
              </div>
              <div className={`p-2 rounded-lg text-white ${getPlatformColor(creator.platform)}`}>
                {getPlatformIcon(creator.platform)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <Badge variant="secondary" className="text-xs">
                {creator.niche}
              </Badge>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{creator.followers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{creator.engagement}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  {creator.location}
                </div>
                <div className="flex items-center gap-1 font-semibold text-green-600">
                  <DollarSign className="h-4 w-4" />
                  {creator.rate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{creator.name}</span>
                {creator.verified && <CheckCircle className="h-5 w-5 text-blue-500" />}
              </div>
              <p className="text-gray-600">{creator.handle} • {creator.niche}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="collaborations">Past Work</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="font-bold text-lg">{creator.followers}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="font-bold text-lg">{creator.engagement}</div>
                <div className="text-sm text-gray-600">Engagement</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="font-bold text-lg">{creator.rate}</div>
                <div className="text-sm text-gray-600">Rate per post</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <MessageSquare className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="font-bold text-lg">24h</div>
                <div className="text-sm text-gray-600">Response time</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Languages</h3>
              <div className="flex gap-2">
                {creator.languages.map(lang => (
                  <Badge key={lang} variant="outline">{lang}</Badge>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Creator
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to List
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Age Demographics</h3>
                <div className="space-y-3">
                  {mockData.audienceInsights.ageGroups.map(group => (
                    <div key={group.age} className="flex items-center justify-between">
                      <span className="text-sm">{group.age}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Top Countries</h3>
                <div className="space-y-2">
                  {mockData.audienceInsights.topCountries.map((country, index) => (
                    <div key={country} className="flex items-center gap-2">
                      <span className="text-sm font-medium">#{index + 1}</span>
                      <span className="text-sm">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <h3 className="font-semibold">Recent Posts</h3>
            <div className="grid grid-cols-3 gap-4">
              {mockData.recentPosts.map(post => (
                <div key={post.id} className="space-y-2">
                  <img 
                    src={post.image} 
                    alt="Recent post" 
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="collaborations" className="space-y-6">
            <h3 className="font-semibold">Past Collaborations</h3>
            <div className="space-y-4">
              {mockData.pastCollaborations.map((collab, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{collab.brand}</h4>
                      <p className="text-sm text-gray-600">{collab.campaign}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {collab.performance}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorCard;
