"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const styleOptions = {
  face: [
    'angryWithFang', 'awe', 'blank', 'calm', 'cheeky', 'concerned', 'concernedFear', 
    'contempt', 'cute', 'cyclops', 'driven', 'eatingHappy', 'explaining', 'eyesClosed', 
    'fear', 'hectic', 'lovingGrin1', 'lovingGrin2', 'monster', 'old', 'rage', 'serious', 
    'smile', 'smileBig', 'smileLOL', 'smileTeethGap', 'solemn', 'suspicious', 'tired', 'veryAngry'
  ],
  head: [
    'afro', 'bangs', 'bangs2', 'bantuKnots', 'bear', 'bun', 'bun2', 'buns', 'cornrows', 
    'cornrows2', 'dreads1', 'dreads2', 'flatTop', 'flatTopLong', 'grayBun', 'grayMedium', 
    'grayShort', 'hatBeanie', 'hatHip', 'hijab', 'long', 'longAfro', 'longBangs', 'longCurly', 
    'medium1', 'medium2', 'medium3', 'mediumBangs', 'mediumBangs2', 'mediumBangs3', 'mediumStraight', 
    'mohawk', 'mohawk2', 'noHair1', 'noHair2', 'noHair3', 'pomp', 'shaved1', 'shaved2', 'shaved3', 
    'short1', 'short2', 'short3', 'short4', 'short5', 'turban', 'twists', 'twists2'
  ],
  skinColor: ['694d3d', 'ae5d29', 'd08b5b', 'edb98a', 'ffdbb4'],
  backgroundColor: ['transparent', 'b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
  accessories: [
    'eyepatch', 'glasses', 'glasses2', 'glasses3', 'glasses4', 'glasses5', 
    'sunglasses', 'sunglasses2'
  ],
  facialHair: [
    'chin', 'full', 'full2', 'full3', 'full4', 'goatee1', 'goatee2', 
    'moustache1', 'moustache2', 'moustache3', 'moustache4', 'moustache5', 
    'moustache6', 'moustache7', 'moustache8', 'moustache9'
  ],
  mask: ['medicalMask', 'respirator']
};

const defaultOptions = {
  face: 'smile',
  head: 'short1',
  skinColor: 'edb98a',
  backgroundColor: 'b6e3f4',
  accessories: [],
  facialHair: '',
  mask: ''
};

interface OpenPeepsAvatarEditorProps {
  onSave?: (avatarUrl: string) => void;
}

export default function OpenPeepsAvatarEditor({ onSave }: OpenPeepsAvatarEditorProps) {
  const [options, setOptions] = useState(defaultOptions);

  const handleOptionChange = (category: string, value: any) => {
    if (category === 'accessories') {
      setOptions(prev => ({
        ...prev,
        accessories: value === 'none' ? [] : [value],
        accessoriesProbability: value === 'none' ? 0 : 100
      }));
    } else if (category === 'facialHair') {
      setOptions(prev => ({
        ...prev,
        facialHair: value === 'none' ? '' : value,
        facialHairProbability: value === 'none' ? 0 : 100
      }));
    } else if (category === 'mask') {
      setOptions(prev => ({
        ...prev,
        mask: value === 'none' ? '' : value,
        maskProbability: value === 'none' ? 0 : 100
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        [category]: value === 'none' ? (Array.isArray(prev[category]) ? [] : '') : value
      }));
    }
  };

  const generateAvatarUrl = () => {
    const baseUrl = 'https://api.dicebear.com/7.x/open-peeps/svg';
    const params = new URLSearchParams();

    // Add all options to URL parameters
    Object.entries(options).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.append(key, value.join(','));
          // Add probability parameter for accessories
          if (key === 'accessories') {
            params.append('accessoriesProbability', '100');
          }
        }
      } else if (value !== undefined && value !== '') {
        params.append(key, value.toString());
        // Add probability parameters for facial hair and mask
        if (key === 'facialHair') {
          params.append('facialHairProbability', '100');
        }
        if (key === 'mask') {
          params.append('maskProbability', '100');
        }
      }
    });

    return `${baseUrl}?${params.toString()}`;
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
        {/* Face Expression */}
        <div className="space-y-2">
          <Label>Face Expression</Label>
          <Select
            value={options.face}
            onValueChange={(value) => handleOptionChange('face', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose expression" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.face.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Head Style */}
        <div className="space-y-2">
          <Label>Head Style</Label>
          <Select
            value={options.head}
            onValueChange={(value) => handleOptionChange('head', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose head style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.head.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
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
            onValueChange={(value) => handleOptionChange('accessories', value)}
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

        {/* Facial Hair */}
        <div className="space-y-2">
          <Label>Facial Hair</Label>
          <Select
            value={options.facialHair || 'none'}
            onValueChange={(value) => handleOptionChange('facialHair', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose facial hair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {styleOptions.facialHair.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mask */}
        <div className="space-y-2">
          <Label>Mask</Label>
          <Select
            value={options.mask || 'none'}
            onValueChange={(value) => handleOptionChange('mask', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose mask" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {styleOptions.mask.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Background */}
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