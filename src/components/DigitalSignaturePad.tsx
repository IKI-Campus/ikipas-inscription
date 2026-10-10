import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, RotateCcw, Check, X, ShieldCheck, Eraser } from 'lucide-react';

interface DigitalSignaturePadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
  title: string;
  signeeName: string;
  role: 'eleve' | 'tuteur';
}

export const DigitalSignaturePad: React.FC<DigitalSignaturePadProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  signeeName,
  role,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#0f172a'); // dark navy ink

  // Initialize canvas
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Handle high DPR for crisp lines on mobile screens
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2.5;

        // Clean white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
      setHasDrawn(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as MouseEvent).clientX - rect.left,
        y: (e as MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e.nativeEvent);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.closePath();
    }
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Export as clean PNG
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1A2819] border border-[#243324]/20 dark:border-white/20 shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#243324]/10 dark:border-white/10 flex items-center justify-between bg-[#FBF9F5] dark:bg-[#152214]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#3B4D36]/10 text-[#3B4D36] dark:text-[#A3B59E] flex items-center justify-center">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2B1D] dark:text-[#F4EFE6]">
                    {title}
                  </h3>
                  <p className="text-xs text-[#657351] dark:text-[#A3B59E]">
                    {role === 'eleve' ? 'توقيع التلميذ' : 'توقيع ولي الأمر'} • {signeeName || 'Candidat'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Signature Area */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="text-xs text-[#4A5D44] dark:text-[#CBD7C7] flex items-center justify-between">
                <span>Signez avec votre doigt (sur téléphone) ou avec la souris :</span>
                <span className="font-mono text-[10px] text-gray-500">Cadre officiel</span>
              </div>

              {/* Canvas Box */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl border-2 border-dashed border-[#243324]/25 dark:border-white/25 bg-white overflow-hidden shadow-inner touch-none">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair"
                />

                {!hasDrawn && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-gray-400 select-none">
                    <PenTool className="w-8 h-8 stroke-1 mb-2 text-gray-300" />
                    <span className="text-xs font-medium">Tracez votre signature ici</span>
                    <span className="text-[10px] text-gray-400 mt-0.5" dir="rtl">
                      ضع إمضاءك باليد أو اللمس هنا
                    </span>
                  </div>
                )}

                {/* Subtle base signing line */}
                <div className="absolute bottom-6 left-6 right-6 border-b border-gray-300/60 pointer-events-none flex justify-between text-[9px] text-gray-400">
                  <span>Ligne de signature</span>
                  <span>(توقيع معتمد)</span>
                </div>
              </div>

              {/* Ink & Actions Toolbar */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Effacer & Recommencer</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500">Couleur d'encre :</span>
                  <button
                    type="button"
                    onClick={() => setStrokeColor('#0f172a')}
                    className={`w-5 h-5 rounded-full bg-[#0f172a] border ${
                      strokeColor === '#0f172a' ? 'ring-2 ring-[#3B4D36] ring-offset-1' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setStrokeColor('#1e40af')}
                    className={`w-5 h-5 rounded-full bg-[#1e40af] border ${
                      strokeColor === '#1e40af' ? 'ring-2 ring-[#3B4D36] ring-offset-1' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 sm:p-5 border-t border-[#243324]/10 dark:border-white/10 bg-[#FBF9F5] dark:bg-[#152214] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!hasDrawn}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                  hasDrawn
                    ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28]'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Valider et appliquer cette signature</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
