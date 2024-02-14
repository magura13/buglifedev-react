export class ErrorFilter {
    public static shapingResponse (statusCode:number) : String {
        if (statusCode === 401) {
            return "Login pendente"
        } else if (statusCode === 400) {
            return "Campos em Branco"
        }
        return "Erro inesperado"
    }
}