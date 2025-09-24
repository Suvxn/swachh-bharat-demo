import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Trash2, 
  Truck, 
  MapPin, 
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MapboxConfig from '@/components/MapboxConfig';
import TruckTrackingMap from '@/components/TruckTrackingMap';
import { Link } from 'react-router-dom';
import SmartBinMonitor from '@/components/SmartBinMonitor';
import FacilityQueueStatus from '@/components/FacilityQueueStatus';
import useAdminAlerts from '@/hooks/useAdminAlerts';

const AdminDashboard: React.FC = () => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  
  // Enable admin alerts
  useAdminAlerts();
  const binDistributionData = [
    { id: 1, location: 'Sector 14', distributed: 45, pending: 5, geoTagged: 40, status: 'active' },
    { id: 2, location: 'DLF Phase 2', distributed: 60, pending: 0, geoTagged: 60, status: 'complete' },
    { id: 3, location: 'Old Gurgaon', distributed: 35, pending: 10, geoTagged: 30, status: 'pending' },
    { id: 4, location: 'Cyber City', distributed: 80, pending: 0, geoTagged: 75, status: 'active' },
    { id: 5, location: 'Udyog Vihar', distributed: 25, pending: 15, geoTagged: 20, status: 'pending' },
  ];

  const vehicleTrackingData = [
    { id: 'WM001', route: 'Route A', status: 'active', location: 'Sector 14', completion: 65 },
    { id: 'WM002', route: 'Route B', status: 'maintenance', location: 'DLF Phase 2', completion: 0 },
    { id: 'WM003', route: 'Route C', status: 'active', location: 'Cyber City', completion: 90 },
    { id: 'WM004', route: 'Route D', status: 'active', location: 'Old Gurgaon', completion: 45 },
  ];

  const liveRoster = [
    { id: 'DRV101', name: 'Ravi Kumar', role: 'Driver', phone: '+91 98765 43210', vehicle: 'WM001', shift: '06:00-14:00' },
    { id: 'DRV102', name: 'Aman Verma', role: 'Driver', phone: '+91 99876 54321', vehicle: 'WM003', shift: '06:00-14:00' },
    { id: 'WRK201', name: 'Sita Devi', role: 'Worker', phone: '+91 91234 56789', assigned: 'Sector 14', shift: '07:00-15:00' },
    { id: 'WRK202', name: 'Imran Khan', role: 'Worker', phone: '+91 93456 78123', assigned: 'DLF Phase 2', shift: '07:00-15:00' },
  ];

  const complianceData = [
    { name: 'Compliant', value: 75, color: '#10B981' },
    { name: 'Non-Compliant', value: 15, color: '#EF4444' },
    { name: 'Pending Review', value: 10, color: '#F59E0B' },
  ];

  const wasteCollectionData = [
    { month: 'Jan', organic: 120, recyclable: 80, hazardous: 20 },
    { month: 'Feb', organic: 135, recyclable: 90, hazardous: 18 },
    { month: 'Mar', organic: 150, recyclable: 95, hazardous: 25 },
    { month: 'Apr', organic: 145, recyclable: 100, hazardous: 22 },
    { month: 'May', organic: 160, recyclable: 110, hazardous: 20 },
    { month: 'Jun', organic: 175, recyclable: 120, hazardous: 18 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'complete': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-govt-blue mb-2">
          ULB Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor waste management operations, track vehicle performance, and ensure compliance across all zones.
        </p>
      </motion.div>

      {/* Live Roster */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="govt-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>Live Roster (Today)</span>
            </CardTitle>
            <CardDescription>
              Contact drivers and workers on duty today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveRoster.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.id}</TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.role}</TableCell>
                    <TableCell>
                      {person.role === 'Driver' ? (
                        <span>Vehicle {person.vehicle}</span>
                      ) : (
                        <span>{person.assigned}</span>
                      )}
                      <span className="ml-2 text-xs text-muted-foreground">({person.shift})</span>
                    </TableCell>
                    <TableCell>
                      <a href={`tel:${person.phone.replace(/\s|\+/g, '')}`} className="text-primary hover:underline">{person.phone}</a>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => window.open(`tel:${person.phone.replace(/\s|\+/g, '')}`)}>Call</Button>
                        <Button size="sm" variant="outline" onClick={() => window.open(`sms:${person.phone.replace(/\s|\+/g, '')}`)}>SMS</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="govt-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trash2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-govt-blue">245</p>
                  <p className="text-sm text-muted-foreground">Smart Bins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="govt-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green/10 rounded-lg">
                  <Truck className="w-6 h-6 text-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green">12</p>
                  <p className="text-sm text-muted-foreground">Active Vehicles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="govt-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-saffron/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-saffron">87%</p>
                  <p className="text-sm text-muted-foreground">Collection Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="govt-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">3</p>
                  <p className="text-sm text-muted-foreground">Priority Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Live Tracking and Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="govt-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>City-Wide Vehicle Tracking</span>
            </CardTitle>
            <CardDescription>
              Real-time tracking of all waste collection vehicles across the city
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapboxConfig onTokenSet={setMapboxToken} />
            <TruckTrackingMap 
              token={mapboxToken} 
              viewMode="admin"
              userLocation={[77.2090, 28.6139]}
            />
            <div className="mt-4 flex gap-2">
              <Link to="/citizen"><Button size="sm" variant="outline">View Citizen Dashboard</Button></Link>
              <Link to="/worker"><Button size="sm" variant="outline">View Worker Dashboard</Button></Link>
              <Link to="/champion"><Button size="sm" variant="outline">View Champion Dashboard</Button></Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Smart Bin Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="govt-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5 text-primary" />
              <span>Smart Bin Network Status</span>
            </CardTitle>
            <CardDescription>
              Monitor fill levels and status of smart bins across all zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SmartBinMonitor />
          </CardContent>
        </Card>
      </motion.div>

      {/* Facility Queue Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="govt-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Processing Facilities Status</span>
            </CardTitle>
            <CardDescription>
              Real-time queue status and efficiency of waste processing facilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FacilityQueueStatus />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Bin Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trash2 className="w-5 h-5 text-primary" />
                <span>Smart Bin Distribution</span>
              </CardTitle>
              <CardDescription>
                Track smart bin deployment and geo-tagging status across zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Distributed</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Geo-Tagged</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {binDistributionData.map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell className="font-medium">{zone.location}</TableCell>
                      <TableCell>{zone.distributed}</TableCell>
                      <TableCell>{zone.pending}</TableCell>
                      <TableCell>{zone.geoTagged}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(zone.status)}>
                          {zone.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compliance Reports */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Compliance Reports</span>
              </CardTitle>
              <CardDescription>
                Waste management compliance status across all monitored areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Tracking Legacy View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-primary" />
                <span>Vehicle Status Summary</span>
              </CardTitle>
              <CardDescription>
                Quick overview of vehicle performance and route completion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicleTrackingData.map((vehicle) => (
                <div key={vehicle.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{vehicle.id}</h4>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{vehicle.route}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {vehicle.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Route Completion</span>
                    <span className="text-sm font-medium">{vehicle.completion}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vehicle.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Waste Collection Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Waste Collection Trends</span>
              </CardTitle>
              <CardDescription>
                Monthly waste collection data by category (in tonnes)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wasteCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="organic" fill="#10B981" name="Organic" />
                    <Bar dataKey="recyclable" fill="#3B82F6" name="Recyclable" />
                    <Bar dataKey="hazardous" fill="#EF4444" name="Hazardous" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;