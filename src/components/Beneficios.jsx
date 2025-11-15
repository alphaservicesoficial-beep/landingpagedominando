import { CheckCircle, Rocket, Zap, Target, Star, Users, TrendingUp } from "lucide-react";

export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-[#010F16] py-24 text-white">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* TÍTULO E DESCRIÇÃO */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Benefícios <span className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">Exclusivos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nossa plataforma oferece muito mais do que apenas acesso a ferramentas.
            Descubra como podemos transformar seu trabalho e produtividade.
          </p>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* CARD 1 */}
          <div className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
            <CheckCircle className="text-[#00C6FF] w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Economize milhares de reais</h3>
            <p className="text-gray-400 text-sm">
            Gere imagens e videos profissionais em um só lugar.
              
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
            <Rocket className="text-[#00C6FF] w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Melhore seu fluxo de trabalho</h3>
            <p className="text-gray-400 text-sm">
            Crie videos ilimitados para seu canal com apenas um clique.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
            <Star className="text-[#00C6FF] w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Crie conteúdo de qualidade</h3>
            <p className="text-gray-400 text-sm">
              Tenha acesso aos melhores modelos de geração de video de forma ilimitada
            </p>
          </div>

          {/* CARD 4 */}
          <div className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
            <Target className="text-[#00C6FF] w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Acesso em todos os lugares</h3>
            <p className="text-gray-400 text-sm">
              Você poderá acessar as nossasw ferramentas através do seu desktop ou notebook.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
            <Users className="text-[#00C6FF] w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Acesso a comunidade anonima</h3>
            <p className="text-gray-400 text-sm">
              Como se trata de um sistema de Multi Login, Todos que usarem terão anonimato em usar nossas ferramentas.
            </p>
          </div>

          {/* CARD 6 */}
          <div className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
            <TrendingUp className="text-[#00C6FF] w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nossa ferramenta</h3>
            <p className="text-gray-400 text-sm">
              Nossa ferramenta funciona através da plataforma Adspower com sistema de multilogin. Todas as ferramentas são faceis e rápidas de acessar e simples de usar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
