export class StampDetailDto {
  stampName:     string;
  stampPeriod:   string;
  stampLocation: string;
  stampTime:     Date | null;
  stampLatitude: number;
  stampLongitude: number;
}
