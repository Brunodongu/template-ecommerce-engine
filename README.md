# Gmedia Client Starter Template (Next.js 16 + React 19 + Tailwind CSS)

Plantilla base oficial de **Gmedia** para la creación y despliegue rápido de páginas web y landing pages de clientes.

---

## 🚀 Características del Stack

- **Framework:** Next.js 16 (App Router)
- **Biblioteca UI:** React 19
- **Estilos:** Tailwind CSS v4 + tw-animate-css
- **Iconos:** Lucide React
- **Componentes:** Librería modular inspirada en shadcn/ui
- **Notificaciones:** Sonner (Toast alerts integrados)
- **Despliegue:** Optimizado para Vercel o contenedores Docker en servidores privados

---

## 🛠️ Instalación y Uso Rápido

1. **Clonar o Usar como Plantilla:**
   ```bash
   git clone <URL-DEL-REPOSITORIO-DEL-CLIENTE>
   cd <CARPETA-DEL-CLIENTE>
   ```

2. **Instalar Dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**
   Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Rellena los valores específicos del cliente (Nombre del sitio, credenciales SMTP para el formulario).

4. **Ejecutar en Entorno Local:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) para ver el sitio en tiempo real.

---

## 🎨 Personalización de Marca (Theming)

- **Colores:** Cambia las variables de color en `src/app/globals.css` bajo `:root` o mediante clases Tailwind.
- **Logotipo y Nombre:** Edita `src/components/Navbar.tsx` y `src/components/Footer.tsx`.
- **Contenido:** Adapta las secciones de `src/app/page.tsx` según el requerimiento del cliente.

---

## 📦 Despliegue en Producción

### En Vercel (Recomendado):
1. Conecta el repositorio de GitHub a tu proyecto en Vercel.
2. Agrega las variables de entorno de producción.
3. Cada `git push` a la rama `main` compilará y actualizará el sitio automáticamente.

### En Servidor Propio con Docker:
Compila y corre el contenedor estandarizado mediante `docker-compose up -d`.
