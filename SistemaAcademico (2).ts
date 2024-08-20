export class Aluno {
    private static idCounter: number = 0;
    private id: number;
    private nomeAluno: string;
    private dataNasc: string;
    private matricula: Matricula | null = null;
    //private curso: Curso | null = null; // retirar e por curso estar associado a matricula acessar curso atraves da matricula this.matricula.curso

    constructor(nome: string, dataNasc: string){
        Aluno.idCounter += 1;
        this.id = Aluno.idCounter; 
        this.nomeAluno = nome;
        this.dataNasc = dataNasc;
    }

    public fazerMatricula(matricula: Matricula, curso: Curso): boolean{ // retornando um booleano para ficar mais claro
        if(this.matricula == null){
            this.matricula = matricula;
            curso.adicionarAlunos(this);
            return true;
        }
        console.log("Aluno já tem uma matricula");
        return false;
    }

    public mudarCurso(curso: Curso): void{
        if (this.matricula === null) {
            console.log("Aluno não está matriculado em nenhum curso.")
            return;
        }
        this.matricula.getCurso().removerAluno(this);
        this.matricula.setCurso(curso);
        curso.adicionarAlunos(this);
        console.log("Aluno mudou de curso");
    }

    public sairCurso(): void{
        if (this.matricula !== null && this.matricula.getCurso() !== null) {
            console.log("Aluno pediu para sair do curso: " + this.matricula.getCurso().getNomeCurso());
            this.matricula.getCurso().removerAluno(this);
            this.matricula = null;
        } else {
            console.log("Aluno não está matriculado em nenhum curso.");
        }
    }

    public getCurso(): string{ 
        if (this.matricula?.getCurso() == null) { //encadeamento opcional 
            return "Aluno não está em nenhum curso";
        }else{
            return "Aluno matriculado no curso " + this.matricula.getCurso().getNomeCurso();
        }
    }

    public getMatricula(): string{ // TO DO: fazer verificação se tem ou nao matricula 
        return "Número de matricula " + this.matricula?.getId()+ " do aluno "+ this.nomeAluno ;
    }

    public getNomeAluno(): string{
        return this.nomeAluno;
    }

}

export class Matricula{
    private static idCounter: number = 0;
    private id: number;
    private dataMatricula: string;
    private curso: Curso;

    constructor(dataMatricula: string, curso: Curso){
        Matricula.idCounter += 1;
        this.id = Matricula.idCounter;
        this.dataMatricula = dataMatricula;
        this.curso = curso;
    }

    public cancelarMatricula(): void{ //TO DO?
        console.log("Matrícula cancelada.");
    }

    public consultarMatricula(): void{
        //TO DO: imprimir a matricula do aluno que chamar o metodo
    }

    public getId(){
        return this.id;
    }

    public getCurso(): Curso{
        return this.curso;
    }

    public setCurso(curso: Curso): void{
        this.curso = curso;
    }
}

export class Curso{
    private static idCounter: number = 0;
    private id: number;
    private nomeCurso: string;
    private cargaHoraria: number;
    private alunos: Aluno[] = [];

    constructor(nome: string, cargaHoraria: number){
        Curso.idCounter += 1;
        this.id = Curso.idCounter; 
        this.nomeCurso = nome;
        this.cargaHoraria = cargaHoraria;
    }

    public removerAluno(aluno: Aluno): void {
        const index = this.alunos.indexOf(aluno);
        if (index !== -1) {
            this.alunos.splice(index, 1);
            console.log("Aluno removido do curso " + this.getNomeCurso());
        } else {
            console.log("Aluno não encontrado!");
        }
    }

    public adicionarAlunos(aluno: Aluno){
        this.alunos.push(aluno);
    }

    public getNomeCurso(){
        return this.nomeCurso;
    }
}


// ------------------------------------------

// aluno.getCurso(); // Aluno matriculado no curso Curso TypeScript

// curso.removerAluno(aluno); // Aluno removido do curso Curso TypeScript

// aluno.sairCurso(); // Aluno pediu para sair do curso: Curso TypeScript.

// aluno.getCurso(); // Aluno não está em nenhum curso

