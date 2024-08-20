import * as readlineSync from 'readline-sync';
import { Aluno, Curso, Matricula } from './SistemaAcademico';

const listaAlunos: Aluno[] = [];
const listaCursos: Curso[] = [];
const listaMatricula: Matricula[] = [];

const cadastrarAluno = () => {
    if (listaCursos.length === 0){
        console.log("Nenhum curso cadastrado!");
        exibirMenu();
        return;
    }
    let nome = readlineSync.question("Digite o nome do aluno: ").toUpperCase();
    let dataNasc = readlineSync.question("Digite a data de nascimento: ");


    let nomeCurso = readlineSync.question("Digite o nome do curso que deseja matricular: ").toUpperCase();
    const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
    if (curso !== undefined) {
        const aluno = new Aluno(nome, dataNasc);
        listaAlunos.push(aluno);
        console.log(`Aluno: ${nome} cadastrado com sucesso!`);

        const matricula = new Matricula(new Date(), curso);
        listaMatricula.push(matricula);
        aluno.fazerMatricula(matricula, curso); // Associar matrícula ao aluno
        console.log(`Aluno: ${aluno.getNomeAluno()} matriculado no curso: ${curso.getNomeCurso()}`);
    } else {
        console.log("Curso não encontrado.");
    }
    exibirMenu();
}

const cadastrarCurso = () => {
    let nomeCurso = readlineSync.question("Digite o nome do curso: ").toUpperCase();
    let cargaHoraria = readlineSync.questionInt("Digite a carga horaria do curso: ");

    listaCursos.push(new Curso(nomeCurso, cargaHoraria));
    console.log(`Curso: ${nomeCurso} - Carga horaria: ${cargaHoraria}`);
    exibirMenu();
}

const listarCursos = () => {
    if (listaCursos.length > 0) {
        console.log(listaCursos);
    } else {
        console.log("Nao ha cursos cadastrados!");
    }
    exibirMenu();
}

const consultarMatricula = () => {
    const nome = readlineSync.question("Digite o nome do aluno que deseja consultar matricula: ").toUpperCase();
    const consultaAluno = listaAlunos.find(aluno => aluno.getNomeAluno() === nome);
    if(consultaAluno !== undefined){
        console.log(consultaAluno.getMatricula());
    }else {
        console.log("Aluno não matriculado")
    }
    exibirMenu();
}

const cancelarMatricula = () => {
    const nome = readlineSync.question("Digite o nome do aluno para cancelar a matrícula: ").toUpperCase();
    const aluno = listaAlunos.find(a => a.getNomeAluno() === nome);
    if (aluno === undefined) {
        console.log("Aluno não encontrado.");
        exibirMenu();
        return;
    }

    const matricula = aluno.getMatricula();
    if (matricula !== null) {
        const nomeCurso = matricula.getCurso()?.getNomeCurso();
        matricula.getCurso()?.removerAluno(aluno);
        matricula.setCurso(null)
        console.log(`Matrícula do aluno ${aluno.getNomeAluno()} no curso ${nomeCurso} cancelada com sucesso.`);
    } else{
        console.log("Aluno não está matriculado em nenhum curso")
    }
    exibirMenu();
}

const mudarCurso = () => {
    if(listaCursos.length <= 1){
        console.log("Impossível mudar de curso!");
        exibirMenu();
        return;
    }
    const nome = readlineSync.question("Digite o nome do aluno que deseja mudar de curso: ").toUpperCase();
    const aluno = listaAlunos.find(c => c.getNomeAluno() === nome);
    if (aluno?.getMatricula()?.getCurso === null) {
        console.log("Aluno não está matriculado em nenhum curso")
    }
    if (aluno !== undefined) {
        const nomeCurso = readlineSync.question("Digite o nome do novo curso que quer se matricular: ").toUpperCase();
        const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
        if (curso !== undefined) {
            aluno.mudarCurso(curso);
        } else {
            console.log("Curso não encontrado.");
        }
    } else {
        console.log("Aluno não encontrado.");
    }
    exibirMenu();
}

const addAlunoExistenteNuloAUmCurso = () => {
    const nome = readlineSync.question("Digite o nome do aluno que deseja adicionar a um curso: ").toUpperCase();
    const aluno = listaAlunos.find(c => c.getNomeAluno() === nome);

    if (aluno === undefined) {
        console.log("Aluno não encontrado.");
        exibirMenu();
        return;
    }

    if (aluno.getMatricula() !== null && aluno.getMatricula()?.getCurso() === null) {
        const nomeCurso = readlineSync.question("Digite o nome do curso que deseja matricular o aluno: ").toUpperCase();
        const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
        
        if (curso !== undefined) {
            aluno.getMatricula()?.setCurso(curso);
            curso.adicionarAlunos(aluno);
            console.log(`Aluno ${aluno.getNomeAluno()} foi matriculado no curso ${curso.getNomeCurso()}.`);
        } else {
            console.log("Curso não encontrado.");
        }
    } else {
        console.log("Aluno já está matriculado em um curso ou não possui matrícula.");
    }

    exibirMenu();
}

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

    let escolha = Number(readlineSync.question("\nDigite a opcao: "));

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
            break
        case 8:
            console.log("Voce saiu do programa!");
            break;
        default:
            console.log("Opcao invalida!");
            exibirMenu();
    }
}

exibirMenu();