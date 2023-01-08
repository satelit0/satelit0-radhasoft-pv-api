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
  ADMIN_GLOBAL = "admin_global",
  ADMIN_LOCAL = "admin_local",
  USER_GLOBAL = "user_global",
  USER_LOCAL = "user_local",
  SALES = "sales",
  CLIENT = "client"
}

export enum TypeNCF {
  FISCAL_CREDIT = '01',                   // tipo B01, E31  || "Crédito Fiscal"
  FINAL_CONSUMER = '02',                  // tipo B02, E32  || "Consumidor Final"
  DEBIT_NOTES = '03',                     // tipo B03, E33  || "Notas de Débito"
  CREDIT_NOTES = '04',                    // tipo B04, E34  || "Notas de Crédito"
  PROOF_OF_PURCHASE = '11',               // tipo B11, E41  || "Comprobante de Compras "
  UNIQUE_REGISTRATION_OF_INCOMES = '12',  // tipo B12       || "Registro Único de Ingreso
  REGISTER_OF_MINOR_EXPENSES = '13',      // tipo B13, 43   || "Registro de Gastos Menores"
  SPECIAL_TAX_REGIMES = '14',             // tipo B14, E44  || "Regímenes Especiales de Tributación"
  GOVERNMENT_VOUCHERS = '15',             // tipo B15, E45  || "Comprobantes Gubernamentales"
  PROOF_FOR_EXPORTS = '16',               // tipo B16, E46  || "Comprobante para Exportaciones"
  PROOF_FOR_FOREIGN_PAYMENTS = '17',      // tipo B17, E47  || "Comprobante para Pagos al Exterior"
}

export enum SerieNcf {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
}

export enum OrderType {
  CREDIT = 0, //"Crédito",
  CASH = 1,// "Efectivo"
} 

export enum PaymentMethod {
  CASH = 0, 
  CREDIT_CARD = 1, 
  BANK_TRANSFER = 2, 
  PAYPAL = 3,
}

export enum StatusOrderDelivery {
  STATUS_PENDING = 1, //'pendiente',
  STATUS_HANDLING = 2, //'procesando'
  STATUS_READY_TO_SHIP = 3, //LISTO PARA ENVIO
  STATUS_RESCHEDULED= 4, // ORDEN RE-AGENDADA PARA ENTREGA
  STATUS_SHIPED = 5, // ORDEN ENVIADA
  STATUS_DELIVERED = 6, // ORDEN ENTREGADA
  STATUS_NOT_DELIVERED = 7, // ORDEN NO ENTREGADA
  STATUS_CANCELED = 8, // ORDEN CANCELADA
  STATUS_UNDER_REVIEW = 9, // ORDEN BAJO REVISION
}

export enum StatusOrderPay {
  PENDING = 'PE',
  HANDLING = 'HA',
  PARTIAL = 'PA',
  CANCELED = 'CA',
  REJECTED = 'RE', 
  COMPLETE = 'CO', 
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

export enum PostgresErrorCode {
  INTEGRITY_CONSTRAINT_VIOLATION = '23000',
  RESTRICT_VIOLATION = '23001',
  NOT_NULL_VIOLATION = '23502',
  FOREIGN_KEY_VIOLATION = '23503',
  UNIQUE_VIOLATION = '23505',
  CHECK_VIOLATION = '23514',
  EXCLUSION_VIOLATION = '23P01',
}