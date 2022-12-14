export enum Units {
  IN = "pulgadas",
  CM = "centimetros",
  MG = "miligramos",
  ML = "mililitros",
  LBS = "libras",
  KG = "kilogramos",
  NA = "no definido"
}

export enum Roles {
  ADMIN = "admin",
  USER = "user",
  SALES = "sales",
  CLIENT = "client"
}

export enum TypeNCF {
  "Crédito Fiscal" = 1, // tipo B01, E31
  "Consumidor Final" = 2, // tipo B02, E32
  "Notas de Débito" = 3, // tipo B03, E33
  "Notas de Crédito" = 4, // tipo B04, E34
  "Comprobante de Compras " = 11, // tipo B11, E41
  "Registro Único de Ingresos" = 12, // tipo B12
  "Registro de Gastos Menores" = 13, // tipo B13, 43
  "Regímenes Especiales de Tributación" = 14, // tipo B14, E44
  "Comprobantes Gubernamentales" = 15, // tipo B15, E45
  "Comprobante para Exportaciones" = 16, // tipo B16, E46
  "Comprobante para Pagos al Exterior" = 17, // tipo B17, E47
}

export enum OrderType {
  CREDIT = "Crédito",
  CASH = "Efectico"
}

export enum TermType {
  DAYS = "Diario",
  WEEKLY = "Semanal",
  MONTHLY = "Mensual",
  BIMONTHLY = "Bimestral",
  FOUR_MONTH = "Cuatrimestre",
  BIANNUAL = "Semestre",
  ANNUAL = "Anual",
}

export enum WeekendCorrection {
  BEFORE =  1, //"Antes",
  AFTER =  2, //"Despues",
  DURING = 0, //"Durante" 
}