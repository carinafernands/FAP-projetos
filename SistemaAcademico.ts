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
        if (this.matricula === null || this.matricula.getCurso() === null) {
            console.log("Aluno não está matriculado em nenhum curso.")
            return;
        }
        const cursoAtual = this.matricula.getCurso();
        if (cursoAtual?.removerAluno(this)) {
            this.matricula.setCurso(curso);
            curso.adicionarAlunos(this);
            console.log("Aluno mudou de curso");
        }
    }


    public getCurso(): string{ 
        if (this.matricula?.getCurso() == null) { //encadeamento opcional 
            return "Aluno não está em nenhum curso";
        }else{
            return "Aluno matriculado no curso " + this.matricula.getCurso()?.getNomeCurso();
        }
    }

    public getMatricula(): Matricula | null {
        return this.matricula;
    }

    public getNomeAluno(): string{
        return this.nomeAluno;
    }

    public setMatricula(matricula: Matricula){
        this.matricula = matricula
    }

}

export class Matricula {
    private static idCounter: number = 0;
    private id: number;
    private dataMatricula: Date;
    private curso: Curso | null = null;

    constructor(dataMatricula: Date, curso: Curso) {
        Matricula.idCounter += 1;
        this.id = Matricula.idCounter;
        this.dataMatricula = dataMatricula;
        this.curso = curso;
    }

    public getId(): number {
        return this.id;
    }

    public getCurso(): Curso | null {
        return this.curso;
    }

    public setCurso(curso: Curso | null): void {
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

    public removerAluno(aluno: Aluno): boolean {
        const index = this.alunos.indexOf(aluno);
        if (index !== -1) {
            this.alunos.splice(index, 1);
            console.log("Aluno removido do curso " + this.getNomeCurso());
            return true;
        } else {
            console.log("Aluno não encontrado!");
            return false;
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
