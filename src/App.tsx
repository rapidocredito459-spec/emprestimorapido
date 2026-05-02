/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  TrendingDown,
  ArrowRight,
  Info
} from 'lucide-react';
import { LOAN_DATA, INSTALLMENT_OPTIONS } from './constants';

export default function App() {
  const [selectedAmountIndex, setSelectedAmountIndex] = useState(5); // Default to 10k
  const [selectedTerm, setSelectedTerm] = useState(48); // Default to 48x

  const currentOption = LOAN_DATA[selectedAmountIndex];
  const monthlyPayment = currentOption.installments[selectedTerm];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const currentAmount = currentOption.amount;
  const totalAmount = monthlyPayment * selectedTerm;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200">
              RC
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Rápido<span className="text-blue-600">Crédito</span>
            </span>
          </div>
          <div className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-slate-600">
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Simulador</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Benefícios</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Tabela de Taxas</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Sobre</li>
            </ul>
          </div>
          <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-95">
            Solicitar Empréstimo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-6">
                <TrendingDown className="h-3 w-3" />
                <span>As melhores taxas do mercado</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                Crédito rápido, <br />
                <span className="text-blue-600">para todos.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-lg">
                Precisa de dinheiro rápido? Simule agora seu empréstimo. Atendemos <strong>negativados, autônomos e pessoas com restrição no nome</strong> com aprovação facilitada.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { icon: Clock, label: 'Aprovação para Negativados' },
                  { icon: ShieldCheck, label: 'Sem Burocracia' },
                  { icon: CheckCircle2, label: 'Para Autônomos' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Simulator Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-100/50 sm:p-8"
              id="simulator"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Simulador Digital
                </h2>
                <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600 border border-green-100">
                  ONLINE AGORA
                </div>
              </div>

              <div className="space-y-8">
                {/* Amount Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                      Valor Desejado
                    </label>
                    <span className="text-3xl font-bold text-blue-600">
                      {formatCurrency(currentAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={LOAN_DATA.length - 1}
                    step="1"
                    value={selectedAmountIndex}
                    onChange={(e) => setSelectedAmountIndex(parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span>R$ 5 MIL</span>
                    <span>R$ 100 MIL</span>
                    <span>R$ 500 MIL</span>
                  </div>
                </div>

                {/* Term Selector */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Plano de Pagamento
                  </label>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {INSTALLMENT_OPTIONS.map((term) => (
                      <button
                        key={term}
                        onClick={() => setSelectedTerm(term)}
                        className={`flex h-12 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all ${
                          selectedTerm === term
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {term}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-100"></div>

                {/* Result Section */}
                <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-200">
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] opacity-80 mb-1">
                      Valor da Parcela Mensal
                    </span>
                    <motion.div 
                      key={`${selectedAmountIndex}-${selectedTerm}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-black mb-1"
                    >
                      {formatCurrency(monthlyPayment)}
                    </motion.div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-70">
                      <span>{selectedTerm} MESES PARA PAGAR</span>
                      <span className="h-1 w-1 rounded-full bg-white/50"></span>
                      <span>TOTAL DE {formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/5511925082569?text=Olá! Acabei de fazer uma simulação no site Rápido Crédito.%0A%0AGostaria de solicitar um empréstimo com as seguintes condições:%0A- Valor: ${formatCurrency(currentAmount)}%0A- Parcelas: ${selectedTerm}x de ${formatCurrency(monthlyPayment)}%0A- Total a pagar: ${formatCurrency(totalAmount)}%0A%0AFico no aguardo do retorno.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 text-center font-bold text-white shadow-xl shadow-green-100 hover:bg-green-600 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="h-5 w-5 fill-white" />
                  Solicitar via WhatsApp
                </a>
                
                <p className="text-center text-[10px] text-slate-400">
                   *Sujeito a análise de crédito. Taxas fixas conforme tabela vigente.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Por que escolher o Rápido Crédito?</h2>
            <p className="mt-4 text-slate-600">Simplicidade e transparência em cada etapa do seu processo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Aprovação para Negativados',
                description: 'Liberamos crédito mesmo com restrição no CPF. Nossa análise é focada na sua capacidade atual de pagamento.',
                icon: ShieldCheck
              },
              {
                title: 'Especial para Autônomos',
                description: 'Sem necessidade de comprovação formal de renda. Processo simplificado para profissionais liberais e MEI.',
                icon: Calculator
              },
              {
                title: 'Dinheiro na Hora',
                description: 'Processo 100% online e urgente. Após aprovado, o valor é transferido imediatamente para sua conta.',
                icon: Clock
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all group">
                <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Table Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tabela de Preços Completa</h2>
              <p className="mt-2 text-slate-600">Confira todos os planos disponíveis para você planejar seu futuro.</p>
            </div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Atualizada em Maio 2024
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
            <table className="w-full text-left border-collapse border-spacing-0">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="sticky left-0 bg-blue-700 p-4 font-bold text-xs uppercase tracking-widest border-r border-blue-500 min-w-[120px]">Valor</th>
                  {INSTALLMENT_OPTIONS.map(opt => (
                    <th key={opt} className="p-4 font-bold text-xs uppercase tracking-widest text-center">{opt}x</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LOAN_DATA.map((row, idx) => (
                  <tr key={row.amount} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="sticky left-0 p-4 font-bold text-slate-900 bg-inherit border-r border-slate-100 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                      {row.amount >= 1000 ? `${row.amount / 1000} MIL` : row.amount}
                    </td>
                    {INSTALLMENT_OPTIONS.map(opt => (
                      <td key={opt} className="p-4 text-sm font-medium text-slate-600 text-center">
                        {formatCurrency(row.installments[opt])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-4">
            <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-600">
              <strong>Nota:</strong> Os valores exibidos na tabela referem-se à parcela mensal base para clientes com perfil de crédito excelente. O valor final pode sofrer pequenas variações conforme o score de crédito do solicitante e taxas adicionais de cada instituição parceira.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                  RC
                </div>
                <span className="text-lg font-bold">
                  Rápido<span className="text-blue-500">Crédito</span>
                </span>
              </div>
              <p className="max-w-sm text-sm leading-6">
                A Rápido Crédito é uma plataforma digital que atua como correspondente bancário para facilitar o acesso ao crédito. Trabalhamos com as melhores instituições para garantir as menores taxas do mercado brasileiro.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Simulador de Empréstimo</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Tabela de Preços</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Aviso de Privacidade</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Termos de Uso</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contato</h4>
              <ul className="space-y-4 text-sm">
                <li>comercial@rapidocredito.com.br</li>
                <li>Atendimento: Seg à Sex, 08h-18h</li>
                <li className="flex gap-4 pt-4">
                  <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 text-[10px] leading-relaxed text-slate-500">
            A Rápido Crédito não é uma instituição financeira e não realiza operações de crédito diretamente. A Rápido Crédito é uma plataforma digital que atua como correspondente bancário de diversas instituições financeiras. O atraso no pagamento das parcelas do empréstimo pessoal pode gerar encargos como multas e juros de mora. As taxas de juros, prazos e condições de pagamento variam conforme a análise de crédito de cada cliente.
            <br /><br />
            CNPJ do Banco Central: 00.038.166/0001-05 | © {new Date().getFullYear()} Rápido Crédito S.A. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
