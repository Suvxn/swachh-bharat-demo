import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Factory, Recycle, Zap, Clock, TrendingUp } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  type: 'biomethanization' | 'recycling' | 'composting';
  currentQueue: number;
  maxCapacity: number;
  avgProcessingTime: string;
  status: 'operational' | 'maintenance' | 'high-load';
  efficiency: number;
}

interface QueueData {
  time: string;
  biogas: number;
  recycling: number;
  composting: number;
}

const FacilityQueueStatus: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: 'BMP001',
      name: 'Gurgaon Biogas Plant',
      type: 'biomethanization',
      currentQueue: 45,
      maxCapacity: 100,
      avgProcessingTime: '4-6 hours',
      status: 'operational',
      efficiency: 87
    },
    {
      id: 'RCP001',
      name: 'DLF Recycling Center',
      type: 'recycling',
      currentQueue: 78,
      maxCapacity: 120,
      avgProcessingTime: '2-3 hours',
      status: 'high-load',
      efficiency: 92
    },
    {
      id: 'CMP001',
      name: 'Sector 14 Compost Unit',
      type: 'composting',
      currentQueue: 23,
      maxCapacity: 80,
      avgProcessingTime: '8-12 hours',
      status: 'operational',
      efficiency: 78
    },
    {
      id: 'RCP002',
      name: 'Cyber City Recycling',
      type: 'recycling',
      currentQueue: 56,
      maxCapacity: 90,
      avgProcessingTime: '3-4 hours',
      status: 'operational',
      efficiency: 85
    },
    {
      id: 'BMP002',
      name: 'Old Gurgaon Biogas',
      type: 'biomethanization',
      currentQueue: 12,
      maxCapacity: 60,
      avgProcessingTime: '5-7 hours',
      status: 'maintenance',
      efficiency: 45
    }
  ]);

  const [queueHistory, setQueueHistory] = useState<QueueData[]>([
    { time: '6 AM', biogas: 30, recycling: 65, composting: 15 },
    { time: '9 AM', biogas: 45, recycling: 78, composting: 23 },
    { time: '12 PM', biogas: 52, recycling: 85, composting: 35 },
    { time: '3 PM', biogas: 48, recycling: 90, composting: 28 },
    { time: '6 PM', biogas: 35, recycling: 72, composting: 18 },
    { time: 'Now', biogas: 42, recycling: 82, composting: 25 }
  ]);

  // Update facility queues every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFacilities(prevFacilities => 
        prevFacilities.map(facility => {
          if (facility.status === 'maintenance') return facility;

          // Simulate queue changes
          const change = Math.floor(Math.random() * 20) - 8; // -8 to +12
          const newQueue = Math.max(0, Math.min(facility.maxCapacity, facility.currentQueue + change));
          
          // Update status based on queue level
          let status: typeof facility.status = 'operational';
          if (newQueue > facility.maxCapacity * 0.8) status = 'high-load';
          
          // Simulate efficiency changes
          const efficiencyChange = (Math.random() - 0.5) * 5;
          const newEfficiency = Math.max(20, Math.min(100, facility.efficiency + efficiencyChange));

          return {
            ...facility,
            currentQueue: newQueue,
            status,
            efficiency: Math.round(newEfficiency)
          };
        })
      );

      // Update queue history
      setQueueHistory(prevHistory => {
        const newDataPoint: QueueData = {
          time: 'Now',
          biogas: Math.floor(Math.random() * 30) + 35,
          recycling: Math.floor(Math.random() * 25) + 70,
          composting: Math.floor(Math.random() * 20) + 15
        };

        return [...prevHistory.slice(1), newDataPoint];
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case 'biomethanization': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'recycling': return <Recycle className="w-5 h-5 text-green-500" />;
      case 'composting': return <Factory className="w-5 h-5 text-amber-500" />;
      default: return <Factory className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'high-load': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQueueColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 80) return '#EF4444';
    if (percentage >= 60) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div className="space-y-6">
      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map((facility, index) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="govt-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getFacilityIcon(facility.type)}
                    <h3 className="font-medium text-sm">{facility.name}</h3>
                  </div>
                  <Badge className={getStatusColor(facility.status)}>
                    {facility.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Queue Status */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Queue Status</span>
                    <motion.span 
                      key={facility.currentQueue}
                      initial={{ scale: 1.2, color: getQueueColor(facility.currentQueue, facility.maxCapacity) }}
                      animate={{ scale: 1, color: 'inherit' }}
                      className="text-sm font-bold"
                    >
                      {facility.currentQueue}/{facility.maxCapacity}
                    </motion.span>
                  </div>
                  <Progress 
                    value={(facility.currentQueue / facility.maxCapacity) * 100}
                    className="h-2"
                    style={{
                      // @ts-ignore
                      '--progress-background': getQueueColor(facility.currentQueue, facility.maxCapacity)
                    }}
                  />
                </div>

                {/* Efficiency */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Efficiency</span>
                    <span className="text-sm font-medium">{facility.efficiency}%</span>
                  </div>
                  <Progress value={facility.efficiency} className="h-1" />
                </div>

                {/* Processing Time */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Avg. Time:</span>
                  </div>
                  <span>{facility.avgProcessingTime}</span>
                </div>

                {/* Alert for high load */}
                {facility.status === 'high-load' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-yellow-50 border border-yellow-200 rounded p-2 text-xs text-yellow-700"
                  >
                    ⚠️ High load - consider redirecting waste
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Queue Trends Chart */}
      <Card className="govt-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Queue Trends Today</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queueHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="biogas" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Biogas Plants"
                />
                <Line 
                  type="monotone" 
                  dataKey="recycling" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Recycling Centers"
                />
                <Line 
                  type="monotone" 
                  dataKey="composting" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Composting Units"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityQueueStatus;