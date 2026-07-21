export function WhyChooseJP() {
  const features = [
    {
      number: '01',
      title: 'Composição Garantida',
      description: 'Cada lote passa por controle de composição antes de sair do estoque. Você sabe exatamente o que está comprando — sem variação de fio ou mistura entre pedidos.'
    },
    {
      number: '02',
      title: 'Cor e Tingimento Uniformes',
      description: 'Conferimos cada lote antes de disponibilizar no estoque, garantindo que o tecido do produto seja o mesmo que chega no seu pedido — sem manchas, sem variação de tom.'
    },
    {
      number: '03',
      title: 'Resistência Comprovada',
      description: 'Fio estruturado para aguentar corte, costura e lavagem industrial pesada sem perder textura, cor ou caimento — do rolo até a peça pronta.'
    },
    {
      number: '04',
      title: 'Gramatura Constante',
      description: 'Peso e densidade padronizados em cada rolo ou fardo, garantindo que a mão do tecido se mantenha igual em toda a produção, sem surpresas na mesa de corte.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">
          O Mesmo padrão, lote após lote
        </h2>
        <p className="text-gray-600 text-base max-w-3xl mb-12 leading-relaxed">
          Do pequeno pedido ao grande volume, cada rolo ou fardo passa pelos mesmos critérios de qualidade — para que sua confecção nunca tenha surpresa entre um pedido e outro.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.number} className="flex flex-col h-full bg-gray-50 rounded-lg p-6 justify-start">
              <span className="text-4xl font-bold text-[#f5a623] mb-6">{feature.number}</span>
              <h3 className="text-1xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm overflow-hidden ">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
