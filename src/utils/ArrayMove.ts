export default function ArrayMove<T>(arr: T[], old_index: number, new_index: number) {
  if (old_index < 0 || old_index >= arr.length || new_index < 0 || new_index >= arr.length) {
    return arr;
  }
  const [element] = arr.splice(old_index, 1);
  arr.splice(new_index, 0, element);

  return arr;
}
