import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Beneficios from "./components/Beneficios";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";

import {
  Check,
  List,
  ChevronDown,
  Instagram,
  MessageCircle,
  X,
  Info,
} from "lucide-react";

export default function App() {
  const sectionRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);

  // VALOR FINAL QUE QUEREMOS ANIMAR
  const finalValue = 21325.76;

  // VALOR QUE VAI AUMENTAR SUAVEMENTE
  const [animatedValue, setAnimatedValue] = useState(0);

  // FORMATAÇÃO PARA REAL BRASILEIRO
  const formatted = animatedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect(); // impede reiniciar a animação
        }
      },
      { threshold: 0.3 } // 30% da seção visível
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // ANIMAÇÃO DO NÚMERO COMEÇA QUANDO startAnimation = true
  useEffect(() => {
    if (!startAnimation) return;

    const duration = 2000; // 2s
    const frameRate = 1000 / 60; // 60FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const value = finalValue * progress;
      setAnimatedValue(value);

      if (frame === totalFrames) clearInterval(counter);
    }, frameRate);

    return () => clearInterval(counter);
  }, [startAnimation]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const ferramentasBasico = [
    {
      nome: "Sora (Plus)",
      descricao: "Gera vídeos realistas com IA a partir de texto.",
    },
    {
      nome: "Heygen (Creator)",
      descricao:
        "Cria avatares falantes e vídeos automatizados com dublagem em múltiplos idiomas.",
    },
    {
      nome: "Leonardo (Artisan)",
      descricao: "Gera imagens artísticas detalhadas e estilosas por IA.",
    },
    {
      nome: "Adsparo",
      descricao: "Cria e otimiza anúncios automaticamente para redes sociais.",
    },
    {
      nome: "Gamma App (Pro)",
      descricao:
        "Cria apresentações modernas e interativas de forma automática.",
    },
    {
      nome: "CapCut Pro",
      descricao:
        "Editor de vídeo completo com efeitos premium e recursos avançados.",
    },
    {
      nome: "Canva Pro",
      descricao: "Design gráfico fácil com templates e recursos profissionais.",
    },
    {
      nome: "ChatGPT (Plus)",
      descricao: "Assistente de IA avançado para escrita, ideias e automações.",
    },
    {
      nome: "Freepik",
      descricao: "Banco de imagens, vetores e ícones de alta qualidade.",
    },
    {
      nome: "DreamFace",
      descricao: "Cria rostos e retratos realistas com IA.",
    },
    {
      nome: "You.com",
      descricao: "Buscador inteligente com IA e respostas contextuais.",
    },
    {
      nome: "Grok",
      descricao: "IA de conversação com foco em humor e respostas rápidas.",
    },
    {
      nome: "Place It",
      descricao: "Gera mockups, logos e vídeos promocionais automaticamente.",
    },
    {
      nome: "Ideogram (Plus)",
      descricao: "Gera imagens com tipografia criativa e realista.",
    },
    {
      nome: "Vectorizer",
      descricao: "Transforma imagens raster em vetores automaticamente.",
    },
    {
      nome: "Sem Rush (Pro, Guru e Business)",
      descricao: "Ferramenta de SEO e análise de tráfego profissional.",
    },
    {
      nome: "Ubersuggest",
      descricao: "Pesquisa palavras-chave e monitora concorrentes de SEO.",
    },
    {
      nome: "SEO Site Checkup",
      descricao: "Analisa o desempenho SEO completo de sites.",
    },
    {
      nome: "Keyword Revealer",
      descricao: "Descobre palavras-chave com alto potencial de ranqueamento.",
    },
    {
      nome: "Moz Pro",
      descricao: "Ferramenta de SEO com métricas de autoridade e backlinks.",
    },
    {
      nome: "Spyfu",
      descricao:
        "Monitora e analisa estratégias de palavras-chave de concorrentes.",
    },
    {
      nome: "Serpstat",
      descricao: "Plataforma de SEO para análise e auditoria de sites.",
    },
    {
      nome: "Envato Elements",
      descricao: "Repositório com milhões de recursos criativos premium.",
    },
    {
      nome: "Vistacreate",
      descricao:
        "Alternativa ao Canva com modelos profissionais e IA criativa.",
    },
    {
      nome: "WordHero",
      descricao:
        "Gera textos e ideias de marketing com inteligência artificial.",
    },
    {
      nome: "Frase IO",
      descricao: "Otimiza conteúdo com base em SEO e intenção de busca.",
    },
    {
      nome: "Grammarly",
      descricao:
        "Corrige gramática, estilo e clareza de textos automaticamente.",
    },
    {
      nome: "Quillbot",
      descricao: "Reformula textos e parafraseia com alta precisão.",
    },
    {
      nome: "WordAI",
      descricao: "Reescreve textos mantendo o sentido e naturalidade humana.",
    },
    {
      nome: "Picsart",
      descricao: "Editor de fotos e vídeos com filtros e IA criativa.",
    },
    {
      nome: "Writerzen",
      descricao: "Plataforma de pesquisa de palavras-chave e SEO semântica.",
    },
    {
      nome: "Linguix",
      descricao: "Assistente de escrita com foco em gramática e estilo.",
    },
    {
      nome: "Wordtune",
      descricao: "Melhora a clareza e o tom de textos de forma natural.",
    },
    {
      nome: "Storybase",
      descricao:
        "Descobre tópicos e palavras-chave com base em intenção do usuário.",
    },
    {
      nome: "Smodin",
      descricao:
        "Ferramenta multifuncional de IA para escrever, traduzir e resumir.",
    },
    {
      nome: "Keyword Tool",
      descricao:
        "Encontra palavras-chave em múltiplas plataformas (Google, YouTube, etc).",
    },
    {
      nome: "GrowthBar",
      descricao:
        "Cria conteúdo otimizado para SEO com inteligência artificial.",
    },
    {
      nome: "Seoptimer",
      descricao: "Auditoria SEO e análise de performance técnica do site.",
    },
    {
      nome: "Ahrefs",
      descricao: "Análise profunda de backlinks, SEO e concorrentes.",
    },
    {
      nome: "Voice Clone",
      descricao: "Clona vozes humanas realistas a partir de amostras de áudio.",
    },
    {
      nome: "Digen AI",
      descricao:
        "Gera conteúdo digital completo com automação e inteligência artificial.",
    },
  ];

  const ferramentasPro = [
    {
      nome: "Sora 2 Pro",
      descricao: "Gera vídeos realistas com IA a partir de texto.",
    },
    {
      nome: "Heygen (Team)",
      descricao:
        "Cria avatares falantes e vídeos automatizados com dublagem em múltiplos idiomas.",
    },
    {
      nome: "Leonardo (Maestro)",
      descricao: "Gera imagens artísticas detalhadas e estilosas por IA.",
    },
    {
      nome: "Adsparo",
      descricao: "Cria e otimiza anúncios automaticamente para redes sociais.",
    },
    {
      nome: "Gamma App (Pro)",
      descricao:
        "Cria apresentações modernas e interativas de forma automática.",
    },
    {
      nome: "CapCut Pro",
      descricao:
        "Editor de vídeo completo com efeitos premium e recursos avançados.",
    },
    {
      nome: "Canva Pro",
      descricao: "Design gráfico fácil com templates e recursos profissionais.",
    },
    {
      nome: "ChatGPT (Plus e Pro)",
      descricao: "Assistente de IA avançado para escrita, ideias e automações.",
    },
    {
      nome: "Freepik (Premium +)",
      descricao: "Banco de imagens, vetores e ícones de alta qualidade.",
    },
    {
      nome: "DreamFace",
      descricao: "Cria rostos e retratos realistas com IA.",
    },
    {
      nome: "You.com",
      descricao: "Buscador inteligente com IA e respostas contextuais.",
    },
    {
      nome: "Grok",
      descricao: "IA de conversação com foco em humor e respostas rápidas.",
    },
    {
      nome: "Place It",
      descricao: "Gera mockups, logos e vídeos promocionais automaticamente.",
    },
    {
      nome: "Ideogram (Plus e Pro)",
      descricao: "Gera imagens com tipografia criativa e realista.",
    },
    {
      nome: "Vectorizer",
      descricao: "Transforma imagens raster em vetores automaticamente.",
    },
    {
      nome: "Sem Rush (Pro, Guru e Business)",
      descricao: "Ferramenta de SEO e análise de tráfego profissional.",
    },
    {
      nome: "Ubersuggest",
      descricao: "Pesquisa palavras-chave e monitora concorrentes de SEO.",
    },
    {
      nome: "SEO Site Checkup",
      descricao: "Analisa o desempenho SEO completo de sites.",
    },
    {
      nome: "Keyword Revealer",
      descricao: "Descobre palavras-chave com alto potencial de ranqueamento.",
    },
    {
      nome: "Moz Pro",
      descricao: "Ferramenta de SEO com métricas de autoridade e backlinks.",
    },
    {
      nome: "Spyfu",
      descricao:
        "Monitora e analisa estratégias de palavras-chave de concorrentes.",
    },
    {
      nome: "Serpstat",
      descricao: "Plataforma de SEO para análise e auditoria de sites.",
    },
    {
      nome: "Envato Elements",
      descricao: "Repositório com milhões de recursos criativos premium.",
    },
    {
      nome: "Vistacreate",
      descricao:
        "Alternativa ao Canva com modelos profissionais e IA criativa.",
    },
    {
      nome: "WordHero",
      descricao:
        "Gera textos e ideias de marketing com inteligência artificial.",
    },
    {
      nome: "Frase IO",
      descricao: "Otimiza conteúdo com base em SEO e intenção de busca.",
    },
    {
      nome: "Grammarly",
      descricao:
        "Corrige gramática, estilo e clareza de textos automaticamente.",
    },
    {
      nome: "Quillbot",
      descricao: "Reformula textos e parafraseia com alta precisão.",
    },
    {
      nome: "WordAI",
      descricao: "Reescreve textos mantendo o sentido e naturalidade humana.",
    },
    {
      nome: "Picsart",
      descricao: "Editor de fotos e vídeos com filtros e IA criativa.",
    },
    {
      nome: "Writerzen",
      descricao: "Plataforma de pesquisa de palavras-chave e SEO semântica.",
    },
    {
      nome: "Linguix",
      descricao: "Assistente de escrita com foco em gramática e estilo.",
    },
    {
      nome: "Wordtune",
      descricao: "Melhora a clareza e o tom de textos de forma natural.",
    },
    {
      nome: "Storybase",
      descricao:
        "Descobre tópicos e palavras-chave com base em intenção do usuário.",
    },
    {
      nome: "Smodin",
      descricao:
        "Ferramenta multifuncional de IA para escrever, traduzir e resumir.",
    },
    {
      nome: "LongTailPro",
      descricao: "Gera ideias de palavras-chave long tail para SEO.",
    },
    {
      nome: "Keyword Tool",
      descricao:
        "Encontra palavras-chave em múltiplas plataformas (Google, YouTube, etc).",
    },
    {
      nome: "GrowthBar",
      descricao:
        "Cria conteúdo otimizado para SEO com inteligência artificial.",
    },
    {
      nome: "Seoptimer",
      descricao: "Auditoria SEO e análise de performance técnica do site.",
    },
    {
      nome: "Ahrefs",
      descricao: "Análise profunda de backlinks, SEO e concorrentes.",
    },
    {
      nome: "Voice Clone",
      descricao: "Clona vozes humanas realistas a partir de amostras de áudio.",
    },
    {
      nome: "Digen AI",
      descricao:
        "Gera conteúdo digital completo com automação e inteligência artificial.",
    },
    {
      nome: "A.I Song Generator",
      descricao: "Cria músicas completas e letras com IA generativa.",
    },
    {
      nome: "Adworld Prime",
      descricao: "Treinamentos e estratégias avançadas de marketing digital.",
    },
    {
      nome: "Aiease",
      descricao: "Assistente de escrita e geração de respostas automáticas.",
    },
    {
      nome: "Artsmart",
      descricao: "Gera imagens e arte digital com IA generativa.",
    },
    {
      nome: "BK Reviews",
      descricao: "Analisa produtos e cria avaliações automáticas.",
    },
    {
      nome: "Boolv.Video",
      descricao: "Cria vídeos curtos automaticamente com base em textos.",
    },
    {
      nome: "Captions",
      descricao: "Adiciona legendas automáticas e sincronizadas em vídeos.",
    },
    {
      nome: "Claude (Pro e Max)",
      descricao: "IA avançada da Anthropic com raciocínio contextual.",
    },
    {
      nome: "Clipfly",
      descricao: "Editor de vídeos curtos com automação de IA.",
    },
    {
      nome: "Clicopy",
      descricao: "Gera textos e copywriting de alta conversão.",
    },
    {
      nome: "Code Quick",
      descricao: "Auxilia desenvolvedores com dicas de código em tempo real.",
    },
    {
      nome: "Puxador de Dados (CPF, Telefone, E-mail)",
      descricao: "Ferramenta para busca automatizada de dados públicos.",
    },
    {
      nome: "Copy Generator",
      descricao: "Gera textos publicitários e slogans de forma automática.",
    },
    {
      nome: "Cramly.AI",
      descricao: "IA educacional para estudos, resumos e respostas rápidas.",
    },
    {
      nome: "Cursos Dankicode",
      descricao: "Plataforma de cursos online em marketing e tecnologia.",
    },
    {
      nome: "Designi",
      descricao: "Cria designs rápidos para redes sociais e identidade visual.",
    },
    {
      nome: "Designrr (Ebook)",
      descricao: "Gera eBooks e PDFs prontos a partir de textos e sites.",
    },
    {
      nome: "Dzine.AI",
      descricao: "Gera designs personalizados e arte digital com IA.",
    },
    {
      nome: "Epidemic Sound",
      descricao:
        "Biblioteca de músicas e efeitos sonoros livres de direitos autorais.",
    },
    {
      nome: "Flaticon",
      descricao: "Banco de ícones vetoriais para projetos gráficos e web.",
    },
    {
      nome: "Gemini (Ultra)",
      descricao:
        "IA multimodal da Google com suporte a texto, imagem e raciocínio avançado.",
    },
    {
      nome: "Grok",
      descricao:
        "Assistente conversacional com humor e respostas inteligentes.",
    },
    {
      nome: "Gurukiller",
      descricao:
        "IA de automação e marketing para criação de conteúdo estratégico.",
    },
    {
      nome: "Inner.AI",
      descricao:
        "Assistente de autoaperfeiçoamento e produtividade pessoal com IA.",
    },
    {
      nome: "Kalodata (EUA, Ale, UK, Esp, Fran, Ital, Bra)",
      descricao: "Banco de dados estatísticos e de mercado do Brasil.",
    },
    {
      nome: "Lumalabs",
      descricao:
        "Cria vídeos 3D e animações cinematográficas a partir de fotos.",
    },
    {
      nome: "Midjourney (imagem e video)",
      descricao: "Gera imagens artísticas e realistas por comandos de texto.",
    },
    {
      nome: "Motion Elements",
      descricao:
        "Banco de vídeos, templates e efeitos para editores e criadores.",
    },
    {
      nome: "Studios Monkey",
      descricao:
        "Ferramenta de IA para edição e criação de vídeos automatizada.",
    },
    {
      nome: "Pck Toolzbuy",
      descricao: "Coleção de utilitários e ferramentas premium de automação.",
    },
    {
      nome: "Super Grok (Heavy)",
      descricao:
        "Melhoria do Grok imagine com gerações mais realistas que agora gera video com aúdio igual o Veo3.",
    },
    {
      nome: "Perplexity (Max)",
      descricao:
        "Buscador com IA que oferece respostas contextualizadas e fontes.",
    },
    {
      nome: "Piclumen Pro",
      descricao: "Cria retratos e imagens com realismo fotográfico via IA.",
    },
    {
      nome: "Pixlr.AI",
      descricao: "Editor de imagens online com ferramentas inteligentes de IA.",
    },
    {
      nome: "Produtos Secretos",
      descricao: "Coleção exclusiva de softwares e ferramentas digitais.",
    },
    {
      nome: "Renderfores",
      descricao: "Cria vídeos, logos e apresentações com templates prontos.",
    },
    {
      nome: "Scribd",
      descricao: "Plataforma de leitura e audiobooks sob demanda.",
    },
    {
      nome: "Spy Funnels",
      descricao: "Analisa funis e páginas de vendas dos concorrentes.",
    },
    {
      nome: "Storyblocks",
      descricao: "Biblioteca ilimitada de vídeos, músicas e animações.",
    },
    {
      nome: "Submagic (Podcast)",
      descricao: "Gera legendas e cortes automáticos para podcasts.",
    },
    {
      nome: "Super IPTV (Séries & Filmes)",
      descricao: "Streaming de séries e filmes premium ilimitado.",
    },
    {
      nome: "Turboscribe",
      descricao: "Transcreve e resume áudios e vídeos automaticamente.",
    },
    {
      nome: "Unsplash",
      descricao: "Banco de imagens gratuitas em alta resolução.",
    },
    {
      nome: "Vecteezy",
      descricao: "Repositório de vetores, ícones e templates de design.",
    },
    {
      nome: "Videogen",
      descricao: "Cria vídeos automáticos baseados em texto com IA.",
    },
    {
      nome: "Vidiq",
      descricao: "Ferramenta para SEO e otimização de canais no YouTube.",
    },
    {
      nome: "Vidtao",
      descricao: "Analisa campanhas e anúncios em vídeo de concorrentes.",
    },
    {
      nome: "Vidu.AI",
      descricao: "Gera vídeos personalizados com IA a partir de roteiros.",
    },
    {
      nome: "ZDM Prime (Cursos)",
      descricao: "Acesso a cursos e treinamentos digitais premium.",
    },
    {
      nome: "Podcastle",
      descricao: "Grava, edita e publica podcasts com qualidade profissional.",
    },
    {
      nome: "Adobe Express",
      descricao: "Design rápido e intuitivo para redes sociais e marketing.",
    },
    {
      nome: "Phrasly AI",
      descricao: "Gera textos criativos e traduções automáticas com IA.",
    },
    {
      nome: "123RF",
      descricao: "Banco de imagens, vídeos e áudio royalty-free.",
    },
    {
      nome: "Imgkits",
      descricao:
        "Editor online de imagens com IA e remoção automática de fundo.",
    },
    {
      nome: "Seoptimer",
      descricao: "Auditoria de SEO e relatórios de performance de site.",
    },
    {
      nome: "Icon8",
      descricao: "Coleção de ícones e ilustrações para uso profissional.",
    },
    {
      nome: "Craftly AI",
      descricao: "Escreve textos e campanhas publicitárias com IA.",
    },
    {
      nome: "Oocya",
      descricao:
        "Automação de postagens e geração de conteúdo para redes sociais.",
    },
    {
      nome: "Pixelied",
      descricao: "Editor de design gráfico online com templates prontos.",
    },
    {
      nome: "Shutterstoc",
      descricao: "Banco de imagens, vídeos e músicas profissionais.",
    },
    {
      nome: "Smodin",
      descricao: "Escrita, tradução e reescrita de textos com IA.",
    },
    {
      nome: "GPL Theme",
      descricao: "Acesso a temas e plugins WordPress premium.",
    },
    {
      nome: "Jasper",
      descricao: "Assistente de escrita criativa e marketing com IA.",
    },
    {
      nome: "Nichess",
      descricao: "Descobre nichos lucrativos e ideias de produtos digitais.",
    },
    {
      nome: "Justdone",
      descricao: "Gera ideias, títulos e textos com IA criativa.",
    },
    {
      nome: "Wordtune",
      descricao: "Reescreve frases e melhora fluidez de textos.",
    },
    {
      nome: "Netflix",
      descricao: "Streaming de filmes, séries e documentários originais.",
    },
    {
      nome: "Prime Video",
      descricao: "Serviço de streaming da Amazon com produções exclusivas.",
    },
    {
      nome: "Closer Copy",
      descricao: "Gera textos de vendas com técnicas de copywriting avançado.",
    },
    {
      nome: "Lovepik",
      descricao: "Banco de vetores, ícones e recursos visuais.",
    },
    {
      nome: "Unbounce",
      descricao: "Cria landing pages otimizadas para conversão.",
    },
    { nome: "Rytr", descricao: "Gera textos e e-mails automáticos com IA." },
    {
      nome: "Slidebean",
      descricao: "Cria apresentações de slides com design automatizado.",
    },
    {
      nome: "Snapied",
      descricao: "Ferramenta de captura e anotação de telas.",
    },
    { nome: "Crello", descricao: "Design online com modelos personalizáveis." },
    {
      nome: "Skillshare",
      descricao: "Plataforma de cursos criativos e técnicos online.",
    },
    {
      nome: "Lynda Com",
      descricao: "Cursos profissionais de tecnologia, negócios e design.",
    },
    { nome: "Everand", descricao: "Acesso a livros e audiobooks sob demanda." },
    {
      nome: "Slideshare",
      descricao: "Plataforma para compartilhar apresentações e documentos.",
    },
    {
      nome: "Linguix",
      descricao: "Correção gramatical e reescrita com IA contextual.",
    },
    {
      nome: "Word AI",
      descricao: "Reescrita automática de textos com naturalidade humana.",
    },
    {
      nome: "Spin Rewriter",
      descricao: "Cria múltiplas versões de textos para SEO.",
    },
    {
      nome: "Pro Writing AI",
      descricao: "Editor e revisor de textos com IA integrada.",
    },
    {
      nome: "Creaitor AI",
      descricao: "Gera textos criativos para redes sociais e blogs.",
    },
    { nome: "Smart Copy", descricao: "Cria mensagens publicitárias com IA." },
    {
      nome: "Story Base",
      descricao: "Ajuda a criar narrativas e roteiros para conteúdo digital.",
    },
    {
      nome: "Spamzilla",
      descricao: "Pesquisa domínios expirados e backlinks para SEO.",
    },
    {
      nome: "Seobility",
      descricao: "Análise e monitoramento de SEO para sites.",
    },
    {
      nome: "SEO Site Checkup",
      descricao: "Auditoria técnica de SEO e relatórios detalhados.",
    },
    {
      nome: "Viral Launch",
      descricao: "Pesquisa de produtos e tendências para Amazon Sellers.",
    },
    {
      nome: "Sell The Trend",
      descricao: "Descobre produtos em alta para dropshipping.",
    },
    {
      nome: "Backlink Repository",
      descricao: "Banco de backlinks e métricas de autoridade.",
    },
    { nome: "Tuberanker", descricao: "Análise e SEO para vídeos do YouTube." },
    {
      nome: "Indexification",
      descricao: "Serviço de indexação rápida de links e backlinks.",
    },
    {
      nome: "SEO Tester Online",
      descricao: "Analisa SEO on-page e off-page com IA.",
    },
    {
      nome: "SE Ranking",
      descricao: "Monitoramento de posições e relatórios SEO.",
    },
    {
      nome: "Search Atlas",
      descricao: "Plataforma avançada de pesquisa e análise SEO.",
    },
    {
      nome: "Majestic",
      descricao: "Avalia backlinks e autoridade de domínios.",
    },
    {
      nome: "Spyfu",
      descricao: "Análise de palavras-chave e estratégias de concorrentes.",
    },
    {
      nome: "Mangools",
      descricao: "Pacote completo de ferramentas de SEO simples e rápidas.",
    },
    {
      nome: "Similar Web",
      descricao: "Analisa tráfego e estatísticas de sites.",
    },
    {
      nome: "Writer Zen",
      descricao: "Planeja conteúdo e pesquisa de palavras-chave semânticas.",
    },
    {
      nome: "Keyword",
      descricao: "Descobre e organiza palavras-chave para SEO.",
    },
    {
      nome: "Serpstat",
      descricao: "Suite completa de SEO e marketing de conteúdo.",
    },
    {
      nome: "Semscoop",
      descricao: "Descobre palavras-chave e analisa concorrência SEO.",
    },
    {
      nome: "Moz Pro",
      descricao: "Análise e otimização de autoridade de sites.",
    },
    {
      nome: "Answer The Public",
      descricao: "Mostra perguntas populares de usuários em motores de busca.",
    },
    {
      nome: "Ubersuggest",
      descricao: "Sugestões e métricas de SEO e palavras-chave.",
    },
    {
      nome: "Sem Rush",
      descricao: "Análise completa de SEO, anúncios e marketing digital.",
    },
    { nome: "AI Detector", descricao: "Detecta textos gerados por IA." },
    {
      nome: "AI Humanizer",
      descricao: "Transforma textos de IA em linguagem natural.",
    },
    {
      nome: "SEO Tools",
      descricao: "Coleção de ferramentas e verificadores SEO.",
    },
    {
      nome: "Vmake",
      descricao: "Gera vídeos automáticos de produtos e anúncios.",
    },
    {
      nome: "ILove PDF",
      descricao: "Edita, converte e organiza arquivos PDF online.",
    },
    {
      nome: "PNGTree",
      descricao: "Banco de PNGs e vetores para design gráfico.",
    },
    { nome: "AI Wizard", descricao: "Gera conteúdo e automações com IA." },
    {
      nome: "Videoscribe",
      descricao: "Cria vídeos animados de estilo whiteboard.",
    },
    { nome: "Domo AI", descricao: "Gera vídeos curtos e animações com IA." },
    {
      nome: "Cockatoo",
      descricao: "Assistente de escrita criativa e storytelling.",
    },
    {
      nome: "Prezi AI",
      descricao: "Apresentações interativas criadas com IA.",
    },
    {
      nome: "Hailuo (Ultra e Max)",
      descricao: "IA multimodal para texto, imagem e som.",
    },
    {
      nome: "Nexusclips",
      descricao: "Gera cortes e highlights automáticos de vídeos longos.",
    },
    { nome: "Dream AI", descricao: "Criação de imagens artísticas com IA." },
    {
      nome: "Forum Blackhat 2.0",
      descricao: "Comunidade de growth e técnicas avançadas de SEO.",
    },
    {
      nome: "Wan A.I (Ilimitado)",
      descricao: "Assistente IA ilimitado para tarefas automáticas.",
    },
    {
      nome: "Play HT (Clone Voz)",
      descricao: "Gera vozes realistas e dublagens com clonagem vocal.",
    },
    {
      nome: "Baixar Design",
      descricao:
        "Plataforma para baixar modelos, templates e recursos gráficos prontos para uso.",
    },
      {
      nome: "Venice AI",
      descricao:
        "Nova i.a de chat parecida com o chatgpt, so que contendo muito mais recursos como criação de imagem sem censura, remover background, upscale e enhance, analisar arquivos e muito mais.",
    },
    {
      nome: "Runway (ilimitado)",
      descricao:
        "Ferramenta de edição e geração de vídeos ilimitados com inteligência artificial profissional.",
      color: "text-pink-400",
    },
    {
      nome: "ElevenLabs",
      descricao:
        "A melhor I.A de clonagem de voz do mercado, possuindo o modelo mais avançado de text to speech(Eleven V3 Alpha).",
        color: "text-pink-400",
    },
    {
      nome: "A.I Make Song",
      descricao:
        "Varios estilos de geração como Lyrics to Song, Text to Song, Song Cover, Vocal Remover e Entre Outros",
          color: "text-pink-400",
    },
    {
      nome: "Perso AI (dublagem)",
      descricao:
        "Gera dublagens realistas em múltiplos idiomas com vozes naturais baseadas em IA.",
      color: "text-pink-400",
    },
    {
      nome: "Audioblock",
      descricao:
        "Biblioteca com milhares de trilhas e efeitos sonoros de alta qualidade para produções profissionais.",
      color: "text-pink-400",
    },
    {
      nome: "Videoblock",
      descricao:
        "Coleção completa de vídeos e clipes para uso comercial e criativo em projetos multimídia.",
      color: "text-pink-400",
    },
    {
      nome: "Cognitiveseo",
      descricao:
        "Analisador de SEO avançado que identifica oportunidades e monitora backlinks e rankings.",
      color: "text-pink-400",
    },
    {
      nome: "Woorank",
      descricao:
        "Ferramenta de auditoria SEO que avalia e otimiza o desempenho de sites e palavras-chave.",
      color: "text-pink-400",
    },
    {
      nome: "Registercompass",
      descricao:
        "Pesquisa e analisa domínios expirados valiosos para compra e revenda estratégica.",
      color: "text-pink-400",
    },
    {
      nome: "Keywordreleaver",
      descricao:
        "Gera ideias e variações de palavras-chave para campanhas e otimização de SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Cbegine",
      descricao:
        "Plataforma educacional que oferece cursos e recursos interativos para aprendizado online.",
      color: "text-pink-400",
    },
    {
      nome: "Serpstat",
      descricao:
        "Solução completa de SEO para análise de concorrência, palavras-chave e auditoria técnica.",
      color: "text-pink-400",
    },
    {
      nome: "Pickmonkey",
      descricao:
        "Ferramenta de design gráfico intuitiva para criar imagens, logotipos e posts profissionais.",
      color: "text-pink-400",
    },
    {
      nome: "Lucidchart",
      descricao:
        "Cria diagramas, fluxogramas e mapas mentais colaborativos de forma simples e visual.",
      color: "text-pink-400",
    },
    {
      nome: "Piktochart",
      descricao:
        "Plataforma para criar infográficos e apresentações com templates e gráficos personalizáveis.",
      color: "text-pink-400",
    },
    {
      nome: "Instantlink Indxer",
      descricao:
        "Indexa links rapidamente no Google para acelerar a visibilidade de páginas e backlinks.",
      color: "text-pink-400",
    },
    {
      nome: "Virallunch",
      descricao:
        "Analisa produtos e tendências para impulsionar vendas e lançamentos na Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Salehoo",
      descricao:
        "Base de dados com fornecedores e produtos verificados para e-commerces e dropshipping.",
      color: "text-pink-400",
    },
    {
      nome: "Zikanalytics",
      descricao:
        "Ferramenta de pesquisa de produtos e análise de mercado para vendedores do eBay.",
      color: "text-pink-400",
    },
    {
      nome: "Merchantword",
      descricao:
        "Fornece insights de palavras-chave e tendências de busca dentro da Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Ecomhunt",
      descricao:
        "Descobre produtos vencedores e tendências de alto potencial para lojas online.",
      color: "text-pink-400",
    },
    {
      nome: "Unbounce",
      descricao:
        "Cria landing pages otimizadas para conversão com inteligência e testes A/B.",
      color: "text-pink-400",
    },
    {
      nome: "Stencil",
      descricao:
        "Cria rapidamente imagens de marketing e redes sociais com modelos e ícones prontos.",
      color: "text-pink-400",
    },
    {
      nome: "Crunchyroll",
      descricao:
        "Serviço de streaming especializado em animes e produções japonesas licenciadas.",
      color: "text-pink-400",
    },
    {
      nome: "Lynda",
      descricao:
        "Plataforma de cursos online focada em design, programação e negócios.",
      color: "text-pink-400",
    },
    {
      nome: "Skillshare",
      descricao:
        "Comunidade de aprendizado criativo com aulas práticas sobre design, vídeo e marketing.",
      color: "text-pink-400",
    },
    {
      nome: "Buzzstream",
      descricao:
        "Gerencia campanhas de link building e relações públicas digitais com automação.",
      color: "text-pink-400",
    },
    {
      nome: "Deepbrid",
      descricao:
        "Downloader premium que integra vários serviços de hospedagem com velocidade ilimitada.",
      color: "text-pink-400",
    },
    {
      nome: "Ravenseo",
      descricao:
        "Ferramenta completa de SEO para auditorias, relatórios e análise de desempenho.",
      color: "text-pink-400",
    },
    {
      nome: "Pexda",
      descricao:
        "Descobre produtos lucrativos para dropshipping com dados de engajamento e tendências.",
      color: "text-pink-400",
    },
    {
      nome: "Keywordkeg",
      descricao:
        "Gera palavras-chave relevantes e insights de volume de busca em várias plataformas.",
      color: "text-pink-400",
    },
    {
      nome: "Ninjaoutreach",
      descricao:
        "Automatiza campanhas de outreach e colaborações com influenciadores.",
      color: "text-pink-400",
    },
    {
      nome: "Merch Informer",
      descricao:
        "Ajuda criadores a otimizar produtos e vendas no Merch by Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Copyscape",
      descricao:
        "Verifica plágio e duplicação de conteúdo online com precisão.",
      color: "text-pink-400",
    },
    {
      nome: "Amztracker",
      descricao:
        "Monitora rankings e otimiza listagens de produtos dentro da Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Amz.one",
      descricao:
        "Análise avançada de produtos e SEO para vendedores profissionais na Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Serpstash",
      descricao:
        "Organiza e salva pesquisas e dados de SEO para fácil consulta e comparação.",
      color: "text-pink-400",
    },
    {
      nome: "Teamtreehouse",
      descricao:
        "Plataforma de aprendizado focada em tecnologia, programação e design web.",
      color: "text-pink-400",
    },
    {
      nome: "Crazy Egg",
      descricao:
        "Analisa comportamento de usuários em sites com mapas de calor e testes A/B.",
      color: "text-pink-400",
    },
    {
      nome: "Wordtracker",
      descricao:
        "Ferramenta de pesquisa de palavras-chave para SEO e campanhas de marketing.",
      color: "text-pink-400",
    },
    {
      nome: "Ispionage",
      descricao:
        "Monitora estratégias de anúncios e palavras-chave de concorrentes.",
      color: "text-pink-400",
    },
    {
      nome: "Animoto",
      descricao:
        "Cria vídeos profissionais a partir de fotos e clipes com IA e templates automáticos.",
      color: "text-pink-400",
    },
    {
      nome: "Udemy",
      descricao:
        "Plataforma global de cursos online com milhares de temas e instrutores.",
      color: "text-pink-400",
    },
    {
      nome: "Theoptimizer",
      descricao:
        "Automatiza e otimiza campanhas publicitárias em múltiplas plataformas.",
      color: "text-pink-400",
    },
    {
      nome: "Buzzsumo",
      descricao:
        "Analisa conteúdos virais e identifica tendências e influenciadores.",
      color: "text-pink-400",
    },
    {
      nome: "Pngtree",
      descricao:
        "Banco de imagens e vetores com milhões de recursos para design gráfico.",
      color: "text-pink-400",
    },
    {
      nome: "Spinrewriter",
      descricao:
        "Reescreve textos automaticamente mantendo o sentido original com IA avançada.",
      color: "text-pink-400",
    },
    {
      nome: "Sellthetrend",
      descricao:
        "Encontra produtos em alta e analisa tendências para dropshipping e e-commerce.",
      color: "text-pink-400",
    },
    {
      nome: "Webceo",
      descricao:
        "Plataforma completa de SEO com auditoria, monitoramento e relatórios detalhados.",
      color: "text-pink-400",
    },
    {
      nome: "Jungle Scout",
      descricao:
        "Ferramenta líder de pesquisa de produtos e vendas dentro da Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Seoptimer",
      descricao:
        "Analisa e gera relatórios de SEO com sugestões de otimização técnica e de conteúdo.",
      color: "text-pink-400",
    },
    {
      nome: "Tutsplus",
      descricao:
        "Plataforma de aprendizado com tutoriais e cursos práticos em design e desenvolvimento.",
      color: "text-pink-400",
    },
    {
      nome: "Jasper",
      descricao:
        "Assistente de escrita com IA que gera textos criativos e profissionais rapidamente.",
      color: "text-pink-400",
    },
    {
      nome: "Pictory",
      descricao:
        "Transforma textos e roteiros em vídeos prontos com narração e legendas automáticas.",
      color: "text-pink-400",
    },
    {
      nome: "Pizap",
      descricao:
        "Editor online simples para criar colagens, memes e imagens personalizadas.",
      color: "text-pink-400",
    },
    {
      nome: "Frase.io",
      descricao:
        "Gera e otimiza conteúdo baseado em SEO com sugestões inteligentes.",
      color: "text-pink-400",
    },
    {
      nome: "Writersonic",
      descricao:
        "Cria textos publicitários e posts otimizados com inteligência artificial.",
      color: "text-pink-400",
    },
    {
      nome: "One Hour Indexing",
      descricao:
        "Indexa backlinks e URLs rapidamente para melhorar SEO e rastreamento.",
      color: "text-pink-400",
    },
    {
      nome: "Longshort AI",
      descricao:
        "Gera artigos longos e curtos automaticamente com qualidade editorial.",
      color: "text-pink-400",
    },
    {
      nome: "Lumen5",
      descricao:
        "Transforma postagens e roteiros em vídeos de forma automática e profissional.",
      color: "text-pink-400",
    },
    {
      nome: "Closercopy",
      descricao:
        "Escreve textos persuasivos e criativos para marketing e vendas com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Wordtune",
      descricao:
        "Reformula frases e melhora a clareza e fluidez de textos com inteligência artificial.",
      color: "text-pink-400",
    },
    {
      nome: "Lsigraph",
      descricao:
        "Gera palavras-chave semânticas relacionadas para otimização de conteúdo SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Writerzen",
      descricao:
        "Ajuda a planejar, pesquisar e redigir conteúdo otimizado para SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Topicmojo",
      descricao:
        "Descobre tópicos e perguntas populares para criar conteúdo relevante.",
      color: "text-pink-400",
    },
    {
      nome: "Typli AI",
      descricao:
        "Gera textos criativos, artigos e posts automaticamente com suporte multilíngue.",
      color: "text-pink-400",
    },
    {
      nome: "Keepa",
      descricao:
        "Monitora preços e histórico de produtos na Amazon em tempo real.",
      color: "text-pink-400",
    },
    {
      nome: "Domcop",
      descricao:
        "Analisa e encontra domínios expirados com alto valor e autoridade.",
      color: "text-pink-400",
    },
    {
      nome: "Copymatic",
      descricao:
        "Cria textos de marketing e anúncios automaticamente com IA criativa.",
      color: "text-pink-400",
    },
    {
      nome: "Copygenius",
      descricao:
        "Gera cópias publicitárias e descrições de produtos em poucos segundos.",
      color: "text-pink-400",
    },
    {
      nome: "Lovo AI",
      descricao:
        "Converte texto em fala realista com vozes humanas geradas por IA.",
      color: "text-pink-400",
    },
    {
      nome: "Prowritingaid",
      descricao:
        "Verifica gramática e estilo de escrita, ajudando a aprimorar textos profissionais.",
      color: "text-pink-400",
    },
    {
      nome: "Rankdseo",
      descricao:
        "Ferramenta de SEO para análise e otimização de desempenho de sites.",
      color: "text-pink-400",
    },
    {
      nome: "Advertsuite",
      descricao:
        "Descobre e analisa anúncios de sucesso em redes sociais e plataformas digitais.",
      color: "text-pink-400",
    },
    {
      nome: "Animatron",
      descricao:
        "Cria animações e vídeos explicativos com ferramentas intuitivas e templates.",
      color: "text-pink-400",
    },
    {
      nome: "Texta AI",
      descricao:
        "Gera conteúdo automatizado e textos otimizados com base em IA.",
      color: "text-pink-400",
    },
    {
      nome: "Niche Crapper",
      descricao:
        "Encontra nichos lucrativos e tendências emergentes para e-commerce.",
      color: "text-pink-400",
    },
    {
      nome: "Doodly",
      descricao:
        "Cria vídeos de quadro branco com animações desenhadas automaticamente.",
      color: "text-pink-400",
    },
    {
      nome: "Blasteronline",
      descricao:
        "Suite de marketing em vídeo com automação e otimização para YouTube.",
      color: "text-pink-400",
    },
    {
      nome: "AIContentLabs",
      descricao:
        "Gera conteúdo de alta conversão com inteligência artificial avançada.",
      color: "text-pink-400",
    },
    {
      nome: "Steven AI",
      descricao:
        "Cria vídeos com avatares e narrações realistas baseados em texto.",
      color: "text-pink-400",
    },
    {
      nome: "Linksindexer",
      descricao:
        "Indexa rapidamente backlinks e URLs para acelerar resultados de SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Semscoop",
      descricao:
        "Analisa palavras-chave e métricas de SEO com relatórios detalhados.",
      color: "text-pink-400",
    },
    {
      nome: "Linguix",
      descricao:
        "Corrige gramática e melhora estilo de escrita com sugestões inteligentes.",
      color: "text-pink-400",
    },
    {
      nome: "Vimeo",
      descricao:
        "Plataforma profissional de hospedagem e edição de vídeos de alta qualidade.",
      color: "text-pink-400",
    },
    {
      nome: "Seoscout",
      descricao:
        "Audita e monitora SEO técnico com relatórios precisos e insights acionáveis.",
      color: "text-pink-400",
    },
    {
      nome: "Seobiliti",
      descricao:
        "Ferramenta de monitoramento e auditoria SEO para grandes sites e agências.",
      color: "text-pink-400",
    },
    {
      nome: "Lex Page",
      descricao:
        "Cria e otimiza páginas de vendas e landing pages de forma automatizada.",
      color: "text-pink-400",
    },
    {
      nome: "Slidebean",
      descricao:
        "Gera apresentações profissionais automaticamente a partir de conteúdo textual.",
      color: "text-pink-400",
    },
    {
      nome: "Snapied",
      descricao:
        "Cria e edita capturas de tela com anotações e destaques visuais rápidos.",
      color: "text-pink-400",
    },
    {
      nome: "Smodin",
      descricao:
        "Ferramenta multifuncional de IA para escrever, traduzir e resumir textos.",
      color: "text-pink-400",
    },
    {
      nome: "Marmalead",
      descricao:
        "Ajuda vendedores da Etsy a encontrar palavras-chave e otimizar listagens.",
      color: "text-pink-400",
    },
    {
      nome: "Dreamart",
      descricao:
        "Gera imagens artísticas e ilustrações exclusivas com IA generativa.",
      color: "text-pink-400",
    },
    {
      nome: "Wave Video",
      descricao:
        "Plataforma para criar e editar vídeos com templates e recursos automáticos.",
      color: "text-pink-400",
    },
    {
      nome: "Hyperwrite",
      descricao:
        "Assistente de escrita com IA que ajuda a criar textos criativos e coesos.",
      color: "text-pink-400",
    },
    {
      nome: "Bramework",
      descricao: "Gera textos otimizados para SEO e marketing digital com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Jenni AI",
      descricao:
        "Assistente de redação acadêmica e criativa com sugestões automáticas.",
      color: "text-pink-400",
    },
    {
      nome: "Helloscribe",
      descricao:
        "Ferramenta de brainstorming e escrita criativa alimentada por IA.",
      color: "text-pink-400",
    },
    {
      nome: "Motion Array",
      descricao:
        "Biblioteca de recursos para vídeo com templates, sons e animações.",
      color: "text-pink-400",
    },
    {
      nome: "Inkforall",
      descricao:
        "Editor de conteúdo com otimização SEO e sugestões inteligentes.",
      color: "text-pink-400",
    },
    {
      nome: "Pipio IO",
      descricao:
        "Cria vídeos com apresentadores virtuais a partir de texto ou roteiro.",
      color: "text-pink-400",
    },
    {
      nome: "Peppercontent",
      descricao:
        "Plataforma de criação de conteúdo com escritores e ferramentas de IA.",
      color: "text-pink-400",
    },
    {
      nome: "Katteb AI",
      descricao:
        "Gera artigos factuais e otimizados com base em fontes verificadas.",
      color: "text-pink-400",
    },
    {
      nome: "GrowthbarSEO",
      descricao: "Ferramenta de escrita SEO com sugestões em tempo real.",
      color: "text-pink-400",
    },
    {
      nome: "Neuronwriter",
      descricao:
        "Ajuda a planejar e otimizar conteúdo para alcançar melhores posições no Google.",
      color: "text-pink-400",
    },
    {
      nome: "Writecream",
      descricao:
        "Cria textos publicitários, e-mails e posts com IA personalizada.",
      color: "text-pink-400",
    },
    {
      nome: "Relaythat",
      descricao:
        "Cria automaticamente variações de designs para campanhas e redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Pikbest",
      descricao:
        "Biblioteca de templates gráficos, vídeos e modelos de design prontos.",
      color: "text-pink-400",
    },
    {
      nome: "Coursera",
      descricao:
        "Plataforma global de cursos online com certificações e parcerias acadêmicas.",
      color: "text-pink-400",
    },
    {
      nome: "Powtoon",
      descricao:
        "Cria apresentações e vídeos animados com templates e narrações fáceis de usar.",
      color: "text-pink-400",
    },
    {
      nome: "MurfaI",
      descricao:
        "Gera conteúdos criativos e textos publicitários com IA avançada.",
      color: "text-pink-400",
    },
    {
      nome: "Plugin Wordpress",
      descricao:
        "Extensões que ampliam funcionalidades e automações em sites WordPress.",
      color: "text-pink-400",
    },
    {
      nome: "Hix AI",
      descricao:
        "Assistente multifuncional com IA para escrever, pesquisar e gerar conteúdo.",
      color: "text-pink-400",
    },
    {
      nome: "Originality AI",
      descricao:
        "Detecta plágio e identifica conteúdo gerado por IA com alta precisão.",
      color: "text-pink-400",
    },
    {
      nome: "Writehuman AI",
      descricao:
        "Reformula textos gerados por IA para torná-los mais naturais e humanos.",
      color: "text-pink-400",
    },
    {
      nome: "Humanpal IO",
      descricao:
        "Cria vídeos com apresentadores humanos animados e falas realistas.",
      color: "text-pink-400",
    },
    {
      nome: "Textmetrics",
      descricao: "Analisa e melhora textos com base em legibilidade e SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Chegg",
      descricao:
        "Plataforma educacional com soluções de estudo, livros e tutoriais guiados.",
      color: "text-pink-400",
    },
    {
      nome: "Surgegraph",
      descricao:
        "Cria conteúdo otimizado com foco em ranqueamento e desempenho orgânico.",
      color: "text-pink-400",
    },
    {
      nome: "Scalenut AI",
      descricao:
        "Planeja e redige artigos SEO com base em dados e concorrência.",
      color: "text-pink-400",
    },
    {
      nome: "Prettymerch",
      descricao:
        "Gerencia e analisa vendas no Merch by Amazon com métricas detalhadas.",
      color: "text-pink-400",
    },
    {
      nome: "Bookbolt",
      descricao:
        "Cria e publica livros e cadernos personalizados para venda na Amazon KDP.",
      color: "text-pink-400",
    },
    {
      nome: "Gptzero",
      descricao:
        "Detecta automaticamente se um texto foi escrito por IA ou humano.",
      color: "text-pink-400",
    },
    {
      nome: "Zonguru",
      descricao: "Ferramenta de análise e automação para vendedores da Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Glorify",
      descricao:
        "Cria designs de produtos e anúncios com templates profissionais.",
      color: "text-pink-400",
    },
    {
      nome: "Relume",
      descricao:
        "Constrói sites modernos e responsivos com componentes prontos e IA.",
      color: "text-pink-400",
    },
    {
      nome: "Flexclip",
      descricao:
        "Editor de vídeo online intuitivo com recursos automáticos e ilimitados.",
      color: "text-pink-400",
    },
    {
      nome: "Toons AI",
      descricao:
        "Gera personagens e animações de desenhos animados com IA criativa.",
      color: "text-pink-400",
    },
    {
      nome: "Switchy",
      descricao:
        "Cria links curtos, rastreáveis e personalizados para campanhas digitais.",
      color: "text-pink-400",
    },
    {
      nome: "Blinkist",
      descricao:
        "Resume livros e conteúdos longos em insights rápidos e objetivos.",
      color: "text-pink-400",
    },
    {
      nome: "Supermachine Art",
      descricao:
        "Gera imagens e artes digitais com inteligência artificial criativa.",
      color: "text-pink-400",
    },
    {
      nome: "Screpy",
      descricao:
        "Analisa e monitora SEO e desempenho de sites com alertas automáticos.",
      color: "text-pink-400",
    },
    {
      nome: "Simplified",
      descricao:
        "Ferramenta tudo-em-um para design, vídeo e escrita com IA colaborativa.",
      color: "text-pink-400",
    },
    {
      nome: "Labrika",
      descricao:
        "Audita SEO e fornece relatórios detalhados com sugestões de otimização.",
      color: "text-pink-400",
    },
    {
      nome: "Vizard",
      descricao:
        "Transforma vídeos longos em clipes curtos prontos para redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Monica IM",
      descricao:
        "Assistente pessoal baseado em IA que ajuda na escrita e organização.",
      color: "text-pink-400",
    },
    {
      nome: "Deepl",
      descricao:
        "Traduz textos com alta precisão e fluência natural em vários idiomas.",
      color: "text-pink-400",
    },
    {
      nome: "Fotor",
      descricao:
        "Editor de fotos e criador de designs com filtros e IA de aprimoramento.",
      color: "text-pink-400",
    },
    {
      nome: "Writefull",
      descricao:
        "Auxilia na redação acadêmica com correções baseadas em linguagem científica.",
      color: "text-pink-400",
    },
    {
      nome: "Reword",
      descricao:
        "Reescreve e aprimora textos para torná-los mais claros e envolventes.",
      color: "text-pink-400",
    },
    {
      nome: "Pluralsight",
      descricao:
        "Plataforma de aprendizado técnico para desenvolvedores e profissionais de TI.",
      color: "text-pink-400",
    },
    {
      nome: "Snackeet",
      descricao:
        "Cria vídeos interativos e stories para engajamento em sites e redes.",
      color: "text-pink-400",
    },
    {
      nome: "Resemble",
      descricao:
        "Gera vozes sintéticas personalizadas e realistas com IA avançada.",
      color: "text-pink-400",
    },
    {
      nome: "Pingenerator",
      descricao:
        "Cria endereços IP e pings automáticos para testes de rede e conexão.",
      color: "text-pink-400",
    },
    {
      nome: "Lexica Art",
      descricao:
        "Busca e gera imagens com IA baseada em modelos visuais populares.",
      color: "text-pink-400",
    },
    {
      nome: "Turnitin",
      descricao:
        "Detecta plágio e verifica originalidade de trabalhos acadêmicos.",
      color: "text-pink-400",
    },
    {
      nome: "Leadpal",
      descricao: "Gera leads automaticamente com links de opt-in inteligentes.",
      color: "text-pink-400",
    },
    {
      nome: "Katalist",
      descricao:
        "Gerencia campanhas e fluxos de conteúdo com base em IA e automação.",
      color: "text-pink-400",
    },
    {
      nome: "Codeacademy",
      descricao:
        "Plataforma interativa para aprender programação e desenvolvimento web.",
      color: "text-pink-400",
    },
    {
      nome: "Prezi",
      descricao:
        "Cria apresentações dinâmicas com efeitos de movimento e zoom.",
      color: "text-pink-400",
    },
    {
      nome: "Copyspace AI",
      descricao:
        "Verifica e reformula textos automaticamente com IA para originalidade.",
      color: "text-pink-400",
    },
    {
      nome: "EditGPT",
      descricao:
        "Edita e aprimora textos gerados por IA com foco em clareza e estilo.",
      color: "text-pink-400",
    },
    {
      nome: "Abacus",
      descricao:
        "Ferramenta financeira para controle e análise de despesas e orçamentos.",
      color: "text-pink-400",
    },
    {
      nome: "Shortform",
      descricao:
        "Resume livros e artigos com insights explicativos e detalhados.",
      color: "text-pink-400",
    },
    {
      nome: "PopAI",
      descricao: "Gera conteúdo criativo e visual com IA para redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Uizard",
      descricao: "Transforma esboços em interfaces reais com IA de design.",
      color: "text-pink-400",
    },
    {
      nome: "Algopix",
      descricao:
        "Analisa produtos e mercado para vendedores online e e-commerce.",
      color: "text-pink-400",
    },
    {
      nome: "Coda AI",
      descricao:
        "Automatiza fluxos de trabalho e documentos com inteligência artificial.",
      color: "text-pink-400",
    },
    {
      nome: "Miro",
      descricao:
        "Plataforma colaborativa para brainstorms, fluxos e diagramas interativos.",
      color: "text-pink-400",
    },
    {
      nome: "Character AI",
      descricao: "Permite conversar com personagens virtuais criados por IA.",
      color: "text-pink-400",
    },
    {
      nome: "BypassGPT",
      descricao:
        "Reformula textos gerados por IA para evitar detecção automática.",
      color: "text-pink-400",
    },
    {
      nome: "Fomoclips",
      descricao:
        "Cria vídeos curtos e chamativos para campanhas e redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Beautiful",
      descricao:
        "Gera apresentações e relatórios automaticamente a partir de dados.",
      color: "text-pink-400",
    },
    {
      nome: "Rivalflow",
      descricao:
        "Analisa conteúdo de concorrentes e sugere melhorias para SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Crunchbase",
      descricao:
        "Banco de dados com informações sobre empresas, startups e investimentos.",
      color: "text-pink-400",
    },
    {
      nome: "Machined AI",
      descricao:
        "Gera textos e ideias criativas com inteligência artificial adaptativa.",
      color: "text-pink-400",
    },
    {
      nome: "Sellerassistant",
      descricao:
        "Ajuda vendedores da Amazon a otimizar listagens e análises de produto.",
      color: "text-pink-400",
    },
    {
      nome: "Clickdesigns",
      descricao: "Cria designs profissionais e mockups 3D com poucos cliques.",
      color: "text-pink-400",
    },
    {
      nome: "Minvo Pro",
      descricao:
        "Gera vídeos automáticos curtos otimizados para redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Copilot",
      descricao:
        "Assistente inteligente integrado a ferramentas de desenvolvimento e produtividade.",
      color: "text-pink-400",
    },
    {
      nome: "Pixteller",
      descricao:
        "Cria imagens animadas e vídeos gráficos com facilidade online.",
      color: "text-pink-400",
    },
    {
      nome: "Harpa AI",
      descricao:
        "Assistente de navegação e pesquisa com automações baseadas em IA.",
      color: "text-pink-400",
    },
    {
      nome: "One AI",
      descricao:
        "Plataforma que analisa e processa linguagem natural em múltiplos contextos.",
      color: "text-pink-400",
    },
    {
      nome: "Gorails",
      descricao:
        "Ensina desenvolvimento web com Ruby on Rails e recursos práticos.",
      color: "text-pink-400",
    },
    {
      nome: "AppsBuilder Pro",
      descricao:
        "Cria aplicativos móveis sem programação com ferramentas visuais.",
      color: "text-pink-400",
    },
    {
      nome: "Slideshare",
      descricao: "Compartilha apresentações e documentos profissionais online.",
      color: "text-pink-400",
    },
    {
      nome: "Revoicer App",
      descricao: "Converte textos em áudios com vozes humanas e naturais.",
      color: "text-pink-400",
    },
    {
      nome: "Voicemaker",
      descricao:
        "Gera áudios e narrações realistas com vozes de IA personalizadas.",
      color: "text-pink-400",
    },
    {
      nome: "Meshy",
      descricao:
        "Gera modelos 3D e texturas automaticamente usando inteligência artificial.",
      color: "text-pink-400",
    },
    {
      nome: "Scite AI",
      descricao:
        "Analisa e valida citações acadêmicas com IA para garantir precisão científica.",
      color: "text-pink-400",
    },
    {
      nome: "IAsk AI",
      descricao:
        "Assistente de perguntas e respostas que fornece explicações inteligentes e resumidas.",
      color: "text-pink-400",
    },
    {
      nome: "Synthesia",
      descricao:
        "Cria vídeos com apresentadores virtuais realistas gerados por IA.",
      color: "text-pink-400",
    },
    {
      nome: "Vidtoons",
      descricao:
        "Cria vídeos animados e explicativos com personagens e narração automática.",
      color: "text-pink-400",
    },
    {
      nome: "Lalals (música)",
      descricao:
        "Gera versões musicais com vozes realistas e adaptação de estilo com IA.",
      color: "text-pink-400",
    },
    {
      nome: "StealthGPT",
      descricao:
        "Cria textos e respostas com IA projetada para manter anonimato e naturalidade.",
      color: "text-pink-400",
    },
    {
      nome: "Artistly",
      descricao:
        "Gera artes digitais e ilustrações criativas com estilos personalizados de IA.",
      color: "text-pink-400",
    },
    {
      nome: "Genspark AI",
      descricao:
        "Plataforma de geração de conteúdo e ideias automáticas com IA criativa.",
      color: "text-pink-400",
    },
    {
      nome: "Colinkri",
      descricao:
        "Ferramenta de análise e monitoramento de backlinks e links externos.",
      color: "text-pink-400",
    },
    {
      nome: "Seozoom",
      descricao:
        "Analisa SEO e concorrência com relatórios completos e métricas avançadas.",
      color: "text-pink-400",
    },
    {
      nome: "Amzscout",
      descricao:
        "Analisa produtos e desempenho na Amazon para vendedores profissionais.",
      color: "text-pink-400",
    },
    {
      nome: "Zonbase",
      descricao:
        "Ferramenta de pesquisa de produtos e otimização para Amazon Sellers.",
      color: "text-pink-400",
    },
    {
      nome: "Alura",
      descricao:
        "Plataforma de aprendizado online com cursos de tecnologia e negócios.",
      color: "text-pink-400",
    },
    {
      nome: "Wincher",
      descricao:
        "Monitora posições de palavras-chave e desempenho de SEO em tempo real.",
      color: "text-pink-400",
    },
    {
      nome: "Sistrix",
      descricao:
        "Analisa visibilidade e desempenho de sites nos mecanismos de busca.",
      color: "text-pink-400",
    },
    {
      nome: "Academun",
      descricao:
        "Ferramenta voltada para redação e revisão de trabalhos acadêmicos.",
      color: "text-pink-400",
    },
    {
      nome: "Chatbotapp",
      descricao:
        "Cria chatbots inteligentes personalizados para sites e negócios.",
      color: "text-pink-400",
    },
    {
      nome: "Imgupscaler",
      descricao:
        "Aumenta a resolução de imagens sem perda de qualidade com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Ehunt AI",
      descricao:
        "Analisa e identifica leads e contatos com base em IA preditiva.",
      color: "text-pink-400",
    },
    {
      nome: "Alsoasked",
      descricao:
        "Mostra perguntas relacionadas de pesquisa para otimizar conteúdo.",
      color: "text-pink-400",
    },
    {
      nome: "Peeksta",
      descricao:
        "Encontra produtos vencedores e tendências para lojas de dropshipping.",
      color: "text-pink-400",
    },
    {
      nome: "Serpwatch",
      descricao:
        "Monitora posições e desempenho de palavras-chave ao longo do tempo.",
      color: "text-pink-400",
    },
    {
      nome: "Stackskills",
      descricao:
        "Plataforma de aprendizado online com cursos em múltiplas áreas.",
      color: "text-pink-400",
    },
    {
      nome: "Taplio",
      descricao:
        "Ajuda a criar e gerenciar conteúdo para o LinkedIn com suporte de IA.",
      color: "text-pink-400",
    },
    {
      nome: "Stockimg AI",
      descricao:
        "Gera imagens e fotos realistas personalizadas com inteligência artificial.",
      color: "text-pink-400",
    },
    {
      nome: "Creattie",
      descricao:
        "Oferece ilustrações e animações vetoriais premium para projetos criativos.",
      color: "text-pink-400",
    },
    {
      nome: "Airbrush AI",
      descricao:
        "Gera imagens e retratos realistas com IA treinada para arte digital.",
      color: "text-pink-400",
    },
    {
      nome: "Zebracat AI",
      descricao:
        "Cria vídeos curtos automáticos otimizados para redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Paperpal",
      descricao:
        "Auxilia na revisão e aperfeiçoamento de textos acadêmicos com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Gencraft",
      descricao:
        "Gera imagens artísticas e cenas criativas com base em descrições textuais.",
      color: "text-pink-400",
    },
    {
      nome: "Haloscan",
      descricao:
        "Ferramenta de análise de backlinks e auditoria de SEO técnica.",
      color: "text-pink-400",
    },
    {
      nome: "Biteable",
      descricao:
        "Cria vídeos animados e explicativos com modelos e narração automática.",
      color: "text-pink-400",
    },
    {
      nome: "Dinorank",
      descricao:
        "Analisa SEO e rastreia posições com relatórios de desempenho e backlinks.",
      color: "text-pink-400",
    },
    {
      nome: "Copyleaks",
      descricao: "Verifica plágio e autenticidade de conteúdo com IA avançada.",
      color: "text-pink-400",
    },
    {
      nome: "Blackbox",
      descricao:
        "Auxilia desenvolvedores gerando código e soluções com IA contextual.",
      color: "text-pink-400",
    },
    {
      nome: "Speechi",
      descricao: "Cria apresentações com narração e slides interativos.",
      color: "text-pink-400",
    },
    {
      nome: "Viralytic",
      descricao:
        "Analisa desempenho de campanhas e engajamento em redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Gethookd",
      descricao: "Cria ganchos e ideias virais para marketing digital com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Mediamodifier",
      descricao: "Cria mockups e prévias realistas de produtos e designs.",
      color: "text-pink-400",
    },
    {
      nome: "Figma",
      descricao:
        "Plataforma colaborativa de design de interfaces e protótipos.",
      color: "text-pink-400",
    },
    {
      nome: "Denote",
      descricao:
        "Organiza anotações e ideias com interface limpa e inteligente.",
      color: "text-pink-400",
    },
    {
      nome: "Trint",
      descricao:
        "Transcreve áudios e vídeos automaticamente com IA de reconhecimento de fala.",
      color: "text-pink-400",
    },
    {
      nome: "Babbily",
      descricao:
        "Gera textos e respostas criativas com IA para uso profissional e pessoal.",
      color: "text-pink-400",
    },
    {
      nome: "Fastmoss",
      descricao:
        "Monitora métricas e crescimento em e-commerces e marketplaces.",
      color: "text-pink-400",
    },
    {
      nome: "Jobscan",
      descricao:
        "Analisa currículos e otimiza para compatibilidade com ATS e recrutadores.",
      color: "text-pink-400",
    },
    {
      nome: "Readable",
      descricao:
        "Avalia a legibilidade de textos e fornece sugestões de aprimoramento.",
      color: "text-pink-400",
    },
    {
      nome: "Bookmate",
      descricao:
        "Plataforma de leitura digital com livros, áudios e recomendações.",
      color: "text-pink-400",
    },
    {
      nome: "Flow - Veo 3 (ilimitado)",
      descricao:
        "Gera vídeos cinematográficos com IA avançada e qualidade profissional.",
      color: "text-pink-400",
    },
    {
      nome: "Kling AI (ilimitado)",
      descricao:
        "Cria animações e vídeos realistas com IA generativa ilimitada.",
      color: "text-pink-400",
    },
    {
      nome: "Higgsfield (team)",
      descricao:
        "Plataforma de geração ilimitada de imagem.",
      color: "text-pink-400",
    },
    {
      nome: "Nanobanana (ilimitado)",
      descricao:
        "Plataforma de geração de conteúdo multimídia com uso ilimitado de IA.",
      color: "text-pink-400",
    },
    {
      nome: "Synthesys",
      descricao:
        "Plataforma de geração ilimitada de avatar, com clonagem e geração de voz ilimitada.",
      color: "text-pink-400",
    },
    {
      nome: "Suno AI (ilimitado)",
      descricao:
        "Gera músicas originais com vocais e instrumentos criados por IA.",
      color: "text-pink-400",
    },
    {
      nome: "Seedream 4.0 (ilimitado)",
      descricao:
        "Cria vídeos, imagens e sons integrados com IA de última geração.",
      color: "text-pink-400",
    },
    {
      nome: "Topaz (ilimitado)",
      descricao:
        "Aprimora qualidade de imagens e vídeos com IA avançada de reconstrução.",
      color: "text-pink-400",
    },
    {
      nome: "GPT Image (ilimitado)",
      descricao:
        "Gera imagens realistas e detalhadas a partir de texto com IA generativa.",
      color: "text-pink-400",
    },
    {
      nome: "Flux Kontent (ilimitado)",
      descricao:
        "Plataforma de criação de conteúdo automatizado com IA ilimitada.",
      color: "text-pink-400",
    },
    {
      nome: "Helium 10",
      descricao:
        "Suite completa de ferramentas para análise e otimização de vendas na Amazon.",
      color: "text-pink-400",
    },
    {
      nome: "Quetext",
      descricao:
        "Detecta plágio e verifica originalidade de conteúdo com precisão.",
      color: "text-pink-400",
    },
    {
      nome: "Graphicstock",
      descricao:
        "Biblioteca de imagens, vetores e vídeos livres para uso comercial.",
      color: "text-pink-400",
    },
    {
      nome: "Verbatik (melhor que ElevenLabs)",
      descricao:
        "Gera narrações realistas e vozes humanas com IA avançada de áudio.",
      color: "text-pink-400",
    },
    {
      nome: "Adminer Diamond (ilimitado)",
      descricao:
        "Ferramenta de administração de bancos de dados poderosa e ilimitada.",
      color: "text-pink-400",
    },
    {
      nome: "Viewstats (Mr Beast)",
      descricao:
        "Analisa estatísticas e tendências de vídeos e canais do YouTube.",
      color: "text-pink-400",
    },
    {
      nome: "Imagine Art (ilimitado)",
      descricao:
        "Gera imagens artísticas e realistas com inteligência artificial ilimitada.",
      color: "text-pink-400",
    },
 
    {
      nome: "Skynet (chat sem censura)",
      descricao:
        "Assistente de IA sem filtros, com respostas naturais e livres.",
      color: "text-pink-400",
    },
    {
      nome: "Reelmind",
      descricao:
        "Plataforma de IA com mais de 100 modelos de geração, oferecendo capacidades ilimitadas.",
      color: "text-pink-400",
    },
    {
      nome: "Geminigen",
      descricao:
        "Ferramenta avançada adicionada ao plano Super Premium+, oferecendo gerações ilimitadas nos modelos VEO 3.1 Fast e Sora 2, com até 5 gerações simultâneas em vídeos de até 15s, maior rapidez, prioridade máxima e acesso a tecnologias exclusivas do mercado.",
      color: "text-pink-400",
    },
    {
      nome: "LmArena",
      descricao:
        "Plataforma integrada ao plano Super Premium+ que reúne todos os principais modelos de chat do mercado (Claude, Grok, Gemini, LLaMA, ChatGPT, Mistral e muito mais), oferecendo conversação ilimitada com APIs oficiais, além de modos especiais como Batalha & Comparação entre modelos. Ative o modo 'Direct Chat' para utilização completa.",
      color: "text-pink-400",
    },
    {
      nome: "Tubefy",
      descricao:
        "Tenha acesso a um painel completo de I.A para criar canal dark! tem ferramentas de I.A, treinamentos, aulas e muito mais!",
      color: "text-pink-400",
    },
    {
      nome: "QConcursos",
      descricao:
        "Tenha acesso a cursos, mapas mentais e simulados para ficar sempre a frente de seus concursos!",
      color: "text-pink-400",
    },
    {
      nome: "Finevoice (Clone Voz)",
      descricao:
        "Tenha acesso a uma ferramenta que clona e gera voz de forma ilimitada!",
      color: "text-pink-400",
    },
    {
      nome: "American Swipe",
      descricao:
        "Tenha acesso a uma ferramenta de espionagem de ofertas e criativos escalados no Facebook e Youtube!",
      color: "text-pink-400",
    },
    {
      nome: "Whisky (Nano Banana Pro)",
      descricao:
        "Agora é possível gerar pelo Nano Banana direto da fonte",
      color: "text-pink-400",
    },
    {
      nome: "SeeArt.AI (+18)",
      descricao:
        "Possui gerações ilimitadas de imagens (modo geração gratuita) que so tem nos planos mais caros do site. ",
      color: "text-pink-400",
    },
    {
      nome: "ElevenReader",
      descricao:
        "O ElevenReader consegue narrar qualquer tipo de ebook, seja pdf, url, ou ate mesmo escrito.",
      color: "text-pink-400",
    },
    {
      nome: "Vyral",
      descricao:
        "A Vyral é uma ferramenta estratégica para quem vende no TikTok Shop, focada em descobrir vídeos e produtos que JÁ estão vendendo todos os dias — antes de você perder tempo testando no escuro.",
      color: "text-pink-400",
    },
  
    {
  nome: "Motion Control",
  descricao:
    "O Motion Control permite criar e controlar movimentos cinematográficos em vídeos e cenas com precisão, facilitando a produção de conteúdos dinâmicos e profissionais sem precisar de animação manual complexa.",
  color: "text-pink-400",
},

  ];

  const ferramentasPremium = [
    {
      nome: "Sora (Plus",
      descricao: "Gera vídeos realistas com IA a partir de texto.",
    },
    {
      nome: "Heygen (Team)",
      descricao:
        "Cria avatares falantes e vídeos automatizados com dublagem em múltiplos idiomas.",
    },
    {
      nome: "Leonardo (Maestro)",
      descricao: "Gera imagens artísticas detalhadas e estilosas por IA.",
    },
    {
      nome: "Adsparo",
      descricao: "Cria e otimiza anúncios automaticamente para redes sociais.",
    },
    {
      nome: "Gamma App (Pro)",
      descricao:
        "Cria apresentações modernas e interativas de forma automática.",
    },
    {
      nome: "CapCut Pro",
      descricao:
        "Editor de vídeo completo com efeitos premium e recursos avançados.",
    },
    {
      nome: "Canva Pro",
      descricao: "Design gráfico fácil com templates e recursos profissionais.",
    },
    {
      nome: "ChatGPT (Plus)",
      descricao: "Assistente de IA avançado para escrita, ideias e automações.",
    },
    {
      nome: "Freepik",
      descricao: "Banco de imagens, vetores e ícones de alta qualidade.",
    },
    {
      nome: "DreamFace",
      descricao: "Cria rostos e retratos realistas com IA.",
    },
    {
      nome: "You.com",
      descricao: "Buscador inteligente com IA e respostas contextuais.",
    },
    {
      nome: "Grok",
      descricao: "IA de conversação com foco em humor e respostas rápidas.",
    },
    {
      nome: "Place It",
      descricao: "Gera mockups, logos e vídeos promocionais automaticamente.",
    },
    {
      nome: "Ideogram (Plus)",
      descricao: "Gera imagens com tipografia criativa e realista.",
    },
    {
      nome: "Vectorizer",
      descricao: "Transforma imagens raster em vetores automaticamente.",
    },
    {
      nome: "Sem Rush (Pro, Guru e Business)",
      descricao: "Ferramenta de SEO e análise de tráfego profissional.",
    },
    {
      nome: "Ubersuggest",
      descricao: "Pesquisa palavras-chave e monitora concorrentes de SEO.",
    },
    {
      nome: "SEO Site Checkup",
      descricao: "Analisa o desempenho SEO completo de sites.",
    },
    {
      nome: "Keyword Revealer",
      descricao: "Descobre palavras-chave com alto potencial de ranqueamento.",
    },
    {
      nome: "Moz Pro",
      descricao: "Ferramenta de SEO com métricas de autoridade e backlinks.",
    },
    {
      nome: "Spyfu",
      descricao:
        "Monitora e analisa estratégias de palavras-chave de concorrentes.",
    },
    {
      nome: "Serpstat",
      descricao: "Plataforma de SEO para análise e auditoria de sites.",
    },
    {
      nome: "Envato Elements",
      descricao: "Repositório com milhões de recursos criativos premium.",
    },
    {
      nome: "Vistacreate",
      descricao:
        "Alternativa ao Canva com modelos profissionais e IA criativa.",
    },
    {
      nome: "WordHero",
      descricao:
        "Gera textos e ideias de marketing com inteligência artificial.",
    },
    {
      nome: "Frase IO",
      descricao: "Otimiza conteúdo com base em SEO e intenção de busca.",
    },
    {
      nome: "Grammarly",
      descricao:
        "Corrige gramática, estilo e clareza de textos automaticamente.",
    },
    {
      nome: "Quillbot",
      descricao: "Reformula textos e parafraseia com alta precisão.",
    },
    {
      nome: "WordAI",
      descricao: "Reescreve textos mantendo o sentido e naturalidade humana.",
    },
    {
      nome: "Picsart",
      descricao: "Editor de fotos e vídeos com filtros e IA criativa.",
    },
    {
      nome: "Writerzen",
      descricao: "Plataforma de pesquisa de palavras-chave e SEO semântica.",
    },
    {
      nome: "Linguix",
      descricao: "Assistente de escrita com foco em gramática e estilo.",
    },
    {
      nome: "Wordtune",
      descricao: "Melhora a clareza e o tom de textos de forma natural.",
    },
    {
      nome: "Storybase",
      descricao:
        "Descobre tópicos e palavras-chave com base em intenção do usuário.",
    },
    {
      nome: "Smodin",
      descricao:
        "Ferramenta multifuncional de IA para escrever, traduzir e resumir.",
    },
    {
      nome: "LongTailPro",
      descricao: "Gera ideias de palavras-chave long tail para SEO.",
    },
    {
      nome: "Keyword Tool",
      descricao:
        "Encontra palavras-chave em múltiplas plataformas (Google, YouTube, etc).",
    },
    {
      nome: "GrowthBar",
      descricao:
        "Cria conteúdo otimizado para SEO com inteligência artificial.",
    },
    {
      nome: "Seoptimer",
      descricao: "Auditoria SEO e análise de performance técnica do site.",
    },
    {
      nome: "Ahrefs",
      descricao: "Análise profunda de backlinks, SEO e concorrentes.",
    },
    {
      nome: "Voice Clone",
      descricao: "Clona vozes humanas realistas a partir de amostras de áudio.",
    },
    {
      nome: "Digen AI",
      descricao:
        "Gera conteúdo digital completo com automação e inteligência artificial.",
    },
     {
      nome: "Venice AI",
      descricao:
        "Nova i.a de chat parecida com o chatgpt, so que contendo muito mais recursos como criação de imagem sem censura, remover background, upscale e enhance, analisar arquivos e muito mais.",
      color: "text-pink-400",
    },
    {
      nome: "A.I Song Generator",
      descricao: "Cria músicas completas e letras com IA generativa.",
      color: "text-pink-400",
    },
    {
      nome: "Adworld Prime",
      descricao: "Treinamentos e estratégias avançadas de marketing digital.",
      color: "text-pink-400",
    },
    {
      nome: "Aiease",
      descricao: "Assistente de escrita e geração de respostas automáticas.",
      color: "text-pink-400",
    },
    {
      nome: "Artsmart",
      descricao: "Gera imagens e arte digital com IA generativa.",
      color: "text-pink-400",
    },
    {
      nome: "BK Reviews",
      descricao: "Analisa produtos e cria avaliações automáticas.",
      color: "text-pink-400",
    },
    {
      nome: "Boolv.Video",
      descricao: "Cria vídeos curtos automaticamente com base em textos.",
      color: "text-pink-400",
    },
    {
      nome: "Captions",
      descricao: "Adiciona legendas automáticas e sincronizadas em vídeos.",
      color: "text-pink-400",
    },
    {
      nome: "Claude (Pro)",
      descricao: "IA avançada da Anthropic com raciocínio contextual.",
      color: "text-pink-400",
    },
    {
      nome: "Clipfly",
      descricao: "Editor de vídeos curtos com automação de IA.",
      color: "text-pink-400",
    },
    {
      nome: "Clicopy",
      descricao: "Gera textos e copywriting de alta conversão.",
      color: "text-pink-400",
    },
    {
      nome: "Code Quick",
      descricao: "Auxilia desenvolvedores com dicas de código em tempo real.",
      color: "text-pink-400",
    },
    {
      nome: "Puxador de Dados (CPF, Telefone, E-mail)",
      descricao: "Ferramenta para busca automatizada de dados públicos.",
      color: "text-pink-400",
    },
    {
      nome: "Copy Generator",
      descricao: "Gera textos publicitários e slogans de forma automática.",
      color: "text-pink-400",
    },
    {
      nome: "Cramly.AI",
      descricao: "IA educacional para estudos, resumos e respostas rápidas.",
      color: "text-pink-400",
    },
    {
      nome: "Cursos Dankicode",
      descricao: "Plataforma de cursos online em marketing e tecnologia.",
      color: "text-pink-400",
    },
    {
      nome: "Designi",
      descricao: "Cria designs rápidos para redes sociais e identidade visual.",
      color: "text-pink-400",
    },
    {
      nome: "Designrr (Ebook)",
      descricao: "Gera eBooks e PDFs prontos a partir de textos e sites.",
      color: "text-pink-400",
    },
    {
      nome: "Dzine.AI",
      descricao: "Gera designs personalizados e arte digital com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Epidemic Sound",
      descricao:
        "Biblioteca de músicas e efeitos sonoros livres de direitos autorais.",
      color: "text-pink-400",
    },
    {
      nome: "Flaticon",
      descricao: "Banco de ícones vetoriais para projetos gráficos e web.",
      color: "text-pink-400",
    },
    {
      nome: "Gemini (Pro)",
      descricao:
        "IA multimodal da Google com suporte a texto, imagem e raciocínio avançado.",
      color: "text-pink-400",
    },
    {
      nome: "Grok",
      descricao:
        "Assistente conversacional com humor e respostas inteligentes.",
      color: "text-pink-400",
    },
    {
      nome: "Gurukiller",
      descricao:
        "IA de automação e marketing para criação de conteúdo estratégico.",
      color: "text-pink-400",
    },
    {
      nome: "Inner.AI",
      descricao:
        "Assistente de autoaperfeiçoamento e produtividade pessoal com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Kalodata (Bra)",
      descricao: "Banco de dados estatísticos e de mercado do Brasil.",
      color: "text-pink-400",
    },
    {
      nome: "Lumalabs",
      descricao:
        "Cria vídeos 3D e animações cinematográficas a partir de fotos.",
      color: "text-pink-400",
    },
    {
      nome: "Midjourney (imagem)",
      descricao: "Gera imagens artísticas e realistas por comandos de texto.",
      color: "text-pink-400",
    },
    {
      nome: "Motion Elements",
      descricao:
        "Banco de vídeos, templates e efeitos para editores e criadores.",
      color: "text-pink-400",
    },
    {
      nome: "Studios Monkey",
      descricao:
        "Ferramenta de IA para edição e criação de vídeos automatizada.",
      color: "text-pink-400",
    },
    {
      nome: "Pck Toolzbuy",
      descricao: "Coleção de utilitários e ferramentas premium de automação.",
      color: "text-pink-400",
    },
    {
      nome: "Perplexity (Pro)",
      descricao:
        "Buscador com IA que oferece respostas contextualizadas e fontes.",
      color: "text-pink-400",
    },
    {
      nome: "Piclumen Pro",
      descricao: "Cria retratos e imagens com realismo fotográfico via IA.",
      color: "text-pink-400",
    },
    {
      nome: "Pixlr.AI",
      descricao: "Editor de imagens online com ferramentas inteligentes de IA.",
      color: "text-pink-400",
    },
    {
      nome: "Produtos Secretos",
      descricao: "Coleção exclusiva de softwares e ferramentas digitais.",
      color: "text-pink-400",
    },
    {
      nome: "Renderfores",
      descricao: "Cria vídeos, logos e apresentações com templates prontos.",
      color: "text-pink-400",
    },
    {
      nome: "Scribd",
      descricao: "Plataforma de leitura e audiobooks sob demanda.",
      color: "text-pink-400",
    },
    {
      nome: "Spy Funnels",
      descricao: "Analisa funis e páginas de vendas dos concorrentes.",
      color: "text-pink-400",
    },
    {
      nome: "Storyblocks",
      descricao: "Biblioteca ilimitada de vídeos, músicas e animações.",
      color: "text-pink-400",
    },
    {
      nome: "Submagic (Podcast)",
      descricao: "Gera legendas e cortes automáticos para podcasts.",
      color: "text-pink-400",
    },
    {
      nome: "Super IPTV (Séries & Filmes)",
      descricao: "Streaming de séries e filmes premium ilimitado.",
      color: "text-pink-400",
    },
    {
      nome: "Turboscribe",
      descricao: "Transcreve e resume áudios e vídeos automaticamente.",
      color: "text-pink-400",
    },
    {
      nome: "Unsplash",
      descricao: "Banco de imagens gratuitas em alta resolução.",
      color: "text-pink-400",
    },
    {
      nome: "Vecteezy",
      descricao: "Repositório de vetores, ícones e templates de design.",
      color: "text-pink-400",
    },
    {
      nome: "Videogen",
      descricao: "Cria vídeos automáticos baseados em texto com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Vidiq",
      descricao: "Ferramenta para SEO e otimização de canais no YouTube.",
      color: "text-pink-400",
    },
    {
      nome: "Vidtao",
      descricao: "Analisa campanhas e anúncios em vídeo de concorrentes.",
      color: "text-pink-400",
    },
    {
      nome: "Vidu.AI",
      descricao: "Gera vídeos personalizados com IA a partir de roteiros.",
      color: "text-pink-400",
    },
    {
      nome: "ZDM Prime (Cursos)",
      descricao: "Acesso a cursos e treinamentos digitais premium.",
      color: "text-pink-400",
    },
    {
      nome: "Podcastle",
      descricao: "Grava, edita e publica podcasts com qualidade profissional.",
      color: "text-pink-400",
    },
    {
      nome: "Adobe Express",
      descricao: "Design rápido e intuitivo para redes sociais e marketing.",
      color: "text-pink-400",
    },
    {
      nome: "Phrasly AI",
      descricao: "Gera textos criativos e traduções automáticas com IA.",
      color: "text-pink-400",
    },
    {
      nome: "123RF",
      descricao: "Banco de imagens, vídeos e áudio royalty-free.",
      color: "text-pink-400",
    },
    {
      nome: "Imgkits",
      descricao:
        "Editor online de imagens com IA e remoção automática de fundo.",
      color: "text-pink-400",
    },
    {
      nome: "Seoptimer",
      descricao: "Auditoria de SEO e relatórios de performance de site.",
      color: "text-pink-400",
    },
    {
      nome: "Icon8",
      descricao: "Coleção de ícones e ilustrações para uso profissional.",
      color: "text-pink-400",
    },
    {
      nome: "Craftly AI",
      descricao: "Escreve textos e campanhas publicitárias com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Oocya",
      descricao:
        "Automação de postagens e geração de conteúdo para redes sociais.",
      color: "text-pink-400",
    },
    {
      nome: "Pixelied",
      descricao: "Editor de design gráfico online com templates prontos.",
      color: "text-pink-400",
    },
    {
      nome: "Shutterstoc",
      descricao: "Banco de imagens, vídeos e músicas profissionais.",
      color: "text-pink-400",
    },
    {
      nome: "Smodin",
      descricao: "Escrita, tradução e reescrita de textos com IA.",
      color: "text-pink-400",
    },
    {
      nome: "GPL Theme",
      descricao: "Acesso a temas e plugins WordPress premium.",
      color: "text-pink-400",
    },
    {
      nome: "Jasper",
      descricao: "Assistente de escrita criativa e marketing com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Nichess",
      descricao: "Descobre nichos lucrativos e ideias de produtos digitais.",
      color: "text-pink-400",
    },
    {
      nome: "Justdone",
      descricao: "Gera ideias, títulos e textos com IA criativa.",
      color: "text-pink-400",
    },
    {
      nome: "Wordtune",
      descricao: "Reescreve frases e melhora fluidez de textos.",
      color: "text-pink-400",
    },
    {
      nome: "Netflix",
      descricao: "Streaming de filmes, séries e documentários originais.",
      color: "text-pink-400",
    },
    {
      nome: "Prime Video",
      descricao: "Serviço de streaming da Amazon com produções exclusivas.",
      color: "text-pink-400",
    },
    {
      nome: "Closer Copy",
      descricao: "Gera textos de vendas com técnicas de copywriting avançado.",
      color: "text-pink-400",
    },
    {
      nome: "Lovepik",
      descricao: "Banco de vetores, ícones e recursos visuais.",
      color: "text-pink-400",
    },
    {
      nome: "Unbounce",
      descricao: "Cria landing pages otimizadas para conversão.",
      color: "text-pink-400",
    },
    {
      nome: "Rytr",
      descricao: "Gera textos e e-mails automáticos com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Slidebean",
      descricao: "Cria apresentações de slides com design automatizado.",
      color: "text-pink-400",
    },
    {
      nome: "Snapied",
      descricao: "Ferramenta de captura e anotação de telas.",
      color: "text-pink-400",
    },
    {
      nome: "Crello",
      descricao: "Design online com modelos personalizáveis.",
      color: "text-pink-400",
    },
    {
      nome: "Skillshare",
      descricao: "Plataforma de cursos criativos e técnicos online.",
      color: "text-pink-400",
    },
    {
      nome: "Lynda Com",
      descricao: "Cursos profissionais de tecnologia, negócios e design.",
      color: "text-pink-400",
    },
    {
      nome: "Everand",
      descricao: "Acesso a livros e audiobooks sob demanda.",
      color: "text-pink-400",
    },
    {
      nome: "Slideshare",
      descricao: "Plataforma para compartilhar apresentações e documentos.",
      color: "text-pink-400",
    },
    {
      nome: "Linguix",
      descricao: "Correção gramatical e reescrita com IA contextual.",
      color: "text-pink-400",
    },
    {
      nome: "Word AI",
      descricao: "Reescrita automática de textos com naturalidade humana.",
      color: "text-pink-400",
    },
    {
      nome: "Spin Rewriter",
      descricao: "Cria múltiplas versões de textos para SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Pro Writing AI",
      descricao: "Editor e revisor de textos com IA integrada.",
      color: "text-pink-400",
    },
    {
      nome: "Creaitor AI",
      descricao: "Gera textos criativos para redes sociais e blogs.",
      color: "text-pink-400",
    },
    {
      nome: "Smart Copy",
      descricao: "Cria mensagens publicitárias com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Story Base",
      descricao: "Ajuda a criar narrativas e roteiros para conteúdo digital.",
      color: "text-pink-400",
    },
    {
      nome: "Spamzilla",
      descricao: "Pesquisa domínios expirados e backlinks para SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Seobility",
      descricao: "Análise e monitoramento de SEO para sites.",
      color: "text-pink-400",
    },
    {
      nome: "SEO Site Checkup",
      descricao: "Auditoria técnica de SEO e relatórios detalhados.",
      color: "text-pink-400",
    },
    {
      nome: "Viral Launch",
      descricao: "Pesquisa de produtos e tendências para Amazon Sellers.",
      color: "text-pink-400",
    },
    {
      nome: "Sell The Trend",
      descricao: "Descobre produtos em alta para dropshipping.",
      color: "text-pink-400",
    },
    {
      nome: "Backlink Repository",
      descricao: "Banco de backlinks e métricas de autoridade.",
      color: "text-pink-400",
    },
    {
      nome: "Tuberanker",
      descricao: "Análise e SEO para vídeos do YouTube.",
      color: "text-pink-400",
    },
    {
      nome: "Indexification",
      descricao: "Serviço de indexação rápida de links e backlinks.",
      color: "text-pink-400",
    },
    {
      nome: "SEO Tester Online",
      descricao: "Analisa SEO on-page e off-page com IA.",
      color: "text-pink-400",
    },
    {
      nome: "SE Ranking",
      descricao: "Monitoramento de posições e relatórios SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Search Atlas",
      descricao: "Plataforma avançada de pesquisa e análise SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Majestic",
      descricao: "Avalia backlinks e autoridade de domínios.",
      color: "text-pink-400",
    },
    {
      nome: "Spyfu",
      descricao: "Análise de palavras-chave e estratégias de concorrentes.",
      color: "text-pink-400",
    },
    {
      nome: "Mangools",
      descricao: "Pacote completo de ferramentas de SEO simples e rápidas.",
      color: "text-pink-400",
    },
    {
      nome: "Similar Web",
      descricao: "Analisa tráfego e estatísticas de sites.",
      color: "text-pink-400",
    },
    {
      nome: "Writer Zen",
      descricao: "Planeja conteúdo e pesquisa de palavras-chave semânticas.",
      color: "text-pink-400",
    },
    {
      nome: "Keyword",
      descricao: "Descobre e organiza palavras-chave para SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Serpstat",
      descricao: "Suite completa de SEO e marketing de conteúdo.",
      color: "text-pink-400",
    },
    {
      nome: "Semscoop",
      descricao: "Descobre palavras-chave e analisa concorrência SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Moz Pro",
      descricao: "Análise e otimização de autoridade de sites.",
      color: "text-pink-400",
    },
    {
      nome: "Answer The Public",
      descricao: "Mostra perguntas populares de usuários em motores de busca.",
      color: "text-pink-400",
    },
    {
      nome: "Ubersuggest",
      descricao: "Sugestões e métricas de SEO e palavras-chave.",
      color: "text-pink-400",
    },
    {
      nome: "Sem Rush",
      descricao: "Análise completa de SEO, anúncios e marketing digital.",
      color: "text-pink-400",
    },
    {
      nome: "AI Detector",
      descricao: "Detecta textos gerados por IA.",
      color: "text-pink-400",
    },
    {
      nome: "AI Humanizer",
      descricao: "Transforma textos de IA em linguagem natural.",
      color: "text-pink-400",
    },
    {
      nome: "SEO Tools",
      descricao: "Coleção de ferramentas e verificadores SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Vmake",
      descricao: "Gera vídeos automáticos de produtos e anúncios.",
      color: "text-pink-400",
    },
    {
      nome: "ILove PDF",
      descricao: "Edita, converte e organiza arquivos PDF online.",
      color: "text-pink-400",
    },
    {
      nome: "PNGTree",
      descricao: "Banco de PNGs e vetores para design gráfico.",
      color: "text-pink-400",
    },
    {
      nome: "AI Wizard",
      descricao: "Gera conteúdo e automações com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Videoscribe",
      descricao: "Cria vídeos animados de estilo whiteboard.",
      color: "text-pink-400",
    },
    {
      nome: "Domo AI",
      descricao: "Gera vídeos curtos e animações com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Cockatoo",
      descricao: "Assistente de escrita criativa e storytelling.",
      color: "text-pink-400",
    },
    {
      nome: "Prezi AI",
      descricao: "Apresentações interativas criadas com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Hailuo (Ultra)",
      descricao: "IA multimodal para texto, imagem e som.",
      color: "text-pink-400",
    },
    {
      nome: "Nexusclips",
      descricao: "Gera cortes e highlights automáticos de vídeos longos.",
      color: "text-pink-400",
    },
    {
      nome: "Dream AI",
      descricao: "Criação de imagens artísticas com IA.",
      color: "text-pink-400",
    },
    {
      nome: "Forum Blackhat 2.0",
      descricao: "Comunidade de growth e técnicas avançadas de SEO.",
      color: "text-pink-400",
    },
    {
      nome: "Wan A.I (Ilimitado)",
      descricao: "Assistente IA ilimitado para tarefas automáticas.",
      color: "text-pink-400",
    },
    {
      nome: "Play HT (Clone Voz)",
      descricao: "Gera vozes realistas e dublagens com clonagem vocal.",
      color: "text-pink-400",
    },
    {
      nome: "Baixar Design",
      descricao:
        "Plataforma para baixar modelos, templates e recursos gráficos prontos para uso.",
      color: "text-pink-400",
    },
    {
      nome: "Tubefy",
      descricao:
        "Tenha acesso a um painel completo de I.A para criar canal dark! tem ferramentas de I.A, treinamentos, aulas e muito mais!",
      color: "text-pink-400",
    },
    {
      nome: "QConcursos",
      descricao:
        "Tenha acesso a cursos, mapas mentais e simulados para ficar sempre a frente de seus concursos!",
      color: "text-pink-400",
    },
    {
      nome: "Finevoice (Clone Voz)",
      descricao:
        "Tenha acesso a uma ferramenta que clona e gera voz de forma ilimitada!",
      color: "text-pink-400",
    },
    {
      nome: "American Swipe",
      descricao:
        "Tenha acesso a uma ferramenta de espionagem de ofertas e criativos escalados no Facebook e Youtube!",
      color: "text-pink-400",
    },
    {
      nome: "A.I Make Song",
      descricao:
        "Varios estilos de geração como Lyrics to Song, Text to Song, Song Cover, Vocal Remover e Entre Outros",
      color: "text-pink-400",
    },
  
  ];

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSidebar]);

  // 🔽 Scroll suave até uma seção
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const perguntas = [
    {
      pergunta: "Como funciona o acesso compartilhado? É seguro?",
      resposta:
        "Nosso sistema de acesso compartilhado é totalmente seguro. Você recebe credenciais exclusivas para acessar o adspower (multilogin) através de nossa área de membros protegida. Implementamos medidas de segurança avançadas para garantir que seus dados estejam protegidos e que não haja conflitos de uso entre os membros.",
    },
    {
      pergunta: "E se uma ferramenta ficar indisponível?",
      resposta:
        "Trabalhamos constantemente para manter todos os acessos ativos, mas caso alguma ferramenta fique temporariamente indisponível, nosso time técnico trabalha para resolver o problema o mais rápido possível. Se não conseguirmos restaurar o acesso, oferecemos alternativas equivalentes.",
    },
    {
      pergunta: "Funciona para celular?",
      resposta:
        "Não, o Rateio Dominando a animação não funciona para celular! Apenas funcionamento para computador, Windows e Mac.",
    },
    {
      pergunta: "Para quem é o Rateio Dominando a Animação?",
      resposta:
        "O Rateio Dominando a Animação é ideal para designers, criadores de conteúdo, profissionais de marketing, especialistas em SEO, e qualquer pessoa que trabalhe com criação digital e queira acesso a ferramentas premium de IA e design por um valor acessível. Seja você um profissional experiente ou iniciante, nossa plataforma oferece as ferramentas necessárias para elevar seu trabalho.",
    },
    {
      pergunta:
        "Já adquiri serviços semelhantes e não fiquei satisfeito. Por que o Rateio Dominando a Animação é diferente?",
      resposta:
        "O Rateio Dominando a Animação se diferencia pela qualidade e segurança dos acessos compartilhados, pela variedade de mais de 300 ferramentas premium e pelo suporte dedicado com atendimento rápido! Além disso, oferecemos uma comunidade exclusiva de networking com membros experientes e ja monetizados!",
    },
    {
      pergunta: "Tem garantia? se sim quantos dias?",
      resposta:
        "Sim, temos garantia de 7 dias garantidos por lei! caso tenha algum problema nos acessos, ou qualquer outro motivo, devolvemos seu dinheiro na hora! sem burocracia.",
    },
    
  ];
  // ======================
  // ⚙️ CONFIGURAÇÕES GERAIS
  // ======================
  const TOTAL_LOGOS = 52; // quantidade real de logos
  const RADIUS = 1900;
  const ANGLE_STEP = 4; // distância angular entre cada logo

  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    let angle = 0;
    let animationFrame;

    // Detecta se é mobile
    const isMobile = window.innerWidth < 768;

    // 🔹 aumenta a velocidade no mobile
    const speed = isMobile ? 0.05 : 0.02; // dobro da velocidade no celular

    const animate = () => {
      angle += speed;
      setAngleOffset(angle);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    // 🔹 Ao sair ou atualizar, salva a posição atual
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollY", window.scrollY);
    };

    // 🔹 Ao carregar a página, restaura a posição anterior
    const savedY = sessionStorage.getItem("scrollY");
    if (savedY) {
      window.scrollTo(0, parseFloat(savedY)); // movimento instantâneo
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ======================
  // 🎠 CARROSSEL MANUAL + LOOP INFINITO SUAVE
  // ======================
  const CARD_WIDTH = 420; // largura exata dos cards
  const GAP = 40; // espaçamento entre eles
  const VISIBLE_CARDS = 3; // sempre mostrar 3
  const SLIDE_WIDTH = CARD_WIDTH + GAP;

  const cards = useMemo(
    () => [
      {
        logo: "/logo49.png",
        nome: "ElevenLabs",
      descricao:
        "A melhor I.A de clonagem de voz do mercado, possuindo o modelo mais avançado de text to speech(Eleven V3 Alpha).",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        
        logo: "/logo44.png",
        nome: "ChatGPT",
        descricao:
          "Gere respostas inteligentes, criativas e contextuais com linguagem natural e adaptável a qualquer cenário.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/tipo45.png",
        nome: "Higgsfield",
        descricao:
          "Plataforma de geração ilimitada de imagem.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

       {
        logo: "/logo22.png",
        nome: "Sora",
        descricao:
          "Planeje roteiros e storyboards prontos para geraçãos de cenas com o Sora.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

        {
        logo: "/tipo9.png",
        nome: "Veo 3",
        descricao:
          "Gera vídeos cinematográficos com IA avançada e qualidade profissional.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

      {
        logo: "/tipo33.png",
        nome: "Hailuo",
        descricao:
          "IA multimodal para texto, imagem e som.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

        {
        logo: "/tipo40.png",
        nome: "Runway",
        descricao:
          "Ferramenta de edição e geração de vídeos ilimitados com inteligência artificial profissional.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },


       {
        logo: "/tipo10.png",
        nome: "Midjourney",
        descricao:
          "Gera imagens artísticas e realistas por comandos de texto.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      
      
    

      {
        logo: "/logo48.png",

        nome: "Grok",
        descricao:
          "Analise tendências e responda perguntas com dados em tempo real do X.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

        {
        logo: "/tipo12.png",

        nome: "Claude",
        descricao:
          "IA avançada da Anthropic com raciocínio contextual.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },


      {
        logo: "/tipo38.png",

        nome: "SeeArt",
        descricao:
          "Possui gerações ilimitadas de imagens (modo geração gratuita) que so tem nos planos mais caros do site.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

        {
        logo: "/tipo44.png",

        nome: "Kalodata",
        descricao:
          "Banco de dados estatísticos e de mercado do Brasil.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

       {
        logo: "/logo47.png",

        nome: "Freepink",
        descricao:
          "Encontre vetores, mockups e fotos prontos para campanhas digitais.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

{
        logo: "/logo2.png",
        nome: "Envato Elements",
        descricao:
          "Acesse um arsenal premium de templates, fontes e efeitos para acelerar entregas.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },


         {
        logo: "/logo41.png",
        nome: "Heygen",
        descricao:
          "Crie vídeos com apresentadores virtuais, traduções labiais e roteiros automatizados.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      
      

        {
        logo: "/logo8.png",
        nome: "Dreamface",
        descricao:
          "Transforme retratos com filtros avançados e geração facial realista.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

        
      {
        logo: "/logo45.png",
        nome: "CapCut",
        descricao:
          "Edite vídeos verticais com automatizações de corte, legendas dinâmicas e efeitos 9:16.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo46.png",
        nome: "Canva",
        descricao:
          "Crie layouts profissionais com recursos colaborativos e branding controlado.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },


    
     
      
      {
        logo: "/logo50.png",

        nome: "Gamma App",
        descricao:
          "Estrutura de apresentações e narrativas multimídia a partir de comandos curtos.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

      
      {
        logo: "/logo1.png",
        nome: "Also Asked",
        descricao:
          "Mapeie perguntas relacionadas para enriquecer pautas e FAQ.",
        precoAntigo: "R$ 199,90",
        precoNovo: "R$ 0,95",
      },
      
      {
        logo: "/logo3.png",
        nome: "Buzzsumo",
        descricao:
          "Descubra tópicos e conteúdos virais monitorando redes e blog.s",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo4.png",
        nome: "Alura",
        descricao:
          "Participe de formações em tecnologia, negócios e criação com suporte de especialistas.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo5.png",
        nome: "Ahrefs",
        descricao:
          "Audite backlinks e identifique oportunidades de tráfego com análises aprofundadas.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo6.png",
        nome: "BypassGPT",
        descricao:
          "Personalize respostas generativas para contornar filtros e preservar a naturalidade.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo21.png",
        nome: "Adsparo",
        descricao: "Identifique anúncios vencedores e escálaveis.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo7.png",
        nome: "Helium 10",
        descricao:
          "Domine vendas na Amazon com pesquisa de produtos e gestão de listas.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
    
      {
        logo: "/logo9.png",
        nome: "123RF",
        descricao:
          "Banco com milhões de imagens, vídeos e músicas prontas para uso comercial.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo10.png",
        nome: "ArtList",
        descricao:
          "Trilhas sonoras e SFX com licenciamento simples para produções premium.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo11.png",
        nome: "Dinorank",
        descricao:
          "Analisar interligação e densidade semântica para escalar conteúdo.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo12.png",
        nome: "Yourtext Guru",
        descricao:
          "Otimize a segurança e as fichas de produto com recomendações de palavras-chave.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo13.png",
        nome: "You.com",
        descricao:
          "Investigador em tempo real com respostas contextuais e integrações de IA multimodal",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo14.png",
        nome: "Digen",
        descricao:
          "Centralize dados de crescimento e simule cenários estratégicos com IA.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo15.png",
        nome: "Zonbase",
        descricao:
          "Encontre produtos lucrativos e avalie palavras-chave para operações FBA.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo16.png",
        nome: "Haloscan",
        descricao: "Monitores menções e comissões da marca em diversos canais.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo17.png",
        nome: "Woorank",
        descricao:
          "Automatize relatórios de SEO, usabilidade e tecnologias do site.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

      {
        logo: "/logo18.png",
        nome: "Pexda",
        descricao:
          "Descubra produtos virais para e-commerce monitorado tendências globais.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo19.png",

        nome: "Majestic",
        descricao:
          "Explore gráficos de backlinks com métricas como Trust Flow e Citation Flow",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo20.png",
        nome: "Storyblocks",
        descricao:
          "Clipes, animações e efeitos sonoros ilimitados em assinatural anual.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
     
      {
        logo: "/logo23.png",
        nome: "Similar Web",
        descricao:
          "Compare tráfego e origens de audiência com benchmarks competitivos.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo24.png",
        nome: "Serpstat",
        descricao:
          "Mapeie palavras-chave, backlinks e PPC em um painel unificado.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo25.png",
        nome: "Smodin",
        descricao:
          "Gere redações, resumos e traduções com suporte a múltiplos idiomas.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },

      {
        logo: "/logo26.png",
        nome: "Motion Array",
        descricao: "Templates de vídeos, LUTs e presets para acelerar edições.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo27.png",
        nome: "Flaticon",
        descricao:
          "Baixe ícones consistentes para fortalecer a identidade visual de projetos.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo28.png",
        nome: "Semrush Pro",
        descricao:
          "Suite de growth com pesquisa de palavras-chave e auditoria técnica.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo29.png",
        nome: "Wordai",
        descricao:
          "Parafraseie textos com alta naturalidade e preservando intenção e SEO.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo30.png",
        nome: "Vectorizer",
        descricao:
          "Converta imagens em vetores nítidos com configuração guiadas por IA.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo31.png",
        nome: "Wincher",
        descricao:
          "Monitore posições diárias com alertas configuráveis e relatórios claros.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo32.png",
        nome: "Quetext",
        descricao:
          "Confira plágio e originalidade com relatórios detalhados e sugestões de citações.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo33.png",
        nome: "Seoptimer",
        descricao: "Gere auditorias SEO white-label em segundos.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo34.png",
        nome: "Voice Clone",
        descricao:
          "Replique vozes humanas em múltiplos idiomas mantendo timbre e emoção.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo35.png",
        nome: "Write Human",
        descricao:
          "Crie artigos completos e listas otimizadas com assistência contextual.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo36.png",
        nome: "Seobserver",
        descricao:
          "Monitores SERPs e detecte movimentos decisivos dos concorrentes",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo37.png",
        nome: "Spyfu",
        descricao:
          "Descubra campanhas pagas e termos orgânicos dos principais rivais.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo38.png",
        nome: "Ideogram",
        descricao:
          "Gere artes conceituais com tipografia consistentemente usando prompts detalhados.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo39.png",
        nome: "Mangools",
        descricao:
          "Combine KWFinder SERPChecker e linkMiner para análises rápidas.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo40.png",
        nome: "Ubersuggest",
        descricao:
          "Identifique ideias de conteúdo e agrupamentos de palavras-chave com facilidade.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
     
      {
        logo: "/logo42.png",
        nome: "Smartscout",
        descricao:
          "Mapeie marcas e vencedores promissórios no marketplace da amazon.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo43.png",
        nome: "Place It",
        descricao:
          "Gere maquetes profissionais e identidades visuais em poucos cliques.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo52.png",
        nome: "SE Ranking",
        descricao:
          "Acompanhe posições orgânicas e gere relatórios automáticos para clientes.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
      {
        logo: "/logo53.png",
        nome: "QuillBot",
        descricao:
          "Reescreva conteúdo com fluidez humana ajustando-o e claramente automaticamente.",
        precoAntigo: "R$ 199,99",
        precoNovo: "R$ 0,95",
      },
    ],
    []
  );

  // 🔁 duplicar apenas uma vez para criar loop
  const extendedCards = useMemo(() => [...cards, ...cards], [cards]);

  const [position, setPosition] = useState(cards.length);
  const controls = useAnimation();

  // posição inicial
  useEffect(() => {
    controls.set({ x: -(position * SLIDE_WIDTH) });
  }, []);

  // 🪄 FUNÇÃO MOVE
  const move = async (dir) => {
    let next = position + dir;

    await controls.start({
      x: -(next * SLIDE_WIDTH),
      transition: { duration: 0.6, ease: "easeInOut" },
    });

    // quando chega ao final, reposiciona instantaneamente no meio
    if (next <= 0) {
      next = cards.length;
      await controls.set({ x: -(next * SLIDE_WIDTH) });
    } else if (next >= extendedCards.length - VISIBLE_CARDS) {
      next = cards.length - VISIBLE_CARDS;
      await controls.set({ x: -(next * SLIDE_WIDTH) });
    }

    setPosition(next);
  };

  // ======================
  // 🌌 COMPONENTE PRINCIPAL
  // ======================
  return (
    <>
      {/* Cursor personalizado */}
      <CustomCursor />

      {/* HERO */}
      <section
        id="inicio"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#05060A] via-[#07111D] to-[#0A1120]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,198,255,0.05)_0%,_transparent_70%)]"></div>

        {/* ARCO CURVADO */}
        <div className="hero-arc-big"></div>

        <div
          className="
    pointer-events-none absolute left-1/2 -translate-x-1/2 
    bottom-[-46%] w-[700px] h-[700px]
    md:bottom-[-80%] md:w-[2300px] md:h-[2300px]
    
  "
          style={{
            background:
              "radial-gradient(circle at 50% 118%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.46) 55%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* LOGOS EM CURVA */}
        <div className="logos-wrapper">
          {Array.from({ length: TOTAL_LOGOS * 3 }).map((_, i) => {
            const isMobile = window.innerWidth < 768;
            const currentRadius = isMobile ? 750 : RADIUS;
            const currentAngleStep = isMobile ? 6 : ANGLE_STEP;

            const angle = 120 - i * currentAngleStep + angleOffset;
            const rad = (angle * Math.PI) / 180;
            const x = currentRadius * Math.cos(rad);
            const y = currentRadius * Math.sin(rad);

            // ✅ Início condicional
            const START_INDEX = isMobile ? 5 : 24;
            const logoIndex = ((i + (START_INDEX - 1)) % TOTAL_LOGOS) + 1;

            return (
              <img
                key={i}
                src={`/tipo${logoIndex}.png`}
                alt={`Logo ${logoIndex}`}
                className="absolute rounded-full object-cover border border-[#00C6FF]/20 
                 shadow-[0_0_15px_rgba(0,198,255,0.4)] 
                 w-[35px] h-[35px] md:w-[70px] md:h-[70px] lg:w-[60px] lg:h-[60px]"
                style={{
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y + (isMobile ? 40 : 60)}px`,
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 198, 255, 0.08)",
                }}
              />
            );
          })}
        </div>

        {/* NAVBAR */}
        <Navbar />

        {/* CONTEÚDO HERO */}
        <div className="hero-content">
          <h1
            className="
      text-3xl leading-snug font-bold text-white 
    md:leading-tight
      
       2xl:text-5xl
    "
          >
            Acesse +300 <br />
            <span
              className="
        text-[0.95em] bg-gradient-to-r from-[#61ddff] to-[#00C6FF] 
        bg-clip-text text-transparent
      "
            >
              Ferramentas I.AS Premium
            </span>
          </h1>

          <p
            className="
      text-gray-400 mt-4 text-base
      md:mt-6 md:text-xl
    "
          >
            Tenha acesso a uma biblioteca completa de ferramentas de IA, pagando
            apenas uma fração do preço e aproveitando todo o potencial da
            tecnologia.
          </p>

          {/* Botões */}
          <div
            className="
      mt-8 flex flex-col gap-4 items-center justify-center
      md:mt-10 md:flex-row md:gap-4
    "
          >
            <button
              onClick={() => scrollToSection("ferramentas")}
              className="
        px-8 py-3 bg-gradient-to-r from-[#00C6FF] to-[#0AA3E2]
        text-white rounded-full font-semibold shadow-lg
        hover:opacity-90 transition
        w-[80%] md:w-auto
      "
            >
              Conhecer Ferramentas
            </button>

            <button
              onClick={() => scrollToSection("planos")}
              className="
        px-8 py-3 border border-[#0AA3E2] text-white rounded-full
        hover:bg-[#0AA3E2]/10 transition
        w-[80%] md:w-auto
      "
            >
              Ver Planos
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE VÍDEO DE APRESENTAÇÃO */}
      <section className="bg-[#010102] py-24 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Título */}
          <h2 className="text-4xl font-bold mb-4">
            Conheça a{" "}
            <span className="text-[0.95em]  bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
              Plataforma
            </span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Veja em poucos segundos como nossa plataforma transforma sua
            produtividade com inteligência artificial.
          </p>

          {/* Container do vídeo */}
          <div className="relative w-full max-w-[980px] mx-auto aspect-[16/9] rounded-xl border border-[#00C6FF]/50 overflow-hidden shadow-[0_0_30px_rgba(0,198,255,0.3)]">
            <video
              className="w-full h-full object-cover"
              src="/video2.mp4"
              title="Apresentação Plataforma"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>

        {/* Efeito de brilho radial de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,198,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      </section>

      {/* SEÇÃO DE ECONOMIA */}
      <section
        ref={sectionRef}
        className="relative py-42 bg-[#010F16] text-white overflow-hidden"
      >
        {/* Fundo com gradiente + logos sutis */}
        <div className="absolute inset-0 z-0">
          {/* Gradiente base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#010102] via-[#07111D] to-[#010F16]"></div>

          {/* Logos fixos */}
          <div className="absolute inset-0 opacity-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => {
              const top = Math.random() * 100;
              const left = Math.random() * 100;
              const size = 30 + Math.random() * 25;
              const rotation = Math.random() * 360;
              const tipo = Math.floor(Math.random() * 3) + 1; // tipo1, tipo2, tipo3

              return (
                <img
                  key={i}
                  src={`/tipo${tipo}.png`}
                  alt={`ícone tipo${tipo}`}
                  className="absolute"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: `rotate(${rotation}deg)`,
                    opacity: 0.08,
                    transition: "none", // garante que não há transição
                    animation: "none", // cancela qualquer keyframe antigo
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Gradiente sutil sobre o fundo */}

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Cabeçalho */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold leading-tight">
              Já pensou em{" "}
              <span className="text-[0.95em] bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
                quanto dinheiro
              </span>{" "}
              você gasta no ano <br />
              apenas com ferramentas de IA?
            </h2>
            <p className="text-gray-400 mt-4">
              Veja quanto você pode economizar com nossa plataforma unificada de
              ferramentas Premium.
            </p>
          </div>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Tabela de custos */}
            <div className="bg-[#0B1220] border border-[#1A263C] rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Custo anual com ferramentas separadas:
              </h3>
              <ul className="text-gray-300 text-sm space-y-3">
                <li className="flex justify-between">
                  <span>ChatGPT Plus</span> <span>R$ 1.320,00</span>
                </li>
                <li className="flex justify-between">
                  <span>CapCut Pro</span> <span>R$ 344,90</span>
                </li>
                <li className="flex justify-between">
                  <span>Gama App Pro</span> <span>R$ 840,00</span>
                </li>
                <li className="flex justify-between">
                  <span>Canva Pro</span> <span>R$ 420,90</span>
                </li>
                <li className="flex justify-between">
                  <span>Freepik Premium</span> <span>R$ 579,96</span>
                </li>
                <li className="flex justify-between">
                  <span>Grok</span> <span>R$ 1.320,00</span>
                </li>
                <li className="flex justify-between">
                  <span>Leonardo AI</span> <span>R$ 1.500,00</span>
                </li>
                <li className="flex justify-between">
                  <span>Outras ferramentas...</span> <span>+ R$ 15.000,00</span>
                </li>
              </ul>
              <hr className="my-4 border-gray-700" />
              <div className="flex justify-between text-[0.95em] bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent font-bold">
                <span>Total Anual</span> <span>R$ 21.325,76</span>
              </div>
            </div>

            {/* Comparativo */}
            <div className="text-center">
              <p className="text-gray-400 mb-2">
                Pagando cada serviço separadamente, você gastaria:
              </p>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent mb-2">
                {formatted}
              </h3>

              <p className="text-sm text-gray-400 mb-4">por ano</p>

              <div className="flex justify-center items-center mb-6">
                <span className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] text-[#010F16] font-bold px-4 py-2 rounded-full text-sm">
                  VS
                </span>
              </div>

              <p className="text-gray-400 mb-2">
                Com a nossa plataforma, você paga a partir de:
              </p>
              <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent mb-2">
                R$ 49,90
              </h3>
              <p className="text-sm text-gray-400 mb-6">por mês</p>

              <p className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent font-semibold mb-6">
                Economize mais de R$ 21.000,00 por ano!
              </p>

              <button
                onClick={() => scrollToSection("planos")}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#61ddff] to-[#00C6FF] text-[#010F16] font-bold hover:opacity-90 transition"
              >
                Comece a economizar agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative flex items-center justify-center my-0">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#00C6FF] to-transparent opacity-70"></div>
        <img
          src="/marca.png"
          alt="Logo Divider"
          className="w-12 h-12 lg:w-10 lg:h-10 mx-4 drop-shadow-[0_0_10px_rgba(0,198,255,0.6)]"
        />
        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#00C6FF] to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-[#010F16] -z-10"></div>
      </div>

      {/* SEÇÃO BENEFÍCIOS */}
      <Beneficios />

      {/* DIVIDER */}
      <div className="relative flex items-center justify-center my-0">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#00C6FF] to-transparent opacity-70 z-0"></div>
        <img
          src="/marca.png"
          alt="Logo Divider"
          className="relative z-10 w-12 h-12 lg:w-10 lg:h-10 mx-4 drop-shadow-[0_0_10px_rgba(0,198,255,0.6)]"
        />
        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#00C6FF] to-transparent opacity-70 z-0"></div>
        <div className="absolute inset-0 bg-[#010F16] -z-10"></div>
      </div>

      {/* SEÇÃO FERRAMENTAS */}
      <section
        id="ferramentas"
        className="bg-[#010F16] py-34 text-white overflow-hidden relative"
      >
        <div className="max-w-[1600px] mx-auto px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ferramentas{" "}
              <span className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
                Premium
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Acesse ferramentas poderosas para turbinar sua produtividade e
              criatividade com nossa plataforma.
            </p>
          </div>

          {/* 🎠 CARROSSEL */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => move(-1)}
              className="absolute left-[-20px] z-20 bg-[#00C6FF]/20 hover:bg-[#00C6FF]/40 text-white rounded-full p-4 backdrop-blur-sm transition-all"
            >
              <ChevronLeft size={7} className="md:hidden" />
              <ChevronLeft size={25} className="hidden md:block" />
            </button>

            <div className="overflow-hidden w-[100%] sm:w-[400px] md:w-[1350px] mx-auto">
              {/* largura = 3 * 420 + 2 gaps */}
              <motion.div
                className="flex gap-10"
                animate={controls}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {extendedCards.map((card, i) => (
                  <div
                    key={`${card.nome}-${i}`}
                    className="bg-[#0F182A] border border-[#1A263C] rounded-2xl p-10 shadow-xl  transition-all duration-300 w-[420px] md:w-[420px] flex-shrink-0"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={card.logo}
                        alt={card.nome}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <span className="text-gray-400 text-sm line-through">
                          {card.precoAntigo}
                        </span>
                        <p className="text-[#00C6FF] font-semibold">
                          {card.precoNovo}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mt-5 mb-3">
                      {card.nome}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      {card.descricao}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              onClick={() => move(1)}
              className="absolute right-[-20px] z-20 bg-[#00C6FF]/20 hover:bg-[#00C6FF]/40 text-white rounded-full p-4 backdrop-blur-sm transition-all"
            >
              <ChevronRight size={7} className="md:hidden" />
              <ChevronRight size={25} className="hidden md:block" />
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PLANOS */}
      <section
        id="planos"
        className="relative py-32 text-white overflow-hidden bg-[#000608]"
      >
        {/* 🔹 Fundo com padrão repetido */}
        <div
          className="absolute inset-0 opacity-[0.20] pointer-events-none"
          style={{
            backgroundImage: "url('/marca1.png')", // coloca o nome do seu arquivo dentro de /public
            backgroundRepeat: "repeat",
            backgroundSize: "140px 140px",
          }}
        ></div>

        {/* 🔹 Conteúdo principal (fica por cima) */}
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          {/* Cabeçalho */}
          <div className="mb-16">
            <h3 className="text-[0.95em] bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent font-semibold mb-2 tracking-widest">
              NOSSOS PLANOS
            </h3>
            <h2 className="text-5xl font-bold mb-4">
              Escolha o plano{" "}
              <span className="text-[0.95em] bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
                Perfeito para você
              </span>
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto">
              Todos os planos oferecem diferentes níveis de acesso às
              ferramentas. Aproveite nossa promoção de lançamento e escolha o
              que mais se adequa às suas necessidades.
            </p>
          </div>

          {/* Container dos Planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-32">
            {/* PLANO MENSAL */}
            <div className="relative rounded-2xl p-[2px] bg-[linear-gradient(135deg,#00C6FF,#7D2AE8,#FF00C8)]">
              <div className="bg-[#040314] rounded-2xl p-12 text-left shadow-lg hover:shadow-[0_0_25px_rgba(255,59,59,0.2)] transition-all duration-300 ">
                <h3 className="text-2xl font-bold mb-1">Plano Plus</h3>

                <p className="text-gray-400 text-sm line-through">R$ 89,90</p>
                <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-[#00C6FF] via-[#7D2AE8] to-[#FF00C8] bg-clip-text text-transparent">
                  R$ 49,90
                  <span className="text-lg font-normal text-gray-400">
                    {" "}
                    /mês
                  </span>
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    +20 Ferramentas de I.A
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    Acesso compartilhado Seguro
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />7 dias de
                    Garantia
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    Suporte Premium
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <X className="text-gray-600" size={18} />
                    Novos Lançamentos Mensais
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <X className="text-gray-600" size={18} />
                    Grupo Exclusivo de Networking
                  </li>

                  <li className="flex items-center gap-3 text-gray-600">
                    <X className="text-gray-600" size={26} />
                    Acesso a Packs Vips de I.A e Cursos para Monetizar
                  </li>

                  <li className="flex items-center gap-3 text-gray-600">
                    <X className="text-gray-600" size={18} />
                    Ferramentas Exclusivas
                  </li>
                </ul>

                <a
                  href="https://pay.kirvano.com/494f4436-472b-41c5-8d57-b682b5196f9b"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-[#00C6FF] via-[#7D2AE8] to-[#FF00C8] text-white font-semibold hover:opacity-90 transition">
                    Assinar agora
                  </button>
                </a>

                <div
                  onClick={() => {
                    setSelectedPlan("basico");
                    setShowSidebar(true);
                  }}
                  className="mt-5 flex items-center justify-center text-gray-100 text-sm gap-2 hover:text-white cursor-pointer"
                >
                  <List className="w-4 h-4" />
                  Ver lista de ferramentas
                </div>
              </div>
            </div>

            {/* PLANO ANUAL - Destaque */}
            <div className="px-4 md:px-0 w-full flex justify-center">
              <div
                className="relative bg-gradient-to-r from-[#5a00c2] to-[#e7008f] 
    rounded-2xl p-12 text-left shadow-[0_0_60px_rgba(214,18,188,0.9)] 
    transform scale-115 z-20 transition-all duration-500 hover:scale-112 
    w-full max-w-[420px]"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 
      bg-gradient-to-r from-[#5a00c2] to-[#e7008f] 
      border border-[#FFFFFF]/120 text-white text-xs font-bold 
      px-5 py-1 rounded-full"
                >
                  Mais popular
                </div>

                <h3 className="text-2xl font-bold mb-1">Plano Super Premium</h3>
                <p className="text-gray-400 text-sm line-through">R$ 219,90</p>
                <p className="text-4xl font-bold mt-1 bg-[#ffffff] bg-clip-text text-transparent">
                  R$ 159,90
                  <span className="text-lg font-normal text-gray-400">
                    {" "}
                    /mês
                  </span>
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-3 text-gray-100">
                    <Check className="text-[#FFFFF]" size={18} />
                    +300 Ferramentas de I.A
                  </li>
                  <li className="flex items-center gap-3 text-gray-100">
                    <Check className="text-[#FFFFF]" size={18} />
                    Acesso compartilhado Seguro
                  </li>
                  <li className="flex items-center gap-3 text-gray-100">
                    <Check className="text-[#FFFFF]" size={18} />7 dias de
                    Garantia
                  </li>
                  <li className="flex items-center gap-2 text-gray-100 relative">
                    <Check className="text-[#FFFFF]" size={18} />
                    <span>Suporte Premium</span>

                    <div className="relative group">
                      <Info
                        className="text-[#FFFFFF] cursor-pointer"
                        size={18}
                        onClick={(e) => {
                          // Se for mobile (<768px), alterna manualmente o tooltip
                          if (window.innerWidth < 768) {
                            e.stopPropagation();
                            const tooltip = e.currentTarget.nextSibling;
                            tooltip.classList.toggle("opacity-100");
                            tooltip.classList.toggle("pointer-events-auto");
                          }
                        }}
                      />

                      <span
                        className="
  absolute left-1/2 -translate-x-1/2 -top-8 
  bg-gray-800 text-white text-xs px-2 py-1 rounded-md 
  opacity-0 pointer-events-none transition-all duration-200 
  group-hover:opacity-100 group-hover:pointer-events-auto
  z-[9999] text-center 
  whitespace-normal sm:whitespace-normal md:whitespace-nowrap
  break-words 
  max-w-[85vw] sm:max-w-[300px] md:max-w-[500px]
  "
                      >
                        Pode ser atendido fora do horário do suporte
                      </span>
                    </div>
                  </li>

                  <li className="flex items-center gap-3 text-gray-100">
                    <Check className="text-[#FFFFF]" size={18} />
                    Novos Lançamentos Mensais
                  </li>
                  <li className="flex items-center gap-3 text-gray-100">
                    <Check className="text-[#FFFFF]" size={18} />
                    Grupo Exclusivo de Networking
                  </li>
                  <li className="flex items-center gap-3 text-gray-100">
                    <Check className="text-[#FFFFF]" size={26} />
                    Acesso a Packs Vips de I.A e Cursos para Monetizar
                  </li>
                  <li className="flex items-center gap-2 text-gray-100 relative">
                    <Check className="text-[#FFFFF]" size={18} />
                    <span>Ferramentas Exclusivas</span>

                    {/* Tooltip responsivo */}
                    <div className="relative group">
                      <Info
                        className="text-[#FFFFFF] cursor-pointer"
                        size={18}
                        onClick={(e) => {
                          // Detecta se é toque (mobile)
                          if (window.innerWidth < 768) {
                            e.stopPropagation();
                            const tooltip = e.currentTarget.nextSibling;
                            tooltip.classList.toggle("opacity-100");
                            tooltip.classList.toggle("pointer-events-auto");
                          }
                        }}
                      />

                     <span
  className="
absolute left-1/2 -translate-x-1/2 -top-35 
bg-gray-800 text-white text-xs px-3 py-2 rounded-md shadow-lg
opacity-0 pointer-events-none transition-all duration-200 
group-hover:opacity-100 group-hover:pointer-events-auto
z-[9999] text-center 
whitespace-normal
break-words 
max-w-[85vw] sm:max-w-[300px] md:max-w-[900px]
"
>
  <div className="flex flex-col gap-1">
    <span className="font-semibold bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent">
      VEO 3  (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
      Sora 2  (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
      Hailuo 02  (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-orange-400 via-yellow-400 to-lime-400 bg-clip-text text-transparent">
      Suno  (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      Elevenlabs (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
      Higgsfield (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
      Motion Control (ilimitado)
    </span>

    <span className="font-semibold bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
  Kling 3.0 (ilimitado)
</span>

<span className="font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 bg-clip-text text-transparent">
  Runway (ilimitado)
</span>

  </div>
</span>

                    </div>
                  </li>
                </ul>

                <a
                  href="https://pay.kirvano.com/75562bd7-4d63-4463-bc3e-53439a130710"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-8 w-full py-3 rounded-lg bg-[#ffffff] text-[#e7008f] font-semibold  hover:opacity-90 transition">
                    Assinar agora
                  </button>
                </a>

                <div
                  onClick={() => {
                    setSelectedPlan("pro");
                    setShowSidebar(true);
                  }}
                  className="mt-5 flex items-center justify-center text-gray-100 text-sm gap-2 hover:text-white cursor-pointer"
                >
                  <List className="w-4 h-4" />
                  Ver lista de ferramentas
                </div>
              </div>
            </div>

            {/* PLANO SEMESTRAL */}
            <div className="relative rounded-2xl p-[2px] bg-[linear-gradient(135deg,#00C6FF,#7D2AE8,#FF00C8)]">
              <div className="bg-[#040314] rounded-2xl p-12 text-left shadow-lg hover:shadow-[0_0_25px_rgba(255,59,59,0.2)] transition-all duration-300 ">
                <h3 className="text-2xl font-bold mb-1">Plano Premium</h3>

                <p className="text-gray-400 text-sm line-through">R$ 159,90</p>
                <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-[#00C6FF] via-[#7D2AE8] to-[#FF00C8] bg-clip-text text-transparent">
                  R$ 79,90
                  <span className="text-lg font-normal text-gray-400">
                    {" "}
                    /mês
                  </span>
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    +100 Ferramentas de I.A
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    Acesso compartilhado Seguro
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />7 dias de
                    Garantia
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    Suporte Premium
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    Novos Lançamentos Mensais
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="text-[#7D2AE8]" size={18} />
                    Grupo Exclusivo de Networking
                  </li>

                  <li className="flex items-center gap-3 text-gray-600">
                    <X className="text-gray-600" size={26} />
                    Acesso a Packs Vips de I.A e Cursos para Monetizar
                  </li>

                  <li className="flex items-center gap-3 text-gray-600">
                    <X className="text-gray-600" size={18} />
                    Ferramentas Exclusivas
                  </li>
                </ul>

                <a
                  href="https://pay.kirvano.com/21a54cbe-6c11-46cb-bd30-029c5cceda0f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-[#00C6FF] via-[#7D2AE8] to-[#FF00C8] text-white font-semibold hover:opacity-90 transition">
                    Assinar agora
                  </button>
                </a>

                <div
                  onClick={() => {
                    setSelectedPlan("premium");
                    setShowSidebar(true);
                  }}
                  className="mt-5 flex items-center justify-center text-gray-100 text-sm gap-2 hover:text-white cursor-pointer"
                >
                  <List className="w-4 h-4" />
                  Ver lista de ferramentas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#010F16] py-28 text-white overflow-hidden">
        {/* Fundo com brilho e gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070D] via-[#07111D] to-[#010F16]"></div>

        {/* Conteúdo principal */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Como{" "}
            <span className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
              funciona
            </span>{" "}
            na prática
          </h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
            Siga esses três passos simples para começar a usar todas as
            ferramentas de IA Premium.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Passo 1 */}
            <div className="relative bg-[#0B1220]/80 border-1 border-[#03566d]  rounded-2xl p-11 shadow-[0_0_25px_rgba(0,198,255,0.1)] hover:shadow-[0_0_40px_rgba(0,198,255,0.3)] transition-all duration-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0AA3E2] text-[#010F16] font-bold text-lg shadow-[0_0_15px_rgba(0,198,255,0.5)]">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">
                Escolha seu plano
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Selecione o plano ideal para você e tenha acesso a todas as
                ferramentas IA Premium em um só lugar.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="relative bg-[#0B1220]/80 border-1 border-[#03566d]  rounded-2xl p-8 shadow-[0_0_25px_rgba(0,198,255,0.1)] hover:shadow-[0_0_40px_rgba(0,198,255,0.3)] transition-all duration-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0AA3E2] text-[#010F16] font-bold text-lg shadow-[0_0_15px_rgba(0,198,255,0.5)]">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">
                Acesse o painel
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Após a ativação, entre no seu painel exclusivo e explore as
                ferramentas disponíveis.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="relative bg-[#0B1220]/80 border-1 border-[#03566d] rounded-2xl p-8 shadow-[0_0_25px_rgba(0,198,255,0.1)] hover:shadow-[0_0_40px_rgba(0,198,255,0.3)] transition-all duration-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0AA3E2] text-[#010F16] font-bold text-lg shadow-[0_0_15px_rgba(0,198,255,0.5)]">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">
                Comece a criar
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Use nossas ferramentas para gerar, editar e otimizar seus
                projetos com inteligência artificial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative flex items-center justify-center my-0">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#00C6FF] to-transparent opacity-70 z-0"></div>
        <img
          src="/marca.png"
          alt="Logo Divider"
          className="relative z-10 w-12 h-12 lg:w-10 lg:h-10 mx-4 drop-shadow-[0_0_10px_rgba(0,198,255,0.6)]"
        />
        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#00C6FF] to-transparent opacity-70 z-0"></div>
        <div className="absolute inset-0 bg-[#010F16] -z-10"></div>
      </div>

      <section
        id="perguntas"
        className="relative py-24 bg-[#010F16] text-white overflow-hidden "
      >
        {/* Fundo com efeito de brilho */}

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Dúvidas{" "}
            <span className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-gray-400 mb-12">
            Encontre respostas rápidas sobre nossa plataforma e os benefícios da
            assinatura Premium.
          </p>

          {/* Lista de perguntas */}
          <div className="space-y-4 text-left">
            {perguntas.map((item, index) => (
              <div
                key={index}
                className={`border border-[#00C6FF]/20 rounded-xl overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-[#03121D]/80 shadow-[0_0_20px_rgba(0,198,255,0.2)]"
                    : "bg-[#0A1624]/60"
                }`}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-[#E0F7FF] hover:text-[#00C6FF] transition"
                >
                  <span>{item.pergunta}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#00C6FF] transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-500 px-6 overflow-hidden ${
                    activeIndex === index
                      ? "max-h-[300px] pb-4 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.resposta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#010F16] py-24 text-white overflow-hidden">
        {/* Fundo com gradiente e brilho */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03121d] via-[#061b29] to-[#010F16]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,198,255,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

        {/* Conteúdo principal */}
        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <p className="uppercase tracking-[4px] text-[#00C6FF] text-sm font-medium mb-4">
            SUPORTE PERSONALIZADO
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Estamos aqui para{" "}
            <span className="bg-gradient-to-r from-[#61ddff] to-[#00C6FF] bg-clip-text text-transparent">
              ajudá-lo
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Nosso suporte está disponível de Segunda à Sexta das 7h às 15h e das
            17h às 22h, e aos sabados e domingos das 7h às 17h para tirar
            dúvidas e ajudar com qualquer questão sobre sua assinatura.
          </p>

          {/* Cards de suporte */}
          <div className="grid place-items-center">
            {/* Card Comunidade */}
            <div className="relative bg-[#0A1824]/80 border border-[#00C6FF]/20 rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(0,198,255,0.2)] transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Atendimento via WhatsApp
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Respostas rápidas sobre ferramentas, acessos e pagamentos.
              </p>

              <a
                href="https://wa.me/5511939555495?text="
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center justify-center gap-2 bg-[#00FF95] hover:bg-[#00E386] text-[#010F16] font-semibold px-6 py-3 rounded-full mx-auto transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.197.297-.772.967-.947 1.164-.173.198-.348.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.133-.132.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.616-.921-2.211-.242-.579-.487-.5-.672-.51-.173-.009-.372-.011-.571-.011s-.52.075-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.007-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Iniciar Conversa
                </button>
              </a>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-10">
            Garantimos resposta para todos os contatos em até{" "}
            <span className="text-[#00C6FF]">4 horas</span> durante o horário de
            atendimento.
          </p>
        </div>
      </section>

      <footer className="relative bg-[#010F16] text-gray-400 border-t border-white/10 py-16">
        {/* brilho de fundo */}
        <div className="absolute inset-0  pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* logo + descrição */}
          <div className="flex flex-col items-start">
            <img src="/marca.png" alt="Logo" className="w-36 mb-4" />
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              A maior plataforma de rateio de ferramentas premiums para Design e
              IA do Brasil.
            </p>

            <div className="flex gap-5 mt-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dominandoanimacao?igsh=MWp1eWhtM3JhNzAyOA%3D%3D"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#00C6FF]/10 border border-[#00C6FF]/40 hover:bg-[#00C6FF]/20 transition-all duration-300"
              >
                <Instagram className="text-[#00C6FF] w-5 h-5" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/5511939555495?text="
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#00C6FF]/10 border border-[#00C6FF]/40 hover:bg-[#00C6FF]/20 transition-all duration-300"
              >
                <MessageCircle className="text-[#00C6FF] w-5 h-5" />
              </a>
            </div>
          </div>

          {/* links rápidos */}
          <div className="ml-0 md:ml-10">
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide">
              Links Rápidos
            </h3>
            <ul className="space-y-3 text-sm">
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
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-[#00C6FF] transition-colors duration-200 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* contato */}
          <div className="ml-0 md:ml-10">
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide">
              Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                Suporte: Seg a Sex: 7h às 15h e 17h às 22h - Sab e Dom das 7h às
                17h
              </li>
              <li>
                <a
                  href="https://wa.me/5511939555495?text="
                  className="hover:text-[#00C6FF] transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/dominandoanimacao?igsh=MWp1eWhtM3JhNzAyOA%3D%3D"
                  className="hover:text-[#00C6FF] transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://portal.dominandoanimacao.com"
                  className="hover:text-[#00C6FF] transition-colors duration-200"
                >
                  Área de membros
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* separador + direitos */}
        <div className="relative mt-14 border-t border-white/10 pt-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-gray-600">
            <span>
              © {new Date().getFullYear()} Dominando Animações — Todos os
              direitos reservados.
            </span>
          </div>
        </div>
      </footer>

      {/* Sidebar Lista de Ferramentas */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Fundo escuro com fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Sidebar com slide in/out */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-full sm:w-[600px] h-full bg-[#0A1624] text-white z-[9999] shadow-[0_0_25px_rgba(0,198,255,0.2)] border-l border-[#00C6FF]/30 overflow-y-auto"
            >
              {/* Cabeçalho */}
              <div className="flex justify-between items-center p-6 border-b border-[#00C6FF]/20">
                <h3 className="text-lg font-semibold text-[#FFFFFF]">
                  {selectedPlan === "pro"
                    ? " LISTA DE FERRAMENTAS — PLANO SUPER PREMIUM "
                    : selectedPlan === "premium"
                    ? " LISTA DE FERRAMENTAS — PLANO PREMIUM "
                    : " LISTA DE FERRAMENTAS — PLANO PLUS "}
                </h3>

                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6">


              {/* Barra de pesquisa */}
<div className="mb-6">
  <input
    type="text"
    placeholder="Buscar ferramenta..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="
      w-full px-4 py-3 rounded-lg
      bg-[#0F1C2E] border border-[#00C6FF]/30
      text-white placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#00C6FF]
      transition
    "
  />
</div>

                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#00C6FF]/40 text-[#00C6FF]">
                      <th className="text-left py-2 w-[35%]">Ferramenta</th>
                      <th className="text-left py-2">Descrição</th>
                    </tr>
                  </thead>

                  <tbody>
                  {(
  selectedPlan === "pro"
    ? ferramentasPro
    : selectedPlan === "premium"
    ? ferramentasPremium
    : ferramentasBasico
)
  .filter((tool) =>
    tool.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((tool, i) => (

                      <tr
                        key={i}
                        className="border-b border-[#1A263C] hover:bg-[#0F1C2E]/70 transition"
                      >
                        {/* aplica cor personalizada apenas se existir */}
                        <td
                          className={`py-2 font-semibold ${
                            tool.color ? tool.color : "text-white"
                          }`}
                        >
                          {tool.nome}
                        </td>
                        <td className="py-2 text-gray-400">{tool.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
