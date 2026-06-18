const fs = require("fs");
const path = require("path");

const pastaAlunos = path.join(__dirname, "../alunos");

const arquivos = fs.readdirSync(pastaAlunos);

const alunos = arquivos
  .filter(arquivo => arquivo.endsWith(".json"))
  .map(arquivo => {
    const conteudo = fs.readFileSync(
      path.join(pastaAlunos, arquivo),
      "utf-8"
    );

    return JSON.parse(conteudo);
  })
  .sort((a, b) => a.nome.localeCompare(b.nome));

let tabela = `
# Turma DevOps

Bem-vindos ao repositório da turma.

## Integrantes

| Nome | GitHub | Cidade | LinkedIn |
|------|--------|---------|----------|
`;

alunos.forEach(aluno => {
  tabela += `| ${aluno.nome} | [@${aluno.github}](https://github.com/${aluno.github}) | ${aluno.cidade} | [Perfil](${aluno.linkedin}) |\n`;
});

tabela += `

## Estatísticas

Total de alunos cadastrados: ${alunos.length}
`;

fs.writeFileSync(
  path.join(__dirname, "../README.md"),
  tabela
);

console.log("README atualizado com sucesso!");