export function getPageOffset(
  search: { [key: string]: string | undefined },
  pageSize = 5,
) {
  const page = Number(search?.page) || 1;
  return (page - 1) * pageSize;
}
