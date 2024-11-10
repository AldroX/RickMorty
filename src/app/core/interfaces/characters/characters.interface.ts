
import { Episode } from "../episode/episode.interface";
import { Info } from "../info.interface";
import { Location } from "../location/location.interface";


export interface Origin {
    name: string;
    url: string;
  }
    
  export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: Episode[];
    url: string;
    created: string;
  }
  
  export interface CharacterResponse {
    info: Info | null;
    results: Character[];
    count?: number;
    error?: boolean;
    message: string;
  }