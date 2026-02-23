export const formularioCss = (formulario) => {
  return `<style>
/* ============================================
   DESIGN SYSTEM - Variables y configuración
   ============================================ */
:root {
  /* Colores primarios - Manteniendo tu paleta */
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-gradient: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  --error-500: #ef4444;
  
  /* Fondos - Sistema de capas */
  --bg-surface: #14141f;
  --bg-surface-hover: #1e1e2d;
  --bg-surface-active: #2a2a3a;
  --bg-input: #1e1e2d;
  --bg-input-hover: #252535;
  --bg-input-focus: #2a2a3a;
  
  /* Textos - Escala tipográfica */
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-tertiary: #a0a0b0;
  --text-disabled: #70707f;
  --text-inverse: #ffffff;
  
  /* Bordes */
  --border-subtle: #2a2a3a;
  --border-default: #323242;
  --border-focus: #3b82f6;
  
  /* Sombras */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-sm: 0 2px 4px -1px rgb(0 0 0 / 0.3);
  --shadow-md: 0 8px 16px -4px rgb(0 0 0 / 0.5);
  --shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.15);
  
  /* Radios */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Espaciado - Sistema 4px */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  
  /* Tipografía */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  
  /* Transiciones */
  --transition-all: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-colors: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

/* ============================================
   RESET Y ESTILOS BASE
   ============================================ */
${formulario} {
  all: unset;
  display: flex;
  flex-direction: column;
  padding:1rem;
  max-height:100%;
  margin-top: 3.7em;
  height: 80%;
  width: 300px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: var(--text-primary);
  font-family: var(--font-sans);
  box-sizing: border-box;
  animation: slideIn 0.3s ease;
  scroll-margin-top: 20px; /* Añadido para mejor posicionamiento al hacer scroll */
}

/* ============================================
   TIPOGRAFÍA
   ============================================ */
${formulario} h2,
${formulario} h3 {

  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

${formulario} h2 {
  font-size: var(--text-xl);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}

${formulario} h3 {
  font-size: var(--text-lg);
}

${formulario} label {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.5;
  transition: var(--transition-colors);
}

/* ============================================
   CAMPOS DEL FORMULARIO
   ============================================ */
${formulario} input:where([type="text"], [type="number"], [type="email"], [type="password"], [type="date"], [type="time"]),
${formulario} select,
${formulario} textarea {

  
padding: 10px;
  background: var(--bg-input);
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-family: inherit;
  line-height: 1.5;
  transition: var(--transition-colors);
  box-sizing: border-box;
}

${formulario} textarea {
  height: auto;
  resize: vertical;
}

/* Estados hover/focus/active */
${formulario} input:hover,
${formulario} select:hover,
${formulario} textarea:hover {
  background: var(--bg-input-hover);
  border-color: var(--border-default);
}

${formulario} input:focus,
${formulario} select:focus,
${formulario} textarea:focus {
  background: var(--bg-input-focus);
  border-color: var(--border-focus);
  box-shadow: var(--shadow-focus);
  outline: none;
}

${formulario} input:active,
${formulario} select:active,
${formulario} textarea:active {
  background: var(--bg-surface-active);
}

/* Placeholders */
${formulario} input::placeholder,
${formulario} textarea::placeholder {
  color: var(--text-disabled);
  font-size: var(--text-sm);
  opacity: 0.8;
}

/* Select personalizado */
${formulario} select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0a0b0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 16px;
  padding-right: calc(var(--space-3) * 2 + 16px);
}

/* ============================================
   BOTONES
   ============================================ */
${formulario} button[type="submit"],
${formulario} input[type="submit"] {
  width: 100%;
  padding: 10px;
  background: var(--primary-gradient);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-inverse);
  font-size: var(--text-base);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: var(--transition-all);
  box-sizing: border-box;
}

${formulario} button[type="submit"]:hover,
${formulario} input[type="submit"]:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

${formulario} button[type="submit"]:active,
${formulario} input[type="submit"]:active {
  transform: translateY(0);
  box-shadow: none;
}

${formulario} button[type="submit"]:focus-visible,
${formulario} input[type="submit"]:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* ============================================
   SISTEMA DE REJILLA
   ============================================ */
${formulario} .row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);

}

/* ============================================
   CHECKBOXES Y RADIOS
   ============================================ */
${formulario} .checkbox-group,
${formulario} .radio-group {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  cursor: pointer;
}

${formulario} input[type="checkbox"],
${formulario} input[type="radio"] {
  width: 18px;

  margin: 0;
  accent-color: var(--primary-500);
  cursor: pointer;
}

/* ============================================
   ESTADOS Y VALIDACIONES
   ============================================ */
${formulario} .field-error {


  color: var(--error-500);
  font-size: var(--text-xs);
  font-weight: 500;
}

${formulario} .alert {

\
  background: color-mix(in srgb, var(--error-500) 10%, transparent);
  border: 1px solid var(--error-500);
  border-radius: var(--radius-sm);
  color: #fecaca;
  font-size: var(--text-sm);
}

/* ============================================
   ELEMENTOS AUXILIARES
   ============================================ */
${formulario} hr {
  margin: var(--space-4) 0;
  border: none;
  border-top: 1px solid var(--border-subtle);
  opacity: 0.5;
}

${formulario} small,
${formulario} .hint {
  display: block;

  color: var(--text-tertiary);
  font-size: var(--text-xs);
}

/* ============================================
   ACCESIBILIDAD
   ============================================ */
${formulario} :focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* ============================================
   MEDIA QUERIES
   ============================================ */
@media (max-width: 768px) {
  ${formulario} {
    padding: var(--space-4);
  }
  
  ${formulario} .row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

/* Soporte para modo oscuro del sistema */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

/* ============================================
   ANIMACIONES
   ============================================ */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   UTILIDADES
   ============================================ */
${formulario} .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

${formulario} .disabled,
${formulario} [disabled] {
  opacity: 0.6;
  pointer-events: none;
  cursor: not-allowed;
}
</style>`
}

export const padreFormularioCss = () => {
  return `
    display: flex;
    padding: 1em;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    min-height: 100vh;
    background: var(--color-bg-primary, #0a0a0f);
  `
}

export const tablaCss = () => {
  return `<style>
/* Variables CSS - Misma paleta oscura */
:root {
    --color-primary: #3b82f6;
    --color-accent-orange: #f97316;
    --color-accent-orange-dark: #ea580c;
    --color-accent-red: #ef4444;
    
    --color-bg-table: #1a1a28;
    --color-bg-table-header: #1e1e2d;
    --color-bg-table-row-hover: #252535;
    --color-bg-table-stripe: #1f1f2d;
    
    --color-text-primary: #ffffff;
    --color-text-secondary: #e0e0e0;
    
    --border-color: #2a2a3a;
    
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
    --radius-sm: 4px;
    --radius-md: 6px;
    
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --transition-base: 200ms ease;
}

/* Contenedor responsive */
.table-container {
    width: 100%;
    overflow-x: auto;
    margin: 20px 0;
    border-radius: var(--radius-md);
    background: var(--color-bg-table);
    border: 1px solid var(--border-color);
}

/* Tabla base */
table {
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    background: var(--color-bg-table);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: 14px;
}

/* Header */
table thead {
    background: var(--color-bg-table-header);
    border-bottom: 2px solid var(--border-color);
}

table thead th {
    padding: 12px 16px;
    font-weight: 600;
    text-align: center;
    color: var(--color-text-primary);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

/* Cuerpo */
table tbody tr {
    border-bottom: 1px solid var(--border-color);
    transition: var(--transition-base);
}

table tbody tr:hover {
    background: var(--color-bg-table-row-hover);
}

/* Zebra stripes */
table tbody tr:nth-child(even) {
    background: var(--color-bg-table-stripe);
}

table tbody tr:nth-child(even):hover {
    background: var(--color-bg-table-row-hover);
}

/* Celdas */
table td {
    padding: 12px 16px;
    text-align: center;
    color: var(--color-text-secondary);
}

/* Botones en tabla */
table button {
    background: var(--color-accent-orange);
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-base);
    min-width: 60px;
}

table button:hover {
    background: var(--color-accent-orange-dark);
}

/* Contenedor de botones */
.td-btn {
    display: flex;
    gap: 4px;
    justify-content: center;
    padding: 8px;
}

.td-btn button {
    flex: 1;
    background: var(--color-accent-orange);
}

.td-btn button:hover {
    background: var(--color-accent-red);
}

/* Badges de estado */
.status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 500;
}

.status-active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.status-inactive {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

/* Responsive */
@media (max-width: 768px) {
    table {
        font-size: 13px;
    }
    
    table th,
    table td {
        padding: 10px 12px;
    }
    
    table button {
        padding: 5px 10px;
        font-size: 11px;
        min-width: 50px;
    }
}
</style>`
}

export const formBuscarPorPalabraCss = () => {
  return `
    <style>
        #formSearchId {
            background: #1a1a28;
            padding: 8px 12px;
            border-radius: 8px 8px 0 0;
            width: 250px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #2a2a3a;
            border-bottom: none;
        }
        
        #formSearchId input[type="search"] {
            all: unset;
            background: transparent;
            height: 32px;
            flex: 1;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            padding: 0 8px;
        }
        
        #formSearchId input[type="search"]::placeholder {
            color: #a0a0b0;
            opacity: 1;
        }
        
        #formSearchId input[type="submit"] {
            all: unset;
            background: #3b82f6;
            height: 32px;
            width: 32px;
            border-radius: 4px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            color: white;
            transition: background 200ms ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #formSearchId input[type="submit"]:hover {
            background: #2563eb;
        }
        
        #formSearchId input[type="search"]:focus {
            outline: none;
        }
    </style>
  `
}

export const formularioSelectCss = () => {
  return ` 
    <style>
        .divSelect {
            width: 100%;
            background: #14141f;
            color: #ffffff;
            border-radius: 6px;
            border: 1px solid #2a2a3a;
            padding: 12px;
            margin: 10px 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .divSelect input {
            width: 100%;
            color: #ffffff;
            background: #1e1e2d;
            border: 1px solid #2a2a3a;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 14px;
            transition: all 200ms ease;
            box-sizing: border-box;
        }
        
        .divSelect input:hover,
        .divSelect input:focus {
            border-color: #3b82f6;
            background: #252535;
            outline: none;
        }
        
        .divSelect input::placeholder {
            color: #70707f;
        }
        
        ul {
            color: #e0e0e0;
            list-style: none;
            padding: 0;
            margin: 10px 0 0 0;
        }
        
        ul li {
            padding: 8px 12px;
            border-bottom: 1px solid #2a2a3a;
            transition: background 200ms ease;
        }
        
        ul li:hover {
            background: #252535;
        }
        
        ul li:last-child {
            border-bottom: none;
        }
    </style>
  `
}

