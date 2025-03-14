https://github.com/user-attachments/assets/6e5f54fd-e798-4d96-845e-de8f93954879
# 📌 Prueba Técnica - Frontend con Next.js

Este proyecto es una aplicación frontend desarrollada con **Next.js 14**, **React Query**, **Tailwind CSS** y **Framer Motion**. La aplicación permite visualizar y gestionar usuarios y publicaciones, utilizando Server Components y Client Components según la necesidad.

---

## 🚀 **Instalación y Configuración**

### **🔹 Requisitos Previos**

Asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **Git**

### **🔹 Pasos para instalar y correr la aplicación**

```sh
# 1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git

# 2️⃣ Entrar en la carpeta del proyecto
cd tu-repositorio

# 3️⃣ Instalar las dependencias
npm install  # o yarn install

# 4️⃣ Iniciar el servidor de desarrollo
npm run dev  # o yarn dev
```

🔹 La aplicación estará disponible en `http://localhost:3000`.

---

## 🚀 **Decisiones Arquitectónicas**

### **🔹 Uso de Server Components y SSR**

En este proyecto, se han tomado las siguientes decisiones en cuanto al renderizado:

- **Server Components (RSC) para `/users` y `/posts`**:

  - Next.js 14 usa Server Components por defecto, lo que **optimiza la carga inicial** al enviar solo HTML al cliente sin JavaScript innecesario.
  - Los datos de usuarios y publicaciones no cambian constantemente, por lo que **no es necesario hacer SSR en cada request**.
  - Se mejora el rendimiento y se reducen las solicitudes al servidor.

- **Client Components (`use client`) en detalles y formularios**:

  - `UserDetail.tsx` y `PostDetail.tsx` necesitan `useQuery` para obtener y actualizar datos dinámicamente.
  - Se usa `useState` para manejar el formulario de comentarios de manera local.

- **¿Por qué no usar SSR (`getServerSideProps`)?**
  - SSR genera la página en cada request, lo cual es innecesario para datos estáticos.
  - Como los datos no cambian constantemente, usar Server Components y React Query permite **mantener la página rápida y eficiente** sin cargar el servidor.

---

## 📂 **Estructura del Proyecto**

El proyecto sigue la estructura recomendada por Next.js 14, utilizando la carpeta `/app` para las rutas.

```
📦 src
 ┣ 📂 app
 ┃ ┣ 📂 users
 ┃ ┃ ┣ 📂 [id]     # Página de detalle de usuario
 ┃ ┃ ┃ ┗ 📜 page.tsx
 ┃ ┃ ┗ 📜 page.tsx  # Lista de usuarios
 ┃ ┣ 📂 posts
 ┃ ┃ ┣ 📂 [id]     # Página de detalle de publicación
 ┃ ┃ ┃ ┗ 📜 page.tsx
 ┃ ┃ ┗ 📜 page.tsx  # Lista de publicaciones
 ┃ ┗ 📜 layout.tsx  # Layout general con Navbar
 ┣ 📂 components
   ┣ 📂ui
   ┃ ┗ progress # usando shadCN(barra de progreso)
 ┃ ┣ 📜 Navbar.tsx  # Barra de navegación
 ┃ ┣ 📜 ErrorMessage.tsx  # Mensajes de error reutilizables
 ┃ ┣ 📜 Skeleton.tsx  # Placeholder para carga
 ┣ 📂 utils
 ┃ ┣ 📜 fetchUsers.ts  # Lógica para obtener usuarios (RSC y CSR)
 ┃ ┣ 📜 fetchPosts.ts  # Lógica para obtener publicaciones
 ┃ ┗ 📜 fetchComments.ts  # Lógica para obtener comentarios
 ┣ 📂 hooks
 ┃ ┗ 📜 useInfiniteScroll.ts  # Hook personalizado para scroll infinito
 ┣ 📜 tailwind.config.js  # Configuración de estilos con Tailwind
 ┗ 📜 next.config.js  # Configuración de Next.js
```

---

## 🔍 **Gestión de Datos con React Query**

### **🔹 ¿Por qué React Query?**

Se utiliza **React Query** para gestionar las solicitudes a la API de manera eficiente:

- **Cache automático**: Los datos se almacenan en caché y se reutilizan.
- **Refetch automático**: Se pueden refrescar los datos sin necesidad de recargar la página.
- **Manejo de estados de carga y error** integrado.

### **🔹 Cómo se usa en el proyecto**

#### **1️⃣ Obtener la lista de usuarios (Server Components + Client Fetching)**

```tsx
const {
  data: users,
  isLoading,
  error,
} = useQuery({
  queryKey: ["users"],
  queryFn: () => fetchUsers(),
});
```

#### **2️⃣ Obtener una publicación específica en `PostDetail.tsx`**

```tsx
const { data: post, isLoading } = useQuery({
  queryKey: ["post", params.id],
  queryFn: () => fetchPosts({ id: params.id }),
});
```

#### **3️⃣ Obtener comentarios y permitir agregar nuevos localmente**

```tsx
const { data: comments } = useQuery({
  queryKey: ["comments", params.id],
  queryFn: () => fetchComments(params.id),
});

const handleAddComment = () => {
  setNewComments([...newComments, { id: Date.now(), name, body: comment }]);
};
```

---

## 📝 **Conclusión**

✅ **Server Components (RSC) optimizan la carga inicial y reducen la carga en el servidor.**
✅ **Client Components (`use client`) permiten interactividad y uso de hooks como `useQuery`.**
✅ **React Query mejora la gestión de datos, evitando solicitudes innecesarias.**
✅ **Estructura modular con `utils/` y `hooks/` hace que el código sea escalable.**

**¿Mejoras futuras?** Integración con una base de datos real y autenticación. 🚀
