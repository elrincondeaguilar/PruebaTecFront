export async function fetchPosts({
  pageParam = 1,
  id,
}: {
  pageParam?: number;
  id?: string;
}) {
  let url = "https://jsonplaceholder.typicode.com/posts";

  // Si hay un ID, obtenemos un solo post
  if (id) {
    url += `/${id}`;
  } else {
    url += `?_page=${pageParam}&_limit=10`;
  }

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      id
        ? `El post con ID ${id} no fue encontrado`
        : "Error al cargar las publicaciones"
    );

  return id
    ? response.json()
    : { data: await response.json(), nextPage: pageParam + 1 };
}
