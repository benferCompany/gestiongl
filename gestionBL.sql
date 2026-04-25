/* =====================
   TABLAS MAESTRAS
   ===================== */

CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto VARCHAR(50) UNIQUE NULL,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10,2) NOT NULL,
    pvp DECIMAL(10,2) NOT NULL
);

CREATE TABLE Proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(255) NOT NULL,
    cuit VARCHAR(13),
    nombre_contacto VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL
);

CREATE TABLE Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    cuit VARCHAR(13),
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_factura VARCHAR(50) NOT NULL
);

CREATE TABLE Tipo_Pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

/* =====================
   FACTURACIÓN
   ===================== */

CREATE TABLE FacturaVenta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_tipo_factura INT NOT NULL,
    descuento DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fv_cliente
        FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
    CONSTRAINT fk_fv_tipo_factura
        FOREIGN KEY (id_tipo_factura) REFERENCES Tipo_Factura(id)
);

CREATE TABLE FacturaCompra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    id_tipo_factura INT NOT NULL,
    descuento DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fc_proveedor
        FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id),
    CONSTRAINT fk_fc_tipo_factura
        FOREIGN KEY (id_tipo_factura) REFERENCES Tipo_Factura(id)
);

/* =====================
   DETALLES
   ===================== */

CREATE TABLE DetalleVenta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura_venta INT NOT NULL,
    id_producto INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    pvp DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_dv_factura
        FOREIGN KEY (id_factura_venta) REFERENCES FacturaVenta(id),
    CONSTRAINT fk_dv_producto
        FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

CREATE TABLE DetalleCompra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura_compra INT NOT NULL,
    id_producto INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10,2) NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_dc_factura
        FOREIGN KEY (id_factura_compra) REFERENCES FacturaCompra(id),
    CONSTRAINT fk_dc_producto
        FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

/* =====================
   PAGOS
   ===================== */

CREATE TABLE Pagos_Proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura_compra INT NOT NULL,
    id_tipo_pago INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_pp_factura
        FOREIGN KEY (id_factura_compra) REFERENCES FacturaCompra(id),
    CONSTRAINT fk_pp_tipo_pago
        FOREIGN KEY (id_tipo_pago) REFERENCES Tipo_Pago(id)
);

CREATE TABLE Pagos_Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura_venta INT NOT NULL,
    id_tipo_pago INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10,2) NOT NULL,
    monto_final DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_pc_factura
        FOREIGN KEY (id_factura_venta) REFERENCES FacturaVenta(id),
    CONSTRAINT fk_pc_tipo_pago
        FOREIGN KEY (id_tipo_pago) REFERENCES Tipo_Pago(id)
);

/* =====================
   INVENTARIO
   ===================== */

CREATE TABLE Stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    proveedor_id INT NOT NULL,
    id_producto_proveedor VARCHAR(50) NULL,
    stock_min DECIMAL(10,2) NOT NULL,
    stock DECIMAL(10,2) NOT NULL,
    stock_max DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_stock_producto
        FOREIGN KEY (producto_id) REFERENCES Producto(id),
    CONSTRAINT fk_stock_proveedor
        FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

/* =====================
   BALANCE
   ===================== */

CREATE TABLE Activo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caja DECIMAL(10,2) NOT NULL,
    cuenta_corriente DECIMAL(10,2) NOT NULL,
    banco DECIMAL(10,2) NOT NULL,
    almacen DECIMAL(10,2) NOT NULL,
    total_activo DECIMAL(10,2) NOT NULL
);

CREATE TABLE Pasivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proveedores DECIMAL(10,2) NOT NULL,
    credito_bancarios DECIMAL(10,2) NOT NULL,
    cuentas_a_pagar DECIMAL(10,2) NOT NULL,
    total_pasivo DECIMAL(10,2) NOT NULL
);

CREATE TABLE Capital (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capital_social DECIMAL(10,2) NOT NULL,
    ganancia DECIMAL(10,2) NOT NULL,
    total_capital_social DECIMAL(10,2) NOT NULL
);

CREATE TABLE Balance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_activo INT NOT NULL,
    id_pasivo INT NOT NULL,
    id_capital INT NOT NULL,
    fecha_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_balance_activo
        FOREIGN KEY (id_activo) REFERENCES Activo(id),
    CONSTRAINT fk_balance_pasivo
        FOREIGN KEY (id_pasivo) REFERENCES Pasivo(id),
    CONSTRAINT fk_balance_capital
        FOREIGN KEY (id_capital) REFERENCES Capital(id)
);

