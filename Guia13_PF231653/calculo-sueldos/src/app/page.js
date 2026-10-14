"use client";
import { useState } from "react";
// Importamos el componente reutilizable que acabamos de crear
import TablaResultados from "@/components/TablaResultados";

export default function CalculadoraSueldos() {
  const [nombre, setNombre] = useState("");
  const [sueldoBase, setSueldoBase] = useState("");
  const [registros, setRegistros] = useState([]);
  const [errores, setErrores] = useState({});

  const validar = () => {
    const temp = {};
    if (!nombre.trim()) temp.nombre = "El nombre del empleado es obligatorio.";
    const sueldo = parseFloat(sueldoBase);
    if (isNaN(sueldo) || sueldo <= 0) {
      temp.sueldoBase = "El sueldo base debe ser un número mayor a cero.";
    }
    setErrores(temp);
    return Object.keys(temp).length === 0;
  };

  const calcularDescuentos = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const base = parseFloat(sueldoBase);

    // 1. Cálculo de ISSS (3% con tope máximo de cotización de $1,000)
    let isssCotizable = base > 1000 ? 1000 : base;
    const isss = isssCotizable * 0.03;

    // 2. Cálculo de AFP (7.25% sin tope para este ejemplo básico)
    const afp = base * 0.0725;

    // 3. Cálculo de Renta (Sobre el salario menos ISSS y AFP)
    const salarioSujetoRenta = base - isss - afp;
    let renta = 0;

    // Tramos de Renta El Salvador (Según guía)
    if (salarioSujetoRenta > 0.01 && salarioSujetoRenta <= 550.00) {
      renta = 0.00;
    } else if (salarioSujetoRenta > 550.01 && salarioSujetoRenta <= 895.24) {
      renta = (salarioSujetoRenta - 550.00) * 0.10 + 17.67;
    } else if (salarioSujetoRenta > 895.25 && salarioSujetoRenta <= 2038.10) {
      renta = (salarioSujetoRenta - 895.24) * 0.20 + 60.00;
    } else if (salarioSujetoRenta > 2038.11) {
      renta = (salarioSujetoRenta - 2038.10) * 0.30 + 288.57;
    }

    // 4. Sueldo Neto Final
    const sueldoNeto = base - isss - afp - renta;

    // Creamos el nuevo registro asegurando 2 decimales para la tabla
    const nuevoRegistro = {
      id: crypto.randomUUID(),
      nombre: nombre,
      sueldoBase: base.toFixed(2),
      isss: isss.toFixed(2),
      afp: afp.toFixed(2),
      renta: renta.toFixed(2),
      sueldoNeto: sueldoNeto.toFixed(2),
    };

    // Actualizamos la tabla
    setRegistros([...registros, nuevoRegistro]);
    
    // Limpiamos el formulario para el siguiente empleado
    setNombre("");
    setSueldoBase("");
    setErrores({});
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 bg-white">
            <div className="card-header bg-primary text-white text-center py-3">
              <h2 className="mb-0">Calculadora de Sueldos (El Salvador)</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={calcularDescuentos} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label fw-bold">Nombre del Empleado</label>
                    <input
                      type="text"
                      className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="sueldoBase" className="form-label fw-bold">Sueldo Base ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${errores.sueldoBase ? "is-invalid" : ""}`}
                      id="sueldoBase"
                      value={sueldoBase}
                      onChange={(e) => setSueldoBase(e.target.value)}
                      placeholder="Ej. 600.00"
                    />
                    {errores.sueldoBase && <div className="invalid-feedback">{errores.sueldoBase}</div>}
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-success btn-lg shadow-sm">
                    Calcular y Agregar a la Tabla
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Aquí llamamos a nuestro componente reutilizable y le pasamos los datos */}
          <TablaResultados titulo="Reporte de Planilla" filas={registros} />
          
        </div>
      </div>
    </main>
  );
}