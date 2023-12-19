import { WorkoutQueryDto } from "@project/shared/shared-query";

export function buildCountQuery (query: WorkoutQueryDto) {
  const { caloriesToSpend, price, timeOfTraining, rating, type } = query;
  const usedFilter = {
    where: {
      AND: []
    }
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