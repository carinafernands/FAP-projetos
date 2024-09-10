var SistemaSeguranca = /** @class */ (function () {
    function SistemaSeguranca() {
        this.senhaCorreta = "senha123";
    }
    SistemaSeguranca.obterInstancia = function () {
        if (SistemaSeguranca.instancia === undefined) {
            SistemaSeguranca.instancia = new SistemaSeguranca();
        }
        return SistemaSeguranca.instancia;
    };
    SistemaSeguranca.prototype.acessarBaseSecreta = function (senha) {
        if (senha === this.senhaCorreta) {
            return "Acesso autorizado!";
        }
        else {
            return "Acesso negado!";
        }
    };
    return SistemaSeguranca;
}());
var sistema = SistemaSeguranca.obterInstancia();
console.log(sistema.acessarBaseSecreta("senha123"));
