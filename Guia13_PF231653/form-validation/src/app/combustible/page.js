"use client";
import { useState } from "react";

export default function CombustibleCalculadora() {
  const [kilometros, setKilometros] = useState("");
  const [rendimiento, setRendimiento] = useState("");
  const [precioGalon, setPrecioGalon] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const calcularCombustible = (e) => {
    e.preventDefault();
    const km = parseFloat(kilometros);
    const rend = parseFloat(rendimiento);
    const precio = parseFloat(precioGalon);

    if (isNaN(km) || km <= 0 || isNaN(rend) || rend <= 0 || isNaN(precio) || precio <= 0) {
      setError("Por favor, ingrese valores válidos mayores a cero.");
      setResultado(null);
      return;
    }

    setError("");
    const galonesConsumidos = km / rend;
    const costoTotal = galonesConsumidos * precio;

    setResultado({
      galones: galonesConsumidos.toFixed(2),
      costo: costoTotal.toFixed(2),
    });
  };

  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white text-center py-3">
          <h2 className="mb-0">Cálculo de Consumo de Combustible</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={calcularCombustible} noValidate>
            <div className="mb-3">
              <label htmlFor="kilometros" className="form-label fw-bold">Kilómetros a recorrer (km)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="kilometros"
                value={kilometros}
                onChange={(e) => setKilometros(e.target.value)}
                placeholder="Ej. 150"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rendimiento" className="form-label fw-bold">Rendimiento (km por galón)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="rendimiento"
                value={rendimiento}
                onChange={(e) => setRendimiento(e.target.value)}
                placeholder="Ej. 40"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="precioGalon" className="form-label fw-bold">Precio por galón ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="precioGalon"
                value={precioGalon}
                onChange={(e) => setPrecioGalon(e.target.value)}
                placeholder="Ej. 4.25"
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-success btn-lg">
                Calcular Consumo
              </button>
            </div>
          </form>

          {resultado && (
            <div className="alert alert-success mt-4 text-center">
              <h4 className="alert-heading fw-bold">Resultado del Viaje</h4>
              <p className="mb-1">Galones necesarios: <strong>{resultado.galones} galones</strong></p>
              <p className="mb-0">Costo total estimado: <strong>${resultado.costo}</strong></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}