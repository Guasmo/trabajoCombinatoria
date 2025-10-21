import React, { useState } from 'react';
import { Shuffle, Info, AlertCircle } from 'lucide-react';

interface Resultado {
  valor: string;
  n: number;
  total: number;
  permutaciones: string[][];
  mostrarLista: boolean;
}

const PermutacionComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const permutarArray = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr];
    
    const perms: string[][] = [];
    
    for (let i = 0; i < arr.length; i++) {
      const actual = arr[i];
      const restantes = arr.slice(0, i).concat(arr.slice(i + 1));
      const permRestantes = permutarArray(restantes);
      
      for (let j = 0; j < permRestantes.length; j++) {
        perms.push([actual].concat(permRestantes[j]));
      }
    }
    
    return perms;
  };

  const generarPermutaciones = (): void => {
    if (input.trim() === '') {
      alert('Por favor, ingresa un texto o número');
      return;
    }
    if (input.length > 8) {
      alert('Por favor, ingresa máximo 8 caracteres para evitar cálculos excesivos');
      return;
    }

    const caracteres = input.split('');
    const n = caracteres.length;
    const totalPermutaciones = factorial(n);
    const permutaciones = totalPermutaciones <= 5000 ? permutarArray(caracteres) : [];

    setResultado({
      valor: input,
      n: n,
      total: totalPermutaciones,
      permutaciones: permutaciones,
      mostrarLista: totalPermutaciones <= 5000
    });
  };

  const limpiar = () => {
    setInput('');
    setResultado(null);
  };

  return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Shuffle className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Permutaciones</h2>
                <p className="text-gray-500 text-sm">Fórmula: P(n) = n!</p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Información"
            >
              <Info className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {showInfo && (
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <h3 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                ¿Qué son las permutaciones?
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                Las <strong>permutaciones</strong> son todas las formas posibles de ordenar un conjunto de elementos. 
                El orden SÍ importa, por lo que ABC es diferente de BAC.
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Fórmula:</strong> P(n) = n! (factorial de n)
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Ejemplo:</strong> Para "ABC" → 3! = 6 permutaciones: ABC, ACB, BAC, BCA, CAB, CBA
              </p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Ingresa texto o número (máximo 8 caracteres):
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generarPermutaciones()}
              maxLength={8}
              placeholder="Ej: ABC, 123, HOLA"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-lg"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Puedes usar letras, números o símbolos. Cada carácter será un elemento único.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generarPermutaciones}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Shuffle className="w-5 h-5" />
              Calcular Permutaciones
            </button>
            {(input || resultado) && (
              <button
                onClick={limpiar}
                className="px-6 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-all"
              >
                Limpiar
              </button>
            )}
          </div>

          {resultado && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-700 mb-1">📝 Valor ingresado:</h3>
                <p className="text-gray-700 text-xl font-mono">{resultado.valor}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-700 mb-1">🔢 Cantidad de caracteres:</h3>
                <p className="text-gray-700 text-lg">n = {resultado.n}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-xl text-white shadow-lg">
                <h3 className="font-semibold mb-2">📊 Total de permutaciones:</h3>
                <p className="text-4xl font-bold mb-2">{resultado.n}! = {resultado.total.toLocaleString()}</p>
                <p className="text-sm opacity-90">
                  {resultado.n === 1 && "Solo hay 1 forma de ordenar un único elemento"}
                  {resultado.n === 2 && "Hay 2 formas de ordenar 2 elementos"}
                  {resultado.n === 3 && "Hay 6 formas de ordenar 3 elementos"}
                  {resultado.n === 4 && "Hay 24 formas de ordenar 4 elementos"}
                  {resultado.n === 5 && "Hay 120 formas de ordenar 5 elementos"}
                  {resultado.n === 6 && "Hay 720 formas de ordenar 6 elementos"}
                  {resultado.n === 7 && "Hay 5,040 formas de ordenar 7 elementos"}
                  {resultado.n === 8 && "Hay 40,320 formas de ordenar 8 elementos"}
                </p>
              </div>

              {resultado.mostrarLista ? (
                <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    📋 Todas las permutaciones ({resultado.permutaciones.length}):
                  </h3>
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                    {resultado.permutaciones.map((perm, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow font-mono text-gray-700 flex items-center gap-3"
                      >
                        <span className="text-purple-600 font-semibold min-w-[3rem]">
                          {index + 1}.
                        </span>
                        <span className="text-lg tracking-wider">
                          {perm.join('')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Advertencia
                  </h3>
                  <p className="text-yellow-700 text-sm mb-2">
                    El número de permutaciones ({resultado.total.toLocaleString()}) es muy grande para mostrarse completamente.
                  </p>
                  <p className="text-yellow-600 text-xs">
                    💡 Se muestran todas las permutaciones solo cuando son 5,000 o menos.
                  </p>
                </div>
              )}

              {/* Ejemplos de las primeras permutaciones si no se muestran todas */}
              {!resultado.mostrarLista && resultado.n <= 8 && (
                <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                  <h3 className="font-semibold text-blue-700 mb-3">
                    🔍 Primeras 6 permutaciones de ejemplo:
                  </h3>
                  <div className="space-y-2">
                    {permutarArray(resultado.valor.split('')).slice(0, 6).map((perm, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-3 rounded-lg shadow-sm font-mono text-gray-700 flex items-center gap-3"
                      >
                        <span className="text-blue-600 font-semibold min-w-[3rem]">
                          {index + 1}.
                        </span>
                        <span className="text-lg tracking-wider">
                          {perm.join('')}
                        </span>
                      </div>
                    ))}
                    <p className="text-xs text-blue-600 mt-3">
                      ... y {resultado.total - 6} permutaciones más
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center text-white text-sm opacity-90">
          <p>📚 <strong>Factorial:</strong> 5! = 5 × 4 × 3 × 2 × 1 = 120</p>
        </div>
      </div>
  );
};

export default PermutacionComponent;