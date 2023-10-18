export const BAD_MONGOID_ERROR = 'Bad entity ID';
export const ValidationArgumentType = {
  Param: 'param',
  Body: 'body'
  } as const;
export const MongoidValidationError = {
  WrongType : 'This pipe must used only with params!',
  } as const;
