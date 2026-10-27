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
      
      // Redirect to the offer page using replace to avoid history loops
      window.location.replace("https://jornadacrista-suachance.vercel.app/");
    };

    // EXIT-INTENT (Desktop): Detect mouse leaving the viewport from the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem("back_redirect_activated", "true");
        window.location.replace("https://jornadacrista-suachance.vercel.app/");
      }
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
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("touchstart", primeHistory);
      window.removeEventListener("click", primeHistory);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handlePurchase = () => {
    window.location.href = "https://pay.kiwify.com.br/Ur46eo4";
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
    sessionStorage.setItem("back_redirect_activated", "true");
    window.location.replace("https://jornadacrista-suachance.vercel.app/");
  };

  return (
    <div className="min-h-screen relative text-stone-100 font-sans selection:bg-emerald-900 selection:text-emerald-100">
      {/* Fixed Background Image of Pope Leo XIII */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/src/assets/images/pope_leo_xiii_background_1793108283252.jpg" 
          alt="Pope Leo XIII Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-[2px]"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="fixed top-4 left-4 z-50 bg-stone-900/80 backdrop-blur-md shadow-2xl border border-stone-700 rounded-full px-5 py-3 text-lg font-bold text-stone-100 flex items-center gap-2 hover:bg-stone-800 transition-all active:scale-95 shadow-emerald-900/20 md:top-6 md:left-6 md:px-8 md:py-4 md:text-xl"
      >
        <span className="text-xl md:text-2xl">&larr;</span> Voltar
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-stone-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center border border-stone-700 overflow-hidden"
            >
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-2">Tem certeza?</h3>
              <p className="text-stone-400 mb-6">
                Deseja voltar e perder essa oferta exclusiva de <span className="font-bold text-white">R$ 27,90</span>?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={confirmExit}
                  className="px-4 py-3 rounded-xl border border-stone-700 text-stone-400 font-medium hover:bg-stone-800 transition-colors"
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

      <div className="relative z-10">
        {/* Announcement Bar */}
        <div className="bg-emerald-600/20 backdrop-blur-md text-emerald-400 text-xs font-bold py-2 text-center px-4 border-b border-emerald-900/30">
          OFERTA POR TEMPO LIMITADO: ACESSO VITALÍCIO POR APENAS R$ 27,90
        </div>

        <main className="max-w-2xl mx-auto px-4 py-8 md:px-6 md:py-16">
          
          {/* 1. Headline & Subheadline - Pope Centric Hero */}
          <motion.header 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12 md:mb-16 flex flex-col items-center"
          >
            {/* Hero Image - Pope Leo XIII theme */}
            <div className="mb-8 md:mb-10 relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/30 border-2 md:border-4 border-emerald-900/20">
              <img 
                src="/src/assets/images/pope_leo_xiii_background_1793108283252.jpg" 
                alt="Papa Leão XIII - Jornada Cristã"
                className="w-full h-full object-cover scale-110 translate-y-[-5%] md:translate-y-[-10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 px-4 md:px-6">
                <p className="text-stone-100 text-xs md:text-base italic font-semibold drop-shadow-lg leading-tight">
                  "A oração é a fonte da nossa força e a âncora da nossa esperança." — Papa Leão XIII
                </p>
              </div>
            </div>

            <div className="inline-block px-3 py-1 mb-5 text-[10px] md:text-xs font-black tracking-[0.2em] text-emerald-400 uppercase bg-emerald-950/50 border border-emerald-900/50 rounded-full">
              REVOLUÇÃO ESPIRITUAL
            </div>
            
            <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-5 md:mb-6 leading-[1.1] drop-shadow-2xl px-2">
              Domine sua fé com a <span className="text-emerald-500">sabedoria</span> dos séculos.
            </h1>
            
            <p className="text-base md:text-2xl text-stone-300 leading-relaxed mb-8 max-w-lg mx-auto font-medium px-4">
              A <span className="text-white font-bold border-b-2 border-emerald-500">Jornada Cristã</span> é o caminho definitivo para a sua constância espiritual diária.
            </p>
            
            <div className="flex flex-col items-center gap-2 mb-8 w-full max-w-[320px] md:max-w-sm">
              <div className="bg-white/5 backdrop-blur-xl w-full px-4 py-4 md:px-6 md:py-5 rounded-2xl md:rounded-3xl border-2 border-white/10 shadow-2xl flex flex-col items-center gap-1">
                <span className="text-stone-500 line-through text-[10px] md:text-sm font-bold tracking-widest uppercase">Acesso por R$ 97,00</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-stone-300 font-bold text-sm md:text-base uppercase tracking-tighter">HOJE POR</span>
                  <span className="text-emerald-400 font-black text-3xl md:text-4xl">R$ 27,90</span>
                </div>
              </div>
              <p className="text-[10px] text-emerald-500/80 font-black tracking-widest uppercase animate-pulse mt-2">⚡️ GARANTA SEU LUGAR AGORA</p>
            </div>

            <button 
              onClick={handlePurchase}
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 md:py-6 px-10 md:px-14 rounded-xl md:rounded-2xl shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] text-xl md:text-2xl transition-all transform hover:-translate-y-2 active:translate-y-0 flex items-center justify-center gap-3 border-b-4 border-emerald-800"
            >
              QUERO MINHA JORNADA
              <TrendingUp size={24} className="stroke-[4px]" />
            </button>
          </motion.header>

        {/* 2. Pain Identification */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16 bg-stone-900/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/5"
        >
          <h2 className="text-xl font-bold mb-6 text-center text-white">Você se identifica com isso?</h2>
          <div className="space-y-4">
            {[
              "Sente que sua leitura bíblica não tem constância?",
              "Começa devocionais motivado, mas para depois de alguns dias?",
              "Sente falta de disciplina espiritual na correria do dia a dia?",
              "Quer se aproximar de Deus, mas não sabe por onde começar?"
            ].map((pain, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 min-w-5 min-h-5 flex items-center justify-center rounded-full bg-red-900/30 text-red-400">
                  <span className="text-sm font-bold">✕</span>
                </div>
                <p className="text-stone-300 font-medium">{pain}</p>
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
          className="text-center mb-16 px-2"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">Conheça a Jornada Cristã</h2>
          <p className="text-stone-300 mb-8 leading-relaxed text-base md:text-lg">
            Não é apenas mais um app. É um guia digital de elite, criado para que você domine sua disciplina espiritual e caminhe com os gigantes da fé, todos os dias.
          </p>
          
          <button 
            onClick={handlePurchase}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            QUERO MINHA VAGA
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
          <h2 className="text-3xl font-black text-center mb-10 text-white">O que você vai dominar</h2>
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
                className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 shadow-xl"
              >
                <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-xl">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-stone-400 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button 
              onClick={handlePurchase}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1 active:translate-y-0 border-b-4 border-emerald-800"
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
          <h2 className="text-3xl font-black text-center mb-10 text-white">Quem usa, recomenda</h2>
          <div className="grid gap-6">
            {[
              { name: "Ana P.", text: "Finalmente consegui manter uma rotina com Deus. O visual do app me motiva a não quebrar a sequência." },
              { name: "Carlos M.", text: "Simples, direto e muito organizado. Era exatamente o que eu precisava para o meu devocional matinal." },
              { name: "Juliana S.", text: "Por esse valor, vale muito a pena. O conteúdo é rico e me ajuda a começar o dia bem." }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-2xl"
              >
                <div className="flex gap-1 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-300 italic mb-4 font-medium leading-relaxed">"{testimonial.text}"</p>
                <p className="text-sm font-black text-white">— {testimonial.name}</p>
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
          className="mb-16 text-center bg-emerald-950/20 backdrop-blur-2xl p-6 md:p-14 rounded-[24px] md:rounded-[32px] border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
          
          <div className="inline-block px-4 py-1 mb-6 text-[10px] md:text-sm font-black tracking-widest text-emerald-400 bg-emerald-900/50 rounded-full border border-emerald-500/30">
            ACESSO IMEDIATO
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Comece sua Jornada Hoje</h2>
          <p className="text-stone-400 mb-8 md:mb-10 font-medium text-sm md:text-base">Pagamento único. Sem mensalidades ocultas.</p>
          
          <div className="flex flex-col items-center justify-center mb-8 md:mb-10">
            <span className="text-stone-500 line-through text-base md:text-xl font-bold tracking-tighter">De R$ 97,00</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-2xl font-bold text-stone-300">Por apenas</span>
              <span className="text-5xl md:text-6xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">R$ 27,90</span>
            </div>
          </div>
 
          <button 
            onClick={handlePurchase}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 md:py-6 px-8 rounded-xl md:rounded-2xl shadow-xl shadow-emerald-600/30 text-lg md:text-2xl mb-6 transition-all transform hover:-translate-y-1 active:translate-y-0 border-b-4 border-emerald-800"
          >
            QUERO MINHA VAGA AGORA
          </button>
          
          <p className="text-[10px] md:text-sm text-stone-500 flex items-center justify-center gap-2 font-bold uppercase tracking-wider">
            <ShieldCheck size={16} className="text-emerald-500" /> Ambiente 100% Blindado
          </p>
        </motion.section>

        {/* 8. Guarantee */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-md mx-auto mb-20 px-4"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-stone-900/50 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-white/5 shadow-2xl">
            <ShieldCheck size={32} md:size={40} />
          </div>
          <h3 className="font-black text-xl md:text-2xl mb-3 text-white uppercase tracking-tight">Garantia Real de 7 Dias</h3>
          <p className="text-stone-400 text-base md:text-lg font-medium leading-relaxed">
            Sua paz de espírito é inegociável. Se em 7 dias você não sentir uma transformação real, devolvemos 100% do seu investimento. Sem perguntas.
          </p>
        </motion.section>

        <footer className="text-center text-stone-400 text-xs py-8 border-t border-stone-100">
          <p>&copy; {new Date().getFullYear()} Jornada Cristã. Todos os direitos reservados.</p>
          <p className="mt-2">Termos de Uso | Política de Privacidade</p>
        </footer>

      </main>
      
      <SocialProofToast />
      </div>
    </div>
  );
}
