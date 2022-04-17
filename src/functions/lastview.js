const Lists = require('../constants/Lists')

exports.add = (ticker) => {
    try {
        if (!Lists.lastview.find(tick => tick.cd_acao == ticker.DescricaoDoAtivo[0].Codigo)) {
            Lists.lastview.push({
                name: ticker.InfoEmpresaDadosGerais[0].NomeEmpresarial,
                ticker: ticker.DescricaoDoAtivo[0].Codigo,
                variacao: ticker.Oscilacoes[0].Var,
                setor: ticker.ClassificacaoSetorial[0] ? ticker.ClassificacaoSetorial[0].Setor : "Indisponivel"
            })
            if (Lists.lastview.length > 8) {
                Lists.lastview.shift()
            }
        }
    } catch (error) {
        console.log(`Erro ao adicionar ${ticker.DescricaoDoAtivo[0].Codigo} ao lastView`)
    }
}