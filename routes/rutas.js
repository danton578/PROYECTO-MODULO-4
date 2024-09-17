const express = require("express");
const router = express.Router();

const controladores = require("../controllers/controladores");

/**
 * @swagger
 * components:
 *  schemas:
 *    Reserva:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: El identificador único de la reserva
 *        hotel:
 *          type: string
 *          description: El nombre del hotel reservado
 *        fecha_inicio:
 *          type: string
 *          format: date
 *          description: La fecha de inicio de la reserva
 *        fecha_fin:
 *          type: string
 *          format: date
 *          description: La fecha de fin de la reserva
 *        tipo_habitacion:
 *          type: string
 *          description: El tipo de habitación reservada
 *        estado:
 *          type: string
 *          description: El estado de la reserva (por ejemplo, confirmada, pendiente, cancelada, etc.)
 *        num_huespedes:
 *          type: integer
 *          description: El número de huéspedes para la reserva
 *      required:
 *        - id
 *        - hotel
 *        - fecha_inicio
 *        - fecha_fin
 *        - tipo_habitacion
 *        - estado
 *        - num_huespedes
 *      example:
 *        id: 1
 *        hotel: "Hotel Paraíso"
 *        fecha_inicio: "2023-05-15"
 *        fecha_fin: "2023-05-20"
 *        tipo_habitacion: "Doble"
 *        estado: Confirmada
 *        num_huespedes: 3
 */

// Endpoint para crear una nueva reserva
/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Crea una nueva reserva
 *    tags: [reservas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      201:
 *        description: reserva creada con exito
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reserva'
 */

router.post("/", controladores.create); // Asociamos el controlador de creación de reservas

// Endpoint para obtener la lista de reservas
/**
 * @swagger
 * /api/reservas:
 *  get:
 *    summary: Obtiene listado completo de reservas
 *    tags: [reservas]
 *    responses:
 *      200:
 *        description: una lista de reservas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reserva'
 */
router.get("/", controladores.readAll); // Asociamos el controlador de lectura de todos los pedidos

// Endpoint para actualizar una reserva especifica
/**
 * @swagger
 * /api/reservas/:{id}:
 *  put:
 *    summary: actualiza informacion de una reserva especifica
 *    tags: [reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: identificador unico de reserva
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      200:
 *        description: Reserva actualizada con exito
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reserva'
 *      404:
 *        description: Reserva no encontrada
 */
router.put("/:id", controladores.update); //

// Endpoint para eliminar una reserva especifica
/**
 * @swagger
 * /api/reservas/:{id}:
 *  delete:
 *    summary: Elimina una reserva especifica
 *    tags: [reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: identificador unico de reserva
 *    responses:
 *      200:
 *        description: reserva encontrada con exito
 *      404:
 *        description: reserva no encontrada
 */

router.delete("/:id", controladores.delete);

// Endpoint para buscar pedidos con varios filtros
/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *    summary: Search reservas with filters
 *    tags: [reservas]
 *    parameters:
 *      - in: query
 *        name: hotel
 *        schema:
 *          type: string
 *        description: Nombre de hotel
 *      - in: query
 *        name: fecha_inicio
 *        schema:
 *          type: string
 *          format: date
 *        description: fecha inicio de busqueda
 *      - in: query
 *        name: fecha_fin
 *        schema:
 *          type: string
 *          format: date
 *        description: fecha fin de busqueda
 *      - in: query
 *        name: tipo_habitacion
 *        schema:
 *          type: string
 *        description: tipo de habitacion de reserva
 *      - in: query
 *        name: estado
 *        schema:
 *          type: string
 *        description: estado de la reserva
 *      - in: query
 *        name: num_huespedes
 *        schema:
 *          type: string
 *        description: numero de huespedes reserva
 *    responses:
 *      200:
 *        description: A list of orders that match the filters
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reserva'
 */
router.get("/search", controladores.filter); // Asociamos el controlador de búsqueda con filtros

// Endpoint para obtener información de una reserva específica
/**
 * @swagger
 * /api/reservas/:{id}:
 *  get:
 *    summary: Obtiene informacion de una reserva especifica
 *    tags: [reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: identificador unico de reserva
 *    responses:
 *      200:
 *        description: informacion de una reserva especifica
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reserva'
 *      404:
 *        description: Reserva no encontrada
 */
router.get("/:id", controladores.readOne); // Asociamos el controlador de lectura de un pedido específico

// Exportamos el router
module.exports = router; // Exportamos el router para usarlo en otras partes de la aplicación
