import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);

  // alvo (mouse) e posição atual do cursor
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // controle do loop
  const rafId = useRef(null);
  const running = useRef(false);

  useEffect(() => {
    const onResize = () => setVisible(window.innerWidth >= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // inicia o loop só quando necessário
      if (!running.current) {
        running.current = true;
        rafId.current = requestAnimationFrame(tick);
      }
    };

    // pointermove é mais estável que mousemove (trackpad/notebook)
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      // quanto mais alto, mais rápido e preciso (0.65–0.85)
      const SPEED = 0.95;

      pos.current.x += (target.current.x - pos.current.x) * SPEED;
      pos.current.y += (target.current.y - pos.current.y) * SPEED;

      // arredonda para pixels (evita “tremido” em alguns displays)
      const x = Math.round(pos.current.x - 8);
      const y = Math.round(pos.current.y - 8);

      if (el.current) {
        el.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // se ainda houver distância perceptível, continua animando
      const dx = Math.abs(target.current.x - pos.current.x);
      const dy = Math.abs(target.current.y - pos.current.y);
      if (dx > 0.1 || dy > 0.1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        running.current = false; // pausa até o próximo movimento
      }
    };

    // começa com a posição atual do mouse (evita “pulo” inicial)
    const init = (e) => {
      pos.current.x = target.current.x = e.clientX;
      pos.current.y = target.current.y = e.clientY;
      if (el.current) {
        el.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
      }
      window.removeEventListener("pointermove", init);
    };
    window.addEventListener("pointermove", init, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId.current);
      running.current = false;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={el}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none"
      style={{
        background: "#00C6FF",
        boxShadow: "0 0 10px rgba(0,198,255,0.6)",
        zIndex: 999999999,
        willChange: "transform",   // dica pro compositor
        transition: "transform 0s", // zero delay de CSS
      }}
    />
  );
}

