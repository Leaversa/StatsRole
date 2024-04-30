export interface SectionsProps {
  section: Record<string, unknown>;
  type?: "statistics";
  header: string;
}

export interface CharacterProps {
  Name: string;
  Type: string;
  Alignment: string;
  Description: string;
  HP: number;
  Defense: number;
  Speed: number;
  Statistics: Record<string, number>;
  Abilities: Record<string, string>;
  Actions: Record<string, string>;
  [key: string]: string | number | object;
}
