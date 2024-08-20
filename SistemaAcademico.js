"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = exports.Matricula = exports.Aluno = void 0;
var Aluno = /** @class */ (function () {
    //private curso: Curso | null = null; // retirar e por curso estar associado a matricula acessar curso atraves da matricula this.matricula.curso
    function Aluno(nome, dataNasc) {
        this.matricula = null;
        Aluno.idCounter += 1;
        this.id = Aluno.idCounter;
        this.nomeAluno = nome;
        this.dataNasc = dataNasc;
    }
    Aluno.prototype.fazerMatricula = function (matricula, curso) {
        if (this.matricula == null) {
            this.matricula = matricula;
            curso.adicionarAlunos(this);
            return true;
        }
        console.log("Aluno já tem uma matricula");
        return false;
    };
    Aluno.prototype.mudarCurso = function (curso) {
        if (this.matricula === null) {
            console.log("Aluno não está matriculado em nenhum curso.");
            return;
        }
        this.matricula.getCurso().removerAluno(this);
        this.matricula.setCurso(curso);
        curso.adicionarAlunos(this);
        console.log("Aluno mudou de curso");
    };
    Aluno.prototype.getCurso = function () {
        var _a;
        if (((_a = this.matricula) === null || _a === void 0 ? void 0 : _a.getCurso()) == null) { //encadeamento opcional 
            return "Aluno não está em nenhum curso";
        }
        else {
            return "Aluno matriculado no curso " + this.matricula.getCurso().getNomeCurso();
        }
    };
    Aluno.prototype.getMatricula = function () {
        return this.matricula;
    };
    Aluno.prototype.getNomeAluno = function () {
        return this.nomeAluno;
    };
    Aluno.idCounter = 0;
    return Aluno;
}());
exports.Aluno = Aluno;
var Matricula = /** @class */ (function () {
    function Matricula(dataMatricula, curso) {
        Matricula.idCounter += 1;
        this.id = Matricula.idCounter;
        this.dataMatricula = dataMatricula;
        this.curso = curso;
    }
    Matricula.prototype.getId = function () {
        return this.id;
    };
    Matricula.prototype.getCurso = function () {
        return this.curso;
    };
    Matricula.prototype.setCurso = function (curso) {
        this.curso = curso;
    };
    Matricula.idCounter = 0;
    return Matricula;
}());
exports.Matricula = Matricula;
var Curso = /** @class */ (function () {
    function Curso(nome, cargaHoraria) {
        this.alunos = [];
        Curso.idCounter += 1;
        this.id = Curso.idCounter;
        this.nomeCurso = nome;
        this.cargaHoraria = cargaHoraria;
    }
    Curso.prototype.removerAluno = function (aluno) {
        var index = this.alunos.indexOf(aluno);
        if (index !== -1) {
            this.alunos.splice(index, 1);
            console.log("Aluno removido do curso " + this.getNomeCurso());
        }
        else {
            console.log("Aluno não encontrado!");
        }
    };
    Curso.prototype.adicionarAlunos = function (aluno) {
        this.alunos.push(aluno);
    };
    Curso.prototype.getNomeCurso = function () {
        return this.nomeCurso;
    };
    Curso.idCounter = 0;
    return Curso;
}());
exports.Curso = Curso;
// ------------------------------------------
// aluno.getCurso(); // Aluno matriculado no curso Curso TypeScript
// curso.removerAluno(aluno); // Aluno removido do curso Curso TypeScript
// aluno.sairCurso(); // Aluno pediu para sair do curso: Curso TypeScript.
// aluno.getCurso(); // Aluno não está em nenhum curso
