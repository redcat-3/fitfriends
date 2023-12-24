export function buildFilterQuery (location: string, typeOfTrain: string, level: string) {
  const usedFilter = {
    $and: []
  };
  if (location) {
    const locations = location.split(",");
    usedFilter.$and.push({
      location: { $in: locations },
    })
  };
  if (typeOfTrain) {
    const types = typeOfTrain.split(",");
    usedFilter.$and.push({
      typeOfTrain: { $all: types },
    })
  };
  if (level) {
    usedFilter.$and.push({ 
      level: level 
    })
  };
  return usedFilter;
}