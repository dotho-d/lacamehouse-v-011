"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Options disponibles pour BigSmile
const styleOptions = {
  accessories: ['catEars', 'clownNose', 'faceMask', 'glasses', 'mustache', 'sailormoonCrown', 'sleepMask', 'sunglasses'],
  backgroundColor: ['transparent', 'b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
  backgroundType: ['gradientLinear', 'solid'],
  eyes: ['angry', 'cheery', 'confused', 'normal', 'sad', 'sleepy', 'starstruck', 'winking'],
  face: ['base'],
  hair: ['bangs', 'bowlCutHair', 'braids', 'bunHair', 'curlyBob', 'curlyShortHair', 'froBun', 'halfShavedHead', 'mohawk', 'shavedHead', 'shortHair', 'straightHair', 'wavyBob'],
  hairColor: ['3a1a00', '220f00', '238d80', '605de4', '71472d', 'd56c0c', 'e2ba87', 'e9b729'],
  mouth: ['awkwardSmile', 'braces', 'gapSmile', 'kawaii', 'openedSmile', 'openSad', 'teethSmile', 'unimpressed'],
  skinColor: ['8c5a2b', '643d19', 'a47539', 'c99c62', 'e2ba87', 'efcc9f', 'f5d7b1', 'ffe4c0']
};

// Valeurs par défaut pour BigSmile
const defaultOptions = {
  accessories: [],
  accessoriesProbability: 100,
  backgroundColor: 'b6e3f4',
  backgroundType: 'solid',
  eyes: 'normal',
  face: 'base',
  hair: 'shortHair',
  hairColor: '71472d',
  mouth: 'awkwardSmile',
  skinColor: 'e2ba87'
};

interface BigSmileAvatarEditorProps {
  onSave?: (avatarUrl: string) => void;
}

export default function BigSmileAvatarEditor({ onSave }: BigSmileAvatarEditorProps) {
  const [options, setOptions] = useState(defaultOptions);

  const generateAvatarUrl = () => {
    const baseUrl = 'https://api.dicebear.com/7.x/big-smile/svg';
    const params = new URLSearchParams();

    // Add all options to URL parameters
    Object.entries(options).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.append(key, value.join(','));
        }
      } else if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const handleOptionChange = (category: string, value: any) => {
    setOptions(prev => ({
      ...prev,
      [category]: value === 'none' ? (Array.isArray(prev[category]) ? [] : '') : value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(generateAvatarUrl());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img 
          src={generateAvatarUrl()} 
          alt="Avatar Preview" 
          className="w-48 h-48 rounded-full border-4 border-[#D4A676]/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Eyes */}
        <div className="space-y-2">
          <Label>Eyes</Label>
          <Select
            value={options.eyes}
            onValueChange={(value) => handleOptionChange('eyes', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose eye style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.eyes.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mouth */}
        <div className="space-y-2">
          <Label>Mouth</Label>
          <Select
            value={options.mouth}
            onValueChange={(value) => handleOptionChange('mouth', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose mouth style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.mouth.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hair */}
        <div className="space-y-2">
          <Label>Hair Style</Label>
          <Select
            value={options.hair}
            onValueChange={(value) => handleOptionChange('hair', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose hair style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.hair.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hair Color */}
        <div className="space-y-2">
          <Label>Hair Color</Label>
          <Select
            value={options.hairColor}
            onValueChange={(value) => handleOptionChange('hairColor', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose hair color" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.hairColor.map(color => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `#${color}` }} />
                    <span>#{color}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skin Color */}
        <div className="space-y-2">
          <Label>Skin Color</Label>
          <Select
            value={options.skinColor}
            onValueChange={(value) => handleOptionChange('skinColor', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose skin color" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.skinColor.map(color => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `#${color}` }} />
                    <span>#{color}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Accessories */}
        <div className="space-y-2">
          <Label>Accessories</Label>
          <Select
            value={options.accessories[0] || 'none'}
            onValueChange={(value) => handleOptionChange('accessories', value === 'none' ? [] : [value])}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose accessories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {styleOptions.accessories.map(accessory => (
                <SelectItem key={accessory} value={accessory}>{accessory}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Background Color */}
        <div className="space-y-2">
          <Label>Background</Label>
          <Select
            value={options.backgroundColor}
            onValueChange={(value) => handleOptionChange('backgroundColor', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose background" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transparent">Transparent</SelectItem>
              {styleOptions.backgroundColor.filter(c => c !== 'transparent').map(color => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `#${color}` }} />
                    <span>#{color}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Background Type */}
        {options.backgroundColor !== 'transparent' && (
          <div className="space-y-2">
            <Label>Background Type</Label>
            <Select
              value={options.backgroundType}
              onValueChange={(value) => handleOptionChange('backgroundType', value)}
            >
              <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
                <SelectValue placeholder="Choose background type" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.backgroundType.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button
        onClick={handleSave}
        className="w-full bg-[#D4A676] text-[#0E232E] hover:bg-[#D4A676]/90 transition-colors"
      >
        Save Avatar
      </Button>
    </div>
  );
}