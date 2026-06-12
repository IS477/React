import { useState } from "react";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: "Ana", aprobado: false },
    { id: 2, nombre: "Luis", aprobado: false }
  ]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2>🎓 Estudiantes</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Aprobado</th>
            </tr>
          </thead>

          <tbody>
            {estudiantes.map(estudiante => (
              <tr
                key={estudiante.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEstudiantes(prev =>
                    prev.map(est =>
                      est.id === estudiante.id
                        ? {
                            ...est,
                            aprobado: !est.aprobado
                          }
                        : est
                    )
                  );
                }}
              >
                <td>{estudiante.nombre}</td>
                <td>
                  {estudiante.aprobado ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Estudiantes;