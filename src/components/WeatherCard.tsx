import { useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Zap,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Calendar,
  ChevronRight,
  X,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    icon: string;
    high: number;
    low: number;
    rainfall: number;
    windSpeed: number;
    humidity: number;
    visibility: number;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    day: string;
    icon: string;
    condition: string;
    high: number;
    low: number;
    rainfall: number;
    windSpeed: number;
  }>;
  location: string;
  lastUpdated: string;
}

const WeatherCard = () => {
  const [showForecast, setShowForecast] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock weather data - in real app, this would come from weather API
  const weatherData: WeatherData = {
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      high: 32,
      low: 24,
      rainfall: 15,
      windSpeed: 12,
      humidity: 68,
      visibility: 10,
      feelsLike: 31
    },
    forecast: [
      { date: '2024-01-23', day: 'Today', icon: 'partly-cloudy', condition: 'Partly Cloudy', high: 32, low: 24, rainfall: 15, windSpeed: 12 },
      { date: '2024-01-24', day: 'Tomorrow', icon: 'sunny', condition: 'Sunny', high: 34, low: 26, rainfall: 5, windSpeed: 8 },
      { date: '2024-01-25', day: 'Thu', icon: 'cloudy', condition: 'Cloudy', high: 29, low: 22, rainfall: 40, windSpeed: 15 },
      { date: '2024-01-26', day: 'Fri', icon: 'rainy', condition: 'Light Rain', high: 27, low: 20, rainfall: 80, windSpeed: 18 },
      { date: '2024-01-27', day: 'Sat', icon: 'rainy', condition: 'Heavy Rain', high: 25, low: 19, rainfall: 95, windSpeed: 22 },
      { date: '2024-01-28', day: 'Sun', icon: 'partly-cloudy', condition: 'Partly Cloudy', high: 30, low: 23, rainfall: 20, windSpeed: 10 },
      { date: '2024-01-29', day: 'Mon', icon: 'sunny', condition: 'Sunny', high: 33, low: 25, rainfall: 0, windSpeed: 6 }
    ],
    location: 'Village Rampur, Hardoi, UP',
    lastUpdated: new Date().toLocaleTimeString()
  };

  const getWeatherIcon = (iconType: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-12 h-12'
    };

    const iconMap = {
      'sunny': <Sun className={`${sizeClasses[size]} text-yellow-500`} />,
      'partly-cloudy': <Cloud className={`${sizeClasses[size]} text-blue-400`} />,
      'cloudy': <Cloud className={`${sizeClasses[size]} text-gray-500`} />,
      'rainy': <CloudRain className={`${sizeClasses[size]} text-blue-600`} />,
      'stormy': <Zap className={`${sizeClasses[size]} text-purple-600`} />,
      'snowy': <CloudSnow className={`${sizeClasses[size]} text-blue-200`} />
    };

    return iconMap[iconType as keyof typeof iconMap] || iconMap['sunny'];
  };

  const getRainfallColor = (percentage: number) => {
    if (percentage >= 70) return 'text-blue-700';
    if (percentage >= 40) return 'text-blue-500';
    if (percentage >= 20) return 'text-blue-400';
    return 'text-gray-500';
  };

  const getTemperatureGradient = (temp: number) => {
    if (temp >= 35) return 'from-red-400 to-orange-500';
    if (temp >= 30) return 'from-orange-400 to-yellow-500';
    if (temp >= 25) return 'from-yellow-400 to-green-400';
    if (temp >= 20) return 'from-green-400 to-blue-400';
    return 'from-blue-400 to-purple-400';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <>
      {/* Main Weather Card */}
      <div className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 rounded-3xl p-6 shadow-lg border border-blue-100/50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-cyan-400 rounded-full blur-2xl" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">Current Weather</p>
              <p className="text-xs text-blue-700">{weatherData.location}</p>
            </div>
          </div>
          
          <button 
            onClick={handleRefresh}
            className="p-2 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all duration-300 group"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          </button>
        </div>

        {/* Main Temperature Display */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            {/* Temperature */}
            <div className="text-center">
              <div className={`text-6xl font-black bg-gradient-to-br ${getTemperatureGradient(weatherData.current.temperature)} bg-clip-text text-transparent mb-1 leading-none`}>
                {weatherData.current.temperature}°
              </div>
              <div className="text-sm font-medium text-blue-800 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full">
                Feels like {weatherData.current.feelsLike}°C
              </div>
            </div>

            {/* Weather Icon & Condition */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                {getWeatherIcon(weatherData.current.icon, 'lg')}
              </div>
              <p className="text-lg font-bold text-blue-900">{weatherData.current.condition}</p>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
          {/* High/Low */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-400 rounded-xl flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">High / Low</p>
                <p className="text-xl font-bold text-blue-900">
                  {weatherData.current.high}° / {weatherData.current.low}°
                </p>
              </div>
            </div>
          </div>

          {/* Rainfall */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <CloudRain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Rain Chance</p>
                <p className={`text-xl font-bold ${getRainfallColor(weatherData.current.rainfall)}`}>
                  {weatherData.current.rainfall}%
                </p>
              </div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-slate-400 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Wind Speed</p>
                <p className="text-xl font-bold text-blue-900">{weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Humidity</p>
                <p className="text-xl font-bold text-blue-900">{weatherData.current.humidity}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Advisory */}
        <div className="relative z-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-200/50 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-green-900 mb-1">Today's Farming Tip</p>
              <p className="text-sm text-green-800 leading-relaxed">
                Perfect weather for pesticide application. Low wind and moderate temperature ideal for spraying.
              </p>
            </div>
          </div>
        </div>

        {/* More Info Button */}
        <div className="relative z-10">
          <Button 
            onClick={() => setShowForecast(true)}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
          >
            <Calendar className="w-5 h-5 mr-3" />
            <span>7-Day Weather Forecast</span>
            <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Last Updated */}
        <div className="relative z-10 text-center mt-4">
          <p className="text-xs text-blue-600/70">
            Last updated: {weatherData.lastUpdated}
          </p>
        </div>
      </div>

      {/* 7-Day Forecast Modal */}
      <Dialog open={showForecast} onOpenChange={setShowForecast}>
        <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden p-0 bg-gradient-to-br from-sky-50 to-blue-50">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-white">7-Day Forecast</DialogTitle>
                  <p className="text-blue-100 text-sm">{weatherData.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowForecast(false)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {weatherData.forecast.map((day, index) => (
              <div 
                key={day.date} 
                className={`bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-blue-400/30 bg-blue-50/80' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Day & Date */}
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-[60px]">
                      <p className={`font-bold text-lg ${index === 0 ? 'text-blue-700' : 'text-gray-800'}`}>
                        {day.day}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(day.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>

                    {/* Weather Icon */}
                    <div className="w-14 h-14 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm">
                      {getWeatherIcon(day.icon, 'md')}
                    </div>

                    {/* Condition */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{day.condition}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <CloudRain className={`w-3 h-3 ${getRainfallColor(day.rainfall)}`} />
                          <span className={`text-xs font-medium ${getRainfallColor(day.rainfall)}`}>
                            {day.rainfall}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{day.windSpeed} km/h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">{day.high}°</span>
                      <span className="text-lg text-gray-500">{day.low}°</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">High / Low</p>
                  </div>
                </div>

                {/* Farming Advice for specific days */}
                {day.rainfall >= 70 && (
                  <div className="mt-4 p-3 bg-blue-100/60 backdrop-blur-sm rounded-xl border border-blue-200/50">
                    <p className="text-xs text-blue-800 font-medium">
                      🌧️ Heavy rain expected - Protect crops and avoid field work
                    </p>
                  </div>
                )}
                
                {day.rainfall <= 10 && day.high >= 32 && (
                  <div className="mt-4 p-3 bg-orange-100/60 backdrop-blur-sm rounded-xl border border-orange-200/50">
                    <p className="text-xs text-orange-800 font-medium">
                      ☀️ Hot & dry - Increase irrigation and provide shade for sensitive crops
                    </p>
                  </div>
                )}

                {day.windSpeed >= 20 && (
                  <div className="mt-4 p-3 bg-yellow-100/60 backdrop-blur-sm rounded-xl border border-yellow-200/50">
                    <p className="text-xs text-yellow-800 font-medium">
                      💨 Windy conditions - Avoid pesticide spraying
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-t border-blue-200/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600">Live weather data</span>
              </div>
              <span className="text-xs text-gray-500">
                Updated: {weatherData.lastUpdated}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WeatherCard;