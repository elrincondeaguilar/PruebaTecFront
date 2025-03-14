export async function fetchComments(postId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  if (!res.ok)
    throw new Error(
      `No se pudieron cargar los comentarios del post con ID ${postId}`
    );

  return res.json();
}
