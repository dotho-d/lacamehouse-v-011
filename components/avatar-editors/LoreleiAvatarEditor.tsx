"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Options disponibles pour Lorelei
const styleOptions = {
  backgroundColor: ['transparent', 'b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
  backgroundType: ['gradientLinear', 'solid'],
  beard: ['variant01', 'variant02'],
  earrings: ['variant01', 'variant02', 'variant03'],
  eyebrows: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13'],
  eyes: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24'],
  freckles: ['variant01'],
  glasses: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05'],
  hair: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24', 'variant25', 'variant26', 'variant27', 'variant28', 'variant29', 'variant30', 'variant31', 'variant32', 'variant33', 'variant34', 'variant35', 'variant36', 'variant37', 'variant38', 'variant39', 'variant40', 'variant41', 'variant42', 'variant43', 'variant44', 'variant45', 'variant46', 'variant47', 'variant48'],
  hairAccessories: ['flowers'],
  head: ['variant01', 'variant02', 'variant03', 'variant04'],
  mouth: ['happy01', 'happy02', 'happy03', 'happy04', 'happy05', 'happy06', 'happy07', 'happy08', 'happy09', 'happy10', 'happy11', 'happy12', 'happy13', 'happy14', 'happy15', 'happy16', 'happy17', 'happy18', 'sad01', 'sad02', 'sad03', 'sad04', 'sad05', 'sad06', 'sad07', 'sad08', 'sad09'],
  nose: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06'],
  skinColor: ['ffffff']
};

// Valeurs par défaut pour Lorelei
const defaultOptions = {
  backgroundColor: 'b6e3f4',
  backgroundType: 'solid',
  beard: '',
  beardProbability: 0,
  earrings: '',
  earringsColor: '000000',
  earringsProbability: 0,
  eyebrows: 'variant01',
  eyebrowsColor: '000000',
  eyes: 'variant01',
  eyesColor: '000000',
  freckles: '',
  frecklesColor: '000000',
  frecklesProbability: 0,
  glasses: '',
  glassesColor: '000000',
  glassesProbability: 0,
  hair: 'variant01',
  hairAccessories: '',
  hairAccessoriesColor: '000000',
  hairAccessoriesProbability: 0,
  hairColor: '000000',
  head: 'variant01',
  mouth: 'happy01',
  mouthColor: '000000',
  nose: 'variant01',
  noseColor: '000000',
  skinColor: 'ffffff'
};

interface LoreleiAvatarEditorProps {
  onSave?: (avatarUrl: string) => void;
}

export default function LoreleiAvatarEditor({ onSave }: LoreleiAvatarEditorProps) {
  const [options, setOptions] = useState(defaultOptions);

  const generateAvatarUrl = () => {
    const baseUrl = 'https://api.dicebear.com/7.x/lorelei/svg';
    const params = new URLSearchParams();

    // Add all options to URL parameters
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const handleOptionChange = (category: string, value: any) => {
    setOptions(prev => ({
      ...prev,
      [category]: value === 'none' ? '' : value
    }));
  };

  const handleColorChange = (category: string, value: string) => {
    // Validate hex color
    const hexColor = value.replace('#', '');
    if (/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
      handleOptionChange(category, hexColor);
    }
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
        {/* Head */}
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
          <Input
            type="text"
            value={options.hairColor}
            onChange={(e) => handleColorChange('hairColor', e.target.value)}
            placeholder="Enter hex color (e.g., 000000)"
            className="bg-[#132D3B] border-white/20"
          />
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: `#${options.hairColor}` }} 
            />
            <span className="text-xs">Preview</span>
          </div>
        </div>

        {/* Eyes */}
        <div className="space-y-2">
          <Label>Eyes Style</Label>
          <Select
            value={options.eyes}
            onValueChange={(value) => handleOptionChange('eyes', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose eyes style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.eyes.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Eyebrows */}
        <div className="space-y-2">
          <Label>Eyebrows Style</Label>
          <Select
            value={options.eyebrows}
            onValueChange={(value) => handleOptionChange('eyebrows', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose eyebrows style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.eyebrows.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mouth */}
        <div className="space-y-2">
          <Label>Mouth Style</Label>
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

        {/* Nose */}
        <div className="space-y-2">
          <Label>Nose Style</Label>
          <Select
            value={options.nose}
            onValueChange={(value) => handleOptionChange('nose', value)}
          >
            <SelectTrigger className="w-full bg-[#132D3B] border-white/20">
              <SelectValue placeholder="Choose nose style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.nose.map(style => (
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