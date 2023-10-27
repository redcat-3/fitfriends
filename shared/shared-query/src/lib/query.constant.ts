export const DefaultPostsLimit = {
  Query: 25,
  Search: 20,
} as const;

export const DefaultSortParam = {
  Direction: 'desc',
  Type: 'postedDate',
} as const;

export const TagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
};

export const DEFAULT_COMMENTS_LIMIT = 50;
