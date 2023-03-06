// (a|b)+ cc(a|b|c)*

const a = "a";
const b = "b";
const c = "c";
let formataAPalavraBonitao;

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q0 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q0"); return; }

	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q0, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (charAtual == a || charAtual == b)
		q1(palavra, indiceNaPalavra + 1);
	else
		achouUmNaoDefinido();
}

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q1 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q1"); return; }
	
	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q1, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (charAtual == a || charAtual == b)
		q1(palavra, indiceNaPalavra + 1);
	else if (charAtual == c)
		q2(palavra, indiceNaPalavra + 1)
	else
		achouUmNaoDefinido();
}

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q2 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q2"); return; }
	
	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q2, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (charAtual == c)
		q3(palavra, indiceNaPalavra + 1);
	else
		achouUmNaoDefinido();
}

/** @param {String} palavra @param {Number} indiceNaPalavra */
const q3 = (palavra, indiceNaPalavra) => {
	const terminouAPalavra = indiceNaPalavra == palavra.length;
	if (terminouAPalavra) { terminouPalavraNoEstado("q3"); return; }
	
	const charAtual = palavra[indiceNaPalavra];
	console.log(`em: q3, estado: ${formataAPalavraBonitao(indiceNaPalavra)}`);

	if (charAtual == a || charAtual == b || charAtual == c)
		q3(palavra, indiceNaPalavra + 1);
	else
		achouUmNaoDefinido();
}


/** @param {String} estadoFinal */
const terminouPalavraNoEstado = (estadoFinal) => {
	alert(`terminou no estado ${estadoFinal}, ${estadoFinal == "q3" ? "Palavra Aceita" : "Palavra Rejeitada"}, ver console!`);
}

const achouUmNaoDefinido = () => {
	alert(`se fudeu mano indefinido essa porra ai, ver console!`);
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

function funcGetWord() {

	const palavra = document.getElementById("palavra").value;
	formataAPalavraBonitao = criaFormatadorDePalavraBonitao(palavra);
	q0(palavra, 0);

}


const palavra
// = "";
// = "a";
// = "c";
// = "caaa";
// = "aaaaaaaaaabbbbbbbbbbbbc";
// = "abc";
// = "abcabcabcabc";
= "abccababababa";
// = "ababababac";


