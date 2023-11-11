type ObjectWithId = {
  id: number
}

export function getLargestId(objects: ObjectWithId[]): number {
  let largestId = 0

  for (const object of objects) {
    if (object.id > largestId) {
      largestId = object.id
    }
  }

  return largestId
}
