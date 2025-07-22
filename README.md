# Panel de Administración WinApp

Sistema web de administración para gestionar comercios, usuarios, categorías y métricas de la aplicación WinApp. Permite a los administradores supervisar y controlar todos los aspectos de la plataforma desde un panel centralizado.

## 🚀 Características

- ✅ **Autenticación**: Sistema de login con email y contraseña usando Clerk
- ✅ **Dashboard**: Panel principal con métricas clave
- ✅ **Diseño Responsivo**: Basado en el diseño de Figma proporcionado
- ✅ **Rutas Protegidas**: Acceso controlado a las diferentes secciones
- 🔄 **En Desarrollo**: Gestión de comercios, usuarios, categorías, etc.

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+ con TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Autenticación**: Clerk
- **Styling**: Tailwind CSS
- **State Management**: Zustand (para futuras implementaciones)
- **Data Fetching**: TanStack Query (para futuras implementaciones)

## 📋 Prerrequisitos

- Node.js 20.19.0+ o 22.12.0+
- npm o yarn
- Cuenta en [Clerk](https://clerk.com/) para autenticación

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd winapp-admin
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Clerk

1. Crea una cuenta en [Clerk](https://dashboard.clerk.com/)
2. Crea una nueva aplicación
3. Ve a "API Keys" en el dashboard
4. Copia la "Publishable Key"

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_tu_publishable_key_aqui
```

⚠️ **Importante**: Reemplaza `pk_test_tu_publishable_key_aqui` con tu clave real de Clerk.

### 5. Configurar usuarios en Clerk

1. Ve al dashboard de Clerk
2. En la sección "Users", agrega manualmente usuarios para testing
3. O configura métodos de registro si deseas permitir auto-registro

## 🚀 Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📱 Uso

### Acceso al sistema

1. Navega a la URL de la aplicación
2. Serás redirigido automáticamente al login si no estás autenticado
3. Ingresa tu email y contraseña configurados en Clerk
4. Tras autenticarte, accederás al dashboard principal

### Navegación

- **Dashboard**: Vista general con métricas clave
- **Comercios Activos**: Gestión de comercios aprobados (en desarrollo)
- **Comercios Pendientes**: Revisión de comercios por aprobar (en desarrollo)
- **Usuarios**: Gestión de usuarios registrados (en desarrollo)
- **Categorías**: Administración de categorías (en desarrollo)
- **Balance de Puntos**: Configuración del sistema de puntos (en desarrollo)
- **Estadísticas**: Métricas y analytics (en desarrollo)
- **Notificaciones**: Sistema de notificaciones masivas (en desarrollo)

## 🎨 Diseño

El diseño está basado en las especificaciones de Figma:
- **Colores principales**: 
  - Primario: `#3F0066` (Morado corporativo)
  - Secundario: `#FEFEFE` (Blanco/Gris claro)
  - Éxito: `#75AF48` (Verde)
  - Error: `#F05656` (Rojo)

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── forms/          # Formularios (LoginForm)
│   ├── layout/         # Componentes de layout (DashboardLayout)
│   └── ui/             # Componentes reutilizables
├── pages/              # Páginas principales (Dashboard)
├── hooks/              # Custom hooks
├── services/           # API calls y servicios
├── types/              # Definiciones TypeScript
├── utils/              # Funciones utilitarias
└── constants/          # Constantes de la aplicación
```

## 🔧 Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de build
- `npm run lint` - Ejecutar linter

## 🛣️ Roadmap

### Fase 1 - MVP ✅
- [x] Sistema de autenticación con Clerk
- [x] Dashboard básico
- [x] Layout principal según diseño de Figma
- [x] Rutas protegidas

### Fase 2 - Funcionalidades Core (En desarrollo)
- [ ] Gestión completa de comercios (aprobación/rechazo)
- [ ] Lista y detalles de usuarios
- [ ] Gestión de categorías
- [ ] Sistema de notificaciones

### Fase 3 - Analytics y Optimización
- [ ] Dashboard de estadísticas completo
- [ ] Reportes exportables
- [ ] Optimizaciones de performance

## 🐛 Troubleshooting

### Error: "Missing Publishable Key"

Asegúrate de que:
1. Tienes el archivo `.env.local` en la raíz del proyecto
2. La variable `VITE_CLERK_PUBLISHABLE_KEY` está configurada correctamente
3. Reinicia el servidor de desarrollo después de agregar las variables

### Error de autenticación

1. Verifica que tu clave de Clerk sea válida
2. Asegúrate de que el usuario existe en tu dashboard de Clerk
3. Revisa la consola para más detalles del error

## 📞 Soporte

Si encuentras algún problema o tienes preguntas, contacta al equipo de desarrollo.

---

*Este proyecto está en desarrollo activo. Las funcionalidades se irán agregando según el roadmap establecido.*
