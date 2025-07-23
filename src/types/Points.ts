export interface PointsConfig {
 id:string
 value: string
}

export interface PointsConversion {
  amount: number
  fromCurrency: 'MXN' | 'POINTS'
  toCurrency: 'MXN' | 'POINTS'
  result: number
} 