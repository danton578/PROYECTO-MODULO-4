let reservas = [
  {
    id: 1,
    hotel: "Hotel Paraíso",
    fecha_inicio: "2023-05-15",
    fecha_fin: "2023-05-20",
    tipo_habitacion: "Doble",
    estado: "Confirmada",
    num_huespedes: 3,
  },
];

// 1. Crear reservas
exports.create = async (req, res) => {
  const newReserva = req.body;
  newReserva.id = reservas.length + 1;
  reservas.push(newReserva);

  res.status(201).json({
    msg: "Reserva generada con éxito.",
    data: newReserva,
  });
};

// 2. Lista de reservas
exports.readAll = async (req, res) => {
  res.json({
    msg: "Lista de reservas obtenidas con éxito.",
    data: reservas,
  });
};

// 3. Obtener informacion de una reserva especifica

exports.readOne = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reserva = reserva.find((r) => r.id === reservaId);

  if (!reserva) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  res.json({
    msg: "Reserva obtenida con éxito.",
    data: reserva,
  });
};

// 4. Actualizar información de una reserva

exports.update = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reservaIndex = reservas.findIndex((r) => r.id === reservaId);

  if (reservaIndex === -1) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  reservas[reservaIndex] = { ...reservas[reservaIndex], ...req.body };

  res.json({
    msg: "Reserva actualizada con éxito.",
    data: reservas[reservaIndex],
  });
};

// 5. Eliminar una reserva especifica

exports.delete = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reservaIndex = reservas.findIndex((r) => r.id === reservaId);

  if (reservaIndex === -1) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  reservas.splice(reservaIndex, 1);
  res.json({ msg: "Reserva eliminada con éxito." });
};

// Filtros
exports.filter = async (req, res) => {
  const {
    HOTEL,
    FECHA_INICIO,
    FECHA_FIN,
    TIPO_HABITACION,
    ESTADO,
    NUM_HUESPEDES,
  } = req.query;

  // Filtramos la lista de pedidos según los criterios proporcionados
  const filteredReservas = reservas.filter((reserva) => {
    if (HOTEL && reserva.hotel !== HOTEL) {
      return false;
    }
    if (
      FECHA_INICIO &&
      reserva.fecha_inicio >= FECHA_INICIO &&
      FECHA_FIN &&
      reserva.fecha_fin <= FECHA_FIN
    ) {
      return false;
    }
    if (TIPO_HABITACION && reserva.tipo_habitacion !== TIPO_HABITACION) {
      return false;
    }
    if (ESTADO && reserva.estado !== ESTADO) {
      return false;
    }
    if (NUM_HUESPEDES && reserva.num_huespedes !== NUM_HUESPEDES) {
      return false;
    }
    return true;
  });

  if (filteredReservas.length === 0) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  res.json({
    msg: "Reservas filtradas con éxito.",
    data: filteredReservas,
  });
};
