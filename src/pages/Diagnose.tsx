import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  ArrowLeft, 
  Lightbulb, 
  Brain, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Leaf,
  Target,
  TrendingUp,
  ChevronRight,
  Store,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Diagnose = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('initial'); // initial, analyzing, results
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleImageUpload = (source: 'camera' | 'gallery') => {
    navigate('/diagnose/capture');
  };

  const renderInitialScreen = () => (
    <div className="mobile-content space-y-6 pt-4">
      {/* Camera Capture Section */}
      <div className="plant-card">
        <div className="text-center">
          <div className="w-16 h-16 bg-agri-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-agri-primary" />
          </div>
          <h2 className="text-xl font-bold text-text-secondary mb-2">Take a Photo</h2>
          <p className="text-agri-gray mb-6">Capture a clear image of the affected plant leaves</p>
          
          <Button 
            onClick={() => handleImageUpload('camera')}
            className="w-full btn-primary bg-agri-primary hover:bg-agri-secondary text-white h-14"
          >
            <Camera className="w-5 h-5 mr-2" />
            Open Camera
          </Button>
        </div>
      </div>

      {/* Gallery Upload Section */}
      <div className="plant-card">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-text-secondary mb-2">Upload from Gallery</h2>
          <p className="text-agri-gray mb-6">Select an existing photo from your device</p>
          
          <Button 
            onClick={() => handleImageUpload('gallery')}
            variant="outline"
            className="w-full h-14 border-2 border-agri-primary text-agri-primary hover:bg-agri-light"
          >
            <Upload className="w-5 h-5 mr-2" />
            Choose from Gallery
          </Button>
        </div>
      </div>

      {/* Photography Tips */}
      <div className="bg-agri-light rounded-2xl p-6 border border-agri-primary/20">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-6 h-6 text-agri-warning" />
          <h3 className="font-semibold text-agri-accent">Photography Tips:</h3>
        </div>
        
        <div className="space-y-2">
          {[
            'Ensure good lighting',
            'Focus on affected leaves',
            'Keep image clear and close',
            'Avoid shadows'
          ].map((tip, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-agri-success" />
              <span className="text-sm text-agri-accent">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyzingScreen = () => (
    <div className="mobile-content flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Image Preview */}
      <div className="relative">
        <div className="w-48 h-36 bg-gray-100 rounded-2xl overflow-hidden shadow-medium">
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <Leaf className="w-12 h-12 text-agri-primary" />
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-agri-primary rounded-full flex items-center justify-center shadow-glow">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
        </div>
      </div>

      {/* Analysis Progress */}
      <div className="text-center w-full max-w-xs">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="w-20 h-20 border-4 border-agri-light rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-agri-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 border-4 border-agri-primary border-t-transparent rounded-full animate-spin" />
          </div>
          
          <h2 className="text-2xl font-bold text-agri-accent mb-2">Analyzing Your Plant...</h2>
          <p className="text-agri-gray mb-4">Our AI is examining your plant for any issues</p>
          
          <Progress value={analysisProgress} className="w-full h-2 mb-4" />
          
          <div className="space-y-2 text-sm text-agri-gray">
            <div className={`flex items-center justify-center space-x-2 ${analysisProgress > 20 ? 'text-agri-success' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${analysisProgress > 20 ? 'text-agri-success' : 'text-agri-gray'}`} />
              <span>Scanning image</span>
            </div>
            <div className={`flex items-center justify-center space-x-2 ${analysisProgress > 60 ? 'text-agri-success' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${analysisProgress > 60 ? 'text-agri-success' : 'text-agri-gray'}`} />
              <span>Identifying issues</span>
            </div>
            <div className={`flex items-center justify-center space-x-2 ${analysisProgress > 90 ? 'text-agri-success' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${analysisProgress > 90 ? 'text-agri-success' : 'text-agri-gray'}`} />
              <span>Generating report</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResultsScreen = () => (
    <div className="mobile-content space-y-6 pt-4">
      {/* Diagnosis Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-agri-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-agri-success animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold text-agri-accent mb-2">Diagnosis Complete</h1>
        <p className="text-agri-gray">Analyzed on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Disease Detection */}
      <div className="plant-card border-l-4 border-red-500">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-red-700 mb-1">Late Blight</h2>
            <div className="flex items-center space-x-2">
              <Progress value={87} className="w-24 h-2" />
              <span className="text-sm font-medium text-red-600">87% Match</span>
            </div>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <p className="text-agri-gray text-sm mb-4">
          Brown spots with yellow rings on leaves, affecting plant growth
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-agri-accent">Affected Area:</span>
            <p className="text-agri-gray">Leaves and stems</p>
          </div>
          <div>
            <span className="font-medium text-agri-accent">Stage:</span>
            <p className="text-agri-gray">Early to moderate</p>
          </div>
        </div>
      </div>

      {/* Treatment Information */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-blue-900">Treatment Timeline</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">Recovery Duration:</span>
            <span className="font-semibold text-blue-900">14-21 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-800">Success Rate:</span>
            <span className="font-semibold text-agri-success">92% farmers recovered</span>
          </div>
        </div>
        
        <Progress value={92} className="w-full h-2 mt-4" />
      </div>

      {/* Treatment Options */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-agri-accent">Choose Your Treatment Path</h2>
        
        {/* Order Products Option */}
        <div className="plant-card bg-gradient-to-r from-agri-primary to-agri-secondary text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold mb-2">Order Recommended Treatment</h3>
              <p className="text-white/90 text-sm mb-4">Get the exact fertilizer delivered to your doorstep</p>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Expert recommended</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Quality assured</span>
                </div>
              </div>
            </div>
            <Store className="w-8 h-8 opacity-80" />
          </div>
          
          <Button 
            onClick={() => navigate('/treatment-products')}
            className="w-full bg-white text-agri-primary hover:bg-white/90 font-semibold"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View & Order Products
          </Button>
          
          <p className="text-white/80 text-xs text-center mt-2">2-3 fertilizers recommended</p>
        </div>

        {/* Find Shops Option */}
        <div className="plant-card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold mb-2">Visit Nearby Fertilizer Shop</h3>
              <p className="text-white/90 text-sm mb-4">Get directions to the nearest agricultural store</p>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Immediate purchase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Local support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Expert advice</span>
                </div>
              </div>
            </div>
            <MapPin className="w-8 h-8 opacity-80" />
          </div>
          
          <Button 
            onClick={() => navigate('/nearby-shops')}
            className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find Nearest Shops
          </Button>
          
          <p className="text-white/80 text-xs text-center mt-2">3 shops within 5km</p>
        </div>

        {/* Skip Option */}
        <div className="text-center pt-4">
          <button className="text-agri-gray hover:text-agri-primary transition-colors text-sm">
            I'll treat it myself
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="mobile-header bg-agri-cream">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-agri-light rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-agri-accent" />
          </button>
          <h1 className="text-xl font-bold text-agri-accent">Plant Health Diagnosis</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-agri-gray">🇮🇳 EN</span>
          <ChevronRight className="w-4 h-4 text-agri-gray transform rotate-90" />
        </div>
      </div>

      {/* Content based on current step */}
      {currentStep === 'initial' && renderInitialScreen()}
      {currentStep === 'analyzing' && renderAnalyzingScreen()}
      {currentStep === 'results' && renderResultsScreen()}
    </div>
  );
};

export default Diagnose;