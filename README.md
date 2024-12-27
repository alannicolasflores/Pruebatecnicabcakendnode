# Prueba Técnica - Conclusión Exitosa

Este proyecto cumple con todos los requerimientos establecidos en la prueba técnica. A continuación, se detallan las características y el proceso llevado a cabo:

## Descripción

- **Framework utilizado:** Express  
- **Base de datos:** MySQL  
- **Pruebas realizadas con:** Postman  
- **Aislamiento del entorno:** Docker  
- **Script de inicialización de base de datos:** `init.sql`  

## Proceso

1. **Desarrollo:**
   - El proyecto fue desarrollado utilizando Express y MySQL, como se solicitó.
   - Durante la fase de desarrollo, se utilizó un único `Dockerfile` para configurar el entorno.

2. **Aislamiento y Contenedorización:**
   - La aplicación se aisló en un contenedor Docker.
   - Para el despliegue, se crearon dos `Dockerfile` específicos: uno para la aplicación y otro para la configuración del servidor de base de datos.

3. **Registro de la Imagen:**
   - La imagen de Docker fue subida al registro de imágenes de Docker en nuestra cuenta.

4. **Despliegue en Azure:**
   - La imagen fue descargada y desplegada en una máquina virtual en Azure.
   - Se abrió el puerto 80 en la máquina virtual para permitir el acceso externo.

5. **Pruebas:**
   - Las imágenes de Docker se ejecutaron correctamente en la máquina virtual.
   - Se probó el despliegue utilizando `curl`, confirmando que el HTML se mostraba correctamente.
   - Las consultas y operaciones de la base de datos se verificaron exitosamente a través de Postman.

## Conclusión

La prueba técnica se completó de manera satisfactoria. La aplicación cumple con los requerimientos especificados, y el proceso de desarrollo, pruebas y despliegue fue realizado exitosamente.

## Acceso

- **URL de la aplicación:** [Inserta aquí la URL]

## Archivos importantes

- **Base de datos:** `init.sql`
- **Dockerfiles:** Incluidos en el repositorio.

---

Si necesitas más información, no dudes en contactarnos.
