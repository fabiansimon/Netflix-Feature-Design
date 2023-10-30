export enum ReasonType {
    CAST,
    LENGTH, 
    PLOT,
}

export type Reason = {
    type: ReasonType;
    values: string[] | number;
  }
  
export interface MatchData {
    percentage: number;
    reasons: Reason[];
}
