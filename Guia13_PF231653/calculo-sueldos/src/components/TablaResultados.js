export default function TablaResultados({ titulo, filas }) {
  if (filas.length === 0) {
    return <p className="text-muted mt-4 text-center">Aún no hay cálculos realizados.</p>;
  }

  return (
    <div className="mt-5">
      <h3 className="mb-3 text-primary">{titulo}</h3>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Sueldo Base</th>
              <th>ISSS (3%)</th>
              <th>AFP (7.25%)</th>
              <th>Renta</th>
              <th>Sueldo Neto</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.id}>
                <td className="fw-bold">{fila.nombre}</td>
                <td>${fila.sueldoBase}</td>
                <td className="text-danger">-${fila.isss}</td>
                <td className="text-danger">-${fila.afp}</td>
                <td className="text-danger">-${fila.renta}</td>
                <td className="text-success fw-bold">${fila.sueldoNeto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}