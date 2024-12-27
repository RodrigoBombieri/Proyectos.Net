using MiWebAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;
namespace MiWebAPI.Data
{
    public class EmpleadoData
    {
        private readonly string conexion;

        // configuration nos permite acceder a las configuraciones de la aplicación (archivo appsettings.json)
        public EmpleadoData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        public async Task<List<Empleado>> Lista()
        {
            List<Empleado> lista = new List<Empleado>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_listaEmpleados", con);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Empleado
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Nombre = reader["Nombre"].ToString(),
                            Correo = reader["Correo"].ToString(),
                            Sueldo = Convert.ToDecimal(reader["Sueldo"]),
                            FechaContrato = reader["FechaContrato"].ToString()
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<Empleado> Obtener(int id)
        {
            Empleado empleado = new Empleado();
            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_obtenerEmpleado", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        empleado.Id = Convert.ToInt32(reader["Id"]);
                        empleado.Nombre = reader["Nombre"].ToString();
                        empleado.Correo = reader["Correo"].ToString();
                        empleado.Sueldo = Convert.ToDecimal(reader["Sueldo"]);
                        empleado.FechaContrato = reader["FechaContrato"].ToString();
                    }
                }
            }
            return empleado;
        }

        public async Task<bool> Crear(Empleado empleado)
        {
            bool respuesta = true;
            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_crearEmpleado", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", empleado.Nombre);
                cmd.Parameters.AddWithValue("@Correo", empleado.Correo);
                cmd.Parameters.AddWithValue("@Sueldo", empleado.Sueldo);
                cmd.Parameters.AddWithValue("@FechaContrato", empleado.FechaContrato);
                try
                {
                    await con.OpenAsync();
                    // ExecuteNonQueryAsync() devuelve un entero con la cantidad de filas afectadas
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true: false;
                }
                catch (Exception)
                {

                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> Editar(Empleado empleado)
        {
            bool respuesta = true;
            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_editarEmpleado", con);
                cmd.Parameters.AddWithValue("@IdEmpleado", empleado.Id);
                cmd.Parameters.AddWithValue("@Nombre", empleado.Nombre);
                cmd.Parameters.AddWithValue("@Correo", empleado.Correo);
                cmd.Parameters.AddWithValue("@Sueldo", empleado.Sueldo);
                cmd.Parameters.AddWithValue("@FechaContrato", empleado.FechaContrato);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    // ExecuteNonQueryAsync() devuelve un entero con la cantidad de filas afectadas
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception)
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> Eliminar(int id)
        {
            bool respuesta = true;
            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_eliminarEmpleado", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdEmpleado", id);
                try
                {
                    await con.OpenAsync();
                    // ExecuteNonQueryAsync() devuelve un entero con la cantidad de filas afectadas
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception)
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }
    }
}
