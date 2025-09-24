import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Camera,
  Upload,
  ClipboardCheck,
  MapPin,
  Truck
} from 'lucide-react';

const WorkerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Collect waste from Sector 14', completed: true, time: '08:00 AM' },
    { id: 2, task: 'Empty bins in DLF Phase 2', completed: true, time: '09:30 AM' },
    { id: 3, task: 'Service smart bins in Cyber City', completed: false, time: '11:00 AM' },
    { id: 4, task: 'Collect recyclables from Old Gurgaon', completed: false, time: '02:00 PM' },
    { id: 5, task: 'End-of-day vehicle maintenance check', completed: false, time: '05:00 PM' },
  ]);

  const [issueReport, setIssueReport] = useState({
    location: '',
    description: '',
    photo: null as string | null,
  });

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIssueReport({ ...issueReport, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Issue report submitted:', issueReport);
    // Reset form
    setIssueReport({
      location: '',
      description: '',
      photo: null,
    });
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-govt-blue mb-2">
          Worker Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your daily tasks, report issues, and track your work progress efficiently.
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
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-govt-blue">{completedTasks}/{totalTasks}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
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
                  <p className="text-2xl font-bold text-green">{completionPercentage}%</p>
                  <p className="text-sm text-muted-foreground">Progress Today</p>
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
                  <Truck className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-saffron">WM003</p>
                  <p className="text-sm text-muted-foreground">Assigned Vehicle</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Task Checklist */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <span>Daily Task Checklist</span>
              </CardTitle>
              <CardDescription>
                Mark tasks as completed throughout your workday
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <Switch 
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <div>
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.task}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{task.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={task.completed ? 'default' : 'secondary'}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Issue Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <span>Report Issue</span>
              </CardTitle>
              <CardDescription>
                Report any problems or issues encountered during your work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleIssueSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={issueReport.location}
                    onChange={(e) => setIssueReport({...issueReport, location: e.target.value})}
                    placeholder="Where did the issue occur?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Issue Description</Label>
                  <Textarea
                    id="description"
                    value={issueReport.description}
                    onChange={(e) => setIssueReport({...issueReport, description: e.target.value})}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Photo Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    {issueReport.photo ? (
                      <div className="space-y-2">
                        <img 
                          src={issueReport.photo} 
                          alt="Issue evidence" 
                          className="mx-auto max-h-32 rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">
                          Photo uploaded successfully
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Upload a photo to support your report
                        </p>
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>

                <Button type="submit" className="w-full govt-button">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Submit Issue Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Task Completion Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="govt-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Task Completion Summary</span>
            </CardTitle>
            <CardDescription>
              Overview of your work progress and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-govt-blue mb-2">{completionPercentage}%</div>
                <div className="text-sm text-muted-foreground">Today's Progress</div>
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green mb-2">95%</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-saffron mb-2">4.8</div>
                <div className="text-sm text-muted-foreground">Performance Rating</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">156</div>
                <div className="text-sm text-muted-foreground">Tasks This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WorkerDashboard;