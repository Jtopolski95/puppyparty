export interface Dog {
  id: string;
  name: string;
  bodyColor: DogBodyColor;
  size: DogSize;
  tail: DogTail;
  background: DogBackground;
  happiness: number;
  energy: number;
  hunger: number;
  lastFed: Date;
  lastPlayed: Date;
}

export enum DogBodyColor {
  BROWN = 'Brown',
  BLACK = 'Black',
  WHITE = 'White',
  GOLDEN = 'Golden',
  GRAY = 'Gray',
  RED = 'Red',
}

export enum DogSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
}

export enum DogTail {
  NONE = 'None',
  SMALL = 'Small',
  LONG = 'Long',
}

export enum DogBackground {
  GRASS = 'Grass',
  CEMENT = 'Cement',
  BEACH = 'Beach',
  LOS_ANGELES = 'Los Angeles',
  NEW_YORK_CITY = 'New York City',
}

export const DOG_BODY_COLORS = Object.values(DogBodyColor);
export const DOG_SIZES = Object.values(DogSize);
export const DOG_TAILS = Object.values(DogTail);
export const DOG_BACKGROUNDS = Object.values(DogBackground);

export const getDogBodyColorValue = (color: DogBodyColor): string => {
  const colorMap: Record<DogBodyColor, string> = {
    [DogBodyColor.BROWN]: '#8B4513',
    [DogBodyColor.BLACK]: '#000000',
    [DogBodyColor.WHITE]: '#FFFFFF',
    [DogBodyColor.GOLDEN]: '#FFD700',
    [DogBodyColor.GRAY]: '#808080',
    [DogBodyColor.RED]: '#FF0000',
  };
  return colorMap[color];
};

export const getDogSizeScale = (size: DogSize): number => {
  const scaleMap: Record<DogSize, number> = {
    [DogSize.SMALL]: 0.7,
    [DogSize.MEDIUM]: 1.0,
    [DogSize.LARGE]: 1.3,
  };
  return scaleMap[size];
};

export const getDogTailLength = (tail: DogTail): number => {
  const lengthMap: Record<DogTail, number> = {
    [DogTail.NONE]: 0,
    [DogTail.SMALL]: 20,
    [DogTail.LONG]: 40,
  };
  return lengthMap[tail];
};

export const getDogBackgroundColor = (background: DogBackground): string => {
  const colorMap: Record<DogBackground, string> = {
    [DogBackground.GRASS]: '#90EE90',
    [DogBackground.CEMENT]: '#C0C0C0',
    [DogBackground.BEACH]: '#F4E4BC',
    [DogBackground.LOS_ANGELES]: '#FFA500',
    [DogBackground.NEW_YORK_CITY]: '#4169E1',
  };
  return colorMap[background];
};

export const getDogBackgroundEmoji = (background: DogBackground): string => {
  const emojiMap: Record<DogBackground, string> = {
    [DogBackground.GRASS]: '🌱',
    [DogBackground.CEMENT]: '🏗️',
    [DogBackground.BEACH]: '🏖️',
    [DogBackground.LOS_ANGELES]: '🌴',
    [DogBackground.NEW_YORK_CITY]: '🏙️',
  };
  return emojiMap[background];
};
