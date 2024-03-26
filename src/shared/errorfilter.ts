export class ErrorFilter {
    public static shapingResponse (statusCode:number) : String {
        if (statusCode === 401) {
            return "Login pendente"
        } else if (statusCode === 400) {
            return "Campos em Branco"
        } else if (statusCode === 409) {
            return "Post já curtido :)"
        } else if (statusCode === 501) {
            return "Falha com upload da imagem"
        }

        return "Erro inesperado"
    }
}