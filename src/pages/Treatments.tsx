import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Camera, 
  Calendar,
  Droplets,
  Thermometer,
  Sun,
  Plus,
  MoreVertical,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Treatments = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('active');

  const treatments = [
    {
      id: '1',
      plantName: 'Tomato Plant #1',
      disease: 'Late Blight',
      severity: 'moderate',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-05',
      currentDay: 8,
      totalDays: 21,
      progress: 38,
      nextAction: 'Apply copper fungicide',
      nextActionDue: '2024-01-23T10:00:00',
      lastApplication: '2024-01-21T09:30:00',
      products: [
        { name: 'Copper Fungicide', remaining: 65, total: 100, unit: 'ml' },
        { name: 'NPK Booster', remaining: 80, total: 100, unit: 'g' }
      ],
      images: {
        before: '/placeholder.svg',
        current: '/placeholder.svg'
      },
      notes: 'Plant showing improvement, new growth visible'
    },
    {
      id: '2',
      plantName: 'Wheat Crop Section A',
      disease: 'Rust Disease',
      severity: 'high',
      status: 'active',
      startDate: '2024-01-18',
      endDate: '2024-02-15',
      currentDay: 5,
      totalDays: 28,
      progress: 18,
      nextAction: 'Spray antifungal solution',
      nextActionDue: '2024-01-23T16:00:00',
      lastApplication: '2024-01-22T16:00:00',
      products: [
        { name: 'Rust Fungicide', remaining: 90, total: 100, unit: 'ml' }
      ],
      images: {
        before: '/placeholder.svg',
        current: '/placeholder.svg'
      },
      notes: 'Aggressive treatment required'
    },
    {
      id: '3',
      plantName: 'Chili Plants',
      disease: 'Bacterial Wilt',
      severity: 'low',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-14',
      currentDay: 14,
      totalDays: 14,
      progress: 100,
      completedDate: '2024-01-14',
      successRate: 95,
      images: {
        before: '/placeholder.svg',
        after: '/placeholder.svg'
      },
      notes: 'Treatment successful, plants fully recovered'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'moderate': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-green-500 text-white';
      case 'paused': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const isActionOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const filteredTreatments = selectedTab === 'all' 
    ? treatments 
    : treatments.filter(treatment => treatment.status === selectedTab);

  return (
    <div className="mobile-container bg-agri-light-gray">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6 text-agri-gray" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Active Treatments</h1>
        </div>
        
        <button onClick={() => navigate('/diagnose')}>
          <Plus className="w-6 h-6 text-agri-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">
              {treatments.filter(t => t.status === 'active').length}
            </p>
            <p className="text-sm text-agri-gray">Active</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">
              {treatments.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-sm text-agri-gray">Completed</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">92%</p>
            <p className="text-sm text-agri-gray">Success Rate</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl p-1">
            <TabsTrigger value="active" className="text-sm">Active</TabsTrigger>
            <TabsTrigger value="completed" className="text-sm">Completed</TabsTrigger>
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4 mt-4">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment) => (
                <div key={treatment.id} className="bg-white rounded-2xl p-6 shadow-soft border border-agri-light-gray">
                  {/* Treatment Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-agri-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-secondary">{treatment.plantName}</h3>
                        <p className="text-sm text-agri-gray">{treatment.disease}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(treatment.severity)}`} />
                          <span className="text-xs text-agri-gray capitalize">{treatment.severity} severity</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(treatment.status)}>
                        {treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
                      </Badge>
                      <button>
                        <MoreVertical className="w-5 h-5 text-agri-gray" />
                      </button>
                    </div>
                  </div>

                  {treatment.status === 'active' && (
                    <>
                      {/* Progress Section */}
                      <div className="bg-agri-light rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-text-secondary">Treatment Progress</span>
                          <span className="text-sm text-agri-gray">Day {treatment.currentDay} of {treatment.totalDays}</span>
                        </div>
                        <Progress value={treatment.progress} className="mb-2" />
                        <div className="flex items-center justify-between text-xs text-agri-gray">
                          <span>Started {new Date(treatment.startDate).toLocaleDateString()}</span>
                          <span>{treatment.progress}% Complete</span>
                        </div>
                      </div>

                      {/* Next Action */}
                      <div className={`rounded-xl p-4 mb-4 ${
                        isActionOverdue(treatment.nextActionDue) 
                          ? 'bg-red-50 border border-red-200' 
                          : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <Clock className={`w-5 h-5 mt-0.5 ${
                            isActionOverdue(treatment.nextActionDue) ? 'text-red-500' : 'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-text-secondary">{treatment.nextAction}</h4>
                            <p className={`text-sm ${
                              isActionOverdue(treatment.nextActionDue) ? 'text-red-600' : 'text-blue-600'
                            }`}>
                              {isActionOverdue(treatment.nextActionDue) 
                                ? 'Overdue' 
                                : `Due ${new Date(treatment.nextActionDue).toLocaleString()}`
                              }
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            className={`${
                              isActionOverdue(treatment.nextActionDue) 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-blue-500 hover:bg-blue-600'
                            } text-white`}
                          >
                            Mark Done
                          </Button>
                        </div>
                      </div>

                      {/* Products Status */}
                      <div className="space-y-3 mb-4">
                        <h4 className="font-medium text-text-secondary">Products Status</h4>
                        {treatment.products.map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-agri-light rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Droplets className="w-4 h-4 text-agri-primary" />
                              <div>
                                <p className="text-sm font-medium text-text-secondary">{product.name}</p>
                                <p className="text-xs text-agri-gray">
                                  {product.remaining}{product.unit} of {product.total}{product.unit} remaining
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="w-16 h-2 bg-agri-light-gray rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-agri-primary"
                                  style={{ width: `${(product.remaining / product.total) * 100}%` }}
                                />
                              </div>
                              {product.remaining < 20 && (
                                <Button variant="outline" size="sm" className="mt-2 text-xs">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {treatment.status === 'completed' && (
                    <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-200">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                          <h4 className="font-medium text-green-900">Treatment Completed Successfully</h4>
                          <p className="text-sm text-green-700">
                            Completed on {new Date(treatment.completedDate!).toLocaleDateString()} 
                            • {treatment.successRate}% recovery rate
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-agri-primary text-agri-primary hover:bg-agri-light"
                      onClick={() => navigate(`/treatments/${treatment.id}`)}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Progress Photos
                    </Button>
                    
                    {treatment.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-agri-gray text-agri-gray hover:bg-agri-light-gray"
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-agri-gray text-agri-gray hover:bg-agri-light-gray"
                      onClick={() => navigate(`/treatments/${treatment.id}/details`)}
                    >
                      Details
                    </Button>
                  </div>

                  {/* Notes */}
                  {treatment.notes && (
                    <div className="mt-4 p-3 bg-agri-light rounded-lg">
                      <p className="text-sm text-agri-gray">{treatment.notes}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="w-16 h-16 text-agri-gray mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-secondary mb-2">No treatments found</h3>
                <p className="text-agri-gray mb-6">Start diagnosing your plants to begin treatments</p>
                <Button 
                  onClick={() => navigate('/diagnose')}
                  className="bg-agri-primary hover:bg-agri-secondary text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Diagnose Plant
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Treatments;