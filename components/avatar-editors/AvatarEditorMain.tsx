"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BigSmileAvatarEditor from './BigSmileAvatarEditor';
import LoreleiAvatarEditor from './LoreleiAvatarEditor';
import OpenPeepsAvatarEditor from './OpenPeepsAvatarEditor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type AvatarStyle = 'bigSmile' | 'lorelei' | 'openPeeps';

interface AvatarEditorMainProps {
  onSave?: (avatarUrl: string, style: AvatarStyle) => void;
}

// Default avatar URLs for each style
const defaultAvatars: Record<AvatarStyle, string> = {
  bigSmile: 'https://api.dicebear.com/7.x/big-smile/svg?seed=default&backgroundColor=b6e3f4',
  lorelei: 'https://api.dicebear.com/7.x/lorelei/svg?seed=default&backgroundColor=b6e3f4',
  openPeeps: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=default&backgroundColor=b6e3f4'
};

export default function AvatarEditorMain({ onSave }: AvatarEditorMainProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('lorelei');
  const [avatarUrls, setAvatarUrls] = useState<Record<AvatarStyle, string>>(defaultAvatars);
  const { toast } = useToast();

  // Initialize with default avatars
  useEffect(() => {
    setAvatarUrls(defaultAvatars);
  }, []);

  const handleAvatarSave = (style: AvatarStyle) => (url: string) => {
    try {
      // Validate URL
      new URL(url);
      
      // Update avatar URL for this style
      setAvatarUrls(prev => ({
        ...prev,
        [style]: url
      }));

      // Call onSave callback if provided
      if (onSave) {
        onSave(url, style);
      }

      // Show success toast
      toast({
        title: "Avatar sauvegardé",
        description: "Votre avatar a été mis à jour avec succès.",
      });
    } catch (error) {
      // Show error toast if URL is invalid
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde de l'avatar.",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#0c1e27] border-[#224659] text-white shadow-lg">
      <CardHeader className="bg-[#0c1e27] border-b border-[#224659]">
        <CardTitle className="text-2xl font-bold text-[#D4A676]">Éditeur d'Avatar</CardTitle>
        <CardDescription className="text-gray-300">
          Choisissez un style d'avatar et personnalisez-le selon vos préférences
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs 
          value={selectedStyle} 
          onValueChange={(value) => setSelectedStyle(value as AvatarStyle)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-[#132D3B] mb-6">
            <TabsTrigger 
              value="lorelei" 
              className="data-[state=active]:bg-[#D4A676] data-[state=active]:text-white"
            >
              Lorelei
            </TabsTrigger>
            <TabsTrigger 
              value="bigSmile" 
              className="data-[state=active]:bg-[#D4A676] data-[state=active]:text-white"
            >
              Big Smile
            </TabsTrigger>
            <TabsTrigger 
              value="openPeeps" 
              className="data-[state=active]:bg-[#D4A676] data-[state=active]:text-white"
            >
              Open Peeps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lorelei">
            <LoreleiAvatarEditor onSave={handleAvatarSave('lorelei')} />
          </TabsContent>

          <TabsContent value="bigSmile">
            <BigSmileAvatarEditor onSave={handleAvatarSave('bigSmile')} />
          </TabsContent>

          <TabsContent value="openPeeps">
            <OpenPeepsAvatarEditor onSave={handleAvatarSave('openPeeps')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}