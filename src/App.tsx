import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Users,
  ShoppingBag
} from 'lucide-react';

const SOCIAL_PROOF_MESSAGES = [
  { name: "Maria S.", action: "acabou de comprar", time: "há 2 min" },
  { name: "João P.", action: "avaliou com 5 estrelas", time: "há 5 min" },
  { name: "Ana L.", action: "começou a jornada", time: "há 12 min" },
  { name: "Carlos M.", action: "comprou o acesso vitalício", time: "há 8 min" },
  { name: "Fernanda R.", action: "entrou na comunidade", time: "há 15 min" }
];

function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing first message
    const initialTimeout = setTimeout(() => setIsVisible(true), 3000);

    // Cycle messages every 8 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_PROOF_MESSAGES.length);
        setIsVisible(true);
      }, 1000); // Wait for exit animation
    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-emerald-100 p-3 flex items-center gap-3 max-w-[300px] md:max-w-sm"
        >
          <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
            <ShoppingBag size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">
              {SOCIAL_PROOF_MESSAGES[currentIndex].name}
            </p>
            <p className="text-xs text-stone-500">
              {SOCIAL_PROOF_MESSAGES[currentIndex].action} <span className="text-emerald-600 font-medium">• {SOCIAL_PROOF_MESSAGES[currentIndex].time}</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if we have already redirected to prevent infinite loops
    const hasRedirected = sessionStorage.getItem("back_redirect_activated");
    
    if (hasRedirected) {
      // If we already redirected, don't trap the user again.
      // Allow the back button to function normally (exit the site).
      return;
    }

    // Push a dummy state to the history stack
    // This creates a "buffer" page so when the user clicks back, they hit this buffer
    // instead of leaving immediately, triggering the popstate event.
    window.history.pushState({ page: "buffer" }, "", window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back action by redirecting immediately
      event.preventDefault();
      
      // Mark that we have redirected so we don't do it again if they come back
      sessionStorage.setItem("back_redirect_activated", "true");
      
      // Redirect to the offer page
      window.location.href = "https://jornadacrista-suachance.vercel.app/";
    };

    // Mobile browsers sometimes require user interaction to respect history manipulation
    const primeHistory = () => {
        // Ensure the state is pushed if it wasn't already (e.g. some browsers block onload pushState)
        if (window.history.state?.page !== "buffer") {
             window.history.pushState({ page: "buffer" }, "", window.location.href);
        }
        window.removeEventListener("touchstart", primeHistory);
        window.removeEventListener("click", primeHistory);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("touchstart", primeHistory);
    window.addEventListener("click", primeHistory);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("touchstart", primeHistory);
      window.removeEventListener("click", primeHistory);
    };
  }, []);

  const handlePurchase = () => {
    window.location.href = "https://pay.hotmart.com/B104571593W?off=izqd4y1u&checkoutMode=10";
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const [showExitModal, setShowExitModal] = useState(false);

  const handleBackClick = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    window.location.href = "https://jornadacrista-suachance.vercel.app/";
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="fixed top-6 left-6 z-50 bg-white/95 backdrop-blur-md shadow-xl border border-stone-200 rounded-full px-8 py-4 text-xl font-bold text-stone-800 flex items-center gap-2 hover:bg-white transition-all active:scale-95 shadow-emerald-900/10"
      >
        <span className="text-2xl">&larr;</span> Voltar
      </button>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center overflow-hidden"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Tem certeza?</h3>
              <p className="text-stone-600 mb-6">
                Deseja voltar e perder essa oferta exclusiva de <span className="font-bold text-stone-900">R$ 27,90</span>?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={confirmExit}
                  className="px-4 py-3 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-colors"
                >
                  Sim, sair
                </button>
                <button 
                  onClick={() => setShowExitModal(false)}
                  className="px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Não, ficar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Announcement Bar */}
      <div className="bg-stone-900 text-stone-50 text-xs font-medium py-2 text-center px-4">
        Oferta por tempo limitado: Acesso vitalício por apenas R$ 27,90
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        
        {/* 1. Headline & Subheadline */}
        <motion.header 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-emerald-800 uppercase bg-emerald-100 rounded-full">
            Para quem busca constância
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-6 leading-[1.1]">
            Fortaleça sua fé todos os dias, mesmo com uma rotina corrida.
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 max-w-lg mx-auto">
            Organize sua vida espiritual de forma simples e prática.
          </p>
          
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="bg-white px-6 py-3 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3">
              <span className="text-stone-400 line-through text-sm">De R$ 97,00</span>
              <span className="text-emerald-600 font-bold text-2xl">Por R$ 27,90</span>
            </div>
            <p className="text-xs text-stone-500 font-medium">Pagamento único • Acesso vitalício</p>
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-emerald-600/20 text-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            QUERO COMEÇAR AGORA
            <TrendingUp size={20} className="stroke-[3px]" />
          </button>

          <div className="mt-12 relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10">
            <img 
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop" 
              alt="Pessoa lendo a bíblia em momento de devoção"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent pointer-events-none"></div>
          </div>
        </motion.header>

        {/* 2. Pain Identification */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-stone-100"
        >
          <h2 className="text-xl font-semibold mb-6 text-center">Você se identifica com isso?</h2>
          <div className="space-y-4">
            {[
              "Sente que sua leitura bíblica não tem constância?",
              "Começa devocionais motivado, mas para depois de alguns dias?",
              "Sente falta de disciplina espiritual na correria do dia a dia?",
              "Quer se aproximar de Deus, mas não sabe por onde começar?"
            ].map((pain, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 min-w-5 min-h-5 flex items-center justify-center rounded-full bg-red-50 text-red-500">
                  <span className="text-sm font-bold">✕</span>
                </div>
                <p className="text-stone-700">{pain}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. Solution Presentation */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-2xl font-bold mb-4">Conheça a Jornada Cristã</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            Não é apenas mais um app. É um guia digital em formato de site mobile, criado especificamente para ajudar você a manter a constância e a organização espiritual diariamente, sem complicações.
          </p>
          
          <button 
            onClick={handlePurchase}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            QUERO FORTALECER MINHA FÉ AGORA
          </button>
        </motion.section>

        {/* 4. What You Will Find */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-10">O que você vai encontrar</h2>
          <div className="grid gap-4">
            {[
              { icon: BookOpen, title: "Versículo do dia", desc: "Comece o dia com uma palavra inspiradora." },
              { icon: Heart, title: "Devocional diário", desc: "Reflexões profundas em poucos minutos." },
              { icon: Calendar, title: "Plano de leitura bíblica", desc: "Saiba exatamente o que ler hoje." },
              { icon: TrendingUp, title: "Sistema de progresso", desc: "Visualize sua constância espiritual." },
              { icon: Users, title: "Comunidade inspiradora", desc: "Caminhe junto com outros cristãos." },
              { icon: MessageCircle, title: "Mensagens prontas", desc: "Compartilhe fé com quem você ama." },
              { icon: CheckCircle2, title: "Ambiente organizado", desc: "Tudo em um só lugar, sem distrações." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100 shadow-sm"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">{item.title}</h3>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={handlePurchase}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              QUERO FORTALECER MINHA FÉ AGORA
            </button>
          </div>
        </motion.section>

        {/* 5. Differentiator */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16 bg-stone-900 text-stone-50 p-8 rounded-2xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" 
              alt="Céu estrelado"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4">Por que a Jornada Cristã é diferente?</h2>
            <p className="text-stone-300 leading-relaxed">
              Muitos tentam ler a Bíblia sozinhos e desistem por falta de método. Nós unimos <span className="text-emerald-400 font-semibold">organização</span>, <span className="text-emerald-400 font-semibold">constância</span> e <span className="text-emerald-400 font-semibold">acompanhamento visual</span> para que sua fé se torne um hábito inegociável, não apenas uma tarefa.
            </p>
          </div>
        </motion.section>

        {/* 6. Social Proof */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-10">Quem usa, recomenda</h2>
          <div className="grid gap-6">
            {[
              { name: "Ana P.", text: "Finalmente consegui manter uma rotina com Deus. O visual do app me motiva a não quebrar a sequência." },
              { name: "Carlos M.", text: "Simples, direto e muito organizado. Era exatamente o que eu precisava para o meu devocional matinal." },
              { name: "Juliana S.", text: "Por esse valor, vale muito a pena. O conteúdo é rico e me ajuda a começar o dia bem." }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm"
              >
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-700 italic mb-4">"{testimonial.text}"</p>
                <p className="text-sm font-bold text-stone-900">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. Offer & CTA */}
        <motion.section 
          id="offer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16 text-center bg-white p-8 md:p-12 rounded-3xl border-2 border-emerald-100 shadow-xl"
        >
          <div className="inline-block px-4 py-1 mb-6 text-sm font-bold text-emerald-700 bg-emerald-50 rounded-full">
            ACESSO IMEDIATO
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Comece sua Jornada Hoje</h2>
          <p className="text-stone-500 mb-8">Pagamento único. Sem mensalidades.</p>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <span className="text-stone-400 line-through text-lg">De R$ 97,00</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-stone-900">Por apenas</span>
              <span className="text-5xl font-extrabold text-emerald-600">R$ 27,90</span>
            </div>
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-emerald-600/30 text-lg mb-4 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            QUERO FORTALECER MINHA FÉ AGORA
          </button>
          
          <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
            <ShieldCheck size={14} /> Ambiente 100% seguro
          </p>
        </motion.section>

        {/* 8. Guarantee */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-md mx-auto mb-16"
        >
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-900">
            <ShieldCheck size={32} />
          </div>
          <h3 className="font-bold text-lg mb-2">Garantia Incondicional de 7 Dias</h3>
          <p className="text-stone-600 text-sm">
            Se você não gostar ou sentir que não é para você, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. O risco é todo nosso.
          </p>
        </motion.section>

        <footer className="text-center text-stone-400 text-xs py-8 border-t border-stone-100">
          <p>&copy; {new Date().getFullYear()} Jornada Cristã. Todos os direitos reservados.</p>
          <p className="mt-2">Termos de Uso | Política de Privacidade</p>
        </footer>

      </main>
      
      <SocialProofToast />
    </div>
  );
}
