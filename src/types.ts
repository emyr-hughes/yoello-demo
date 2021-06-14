export interface Product {
  abv: number;
  attenuation_level: number;
  boil_volume: { value: number; unit: string };
  brewers_tips: string;
  contributed_by: string;
  description: string;
  ebc: number;
  first_brewed: string;
  food_pairing: string[];
  ibu: number;
  id: number;
  image_url: string;
  name: string;
  ph: number;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: { value: number; unit: string };
  method: {
    fermentation: { temp: { unit: string; value: number } };
    mash_temp: { temp: { unit: string; value: number } }[];
    twist: string;
  };
  quantity: number;
}
