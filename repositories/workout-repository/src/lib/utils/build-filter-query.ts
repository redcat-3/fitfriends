import { WorkoutQuery } from "@project/shared/shared-query";

export function buildFilterQuery (query: WorkoutQuery) {
  const { limit, page, sortBy, caloriesToSpend, sortDirection, price, timeOfTraining, rating, type } = query;
  const usedFilter = {
    where: {
      AND: []
    },
    take: limit,
    include: {
      feedbacks: true,
      orders: true,
    },
    orderBy: [
      { [sortBy]: sortDirection }
    ],
    skip: page > 0 ? limit * (page - 1) : undefined,
  };
  if (caloriesToSpend) {
    const [min, max] = caloriesToSpend.split(",");
    usedFilter.where.AND.push({
      caloriesToSpend: {
        gte: +min,
        lte: +max
      },
    })
  };
  if (price) {
    const [min, max] = price.split(",");
    usedFilter.where.AND.push({
      price: {
        gte: +min,
        lte: +max
      },
    })
  };
  if (timeOfTraining) {
    const times = timeOfTraining.split(",");
    usedFilter.where.AND.push({
        timeOfTraining: {
          in: times,
      },
    })
  };
  if (type) {
    const types = type.split(",");
    usedFilter.where.AND.push({
        type: {
          in: types,
      },
    })
  };
  if (rating) {
    const [min, max] = rating.split(",");
    usedFilter.where.AND.push({
      rating: {
        gte: +min,
        lte: +max
      },
    })
  };
  return usedFilter;
}