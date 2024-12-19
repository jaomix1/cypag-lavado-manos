export interface Lavado {
    lavadoId: number
    codigo: string
    descripcion: string
    codigoSoat?: string
    uvrIss?: number
    valorIss?: number
    soatGrupoId?: number
    soatGrupo?: string
    valorSoat?: number
    grupoId: number
    grupo: string
    subGrupoId: number
    subGrupo?: string
}