import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'compliance' | 'maintenance' | 'emergency';
  location: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Segregation Violation',
    description: 'Poor waste segregation detected in community bins',
    type: 'compliance',
    location: 'Sector 14'
  },
  {
    id: '2',
    title: 'Bin Overflow Alert',
    description: 'Smart bin reached 95% capacity',
    type: 'maintenance',
    location: 'DLF Phase 2'
  },
  {
    id: '3',
    title: 'Collection Delay',
    description: 'Vehicle WM002 is behind schedule',
    type: 'maintenance',
    location: 'Cyber City'
  },
  {
    id: '4',
    title: 'Contamination Alert',
    description: 'Hazardous waste mixed with organic waste',
    type: 'compliance',
    location: 'Old Gurgaon'
  },
  {
    id: '5',
    title: 'Equipment Failure',
    description: 'Compactor unit requires immediate attention',
    type: 'emergency',
    location: 'Udyog Vihar'
  },
  {
    id: '6',
    title: 'Route Optimization',
    description: 'High traffic causing collection delays',
    type: 'maintenance',
    location: 'Golf Course Road'
  },
  {
    id: '7',
    title: 'Plastic Ban Violation',
    description: 'Single-use plastic detected in waste stream',
    type: 'compliance',
    location: 'Sector 29'
  },
  {
    id: '8',
    title: 'Capacity Warning',
    description: 'Processing facility approaching maximum load',
    type: 'maintenance',
    location: 'Central Processing Unit'
  }
];

export const useAdminAlerts = () => {
  useEffect(() => {
    let alertIndex = 0;

    const showAlert = () => {
      const alert = mockAlerts[alertIndex % mockAlerts.length];
      
      const getAlertIcon = (type: string) => {
        switch (type) {
          case 'compliance': return '⚠️';
          case 'maintenance': return '🔧';
          case 'emergency': return '🚨';
          default: return '📢';
        }
      };

      const getAlertVariant = (type: string): 'default' | 'destructive' => {
        return type === 'emergency' ? 'destructive' : 'default';
      };

      toast({
        title: `${getAlertIcon(alert.type)} ${alert.title}`,
        description: `${alert.location}: ${alert.description}`,
        variant: getAlertVariant(alert.type),
        duration: 5000,
      });

      alertIndex++;
    };

    // Show first alert after 3 seconds
    const firstTimeout = setTimeout(showAlert, 3000);

    // Then show alerts every 20 seconds
    const interval = setInterval(showAlert, 20000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);
};

export default useAdminAlerts;