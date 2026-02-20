# Dealer Web Front - Maqueta Visual

## Estado del proyecto
Este repositorio contiene **solo una maqueta visual** del sitio de renta de vehiculos.

No es una aplicacion lista para produccion.

## Objetivo
Mostrar el diseno de interfaz (UI) y la navegacion principal del proyecto ADRNAZ Rent Car.

## Alcance actual
- Paginas HTML con estilos CSS y scripts JS para interacciones basicas.
- Vistas incluidas: inicio, catalogo, servicios, login, booking, pago y resumen.
- Recursos visuales (imagenes, iconos y logos) para demostracion.

## Fuera de alcance (importante)
- No hay integracion real con base de datos.
- No hay autenticacion segura de produccion.
- No hay procesamiento de pagos reales.
- No hay flujo transaccional completo de reservas.

## Estructura del proyecto
- `index.html`: pagina principal.
- `html/`: paginas internas.
- `css/`: estilos por vista.
- `js/`: logica de interfaz y scripts de prueba.
- `source/`: imagenes y recursos graficos.

## Como ejecutar la maqueta
1. Inicia un servidor estatico en la raiz del proyecto.
2. Abre `index.html` desde `http://localhost`.

Ejemplo con Python:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Nota
El archivo `js/server.js` es una simulacion basica para pruebas locales y no representa un backend productivo.
