
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare
} from "lucide-react";

interface CampaignDashboardProps {
  userRole: "brand" | "creator" | "admin";
}

const CampaignDashboard = ({ userRole }: CampaignDashboardProps) => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: "Summer Fashion Launch",
      brand: "StyleCorp",
      status: "active",
      progress: 75,
      budget: "$25,000",
      creators: 5,
      startDate: "2024-01-15",
      endDate: "2024-02-28",
      roi: "285%",
      impressions: "2.3M",
      engagement: "156K"
    },
    {
      id: 2,
      name: "Tech Product Review",
      brand: "TechGiant",
      status: "planning",
      progress: 25,
      budget: "$50,000",
      creators: 8,
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      roi: "N/A",
      impressions: "N/A",
      engagement: "N/A"
    },
    {
      id: 3,
      name: "Fitness Challenge",
      brand: "FitLife",
      status: "completed",
      progress: 100,
      budget: "$15,000",
      creators: 3,
      startDate: "2023-12-01",
      endDate: "2024-01-10",
      roi: "340%",
      impressions: "1.8M",
      engagement: "89K"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "planning": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4" />;
      case "planning": return <AlertCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  // Mock workflow stages
  const workflowStages = [
    { stage: "Discovery", status: "completed", description: "Creators identified and contacted" },
    { stage: "Outreach", status: "completed", description: "Initial negotiations completed" },
    { stage: "Contract", status: "active", description: "Contracts signed and approved" },
    { stage: "Content", status: "pending", description: "Content creation in progress" },
    { stage: "Review", status: "pending", description: "Content review and approval" },
    { stage: "Publishing", status: "pending", description: "Content publishing scheduled" },
    { stage: "Analytics", status: "pending", description: "Performance tracking and reporting" }
  ];

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">$180K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Creators Engaged</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. ROI</p>
                <p className="text-2xl font-bold">312%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Campaign Management</h2>
            <Button>Create New Campaign</Button>
          </div>
          
          <div className="grid gap-4">
            {campaigns.map(campaign => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {campaign.name}
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {getStatusIcon(campaign.status)}
                          {campaign.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-600">{campaign.brand}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                    >
                      {selectedCampaign === campaign.id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold">{campaign.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Creators</p>
                      <p className="font-semibold">{campaign.creators}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className="font-semibold text-green-600">{campaign.roi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Impressions</p>
                      <p className="font-semibold">{campaign.impressions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Engagement</p>
                      <p className="font-semibold">{campaign.engagement}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                  
                  {selectedCampaign === campaign.id && (
                    <div className="mt-6 pt-4 border-t space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Start Date
                          </p>
                          <p className="font-medium">{campaign.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            End Date
                          </p>
                          <p className="font-medium">{campaign.endDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          View Contract
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Messages
                        </Button>
                        <Button size="sm" variant="outline">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <h2 className="text-2xl font-bold">Campaign Workflow</h2>
          <p className="text-gray-600">End-to-end campaign lifecycle tracking</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Summer Fashion Launch - Workflow Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowStages.map((stage, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stage.status === 'completed' ? 'bg-green-500 text-white' :
                      stage.status === 'active' ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{stage.stage}</h3>
                        <Badge variant={
                          stage.status === 'completed' ? 'default' :
                          stage.status === 'active' ? 'secondary' : 'outline'
                        }>
                          {stage.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Reach</span>
                    <span className="font-bold">4.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement Rate</span>
                    <span className="font-bold">6.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Click-through Rate</span>
                    <span className="font-bold">2.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-bold">1.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>ROI Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Spend</span>
                    <span className="font-bold">$90,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue Generated</span>
                    <span className="font-bold text-green-600">$281,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit</span>
                    <span className="font-bold text-green-600">$191,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <span className="font-bold text-green-600">312%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDashboard;
