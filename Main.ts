import * as readlineSync from 'readline-sync'
import { Aluno, Curso, Matricula } from './SistemaAcademico';
const listaAlunos: Aluno[] = [];
const listaCursos: Curso[] = [];
const listaMatricula: Matricula[] = [];

const cadastrarAluno = () => {
    let nome = readlineSync.question("Digite o nome do aluno: ");
    let dataNasc = readlineSync.question("Digite a data de nascimento: ");

    const aluno = new Aluno(nome, dataNasc)

    listaAlunos.push(aluno);
    console.log(`Aluno: ${nome} cadastrado com sucesso!`)

    let nomeCurso = readlineSync.question("Digite o nome do curso que deseja matricular: ");
    const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
    if (curso !== undefined) {
        const matricula = new Matricula("19-08-2024", curso);
        listaMatricula.push(matricula);
        console.log(`Aluno: ${aluno.getNomeAluno()} matriculado no curso: ${curso.getNomeCurso()} com matricula de número: ${matricula.getId}`)
    } else {
        console.log("Curso não encontrado.")
    }
    exibirMenu();
}

const cadastrarCurso = () => {
    let nomeCurso = readlineSync.question("Digite o nome do curso: ");
    let cargaHoraria = readlineSync.questionInt("Digite a carga horaria do curso: ");

    listaCursos.push(new Curso(nomeCurso, cargaHoraria));
    console.log(`Curso: ${nomeCurso} - Carga horaria: ${cargaHoraria}`);
    exibirMenu();
}

const listarCursos = () => {
    if (listaCursos.length > 0) {
        console.log(listaCursos)
    } else {
        console.log("Nao ha cursos cadastrados!")
    }
    exibirMenu();
}

const consultarMatricula = () => {
    // TO DO: faça
}

const removerAluno = () => {
    const nomeCurso = readlineSync.question("Digite o nome do curso que deseja remover um aluno: ");
    const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
    if (curso !== undefined) {
        const nome = readlineSync.question(`Digite o nome do aluno que deseja remover do curso: ${curso.getNomeCurso()}`);
        const aluno = listaAlunos.find(c => c.getNomeAluno() === nome);
        if (aluno !== undefined) {
            curso.removerAluno(aluno);
        } else {
            console.log("Aluno não encontrado.")
        }
    } else {
        console.log("Curso não encontrado.")
    }
    exibirMenu();
}

const mudarCurso = () => {
    const nome = readlineSync.question("Digite o nome do aluno que deseja mudar de curso: ");
    const aluno = listaAlunos.find(c => c.getNomeAluno() === nome);
    if (aluno !== undefined) {
        const nomeCurso = readlineSync.question("Digite o nome do novo curso que quer se matricular: ");
        const curso = listaCursos.find(c => c.getNomeCurso() === nomeCurso);
        if (curso !== undefined) {
            aluno.mudarCurso(curso);
        } else {
            console.log("Curso não encontrado.")
        }
    } else {
        console.log("Aluno não encontrado.")
    }

}

const sairCurso = () => {
    const nome = readlineSync.question("Digite o nome do aluno que deseja deixar o curso que está matriculado: ");
    const aluno = listaAlunos.find(c => c.getNomeAluno() === nome);
    if (aluno !== undefined) {
        aluno.sairCurso();
    } else{
        console.log("Aluno não encontrado")
    }
}

const cancelarMatricula = () => {   
    // TO DO: faça
}

const removerMatricula = () => {
    // O que é esse?
}

function exibirMenu() {

    console.log("===== MENU =====\n"
        + "1-Cadastrar aluno\n"
        + "2-Cadastrar curso\n"
        + "3-Consultar matricula\n"
        + "4-Remover aluno\n"
        + "5-Mudar curso\n"
        + "6-Sair do curso\n"
        + "7-Cancelar matricula\n"
        + "8-Remover matricula\n"
        + "9-Listar os cursos"
        + "10-Sair");

    let escolha = Number(readlineSync.question("\nDigite a opcao: "));

    switch (escolha) {
        case 1:
            cadastrarAluno();
            break;
        case 2:
            cadastrarCurso();
            break;
        case 3:
            consultarMatricula();
            break;
        case 4:
            removerAluno();
            break;
        case 5:
            mudarCurso();
            break;
        case 6:
            sairCurso();
            break;
        case 7:
            cancelarMatricula();
            break;
        case 8:
            removerMatricula();
            break;
        case 9:
            listarCursos();
            break;
        case 10:
            console.log("Voce saiu do programa!")
            return;

        default:
            console.log("Opcao invalida!");
            exibirMenu();

    }
}

exibirMenu();
