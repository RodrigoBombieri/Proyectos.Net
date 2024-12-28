
CREATE DATABASE DBCrudAngular
GO
USE DBCrudAngular
GO

CREATE TABLE Empleados(
	Id INT PRIMARY KEY IDENTITY,
	Nombre VARCHAR(50),
	Correo VARCHAR(50),
	Sueldo DECIMAL(10,2),
	FechaContrato DATE
);
INSERT INTO Empleados(Nombre, Correo, Sueldo, FechaContrato)
VALUES
('Rodrigo Riquelme', 'rodrigoriquelme@gmail.com', 4500, '2024-01-12')

-- OBTENER TODOS LOS EMPLEADOS
CREATE PROCEDURE sp_listaEmpleados
AS
BEGIN
	SELECT
	Id,
	Nombre,
	Correo,
	Sueldo,
	CONVERT(CHAR(10),FechaContrato,103)[FechaContrato]
	FROM Empleados
END

-- OBTENER UN EMPLEADO
CREATE PROCEDURE sp_obtenerEmpleado(
	@IdEmpleado INT
)
AS
BEGIN
	SELECT
	Id,
	Nombre,
	Correo,
	Sueldo,
	CONVERT(CHAR(10),FechaContrato,103)[FechaContrato]
	FROM Empleados
	WHERE @IdEmpleado = Id
END

-- CREAR EMPLEADO
CREATE PROCEDURE sp_crearEmpleado(
	@Nombre VARCHAR(50),
	@Correo VARCHAR(50),
	@Sueldo DECIMAL(10,2),
	@FechaContrato VARCHAR(10)
)
AS
BEGIN
	SET DATEFORMAT dmy

	INSERT INTO Empleados(
	Nombre, 
	Correo, 
	Sueldo, 
	FechaContrato)
	VALUES(
	@Nombre, 
	@Correo, 
	@Sueldo, 
	CONVERT(DATE, @FechaContrato)
	)
END
-- MODIFICAR EMPLEADO
CREATE PROCEDURE sp_editarEmpleado(
	@IdEmpleado INT,
	@Nombre VARCHAR(50),
	@Correo VARCHAR(50),
	@Sueldo DECIMAL(10,2),
	@FechaContrato VARCHAR(10)
)
AS
BEGIN
	SET DATEFORMAT dmy

	UPDATE Empleados
	SET
	Nombre = @Nombre, 
	Correo = @Correo, 
	Sueldo = @Sueldo,
	FechaContrato = CONVERT(DATE, @FechaContrato)
	WHERE
	Id = @IdEmpleado
END

-- ELIMINAR EMPLEADO
CREATE PROCEDURE sp_eliminarEmpleado(
	@IdEmpleado INT
)
AS
BEGIN
	DELETE FROM Empleados
	WHERE
	Id = @IdEmpleado
END