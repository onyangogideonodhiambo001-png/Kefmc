
export enum TournamentStage {
  PREQUALIFY = 'Prequalify',
  WARD = 'Ward',
  SUB_COUNTY = 'Sub-County',
  COUNTY = 'County',
  REGIONAL = 'Regional',
  NATIONAL = 'National Finals'
}

export type MembershipTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export interface Player {
  id: string;
  name: string;
  userId: string;
  photo?: string;
  location: {
    ward: string;
    subCounty: string;
    county: string;
    region: string;
  };
  stage: TournamentStage;
  membership?: {
    tier: MembershipTier;
    isVerified: boolean;
  };
  stats: {
    rank: number;
    points: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalDiff: number;
  };
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  authorName: string;
  authorId: string;
  authorVerified: boolean;
  views: number;
  category: 'Goal' | 'Tackle' | 'Skill' | 'Full Match';
  timestamp: string;
}

export interface Sponsor {
  id: string;
  name: string;
  category: 'TITLE' | 'INTERNET' | 'BEVERAGE' | 'GOLD' | 'SILVER' | 'PARTNER';
  logo: string;
  videoUrl?: string;
  label: string;
}

export interface Match {
  id: string;
  player1Id: string;
  player1Name: string;
  player2Id: string;
  player2Name: string;
  score1?: number;
  score2?: number;
  date: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'LIVE' | 'REVOKED' | 'DISCONNECTED';
  networkSpeed1?: number;
  networkSpeed2?: number;
  terminationReason?: string;
}
