
export function leanify(mongooseModelResponse) {
  console.log(mongooseModelResponse);
  return mongooseModelResponse.toObject();
}
