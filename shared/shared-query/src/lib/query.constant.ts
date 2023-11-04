export const DefaultPostsLimit = {
  Query: 25,
  Search: 20,
} as const;

export const DefaultSortParam = {
  Direction: 'desc',
  Type: 'createdAt',
} as const;

export const TagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
};

export const DEFAULT_LIMIT = 50;
export const DEFAULT_PAGE = 1;
