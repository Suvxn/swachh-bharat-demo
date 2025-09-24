import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Send
} from 'lucide-react';

const ChampionDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const { toast } = useToast();
  const [auditData, setAuditData] = useState({
    location: '',
    wasteSegregation: false,
    binCondition: '',
    collectionFrequency: '',
    notes: '',
  });

  const [citizenReports, setCitizenReports] = useState([
    {
      id: 1,
      citizen: 'Ramesh Gupta',
      location: 'Sector 14, Gurgaon',
      issue: 'Improper waste segregation in community bins',
      status: 'pending',
      photo: '/api/placeholder/150/100',
      date: '2024-01-15',
      priority: 'medium'
    },
    {
      id: 2,
      citizen: 'Sunita Sharma',
      location: 'DLF Phase 2, Gurgaon',
      issue: 'Overflowing garbage bins',
      status: 'in-progress',
      photo: '/api/placeholder/150/100',
      date: '2024-01-14',
      priority: 'high'
    },
    {
      id: 3,
      citizen: 'Vikash Kumar',
      location: 'Old Gurgaon',
      issue: 'Plastic waste not collected separately',
      status: 'resolved',
      photo: '/api/placeholder/150/100',
      date: '2024-01-13',
      priority: 'low'
    },
  ]);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Audit submitted:', auditData);
    toast({ title: 'Audit submitted', description: 'Your field audit has been recorded.' });
    // Reset form
    setAuditData({
      location: '',
      wasteSegregation: false,
      binCondition: '',
      collectionFrequency: '',
      notes: '',
    });
  };

  const updateReportStatus = (id: number, status: 'in-progress' | 'resolved' | 'pending') => {
    setCitizenReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    const msg = status === 'resolved' ? 'Report resolved' : status === 'in-progress' ? 'Marked in progress' : 'Set to pending';
    toast({ title: msg });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
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
          Green Champion Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor citizen reports, conduct field audits, and maintain community waste management standards.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="govt-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-govt-blue">28</p>
                  <p className="text-sm text-muted-foreground">Active Reports</p>
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
                  <CheckCircle2 className="w-6 h-6 text-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green">15</p>
                  <p className="text-sm text-muted-foreground">Resolved Issues</p>
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
                  <FileText className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-saffron">12</p>
                  <p className="text-sm text-muted-foreground">Audits Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Citizen Reports */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Citizen Reports</span>
              </CardTitle>
              <CardDescription>
                Review and manage waste management reports from citizens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {citizenReports.map((report) => (
                <motion.div
                  key={report.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img 
                      src={report.photo} 
                      alt="Report photo" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{report.citizen}</h4>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{report.location}</span>
                      </div>
                      <p className="text-sm mb-2">{report.issue}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{report.date}</span>
                        <span className={`font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedReport === report.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t space-y-2"
                    >
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => updateReportStatus(report.id, 'in-progress')}>
                          Mark In Progress
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => updateReportStatus(report.id, 'resolved')}>
                          Resolve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toast({ title: 'Requested more info' })}>
                          Request More Info
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Field Audit Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Field Audit Form</span>
              </CardTitle>
              <CardDescription>
                Submit field audit reports for waste management sites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Audit Location</Label>
                  <Input
                    id="location"
                    value={auditData.location}
                    onChange={(e) => setAuditData({...auditData, location: e.target.value})}
                    placeholder="Enter location address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="binCondition">Bin Condition</Label>
                  <Select 
                    value={auditData.binCondition}
                    onValueChange={(value) => setAuditData({...auditData, binCondition: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bin condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collectionFrequency">Collection Frequency</Label>
                  <Select 
                    value={auditData.collectionFrequency}
                    onValueChange={(value) => setAuditData({...auditData, collectionFrequency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select collection frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="alternate">Alternate Days</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="irregular">Irregular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="segregation"
                    checked={auditData.wasteSegregation}
                    onCheckedChange={(checked) => 
                      setAuditData({...auditData, wasteSegregation: checked as boolean})
                    }
                  />
                  <Label htmlFor="segregation">Proper waste segregation observed</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={auditData.notes}
                    onChange={(e) => setAuditData({...auditData, notes: e.target.value})}
                    placeholder="Any additional observations or recommendations"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full govt-button">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Audit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ChampionDashboard;