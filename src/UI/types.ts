//Icon.tsx
export type IconName =
  | "AnalyticCircleIcon"
  | "ChatIcon"
  | "DocumentsSquareIcon"
  | "ExitIcon"
  | "LogoIcon"
  | "SearchWorkIcon"
  | "TrainingCircleIcon"
  ;
export type IconParams = {
  iconName: IconName,
  iconWidth?: number,
  iconHeight?: number,
  spriteHref: string,
}

//Card.tsx
export interface Card {
  id: number,
  title: string,
  icon: IconParams,
  description: string,
  classNames?: {
    card?: string,
    cardInner?: string,
    icon?: string,
    title?: string,
    description?: string,
  }
}