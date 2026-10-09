
//

class Aluno {

    // Atributos da classe
    public nome: string;
    public nota1: number;
    public nota2: number;
    public nota3: number;

    // Construtor
    constructor(
        nome: string,
        nota1: number,
        nota2: number,
        nota3: number
    ) {
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
    }

    // Método para calcular a média
    public calcularMedia(): number {
        return (this.nota1 + this.nota2 + this.nota3) / 3;
    }

    // Método para verificar a situação
    public verificarSituacao(): string {

        const media = this.calcularMedia();

        if (media >= 7) {
            return "Aprovado";
        } else if (media >= 5) {
            return "Recuperação";
        } else {
            return "Reprovado";
        }
    }
}

//elemento DOM

const formulario = document.getElementById(
    "formulario"
) as HTMLFormElement;

const campoNome = document.getElementById(
    "nome"
) as HTMLInputElement;

const campoNota1 = document.getElementById(
    "nota1"
) as HTMLInputElement;

const campoNota2 = document.getElementById(
    "nota2"
) as HTMLInputElement;

const campoNota3 = document.getElementById(
    "nota3"
) as HTMLInputElement;

const resultado = document.getElementById(
    "resultado"
) as HTMLDivElement | HTMLElement;

//evento formulário

formulario.addEventListener("submit", (evento: SubmitEvent) => {

    // Impede o recarregamento da página
    evento.preventDefault();

    // Captura os valores digitados
    const nome = campoNome.value.trim();

    const valorNota1 = campoNota1.value.trim();
    const valorNota2 = campoNota2.value.trim();
    const valorNota3 = campoNota3.value.trim();

    // Verifica se o nome foi preenchido
    if (nome === "") {
        mostrarMensagem("Informe o nome do aluno.");
        campoNome.focus();
        return;
    }

    // Verifica se todas as notas foram preenchidas
    if (
        valorNota1 === "" ||
        valorNota2 === "" ||
        valorNota3 === ""
    ) {
        mostrarMensagem("Preencha todas as notas.");
        return;
    }

    // Converte os valores para números
    const nota1 = Number(valorNota1);
    const nota2 = Number(valorNota2);
    const nota3 = Number(valorNota3);

    // Armazena as notas em um array
    const notas: number[] = [nota1, nota2, nota3];

    // Valida as notas
    const notasValidas = notas.every((nota: number) => {
        return Number.isFinite(nota) &&
               nota >= 0 &&
               nota <= 10;
    });

    if (!notasValidas) {
        mostrarMensagem(
            "As notas devem ser números entre 0 e 10."
        );
        return;
    }

    // stanciando a classe

    const aluno = new Aluno(
        nome,
        nota1,
        nota2,
        nota3
    );

    //execução do método

    const media: number = aluno.calcularMedia();

    const situacao: string = aluno.verificarSituacao();

    // exibição dos metodos no HTML

    resultado.replaceChildren();

    const titulo = document.createElement("h2");
    titulo.textContent = "Resultado do aluno";

    const nomeResultado = document.createElement("p");
    nomeResultado.textContent = `Aluno: ${aluno.nome}`;

    const notasResultado = document.createElement("p");
    notasResultado.textContent =
        `Notas: ${aluno.nota1.toFixed(1)}, ` +
        `${aluno.nota2.toFixed(1)}, ` +
        `${aluno.nota3.toFixed(1)}`;

    const mediaResultado = document.createElement("p");
    mediaResultado.textContent =
        `Média final: ${media.toFixed(2)}`;

    const situacaoResultado = document.createElement("p");
    situacaoResultado.textContent =
        `Situação: ${situacao}`;

    // Adiciona os elementos à página
    resultado.append(
        titulo,
        nomeResultado,
        notasResultado,
        mediaResultado,
        situacaoResultado
    );

    // Aplica uma cor conforme a situação
    if (situacao === "Aprovado") {
        resultado.style.backgroundColor = "#dcfce7";
        situacaoResultado.style.color = "#166534";
    } else if (situacao === "Recuperação") {
        resultado.style.backgroundColor = "#fef3c7";
        situacaoResultado.style.color = "#92400e";
    } else {
        resultado.style.backgroundColor = "#fee2e2";
        situacaoResultado.style.color = "#991b1b";
    }

});

// função auxilia na mensagem

function mostrarMensagem(mensagem: string): void {

    resultado.replaceChildren();

    const paragrafo = document.createElement("p");

    paragrafo.textContent = mensagem;

    resultado.appendChild(paragrafo);

    resultado.style.backgroundColor = "#fee2e2";
    paragrafo.style.color = "#991b1b";
}