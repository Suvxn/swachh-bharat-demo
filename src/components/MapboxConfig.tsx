import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, ExternalLink } from 'lucide-react';

interface MapboxConfigProps {
  onTokenSet: (token: string) => void;
}

const MapboxConfig: React.FC<MapboxConfigProps> = ({ onTokenSet }) => {
  const [token, setToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setToken(savedToken);
      setIsTokenSet(true);
      onTokenSet(savedToken);
    }
  }, [onTokenSet]);

  const handleSetToken = () => {
    if (token.trim()) {
      localStorage.setItem('mapboxToken', token);
      setIsTokenSet(true);
      onTokenSet(token);
    }
  };

  const handleClearToken = () => {
    localStorage.removeItem('mapboxToken');
    setToken('');
    setIsTokenSet(false);
    onTokenSet('');
  };

  if (isTokenSet) {
    return (
      <Alert className="mb-4">
        <MapPin className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Mapbox token configured successfully!</span>
          <Button variant="outline" size="sm" onClick={handleClearToken}>
            Change Token
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="govt-card mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span>Configure Mapbox</span>
        </CardTitle>
        <CardDescription>
          To enable live tracking maps, please provide your Mapbox public token
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mapboxToken">Mapbox Public Token</Label>
          <Input
            id="mapboxToken"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazk..."
          />
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleSetToken} disabled={!token.trim()}>
            Configure Maps
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1"
            >
              <span>Get Token</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        <Alert>
          <AlertDescription>
            Visit <strong>mapbox.com</strong> → Sign up/Login → Dashboard → Tokens section to get your public token
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default MapboxConfig;