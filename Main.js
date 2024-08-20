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
    var nome = readlineSync.question("Digite o nome do aluno: ");
    var dataNasc = readlineSync.question("Digite a data de nascimento: ");
    var aluno = new SistemaAcademico_1.Aluno(nome, dataNasc);
    listaAlunos.push(aluno);
    console.log("Aluno: ".concat(nome, " cadastrado com sucesso!"));
    var nomeCurso = readlineSync.question("Digite o nome do curso que deseja matricular: ").toUpperCase();
    var curso = listaCursos.find(function (c) { return c.getNomeCurso() === nomeCurso; });
    if (curso !== undefined) {
        var matricula = new SistemaAcademico_1.Matricula("19-08-2024", curso);
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
    var nome = readlineSync.question("Digite o nome do aluno que deseja consultar matricula: ");
    var consulta = listaAlunos.find(function (aluno) { return aluno.getNomeAluno() === nome; });
    if (consulta !== undefined) {
        console.log(consulta.getMatricula());
    }
    exibirMenu();
};
var cancelarMatricula = function () {
    var _a;
    var nome = readlineSync.question("Digite o nome do aluno para cancelar a matrícula: ");
    var aluno = listaAlunos.find(function (a) { return a.getNomeAluno() === nome; });
    if (aluno === undefined) {
        console.log("Aluno não encontrado.");
        exibirMenu();
        return;
    }
    var matriculaId = (_a = aluno.getMatricula()) === null || _a === void 0 ? void 0 : _a.getId();
    if (matriculaId === undefined) {
        console.log("O aluno não está matriculado em nenhum curso.");
        exibirMenu();
        return;
    }
    var curso = aluno.getCurso().split(" ")[3]; // Extrai o nome do curso da string
    var cursoObj = listaCursos.find(function (c) { return c.getNomeCurso() === curso; });
    if (cursoObj === undefined) {
        console.log("Curso não encontrado.");
        exibirMenu();
        return;
    }
    cursoObj.removerAluno(aluno);
    // Remove a matrícula da lista
    var matriculaIndex = listaMatricula.findIndex(function (m) { return m.getId() === matriculaId; });
    if (matriculaIndex !== -1) {
        listaMatricula.splice(matriculaIndex, 1);
    }
    // Atualiza o aluno para não ter matrícula
    aluno.fazerMatricula(null, cursoObj);
    console.log("Matr\u00EDcula do aluno ".concat(aluno.getNomeAluno(), " no curso ").concat(curso, " cancelada com sucesso."));
    exibirMenu();
};
var mudarCurso = function () {
    if (listaCursos.length === 1) {
        console.log("So existe um curso cadastrado!");
        exibirMenu();
        return;
    }
    var nome = readlineSync.question("Digite o nome do aluno que deseja mudar de curso: ");
    var aluno = listaAlunos.find(function (c) { return c.getNomeAluno() === nome; });
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
function exibirMenu() {
    console.log("===== MENU =====\n"
        + "1-Cadastrar aluno\n"
        + "2-Cadastrar curso\n"
        + "3-Listar cursos\n"
        + "4-Consultar matricula\n"
        + "5-Cancelar matricula\n"
        + "6-Mudar de curso\n"
        + "7-Sair");
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
            console.log("Voce saiu do programa!");
            break;
        default:
            console.log("Opcao invalida!");
            exibirMenu();
    }
}
exibirMenu();
