export async function fetchUsers({
  pageParam = 1,
  id,
}: {
  pageParam?: number;
  id?: string;
}) {
  let url = "https://jsonplaceholder.typicode.com/users";

  // Si hay un ID, obtenemos un solo usuario
  if (id) {
    url += `/${id}`;
  } else {
    url += `?_page=${pageParam}&_limit=5`;
  }

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      id
        ? `El usuario con ID ${id} no fue encontrado`
        : "Error al cargar los usuarios"
    );

  return id
    ? response.json()
    : { data: await response.json(), nextPage: pageParam + 1 };
}
