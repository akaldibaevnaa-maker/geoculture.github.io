export interface LocalizedText {
  kk: string;
  ru: string;
}

export type ObjectType =
  | 'monument'
  | 'archaeology'
  | 'sacred'
  | 'nature'
  | 'person'
  | 'historical_city'
  | 'mausoleum'
  | 'petroglyphs'
  | 'museum'
  | 'ancient_city'
  | 'unesco_site';

export interface CulturalObject {
  id: string;
  name: LocalizedText;
  coordinates: [number, number];
  region: LocalizedText;
  category: LocalizedText;
  objectType: ObjectType;
  period: string;
  description: LocalizedText;
  historicalSignificance: LocalizedText;
  relatedPersons: string[];
  legends?: LocalizedText;
  audioText?: LocalizedText;
  unesco: boolean;
  image?: string;
  images?: string[];
  sources?: LocalizedText[];
}

export interface KazakhRegion {
  id: string;
  name: LocalizedText;
  center: [number, number];
  zoom: number;
  cities: KazakhCity[];
  description?: LocalizedText;
}

export interface KazakhCity {
  name: LocalizedText;
  coordinates: [number, number];
}

export interface HistoricalPeriod {
  id: string;
  title: LocalizedText;
  years: string;
  description: LocalizedText;
  events: LocalizedText[];
  persons: string[];
  relatedObjectIds: string[];
  color: string;
}

export interface RoutePoint {
  order: number;
  object: CulturalObject;
  distanceFromPrev: string;
  travelTime: string;
  visitDuration: string;
}

export interface GeneratedRoute {
  points: RoutePoint[];
  totalDistance: string;
  totalTime: LocalizedText;
  reason: LocalizedText;
  region: LocalizedText;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp?: number;
}

export type AiMode = 'student' | 'tourist' | 'researcher';

export interface SearchSuggestion {
  type: 'region' | 'city' | 'object';
  label: string;
  coordinates: [number, number];
  zoom: number;
  objectId?: string;
}
