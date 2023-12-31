export const BalancesError = {
  UserError: 'Не может быть выбран пользователь, являющийся инициатором тренировки',
  UserNotFound: 'User is not found',
  WrongRole: 'User role is wrong',
  StatusError: "Status must be change",
  AuthUserError: "User is not creator of this Balance",
  NotCreatorError: 'Only creator can delete Balance',
} as const;
  
export const BalanceMessages = { 
  Update : "Balance updated successfully",
  Delete : "Balance deleted successfully",
  Show: "Balance showing",
  Index: "Balances are showing"
} as const;
  
export const BalancePath = { 
  Main:"balance",
  Add:"add",
  Update: "update",
  Id:"list/:balanceId",
  Index:"list",
} as const;

export const  API_TAG_NAME ="Balance"
  