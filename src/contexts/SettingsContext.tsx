
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface N8nSettings {
  baseUrl: string;
  apiKey: string;
  enabled: boolean;
}

interface SettingsContextType {
  n8nSettings: N8nSettings;
  updateN8nSettings: (settings: N8nSettings) => void;
  isConfigured: boolean;
}

const defaultSettings: N8nSettings = {
  baseUrl: '',
  apiKey: '',
  enabled: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [n8nSettings, setN8nSettings] = useState<N8nSettings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('n8n-settings');
    if (savedSettings) {
      setN8nSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateN8nSettings = (settings: N8nSettings) => {
    setN8nSettings(settings);
    localStorage.setItem('n8n-settings', JSON.stringify(settings));
  };

  const isConfigured = n8nSettings.enabled && n8nSettings.baseUrl && n8nSettings.apiKey;

  return (
    <SettingsContext.Provider value={{ n8nSettings, updateN8nSettings, isConfigured }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
