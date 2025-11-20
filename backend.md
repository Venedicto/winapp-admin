# 🔧 WinApp Backend - Panel de Administración
#

## 📋 Resumen Ejecutivo

El **Panel de Administración** de WinApp Backend proporciona control total sobre la plataforma de delivery y marketplace digital. Los administradores tienen acceso a funcionalidades críticas para la gestión de usuarios, negocios, pagos, configuraciones del sistema y métricas operacionales.

### 🎯 Características Principales

- **Gestión Completa de Usuarios**: Control de clientes, partners y administradores
- **Supervisión de Negocios**: Aprobación, rechazo y gestión de establecimientos
- **Control de Pagos**: Monitoreo y gestión de transacciones
- **Configuraciones del Sistema**: Parámetros operacionales de la plataforma
- **Métricas y Analytics**: Dashboard completo de métricas de negocio
- **Gestión de Contenido**: Categorías, productos, recompensas y notificaciones

---

## 🔐 Autenticación y Roles

### Sistema de Roles
```typescript
export enum UserRole {
  CLIENT = 'Client',     // Usuario final
  PARTNER = 'Partner',   // Dueño de negocio
  ADMIN = 'Admin',       // Administrador del sistema
}
```

### Autenticación de Admin
Todos los endpoints administrativos requieren:
- Token válido de Clerk
- Rol de `ADMIN` en la base de datos
- Middleware: `authAdminMiddleware`

**Ejemplo de Request:**
```bash
curl -H "Authorization: Bearer <clerk_admin_token>" \
     -H "Content-Type: application/json" \
     http://localhost:3000/admin/configurations
```

---

## ⚙️ Configuraciones del Sistema

### Configuraciones Disponibles

#### `DISTANCE_RADIUS`
- **Descripción**: Radio de búsqueda para negocios cercanos (en metros)
- **Valor por defecto**: Variable según configuración
- **Uso**: Geolocalización de negocios

#### `CREDITS_COST` 
- **Descripción**: Costo en créditos por transacción
- **Valor por defecto**: Variable según configuración
- **Uso**: Sistema de recompensas y fidelización

#### `SECURITY_PRICE`
- **Descripción**: Precio de seguridad para órdenes
- **Valor por defecto**: Variable según configuración
- **Uso**: Cálculo de precios de órdenes

### Endpoints de Configuración

#### `GET /admin/configurations`
Obtener todas las configuraciones del sistema
```json
{
  "status": "success",
  "data": {
    "configurations": [
      {
        "id": "DISTANCE_RADIUS",
        "value": "5000",
        "description": "Radio de búsqueda en metros"
      }
    ]
  }
}
```

#### `GET /admin/configuration?id=DISTANCE_RADIUS`
Obtener configuración específica
```json
{
  "status": "success", 
  "data": {
    "value": "5000"
  }
}
```

#### `PUT /admin/configuration`
Actualizar configuración
```json
// Request Body
{
  "id": "DISTANCE_RADIUS",
  "value": "7500",
  "description": "Radio de búsqueda actualizado"
}

// Response
{
  "status": "success",
  "data": "Configuracion actualizada"
}
```

---

## 👥 Gestión de Usuarios

### Endpoints Disponibles

#### `GET /users/clients`
**Función**: Obtener lista completa de todos los clientes
**Respuesta**: Array de usuarios con rol `CLIENT`
```json
{
  "status": "success",
  "data": {
    "clients": [
      {
        "id": "clerk_user_id",
        "fullName": "Juan Pérez",
        "email": "juan@email.com",
        "phone": "+1234567890",
        "role": "Client",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

**Casos de Uso:**
- Análisis demográfico de usuarios
- Soporte al cliente
- Auditorías de cuentas

---

## 🏢 Gestión de Negocios

### Estados de Negocio
```typescript
enum BusinessStatus {
  PENDING = 'Pending',      // Esperando aprobación
  ACCEPTED = 'Acepted',     // Aprobado y activo
  REJECTED = 'Rejected',    // Rechazado
  SUSPENDED = 'Suspended'   // Suspendido temporalmente
}
```

### Endpoints Principales

#### `GET /businesses`
**Función**: Obtener todos los negocios registrados
**Filtros**: Sin filtros (admin ve todo)
```json
{
  "status": "success",
  "data": {
    "businesses": [
      {
        "id": "uuid",
        "name": "Restaurante XYZ",
        "description": "Comida italiana auténtica",
        "status": "Pending",
        "address": "Calle 123, Ciudad",
        "phone": "+1234567890",
        "rating": 4.5,
        "category": {
          "name": "Restaurantes",
          "image": "url_to_image"
        },
        "user": {
          "fullName": "Partner Name",
          "email": "partner@email.com"
        }
      }
    ]
  }
}
```

#### `PUT /business/status?id=business_id`
**Función**: Aprobar, rechazar o suspender negocios
```json
// Request Body
{
  "status": "Acepted" | "Rejected" | "Suspended"
}

// Response
{
  "status": "success",
  "data": "Estado del negocio actualizado"
}
```

**Flujo de Aprobación:**
1. Partner crea negocio → Estado: `Pending`
2. Admin revisa documentos y información
3. Admin aprueba → Estado: `Acepted` (negocio puede operar)
4. Si hay problemas → Estado: `Rejected` o `Suspended`

### Gestión de Documentos

#### `GET /business/documents`
**Función**: Ver todos los documentos subidos por negocios
**Documentos incluidos:**
- Certificado bancario (`bankingCertified`)
- Documento de identidad (`dni`)
- Acta constitutiva (`constitutiveAct`)
- Poder notarial (`attorneyPower`)

#### `PUT /business/document/status?id=doc_id`
**Función**: Aprobar o rechazar documentos específicos
```json
// Request Body
{
  "status": "approved" | "rejected"
}
```

---

## 🏷️ Gestión de Categorías

### Categorías de Negocios

#### Operaciones CRUD Completas
- `POST /business/category` - Crear categoría (con imagen)
- `PUT /business/category?id=cat_id` - Actualizar categoría  
- `DELETE /business/category?id=cat_id` - Eliminar categoría

```json
// Crear Categoría
{
  "name": "Pizzerías",
  // File: categoryImage (multipart/form-data)
}
```

### Categorías de Productos

#### Operaciones Similares
- `POST /product/category` - Crear categoría de producto
- `PUT /product/category?id=cat_id` - Actualizar
- `DELETE /product/category?id=cat_id` - Eliminar

**Impacto**: Las categorías afectan:
- Filtrado en la app cliente
- Organización del marketplace
- Algoritmos de recomendación

---

## 🛍️ Supervisión de Productos y Addons

### Productos

#### `GET /products`
**Función**: Ver todos los productos de la plataforma
**Información incluida:**
- Detalles del producto
- Negocio propietario
- Stock disponible
- Estadísticas de ventas

### Addons

#### `GET /addons`  
**Función**: Ver todos los complementos disponibles
**Casos de uso:**
- Auditoría de precios
- Control de calidad
- Análisis de popularidad

---

## 📦 Gestión de Órdenes

### Endpoints Administrativos

#### `GET /orders`
**Función**: Vista global de todas las órdenes
**Métricas disponibles:**
- Estados de órdenes
- Volumen de ventas
- Problemas operacionales

#### `PUT /order/rating-disputes` *(Futuro)*
**Función**: Resolver disputas de calificaciones
**Casos de uso:**
- Mediación entre clientes y partners
- Corrección de calificaciones incorrectas

### Estados de Órdenes Monitoreados
```typescript
enum OrderStatus {
  PAYMENT_PENDING = 'Payment pending',
  PENDING = 'Pending',
  IN_PROGRESS = 'In progress', 
  DONE = 'Done',
  CANCELLED = 'Cancelled',
  DELIVERED = 'Delivered'
}
```

---

## 💳 Control de Pagos

### Dashboard de Pagos

#### `GET /payments`
**Función**: Monitoreo completo de transacciones
**Información crítica:**
- Pagos exitosos vs fallidos
- Métodos de pago utilizados
- Comisiones generadas
- Disputas y reembolsos

#### `PUT /payment/accept?id=payment_id`
**Función**: Aprobar pagos manuales (efectivo)
**Flujo:**
1. Cliente paga en efectivo
2. Partner reporta pago
3. Admin verifica y aprueba
4. Orden se procesa

#### `PUT /payment?id=payment_id`
**Función**: Actualizar información de pagos
**Casos de uso:**
- Corrección de montos
- Resolución de disputas
- Actualización de estados

### Proveedores de Pago Integrados
- **Stripe**: Pagos con tarjeta online
- **Centum (Efevoo)**: Procesador local
- **Efectivo**: Pagos manuales

---

## 🎁 Sistema de Recompensas

### Gestión de Recompensas

#### `GET /rewards`
**Función**: Ver todas las recompensas creadas por partners
**Control incluye:**
- Validez de ofertas
- Términos y condiciones
- Impacto en márgenes

### Códigos de Recompensa

#### `PUT /reward_code/admin-action` *(Futuro)*
**Función**: Gestión de códigos promocionales
**Acciones posibles:**
- Deshabilitar códigos abusivos
- Extender validez
- Modificar términos

---

## 🔔 Gestión de Notificaciones

### Sistema de Notificaciones Push

#### `GET /notifications`
**Función**: Ver todas las notificaciones enviadas

#### `POST /notification`
**Función**: Crear notificaciones administrativas
```json
{
  "title": "Mantenimiento Programado",
  "body": "El sistema estará en mantenimiento...",
  "userId": "specific_user_id", // Opcional
  "destination": "all", // o specific user
  "deliveryDate": "2024-07-20T10:00:00Z",
  "data": {
    "type": "maintenance",
    "priority": "high"
  }
}
```

#### `PUT /notification?id=notif_id`
**Función**: Actualizar notificaciones programadas

#### `DELETE /notification?id=notif_id`
**Función**: Cancelar notificaciones

### Tipos de Notificaciones
- **Sistémicas**: Mantenimientos, actualizaciones
- **Promocionales**: Ofertas especiales, eventos
- **Operacionales**: Alertas, recordatorios
- **Personalizadas**: Mensajes específicos

---

## 📊 Dashboard de Métricas

### Métricas Administrativas

#### `GET /admin/metrics?startDate=2024-01-01&endDate=2024-07-01`
**Función**: Analytics completo de la plataforma

```json
{
  "status": "success",
  "data": {
    "userMetrics": {
      "totalUsers": 15420,
      "newUsers": 1240,
      "activeUsers": 8950,
      "userGrowthRate": 8.5,
      "usersByRole": {
        "clients": 14100,
        "partners": 1250,
        "admins": 70
      }
    },
    "businessMetrics": {
      "totalBusinesses": 890,
      "activeBusinesses": 750,
      "pendingApproval": 45,
      "avgRating": 4.2,
      "businessesByCategory": {
        "Restaurantes": 320,
        "Tiendas": 180,
        "Farmacias": 90
      }
    },
    "financialMetrics": {
      "totalRevenue": 125000.50,
      "platformCommission": 12500.05,
      "successfulPayments": 4580,
      "failedPayments": 123
    },
    "operationalMetrics": {
      "totalOrders": 5420,
      "deliveredOrders": 5180,
      "avgDeliveryTime": 35,
      "customerSatisfaction": 4.4
    }
  }
}
```

### Métricas Clave por Categoría

#### Usuarios
- Crecimiento de registro
- Retención de usuarios
- Actividad por regiones
- Satisfacción del cliente

#### Negocios
- Tasa de aprobación
- Performance por categoría
- Tiempo promedio de preparación
- Calificaciones promedio

#### Financiero
- Volumen de transacciones
- Comisiones generadas
- Métodos de pago preferidos
- Tasas de conversión

#### Operacional
- Eficiencia de deliveries
- Órdenes por hora pico
- Problemas reportados
- Tiempo de resolución

---

## 💼 Gestión de Suscripciones

### Sistema de Fidelización

#### `GET /subscriptions`
**Función**: Ver todas las suscripciones activas
**Información incluida:**
- Usuario suscrito
- Negocio objetivo
- Créditos acumulados
- Estado de suscripción

### Casos de Uso Administrativos
- **Auditoría de créditos**: Verificar acumulación correcta
- **Resolución de disputas**: Ajustar saldos incorrectos
- **Análisis de engagement**: Identificar negocios más populares

---

## 🚨 Monitoreo y Alertas

### Alertas Automáticas *(Recomendado para implementar)*

#### Alertas de Negocio
- Negocios con calificación < 3.0
- Tiempo de preparación > 60 minutos
- Quejas recurrentes de clientes

#### Alertas Financieras  
- Pagos fallidos > 5% del total
- Transacciones sospechosas
- Discrepancias en comisiones

#### Alertas Técnicas
- Errores de API > umbral
- Tiempo de respuesta elevado
- Fallos en notificaciones push

---

## 🔧 Herramientas de Soporte

### Resolución de Problemas

#### Disputas de Órdenes
1. **Investigación**: Revisar historial de orden
2. **Mediación**: Contactar cliente y partner
3. **Resolución**: Aplicar reembolso o compensación
4. **Seguimiento**: Documentar solución

#### Problemas de Pagos
1. **Verificación**: Confirmar estado en proveedor
2. **Corrección**: Actualizar estado en sistema
3. **Notificación**: Informar a partes involucradas

#### Gestión de Cuentas
- Suspensión temporal de usuarios problemáticos
- Recuperación de cuentas comprometidas
- Migración de datos entre cuentas

---

## 📈 Reporting y Exportación

### Reportes Disponibles *(Futuro)*

#### Reportes Financieros
- Ingresos por período
- Comisiones por partner
- Análisis de métodos de pago
- Proyecciones de crecimiento

#### Reportes Operacionales
- Performance de deliveries
- Satisfacción del cliente
- Eficiencia de partners
- Análisis de demanda

#### Exportación de Datos
- Formato CSV para análisis externo
- Integración con herramientas BI
- Reportes automáticos por email

---

## 🔐 Seguridad y Auditoría

### Logs de Auditoría *(Recomendado)*

#### Acciones Monitoreadas
- Cambios de configuración
- Aprobaciones/rechazos de negocios
- Modificaciones de pagos
- Acceso a información sensible

#### Información Registrada
```json
{
  "timestamp": "2024-07-18T15:30:00Z",
  "adminId": "admin_clerk_id",
  "action": "BUSINESS_APPROVED",
  "targetId": "business_uuid",
  "previousState": "Pending",
  "newState": "Acepted",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0..."
}
```

### Mejores Prácticas de Seguridad
- **Autenticación MFA**: Obligatoria para admins
- **Rotación de tokens**: Cada 24-48 horas
- **Principio de menor privilegio**: Acceso mínimo necesario
- **Monitoreo en tiempo real**: Alertas de actividad sospechosa

---

## 🚀 Roadmap de Funcionalidades

### Próximas Implementaciones

#### Dashboard Mejorado
- Gráficos interactivos en tiempo real
- Filtros avanzados por región/categoría
- Comparativas período a período

#### Automatización
- Aprobación automática de negocios con scoring
- Detección de fraude con ML
- Alertas inteligentes basadas en patrones

#### Integración Avanzada
- CRM para gestión de partners
- Sistema de tickets de soporte
- API para herramientas externas

---

## 📞 Soporte y Documentación

### Recursos Adicionales
- **API Documentation**: Swagger/OpenAPI disponible
- **Postman Collection**: Para testing de endpoints
- **Database Schema**: Diagramas ER actualizados
- **Deployment Guide**: Instrucciones de producción

### Contacto de Soporte
- **Desarrollo**: Equipo técnico disponible
- **Documentación**: Mantener este documento actualizado
- **Capacitación**: Sesiones para nuevos administradores

---

*Documento creado: Julio 2024*
*Última actualización: Julio 2024*
*Versión: 1.0* 