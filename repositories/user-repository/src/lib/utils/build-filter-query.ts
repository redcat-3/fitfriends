export function buildFilterQuery (location: string, typeOfTrain: string, level: string, trainigReady: boolean) {
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
  if (trainigReady) {
    usedFilter.$and.push({ 
      trainigReady: true
    })
  };
  return usedFilter;
}