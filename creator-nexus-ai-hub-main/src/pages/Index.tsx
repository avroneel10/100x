
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Users, TrendingUp, DollarSign, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import CreatorCard from "@/components/CreatorCard";
import CampaignDashboard from "@/components/CampaignDashboard";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<"brand" | "creator" | "admin">("brand");

  // Mock data for creators
  const creators = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjohnson",
      platform: "instagram",
      followers: "2.3M",
      engagement: "4.2%",
      niche: "Fashion & Lifestyle",
      rate: "$5,000",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e31f02?w=400&h=400&fit=crop&crop=face",
      verified: true,
      languages: ["English", "Spanish"],
      location: "Los Angeles, CA"
    },
    {
      id: 2,
      name: "Tech Mike",
      handle: "@techmike",
      platform: "youtube",
      followers: "1.8M",
      engagement: "6.1%",
      niche: "Technology",
      rate: "$8,000",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      languages: ["English"],
      location: "San Francisco, CA"
    },
    {
      id: 3,
      name: "Fitness Emma",
      handle: "@fitnessemma",
      platform: "instagram",
      followers: "950K",
      engagement: "7.8%",
      niche: "Fitness & Health",
      rate: "$3,500",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: false,
      languages: ["English", "French"],
      location: "Miami, FL"
    },
    {
      id: 4,
      name: "Food Explorer",
      handle: "@foodexplorer",
      platform: "tiktok",
      followers: "3.2M",
      engagement: "9.1%",
      niche: "Food & Travel",
      rate: "$6,500",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      languages: ["English", "Italian"],
      location: "New York, NY"
    }
  ];

  const platforms = ["instagram", "youtube", "tiktok", "twitter"];

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(creator.platform);
    return matchesSearch && matchesPlatform;
  });

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const stats = [
    { label: "Active Creators", value: "10,247", icon: Users, color: "text-blue-600" },
    { label: "Campaigns", value: "1,823", icon: Target, color: "text-green-600" },
    { label: "Total Revenue", value: "$2.4M", icon: DollarSign, color: "text-purple-600" },
    { label: "Avg. ROI", value: "340%", icon: TrendingUp, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Creator Discovery Engine
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with top creators across all platforms. AI-powered matching, automated outreach, and seamless campaign management.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">Creator Discovery</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Dashboard</TabsTrigger>
            {userRole === "admin" && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Your Perfect Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search creators by name, niche, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    AI Search
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 mr-2">Platforms:</span>
                  {platforms.map(platform => (
                    <Badge
                      key={platform}
                      variant={selectedPlatforms.includes(platform) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-blue-600 transition-colors capitalize"
                      onClick={() => togglePlatform(platform)}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Creator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreators.map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>

            {filteredCreators.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No creators found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your search or filters.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignDashboard userRole={userRole} />
          </TabsContent>

          {userRole === "admin" && (
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
