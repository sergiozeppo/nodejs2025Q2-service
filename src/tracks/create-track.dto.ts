import { IsString, IsOptional, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsNumber()
  @Min(0)
  duration: number;
}
