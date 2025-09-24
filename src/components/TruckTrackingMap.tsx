import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';

interface Truck {
  id: string;
  route: string;
  coordinates: [number, number];
  status: 'active' | 'idle' | 'maintenance';
  completion: number;
}

interface TruckTrackingMapProps {
  token: string;
  viewMode: 'citizen' | 'admin';
  userLocation?: [number, number];
}

const TruckTrackingMap: React.FC<TruckTrackingMapProps> = ({ 
  token, 
  viewMode, 
  userLocation = [77.2090, 28.6139] // Default to Delhi
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // Mock truck data - different for citizen vs admin view
  const generateTrucks = (): Truck[] => {
    if (viewMode === 'citizen') {
      // Show only nearby trucks for citizens
      return [
        {
          id: 'WM001',
          route: 'Route A',
          coordinates: [userLocation[0] + 0.01, userLocation[1] + 0.01],
          status: 'active',
          completion: 65
        },
        {
          id: 'WM003',
          route: 'Route C',
          coordinates: [userLocation[0] - 0.015, userLocation[1] + 0.008],
          status: 'active',
          completion: 45
        }
      ];
    } else {
      // Show all trucks for admin
      return [
        {
          id: 'WM001',
          route: 'Route A',
          coordinates: [77.2090, 28.6139],
          status: 'active',
          completion: 65
        },
        {
          id: 'WM002',
          route: 'Route B',
          coordinates: [77.2230, 28.6289],
          status: 'maintenance',
          completion: 0
        },
        {
          id: 'WM003',
          route: 'Route C',
          coordinates: [77.1950, 28.5950],
          status: 'active',
          completion: 90
        },
        {
          id: 'WM004',
          route: 'Route D',
          coordinates: [77.2350, 28.6050],
          status: 'active',
          completion: 45
        },
        {
          id: 'WM005',
          route: 'Route E',
          coordinates: [77.1800, 28.6300],
          status: 'idle',
          completion: 100
        }
      ];
    }
  };

  useEffect(() => {
    if (!token || !mapContainer.current) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: userLocation,
      zoom: viewMode === 'citizen' ? 13 : 11,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Initialize trucks
    const initialTrucks = generateTrucks();
    setTrucks(initialTrucks);

    // Add user location marker for citizen view
    if (viewMode === 'citizen') {
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
        .addTo(map.current);
    }

    return () => {
      map.current?.remove();
    };
  }, [token, viewMode, userLocation]);

  // Update truck positions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prevTrucks => 
        prevTrucks.map(truck => {
          if (truck.status === 'active') {
            // Simulate movement - small random changes
            const newCoords: [number, number] = [
              truck.coordinates[0] + (Math.random() - 0.5) * 0.005,
              truck.coordinates[1] + (Math.random() - 0.5) * 0.005
            ];
            
            return {
              ...truck,
              coordinates: newCoords,
              completion: Math.min(100, truck.completion + Math.random() * 5)
            };
          }
          return truck;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update markers when trucks change
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    trucks.forEach(truck => {
      const getMarkerColor = (status: string) => {
        switch (status) {
          case 'active': return '#10B981';
          case 'idle': return '#F59E0B';
          case 'maintenance': return '#EF4444';
          default: return '#6B7280';
        }
      };

      const marker = new mapboxgl.Marker({ 
        color: getMarkerColor(truck.status),
        scale: 0.8
      })
        .setLngLat(truck.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-govt-blue">${truck.id}</h3>
              <p class="text-sm">${truck.route}</p>
              <p class="text-sm">Status: <span class="capitalize font-medium">${truck.status}</span></p>
              <p class="text-sm">Progress: ${Math.round(truck.completion)}%</p>
            </div>
          `)
        )
        .addTo(map.current!);

      markersRef.current[truck.id] = marker;
    });
  }, [trucks]);

  if (!token) {
    return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Configure Mapbox token to enable live tracking</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative h-64 lg:h-80">
        <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
        
        {/* Live indicator */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium z-10"
        >
          🔴 LIVE
        </motion.div>
      </div>

      {/* Truck Status List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {trucks.map(truck => (
          <motion.div
            key={truck.id}
            layout
            className="flex items-center justify-between p-2 bg-secondary rounded text-sm"
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: truck.status === 'active' ? '#10B981' : 
                                   truck.status === 'idle' ? '#F59E0B' : '#EF4444'
                }}
              />
              <span className="font-medium">{truck.id}</span>
            </div>
            <span className="text-muted-foreground">{Math.round(truck.completion)}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TruckTrackingMap;