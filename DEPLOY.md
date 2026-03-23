# Despliegue en Google Cloud

Next.js 16 app desplegada en **Cloud Run** via **Cloud Build** (CI/CD automático desde GitHub).
No se requiere base de datos — auth usa cookies, contacto va a n8n.

---

## Pre-requisitos

- [gcloud CLI](https://cloud.google.com/sdk/docs/install) instalado y autenticado (`gcloud auth login`)
- Proyecto GCP ya creado
- Repo en GitHub

---

## Paso 1 — Configurar proyecto GCP

```bash
gcloud config set project YOUR_PROJECT_ID
```

Habilitar APIs necesarias:

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  containerregistry.googleapis.com
```

---

## Paso 2 — Crear secrets en Secret Manager

```bash
# Password de acceso al sitio
echo -n "TU_SITE_PASSWORD" | gcloud secrets create site-password --data-file=-

# Secret para CSRF (mínimo 32 caracteres aleatorios)
echo -n "TU_CSRF_SECRET_DE_32_CHARS_MINIMO" | gcloud secrets create csrf-secret --data-file=-
```

Para actualizar un secret existente:
```bash
echo -n "NUEVO_VALOR" | gcloud secrets versions add site-password --data-file=-
```

---

## Paso 3 — Otorgar permisos IAM

Cloud Run necesita permiso para leer los secrets, y Cloud Build necesita permiso para desplegar en Cloud Run.

```bash
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUM=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

# Cloud Build puede desplegar a Cloud Run
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUM@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"

# Cloud Build puede actuar como service account de Cloud Run
gcloud iam service-accounts add-iam-policy-binding \
  $PROJECT_NUM-compute@developer.gserviceaccount.com \
  --member="serviceAccount:$PROJECT_NUM@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Cloud Run puede leer secrets
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUM-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## Paso 4 — Actualizar `cloudbuild.yaml`

El archivo ya existe. Solo agregar `CSRF_SECRET` y `NEXT_PUBLIC_SITE_URL` al paso de deploy:

```yaml
- '--set-env-vars=NODE_ENV=production,NEXT_PUBLIC_SITE_URL=https://sloaneadler.com'
- '--set-secrets=SITE_PASSWORD=site-password:latest,CSRF_SECRET=csrf-secret:latest'
```

---

## Paso 5 — Conectar GitHub con Cloud Build

1. Ir a [Cloud Build → Triggers](https://console.cloud.google.com/cloud-build/triggers) en la consola GCP
2. Clic en **"Connect Repository"** → GitHub
3. Autenticar con GitHub y seleccionar el repo `sloaneadler-website`
4. Crear trigger con estos valores:
   - **Nombre**: `deploy-main`
   - **Branch**: `^main$`
   - **Configuration**: Cloud Build configuration file → `cloudbuild.yaml`

---

## Paso 6 — Primer deploy

**Opción A: Manual desde terminal**
```bash
gcloud builds submit --config cloudbuild.yaml .
```

**Opción B: Via GitHub (una vez conectado el trigger)**
```bash
git push origin main
```

---

## Paso 7 — Verificar despliegue

```bash
# Ver URL del servicio
gcloud run services describe sloaneadler --region=us-central1 --format='value(status.url)'

# Health check
curl https://TU_URL/api/health

# Ver logs en tiempo real
gcloud run services logs read sloaneadler --region=us-central1 --limit=50
```

---

## Variables de entorno / Secrets

| Variable | Tipo | Descripción |
|---|---|---|
| `NODE_ENV` | Env var | `production` |
| `NEXT_PUBLIC_SITE_URL` | Env var | URL pública del sitio |
| `SITE_PASSWORD` | Secret Manager | Password de acceso al sitio |
| `CSRF_SECRET` | Secret Manager | Token CSRF (32+ chars) |

### Servicios externos (agregar cuando estén listos)

| Variable | Secret name | Cuándo |
|---|---|---|
| `STRAPI_URL` | env var | Al configurar Strapi CMS |
| `STRAPI_API_TOKEN` | `strapi-api-token` | Al configurar Strapi CMS |
| `N8N_WEBHOOK_URL` | env var | Al configurar n8n |
| `RESEND_API_KEY` | `resend-api-key` | Al configurar emails |

---

## Dominio personalizado (opcional)

```bash
gcloud run domain-mappings create \
  --service=sloaneadler \
  --domain=sloaneadler.com \
  --region=us-central1
```

Luego agregar los registros DNS que indique el comando.
