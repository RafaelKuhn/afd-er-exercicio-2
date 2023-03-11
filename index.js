// (( + | - )(0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)) | ( 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)+

const S = [ "+", "-" ]
const N = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]

const ehNumerico = char => N.includes(char);
const ehSinal    = char => S.includes(char);

const estadoAceito = "q2";


let formataAPalavraBonitao;

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q0 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q0"); return; }

	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q0, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (ehSinal(charAtual))
		q1(palavra, indiceNaPalavra + 1);
	else if (ehNumerico(charAtual))
		q2(palavra, indiceNaPalavra + 1)
	else
		achouUmNaoDefinido();
}

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q1 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q1"); return; }
	
	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q1, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (ehNumerico(charAtual))
		q2(palavra, indiceNaPalavra + 1);
	else
		achouUmNaoDefinido();
}

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q2 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q2"); return; }
	
	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q2, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (ehNumerico(charAtual))
		q2(palavra, indiceNaPalavra + 1);
	else
		achouUmNaoDefinido();
}

/** @param {String} estadoFinal */
const terminouPalavraNoEstado = (estadoFinal) => {
	if (estadoFinal == estadoAceito) {
		console.log("ACEITA")
		alert(`terminou no estado ${estadoFinal}, Palavra Aceita, ver console!`);
	}	else {
		console.log("REJEITADA")
		alert(`terminou no estado ${estadoFinal}, Palavra Rejeitada, ver console!`);
	}
}

const achouUmNaoDefinido = () => {
	console.log("REJEITADA");
	alert(`Caracter não definido, ver console!`);
}



/** @param {String} palavra */
const criaFormatadorDePalavraBonitao = (palavra) => {
	const arrayDaPalavraComEspacosAlternados = [];
	arrayDaPalavraComEspacosAlternados.length = palavra.length * 2 + 1
	
	arrayDaPalavraComEspacosAlternados[0] = ' ';
	for (let i = 0; i < palavra.length; ++i) {
		const iStride = i * 2 + 1;
		arrayDaPalavraComEspacosAlternados[iStride] = palavra[i];
		arrayDaPalavraComEspacosAlternados[iStride+1] = ' ';
	}

	/** @param {Number} indiceBonito @returns {String} */
	const funcaoInternaQueFormataBonitao = (indiceBonito) => {
		indiceBonito = (indiceBonito * 2) + 1;

		arrayDaPalavraComEspacosAlternados[0] = ' ';
		for (let i = 0; i < palavra.length; ++i) {
			const iStride = i * 2 + 1;
			arrayDaPalavraComEspacosAlternados[iStride+1] = ' ';
		}

		arrayDaPalavraComEspacosAlternados[indiceBonito - 1] = '[';
		arrayDaPalavraComEspacosAlternados[indiceBonito + 1] = ']';
		
		return arrayDaPalavraComEspacosAlternados.join("");
	}

	return funcaoInternaQueFormataBonitao;
}

function onClickBotaoEnviar() {
	console.log("- - - - - - - começando algoritmo - - - - - - -")
	const palavra = document.getElementById("palavra").value;
	formataAPalavraBonitao = criaFormatadorDePalavraBonitao(palavra);
	
	q0(palavra, 0);
}
