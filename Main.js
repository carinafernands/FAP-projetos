"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var SistemaAcademico_1 = require("./SistemaAcademico");
var listaAlunos = [];
var listaCursos = [];
var listaMatricula = [];
var cadastrarAluno = function () {
    if (listaCursos.length === 0) {
        console.log("Nenhum curso cadastrado!");
        exibirMenu();
        return;
    }
    var nome = readlineSync.question("Digite o nome do aluno: ").toUpperCase();
    var dataNasc = readlineSync.question("Digite a data de nascimento: ");
    var nomeCurso = readlineSync.question("Digite o nome do curso que deseja matricular: ").toUpperCase();
    var curso = listaCursos.find(function (c) { return c.getNomeCurso() === nomeCurso; });
    if (curso !== undefined) {
        var aluno = new SistemaAcademico_1.Aluno(nome, dataNasc);
        listaAlunos.push(aluno);
        console.log("Aluno: ".concat(nome, " cadastrado com sucesso!"));
        var matricula = new SistemaAcademico_1.Matricula(new Date(), curso);
        listaMatricula.push(matricula);
        aluno.fazerMatricula(matricula, curso); // Associar matrícula ao aluno
        console.log("Aluno: ".concat(aluno.getNomeAluno(), " matriculado no curso: ").concat(curso.getNomeCurso()));
    }
    else {
        console.log("Curso não encontrado.");
    }
    exibirMenu();
};
var cadastrarCurso = function () {
    var nomeCurso = readlineSync.question("Digite o nome do curso: ").toUpperCase();
    var cargaHoraria = readlineSync.questionInt("Digite a carga horaria do curso: ");
    listaCursos.push(new SistemaAcademico_1.Curso(nomeCurso, cargaHoraria));
    console.log("Curso: ".concat(nomeCurso, " - Carga horaria: ").concat(cargaHoraria));
    exibirMenu();
};
var listarCursos = function () {
    if (listaCursos.length > 0) {
        console.log(listaCursos);
    }
    else {
        console.log("Nao ha cursos cadastrados!");
    }
    exibirMenu();
};
var consultarMatricula = function () {
    var nome = readlineSync.question("Digite o nome do aluno que deseja consultar matricula: ").toUpperCase();
    var consultaAluno = listaAlunos.find(function (aluno) { return aluno.getNomeAluno() === nome; });
    if (consultaAluno !== undefined) {
        console.log(consultaAluno.getMatricula());
    }
    else {
        console.log("Aluno não matriculado");
    }
    exibirMenu();
};
var cancelarMatricula = function () {
    var _a, _b;
    var nome = readlineSync.question("Digite o nome do aluno para cancelar a matrícula: ").toUpperCase();
    var aluno = listaAlunos.find(function (a) { return a.getNomeAluno() === nome; });
    if (aluno === undefined) {
        console.log("Aluno não encontrado.");
        exibirMenu();
        return;
    }
    var matricula = aluno.getMatricula();
    if (matricula !== null) {
        var nomeCurso = (_a = matricula.getCurso()) === null || _a === void 0 ? void 0 : _a.getNomeCurso();
        (_b = matricula.getCurso()) === null || _b === void 0 ? void 0 : _b.removerAluno(aluno);
        matricula.setCurso(null);
        console.log("Matr\u00EDcula do aluno ".concat(aluno.getNomeAluno(), " no curso ").concat(nomeCurso, " cancelada com sucesso."));
    }
    else {
        console.log("Aluno não está matriculado em nenhum curso");
    }
    exibirMenu();
};
var mudarCurso = function () {
    var _a;
    if (listaCursos.length <= 1) {
        console.log("Impossível mudar de curso!");
        exibirMenu();
        return;
    }
    var nome = readlineSync.question("Digite o nome do aluno que deseja mudar de curso: ").toUpperCase();
    var aluno = listaAlunos.find(function (c) { return c.getNomeAluno() === nome; });
    if (((_a = aluno === null || aluno === void 0 ? void 0 : aluno.getMatricula()) === null || _a === void 0 ? void 0 : _a.getCurso) === null) {
        console.log("Aluno não está matriculado em nenhum curso");
    }
    if (aluno !== undefined) {
        var nomeCurso_1 = readlineSync.question("Digite o nome do novo curso que quer se matricular: ").toUpperCase();
        var curso = listaCursos.find(function (c) { return c.getNomeCurso() === nomeCurso_1; });
        if (curso !== undefined) {
            aluno.mudarCurso(curso);
        }
        else {
            console.log("Curso não encontrado.");
        }
    }
    else {
        console.log("Aluno não encontrado.");
    }
    exibirMenu();
};
var addAlunoExistenteNuloAUmCurso = function () {
    var _a, _b;
    var nome = readlineSync.question("Digite o nome do aluno que deseja adicionar a um curso: ").toUpperCase();
    var aluno = listaAlunos.find(function (c) { return c.getNomeAluno() === nome; });
    if (aluno === undefined) {
        console.log("Aluno não encontrado.");
        exibirMenu();
        return;
    }
    if (aluno.getMatricula() !== null && ((_a = aluno.getMatricula()) === null || _a === void 0 ? void 0 : _a.getCurso()) === null) {
        var nomeCurso_2 = readlineSync.question("Digite o nome do curso que deseja matricular o aluno: ").toUpperCase();
        var curso = listaCursos.find(function (c) { return c.getNomeCurso() === nomeCurso_2; });
        if (curso !== undefined) {
            (_b = aluno.getMatricula()) === null || _b === void 0 ? void 0 : _b.setCurso(curso);
            curso.adicionarAlunos(aluno);
            console.log("Aluno ".concat(aluno.getNomeAluno(), " foi matriculado no curso ").concat(curso.getNomeCurso(), "."));
        }
        else {
            console.log("Curso não encontrado.");
        }
    }
    else {
        console.log("Aluno já está matriculado em um curso ou não possui matrícula.");
    }
    exibirMenu();
};
function exibirMenu() {
    console.log("===== MENU =====\n"
        + "1-Cadastrar aluno\n"
        + "2-Cadastrar curso\n"
        + "3-Listar cursos\n"
        + "4-Consultar matricula\n"
        + "5-Cancelar matricula\n"
        + "6-Mudar de curso\n"
        + "7- Adicionar aluno existente a um curso"
        + "8-Sair");
    var escolha = Number(readlineSync.question("\nDigite a opcao: "));
    switch (escolha) {
        case 1:
            cadastrarAluno();
            break;
        case 2:
            cadastrarCurso();
            break;
        case 3:
            listarCursos();
            break;
        case 4:
            consultarMatricula();
            break;
        case 5:
            cancelarMatricula();
            break;
        case 6:
            mudarCurso();
            break;
        case 7:
            addAlunoExistenteNuloAUmCurso();
            break;
        case 8:
            console.log("Voce saiu do programa!");
            break;
        default:
            console.log("Opcao invalida!");
            exibirMenu();
    }
}
exibirMenu();
