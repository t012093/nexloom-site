import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  colSpan?: number; // For Bento Grid layout
  bgImage?: string;
}

export interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export enum OSType {
  MAC_INTEL = 'macOS (Intel)',
  MAC_SILICON = 'macOS (Silicon)',
  WINDOWS = 'Windows',
  LINUX = 'Linux',
  UNKNOWN = 'Unknown',
}