export function Testimonials() {
  const testimonials = [
    {
      text: "O jeans chegou exatamente como testamos na amostra. Depois de 3 lavagens industriais, manteve a cor e a estrutura firme. Isso facilitou muito nosso controle de qualidade no lote inteiro.",
      author: "João Mendes",
      company: "Confecção Delta Jeans",
    },
    {
      text: "Trabalhamos com grande volume e não podemos correr risco de variação de tecido entre os lotes. Com a JPTecidos, o brim que chega hoje é o mesmo que chegou há 3 meses — isso é raro de achar.",
      author: "Ana Paula Ribeiro",
      company: "ProdTex Confecções",
    },
    {
      text: "Testamos o algodão antes de fechar pedido grande. Resistiu bem ao corte e a peça final ficou com o caimento que a gente precisava, sem desperdício de tecido na produção.",
      author: "Marcos Vinícius",
      company: "Uniformes Vinícius Ltda",
    },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          O que nossos parceiros dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-[10px] p-8 shadow-sm flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#DD8A05]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
