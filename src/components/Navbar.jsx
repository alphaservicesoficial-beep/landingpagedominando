import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav
          className="
          absolute z-30 
          flex items-center justify-between 
          w-full px-4 py-2
          top-2
          md:top-10 md:left-1/2 md:-translate-x-1/2
          md:w-[80%] md:max-w-5xl 
          md:px-8 md:py-3
          md:rounded-full md:backdrop-blur-md md:bg-white/5 md:border md:border-white/10 md:shadow-lg
        "
      >
        {/* Ícone menu no mobile */}
        <button className="md:hidden text-white ml-1" onClick={() => setMenuOpen(true)}>
          <Menu size={28} />
        </button>

        {/* Logo — só aparece no desktop */}
        <img
          src="/marca.png"
          alt="Logo da marca"
          className="hidden md:block w-16 h-12"
        />

        {/* Links Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300 text-sm">
  {[
    { label: "Início", target: "inicio" },
    { label: "Benefícios", target: "beneficios" },
    
    { label: "Ferramentas", target: "ferramentas" },
      { label: "Planos", target: "planos" },
      { label: "Dúvidas", target: "perguntas" },
  ].map((item, i) => (
    <li key={i}>
      <button
        onClick={() => {
          const el = document.getElementById(item.target);
          if (el) {
            const yOffset = -80; // ajusta se o header for fixo
            const y =
              el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
        className="hover:text-[#00C6FF] transition cursor-pointer"
      >
        {item.label}
      </button>
    </li>
  ))}
</ul>


        {/* Botão de Entrar */}
        <button
  onClick={() => {
    window.location.href = "https://portal.dominandoanimacao.com";
  }}
  className="
    px-4 py-2 rounded-full 
    bg-gradient-to-r from-[#00C6FF] to-[#0AA3E2] 
    text-white font-medium text-sm 
    hover:opacity-90 transition
    md:mr-0 mr-2
  "
>
  Entrar
</button>

      </nav>

      {/* SIDEBAR MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fundo escuro */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu lateral */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-64 bg-[#07111D]/95 backdrop-blur-lg border-r border-[#00C6FF]/20 text-white z-50 shadow-[5px_0_30px_rgba(0,198,255,0.2)]"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            >
              {/* Cabeçalho com logo e botão de fechar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <img
                  src="/marca.png"
                  alt="Logo"
                  className="w-20 h-auto"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
          
               <ul className="flex flex-col gap-6 px-6 py-8 text-gray-300 text-sm">
  {[
    { label: "Início", target: "inicio" },
    { label: "Benefícios", target: "beneficios" },
    
    { label: "Ferramentas", target: "ferramentas" },
      { label: "Planos", target: "planos" },
      { label: "Dúvidas", target: "perguntas" },
  ].map((item, i) => (
    <li key={i}>
      <button
        onClick={() => {
          const el = document.getElementById(item.target);
          if (el) {
            const yOffset = -80; // ajusta se o header for fixo
            const y =
              el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
        className="hover:text-[#00C6FF] transition cursor-pointer"
      >
        {item.label}
      </button>
    </li>
  ))}
</ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
