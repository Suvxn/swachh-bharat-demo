import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Leaf, 
  Award, 
  Camera, 
  Upload,
  Star,
  Trophy,
  Recycle
} from 'lucide-react';

const CitizenDashboard: React.FC = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const trainingModules = [
    {
      id: 1,
      title: 'Waste Segregation Basics',
      description: 'Learn the fundamentals of separating waste at source',
      duration: '15 min',
      completed: true,
    },
    {
      id: 2,
      title: 'Composting at Home',
      description: 'Step-by-step guide to create compost from kitchen waste',
      duration: '20 min',
      completed: false,
    },
    {
      id: 3,
      title: 'Plastic Recycling',
      description: 'Understanding plastic types and recycling processes',
      duration: '12 min',
      completed: false,
    },
    {
      id: 4,
      title: 'E-Waste Management',
      description: 'Proper disposal of electronic waste',
      duration: '18 min',
      completed: false,
    },
  ];

  const compostingTips = [
    'Mix green waste (kitchen scraps) with brown waste (dry leaves)',
    'Turn your compost pile every 2-3 weeks for proper aeration',
    'Keep the compost moist but not waterlogged',
    'Avoid adding meat, dairy, or oily foods to your compost',
    'Your compost is ready when it looks like dark, crumbly soil',
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
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
          Citizen Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome! Track your waste management journey and earn rewards for sustainable practices.
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
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-govt-blue">1,250</p>
                  <p className="text-sm text-muted-foreground">Reward Points</p>
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
                  <Recycle className="w-6 h-6 text-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green">45 kg</p>
                  <p className="text-sm text-muted-foreground">Waste Recycled</p>
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
                  <Star className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-saffron">Gold</p>
                  <p className="text-sm text-muted-foreground">Green Citizen Status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Modules */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Training Modules</span>
              </CardTitle>
              <CardDescription>
                Complete training modules to earn points and improve your waste management knowledge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainingModules.map((module) => (
                <motion.div
                  key={module.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{module.title}</h4>
                        {module.completed && (
                          <Badge variant="secondary" className="bg-green/10 text-green">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {module.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Duration: {module.duration}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={module.completed ? "outline" : "default"}
                      className="ml-4"
                    >
                      {module.completed ? 'Review' : 'Start Training'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo Upload */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-6"
        >
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-primary" />
                <span>Upload Waste Photo</span>
              </CardTitle>
              <CardDescription>
                Share photos of your waste segregation efforts and earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {uploadedPhoto ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedPhoto} 
                        alt="Uploaded waste" 
                        className="mx-auto max-h-40 rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Photo uploaded successfully!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
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
                <Button 
                  className="w-full govt-button"
                  disabled={!uploadedPhoto}
                >
                  Submit for Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Composting Tips */}
          <Card className="govt-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-green" />
                <span>Composting Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {compostingTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <div className="w-2 h-2 bg-green rounded-full mt-2 flex-shrink-0"></div>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CitizenDashboard;