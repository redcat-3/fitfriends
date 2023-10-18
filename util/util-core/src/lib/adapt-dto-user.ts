import { plainToInstance } from 'class-transformer';
import {
  CreateUserDto,
  UserUserDto,
  UserCoachDto
} from '@project/shared/shared-dto';
import { UserRole } from '@project/shared/shared-types';

export function adaptCreateDtoUser(dto: CreateUserDto) {
  switch (dto.role) {
    case UserRole.User:
      return plainToInstance(UserUserDto, dto);
    case UserRole.Сoach:
      return plainToInstance(UserCoachDto, dto);
  }
}

// export function adaptUpdateDtoPost(dto: UpdatePostContentDto) {
//   switch (dto.type) {
//     case PostType.Link:
//       return plainToInstance(UpdateLinkPostDto, dto);
//     case PostType.Photo:
//       return plainToInstance(UpdatePhotoPostDto, dto);
//     case PostType.Quote:
//       return plainToInstance(UpdateQuotePostDto, dto);
//     case PostType.Text:
//       return plainToInstance(UpdateTextPostDto, dto);
//     case PostType.Video:
//       return plainToInstance(UpdateVideoPostDto, dto);
//   }
// }
