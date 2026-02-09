
import { TournamentStage, Sponsor } from './types';

export const NAIROBI_SUB_COUNTIES = [
  'Westlands', 'Dagoretti North', 'Dagoretti South', 'Lang’ata', 'Kibra',
  'Kasarani', 'Roysambu', 'Ruaraka', 'Embakasi East', 'Embakasi West',
  'Embakasi South', 'Embakasi Central', 'Embakasi North', 'Makadara',
  'Kamukunji', 'Starehe', 'Mathare'
];

export const NAIROBI_WARDS = [
  'Kibera', 'Laini Saba', 'Makina', 'Sarangombe', 'Woodley', 'Karen',
  'Nyayo Highrise', 'South B', 'South C', 'Umoja I', 'Umoja II',
  'Kayole North', 'Kayole Central', 'Kayole South', 'Dandora I',
  'Dandora II', 'Dandora III', 'Dandora IV', 'Mathare North',
  'Mathare West', 'Pangani', 'Ziwani', 'Ngara'
];

export const SPONSORS: Sponsor[] = [
  {
    id: 's1',
    name: 'Safaricom 5G',
    category: 'TITLE',
    logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70860-536853503_large.mp4',
    label: 'Title Sponsor'
  },
  {
    id: 's2',
    name: 'Zuku Fiber',
    category: 'INTERNET',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/16/49969-459528652_large.mp4',
    label: 'Official Internet Partner'
  },
  {
    id: 's3',
    name: 'Monster Energy',
    category: 'BEVERAGE',
    logo: 'https://images.unsplash.com/photo-1622543925917-763c34d1536e?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/23/186256-877717646_large.mp4',
    label: 'Official Beverage Partner'
  },
  {
    id: 's4',
    name: 'NCBA Bank',
    category: 'PARTNER',
    logo: 'https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1000&auto=format&fit=crop',
    label: 'Financial Partner'
  },
  {
    id: 's5',
    name: 'Red Bull',
    category: 'PARTNER',
    logo: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2024/04/15/208105_large.mp4',
    label: 'Gaming Partner'
  },
  {
    id: 's6',
    name: 'Logitech G',
    category: 'PARTNER',
    logo: 'https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?q=80&w=1000&auto=format&fit=crop',
    label: 'Hardware Partner'
  },
  {
    id: 's7',
    name: 'Citizen TV',
    category: 'PARTNER',
    logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop',
    label: 'Media Partner'
  }
];

export const TOURNAMENT_FLOW = [
  { id: 1, name: 'Registration', stage: 'Register', desc: 'Entry via Ksh 50 M-Pesa' },
  { id: 2, name: 'Prequalify', stage: TournamentStage.PREQUALIFY, desc: 'Top 80 in Ward advance' },
  { id: 3, name: 'Ward Stage', stage: TournamentStage.WARD, desc: 'Groups of 10 & Knockouts' },
  { id: 4, name: 'Sub-County', stage: TournamentStage.SUB_COUNTY, desc: 'Nairobi sub-county leagues' },
  { id: 5, name: 'County', stage: TournamentStage.COUNTY, desc: 'Nairobi County Finals' },
  { id: 6, name: 'Regional', stage: TournamentStage.REGIONAL, desc: 'Nairobi Region showdown' },
  { id: 7, name: 'National Finals', stage: TournamentStage.NATIONAL, desc: 'Grand Final Glory' }
];
