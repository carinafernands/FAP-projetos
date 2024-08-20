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
    let nome = readlineSync.question("Digite o nome do aluno: ");
    let dataNasc = readlineSync.question("Digite a data de nascimento: ");

    const aluno = new Aluno(nome, dataNasc);
    listaAlunos.push(aluno);
    console.log(`Aluno: ${nome} cadastrado com sucesso!`);

    let nomeCurso = readlineSync.question("Digite o nome do curso que deseja matricular: ").toUpperCase();
    const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
    if (curso !== undefined) {
        const matricula = new Matricula("19-08-2024", curso);
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
    const nome = readlineSync.question("Digite o nome do aluno que deseja consultar matricula: ");
    const consulta = listaAlunos.find(aluno => aluno.getNomeAluno() === nome);
    if(consulta !== undefined){
        console.log(consulta.getMatricula());
    }
    exibirMenu();
}

const cancelarMatricula = () => {
    const nome = readlineSync.question("Digite o nome do aluno para cancelar a matrícula: ");
    const aluno = listaAlunos.find(a => a.getNomeAluno() === nome);
    if (aluno === undefined) {
        console.log("Aluno não encontrado.");
        exibirMenu();
        return;
    }

    const matriculaId = aluno.getMatricula()?.getId();
    if (matriculaId === undefined) {
        console.log("O aluno não está matriculado em nenhum curso.");
        exibirMenu();
        return;
    }

    const curso = aluno.getCurso().split(" ")[3]; // Extrai o nome do curso da string
    const cursoObj = listaCursos.find(c => c.getNomeCurso() === curso);
    if (cursoObj === undefined) {
        console.log("Curso não encontrado.");
        exibirMenu();
        return;
    }

    cursoObj.removerAluno(aluno);

    // Remove a matrícula da lista
    const matriculaIndex = listaMatricula.findIndex(m => m.getId() === matriculaId);
    if (matriculaIndex !== -1) {
        listaMatricula.splice(matriculaIndex, 1);
    }

    // Atualiza o aluno para não ter matrícula
    aluno.fazerMatricula(null, cursoObj);

    console.log(`Matrícula do aluno ${aluno.getNomeAluno()} no curso ${curso} cancelada com sucesso.`);
    exibirMenu();
}

const mudarCurso = () => {
    if(listaCursos.length === 1){
        console.log("So existe um curso cadastrado!");
        exibirMenu();
        return;
    }
    const nome = readlineSync.question("Digite o nome do aluno que deseja mudar de curso: ");
    const aluno = listaAlunos.find(c => c.getNomeAluno() === nome);
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

function exibirMenu() {
    console.log("===== MENU =====\n"
        + "1-Cadastrar aluno\n"
        + "2-Cadastrar curso\n"
        + "3-Listar cursos\n"
        + "4-Consultar matricula\n"
        + "5-Cancelar matricula\n"
        + "6-Mudar de curso\n"
        + "7-Sair");

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
            console.log("Voce saiu do programa!");
            break;
        default:
            console.log("Opcao invalida!");
            exibirMenu();
    }
}

exibirMenu();
