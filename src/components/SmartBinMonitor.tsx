import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trash2, MapPin, AlertTriangle } from 'lucide-react';

interface SmartBin {
  id: string;
  location: string;
  fillLevel: number;
  lastUpdate: string;
  status: 'normal' | 'warning' | 'critical';
  batteryLevel: number;
}

const SmartBinMonitor: React.FC = () => {
  const [bins, setBins] = useState<SmartBin[]>([
    { id: 'SB001', location: 'Sector 14 - Park', fillLevel: 45, lastUpdate: '2 min ago', status: 'normal', batteryLevel: 85 },
    { id: 'SB002', location: 'DLF Phase 2 - Mall', fillLevel: 78, lastUpdate: '1 min ago', status: 'warning', batteryLevel: 92 },
    { id: 'SB003', location: 'Cyber City - Metro', fillLevel: 95, lastUpdate: '30s ago', status: 'critical', batteryLevel: 67 },
    { id: 'SB004', location: 'Old Gurgaon - Market', fillLevel: 23, lastUpdate: '3 min ago', status: 'normal', batteryLevel: 78 },
    { id: 'SB005', location: 'Udyog Vihar - Office', fillLevel: 67, lastUpdate: '1 min ago', status: 'warning', batteryLevel: 88 },
    { id: 'SB006', location: 'Golf Course - Club', fillLevel: 12, lastUpdate: '4 min ago', status: 'normal', batteryLevel: 91 },
  ]);

  // Update bin levels every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prevBins => 
        prevBins.map(bin => {
          // Random fill level change (simulate waste being added or collected)
          const change = Math.random() * 10 - 3; // -3 to +7 change
          const newFillLevel = Math.max(0, Math.min(100, bin.fillLevel + change));
          
          // Determine status based on fill level
          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (newFillLevel >= 90) status = 'critical';
          else if (newFillLevel >= 60) status = 'warning';

          // Random battery change (very slow decrease)
          const batteryChange = Math.random() * 0.5;
          const newBatteryLevel = Math.max(20, bin.batteryLevel - batteryChange);

          return {
            ...bin,
            fillLevel: Math.round(newFillLevel),
            status,
            batteryLevel: Math.round(newBatteryLevel),
            lastUpdate: 'Just now'
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFillColor = (fillLevel: number) => {
    if (fillLevel >= 90) return '#EF4444';
    if (fillLevel >= 60) return '#F59E0B';
    return '#10B981';
  };

  const criticalBins = bins.filter(bin => bin.status === 'critical').length;
  const warningBins = bins.filter(bin => bin.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-green-50 rounded-lg border border-green-200"
        >
          <div className="flex items-center space-x-2">
            <Trash2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{bins.length - criticalBins - warningBins}</p>
              <p className="text-sm text-green-700">Normal</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">{warningBins}</p>
              <p className="text-sm text-yellow-700">Warning</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-red-50 rounded-lg border border-red-200"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-600">{criticalBins}</p>
              <p className="text-sm text-red-700">Critical</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bins.map((bin, index) => (
          <motion.div
            key={bin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="govt-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{bin.id}</CardTitle>
                  <Badge className={getStatusColor(bin.status)}>
                    {bin.status}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {bin.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Fill Level */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Fill Level</span>
                    <span className="font-medium">{bin.fillLevel}%</span>
                  </div>
                  <Progress 
                    value={bin.fillLevel} 
                    className="h-2"
                    style={{
                      // @ts-ignore
                      '--progress-background': getFillColor(bin.fillLevel)
                    }}
                  />
                </div>

                {/* Battery Level */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Battery</span>
                    <span className="font-medium">{bin.batteryLevel}%</span>
                  </div>
                  <Progress 
                    value={bin.batteryLevel} 
                    className="h-1"
                  />
                </div>

                {/* Last Update */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last Update:</span>
                  <motion.span
                    key={bin.lastUpdate}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {bin.lastUpdate}
                  </motion.span>
                </div>

                {/* Critical Alert */}
                {bin.status === 'critical' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 rounded p-2 text-xs text-red-700"
                  >
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    Immediate collection required!
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartBinMonitor;