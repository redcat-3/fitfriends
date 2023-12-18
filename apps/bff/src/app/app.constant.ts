export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/user',
  Auth = 'http://localhost:3001/api/auth',
  Workouts = 'http://localhost:3002/api/workout',
  Orders = 'http://localhost:3002/api/order',
  Feedbacks = 'http://localhost:3002/api/feedback',
  Notifications = 'http://localhost:3005/api/notification',
  Requests = 'http://localhost:3004/api/request',
  Balances = 'http://localhost:3006/api/balance',
}

export enum HttpClientParam {
  MaxRedirect = 5,
  Timeout = 5000
}

export const WorkoutPath = {
  Main: 'workout',
  Add: 'add',
  List: 'list',
  CoachList: 'list/coach',
  CoachListWithFilters: 'list/coach/:price/:calories/:rating/:duration',
  Id: 'list/coach/:id'
}as const;