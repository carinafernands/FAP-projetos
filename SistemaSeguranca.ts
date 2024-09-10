class SistemaSeguranca {
    private static instancia: SistemaSeguranca;
    private readonly senhaCorreta: string;

    private constructor(){
        this.senhaCorreta = "senha123"
    }

    public static obterInstancia(): SistemaSeguranca {

        if(SistemaSeguranca.instancia === undefined){
            SistemaSeguranca.instancia = new SistemaSeguranca();
        }

        return SistemaSeguranca.instancia;

    }

    public acessarBaseSecreta(senha: string): string{
        if (senha === this.senhaCorreta){
            return "Acesso autorizado!"
        }else{
            return "Acesso negado!"
        }
    }
}


const sistema = SistemaSeguranca.obterInstancia();
console.log(sistema.acessarBaseSecreta("senha123"));

