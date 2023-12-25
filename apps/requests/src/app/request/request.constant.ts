export const RequestsError = {
  RequestNotFound: 'Request is not found',
  UserError: 'Не может быть выбран пользователь, являющийся инициатором тренировки',
  UserNotFound: 'User is not found',
  WrongRole: 'User role is wrong',
  StatusError: "Status must be change",
  AuthError: "User is not recipient of this request",
  AuthUserError: "User is not creator of this request, and is not recipient of this order",
  NotCreatorError: 'Only creator can delete request',
} as const;
  
export const RequestsMessages = { 
  Add : "Request added successfully",
  Update : "Request updated successfully",
  Delete : "Request deleted successfully",
  Show: "Request showing",
  Index: "Requests are showing"
} as const;
  
export const RequestsPath = { 
  Main:"request",
  Add:"add",
  Id:":requestId",
  Index:"list/input",
  IndexMyRequests:"list/requester",
} as const;

export const  API_TAG_NAME ="Requests"
  