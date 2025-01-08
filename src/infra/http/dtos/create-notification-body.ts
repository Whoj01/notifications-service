import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description:
      'Recipient ID, ID of the user who will receive the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 240)
  @ApiProperty({
    description: 'Content of the notification',
    example: 'Your post has been liked by 5 people',
  })
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Category of the notification',
    example: 'social',
  })
  category: string;
}
