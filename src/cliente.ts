export class Cliente {
    constructor(
        public id: string,
        public dni: string,
        public nomApe: string,
        public direccion: string,
        public email: string,
        public telefono: string
    ){}
}