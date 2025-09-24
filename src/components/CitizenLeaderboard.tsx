import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';

interface Citizen {
  id: string;
  name: string;
  points: number;
  rank: number;
  previousRank: number;
  recentActivity: string;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  avatar: string;
}

const CitizenLeaderboard: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([
    { id: '1', name: 'Priya Sharma', points: 2850, rank: 1, previousRank: 2, recentActivity: 'Composting workshop', level: 'Platinum', avatar: 'PS' },
    { id: '2', name: 'Rajesh Kumar', points: 2740, rank: 2, previousRank: 1, recentActivity: 'Waste segregation', level: 'Gold', avatar: 'RK' },
    { id: '3', name: 'Anjali Singh', points: 2650, rank: 3, previousRank: 3, recentActivity: 'E-waste collection', level: 'Gold', avatar: 'AS' },
    { id: '4', name: 'Vikash Gupta', points: 2480, rank: 4, previousRank: 5, recentActivity: 'Community cleanup', level: 'Gold', avatar: 'VG' },
    { id: '5', name: 'Sunita Devi', points: 2350, rank: 5, previousRank: 4, recentActivity: 'Recycling drive', level: 'Silver', avatar: 'SD' },
    { id: '6', name: 'Amit Yadav', points: 2280, rank: 6, previousRank: 6, recentActivity: 'Waste photography', level: 'Silver', avatar: 'AY' },
    { id: '7', name: 'Kavita Jain', points: 2150, rank: 7, previousRank: 8, recentActivity: 'Training completion', level: 'Silver', avatar: 'KJ' },
    { id: '8', name: 'Ravi Malhotra', points: 2050, rank: 8, previousRank: 7, recentActivity: 'Bin monitoring', level: 'Bronze', avatar: 'RM' },
  ]);

  // Update points and rankings every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCitizens(prevCitizens => {
        const updatedCitizens = prevCitizens.map(citizen => {
          // Random points change between -20 to +50
          const pointsChange = Math.floor(Math.random() * 70) - 20;
          const newPoints = Math.max(1000, citizen.points + pointsChange);
          
          return {
            ...citizen,
            previousRank: citizen.rank,
            points: newPoints
          };
        });

        // Sort by points and update ranks
        const sortedCitizens = updatedCitizens
          .sort((a, b) => b.points - a.points)
          .map((citizen, index) => ({
            ...citizen,
            rank: index + 1
          }));

        return sortedCitizens;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankChangeIcon = (current: number, previous: number) => {
    if (current < previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current > previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <Card className="govt-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span>Green Citizens Leaderboard</span>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium ml-auto"
          >
            LIVE
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {citizens.map((citizen, index) => (
              <motion.div
                key={citizen.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-4 p-3 bg-secondary/50 rounded-lg hover:bg-secondary/80 transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center space-x-2 w-12">
                  {getRankIcon(citizen.rank)}
                  {getRankChangeIcon(citizen.rank, citizen.previousRank)}
                </div>

                {/* Avatar */}
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {citizen.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium truncate">{citizen.name}</p>
                    <Badge className={getLevelColor(citizen.level)}>
                      {citizen.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {citizen.recentActivity}
                  </p>
                </div>

                {/* Points */}
                <div className="text-right">
                  <motion.p 
                    key={citizen.points}
                    initial={{ scale: 1.2, color: '#10B981' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    className="font-bold text-govt-blue"
                  >
                    {citizen.points.toLocaleString()}
                  </motion.p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Your Ranking (simulated) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-primary/10 rounded-lg border-2 border-primary/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  RK
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-primary">Your Rank: #2</p>
                <p className="text-xs text-muted-foreground">Keep up the great work!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">2,740</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CitizenLeaderboard;