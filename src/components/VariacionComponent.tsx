import React, { useState } from 'react';
import { Layers, Info, AlertCircle, Zap } from 'lucide-react';

interface Resultado {
  n: number;
  k: number;
  elementos: string;
  total: number;
  variaciones: string[][];
  mostrarLista: boolean;
}

const VariacionComponent: React.FC = () => {
  const [n, setN] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [elementos, setElementos] = useState<string>('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const generarVariaciones = (arr: string[], k: number): string[][] => {
    if (k === 0) return [[]];
    if (arr.length === 0) return [];

    const variaciones: string[][] = [];
    const subVariaciones = generarVariaciones(arr, k - 1);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < subVariaciones.length; j++) {
        variaciones.push([arr[i]].concat(subVariaciones[j]));
      }
    }

    return variaciones;
  };

  const calcularVariaciones = (): void => {
    const nNum = parseInt(n);
    const kNum = parseInt(k);

    if (!n || !k || nNum <= 0 || kNum <= 0) {
      alert('Por favor, ingresa valores válidos para n y k (números positivos)');
      return;
    }

    if (nNum > 20) {
      alert('Por favor, usa n ≤ 20 para evitar cálculos excesivos');
      return;
    }

    if (kNum > 10) {
      alert('Por favor, usa k ≤ 10 para evitar cálculos muy grandes');
      return;
    }

    let elementosArray: string[] = [];
    if (elementos.trim()) {
      elementosArray = elementos.split('');
      if (elementosArray.length !== nNum) {
        alert(`Debes ingresar exactamente ${nNum} elementos`);
        return;
      }
    } else {
      elementosArray = Array.from({ length: nNum }, (_, i) => (i + 1).toString());
    }

    const totalVariaciones = Math.pow(nNum, kNum);
    const variaciones = totalVariaciones <= 10000 ? generarVariaciones(elementosArray, kNum) : [];

    setResultado({
      n: nNum,
      k: kNum,
      elementos: elementosArray.join(', '),
      total: totalVariaciones,
      variaciones: variaciones,
      mostrarLista: totalVariaciones <= 10000
    });
  };

  const limpiar = () => {
    setN('');
    setK('');
    setElementos('');
    setResultado(null);
  };

  const cargarEjemplo = (ejemplo: string) => {
    switch(ejemplo) {
      case 'dados':
        setN('6');
        setK('2');
        setElementos('');
        break;
      case 'letras':
        setN('3');
        setK('2');
        setElementos('ABC');
        break;
      case 'digitos':
        setN('10');
        setK('3');
        setElementos('');
        break;
    }
  };

  return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Variaciones con Repetición</h2>
                <p className="text-gray-500 text-sm">Fórmula: VR(n,k) = n^k</p>
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
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                ¿Qué son las variaciones con repetición?
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                Las <strong>variaciones con repetición</strong> son todas las formas de seleccionar k elementos 
                de un conjunto de n elementos, donde:
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-2">
                <li><strong>El orden SÍ importa</strong> (AB es diferente de BA)</li>
                <li><strong>Los elementos SÍ se pueden repetir</strong> (AA es válido)</li>
              </ul>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Fórmula:</strong> VR(n,k) = n^k (n elevado a la k)
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Ejemplo:</strong> Con elementos {'{1,2,3}'} tomados de 2 en 2 → 3² = 9 variaciones: 
                11, 12, 13, 21, 22, 23, 31, 32, 33
              </p>
            </div>
          )}

          {/* Ejemplos rápidos */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Ejemplos rápidos:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => cargarEjemplo('dados')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium"
              >
                🎲 2 dados (6,2)
              </button>
              <button
                onClick={() => cargarEjemplo('letras')}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all text-sm font-medium"
              >
                🔤 Letras ABC (3,2)
              </button>
              <button
                onClick={() => cargarEjemplo('digitos')}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm font-medium"
              >
                🔢 PIN de 3 dígitos (10,3)
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Número total de elementos (n):
                </label>
                <input
                  type="number"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  min="1"
                  max="20"
                  placeholder="Ej: 3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">¿Cuántos elementos diferentes hay?</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tamaño de cada variación (k):
                </label>
                <input
                  type="number"
                  value={k}
                  onChange={(e) => setK(e.target.value)}
                  min="1"
                  max="10"
                  placeholder="Ej: 2"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">¿Cuántos elementos tomas?</p>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Elementos personalizados (opcional):
              </label>
              <input
                type="text"
                value={elementos}
                onChange={(e) => setElementos(e.target.value)}
                placeholder="Ej: ABC (debe tener exactamente n caracteres)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Si lo dejas vacío, se usarán números del 1 al n
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={calcularVariaciones}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-5 h-5" />
              Calcular Variaciones
            </button>
            {(n || k || elementos || resultado) && (
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
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-700 mb-1">🎯 Elementos:</h3>
                <p className="text-gray-700 text-lg font-mono">{resultado.elementos}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-700 mb-1">📐 Parámetros:</h3>
                <p className="text-gray-700 text-lg">
                  n = {resultado.n} (elementos disponibles), k = {resultado.k} (posiciones a llenar)
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl text-white shadow-lg">
                <h3 className="font-semibold mb-2">📊 Total de variaciones:</h3>
                <p className="text-4xl font-bold mb-2">
                  {resultado.n}^{resultado.k} = {resultado.total.toLocaleString()}
                </p>
                <p className="text-sm opacity-90">
                  {resultado.k === 1 && `Hay ${resultado.n} formas de elegir 1 elemento`}
                  {resultado.k === 2 && `Cada posición puede ser cualquiera de los ${resultado.n} elementos`}
                  {resultado.k === 3 && `Tres posiciones, cada una con ${resultado.n} opciones`}
                  {resultado.k >= 4 && `${resultado.k} posiciones, cada una con ${resultado.n} opciones`}
                </p>
              </div>

              {resultado.mostrarLista ? (
                <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    📋 Todas las variaciones ({resultado.variaciones.length}):
                  </h3>
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {resultado.variaciones.map((variacion, index) => (
                        <div 
                          key={index} 
                          className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow font-mono text-gray-700 text-center"
                        >
                          <span className="text-blue-600 font-semibold text-xs block mb-1">
                            #{index + 1}
                          </span>
                          <span className="text-lg tracking-wider font-bold">
                            {variacion.join('')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Advertencia
                  </h3>
                  <p className="text-yellow-700 text-sm mb-2">
                    El número de variaciones ({resultado.total.toLocaleString()}) es muy grande para mostrarse completamente.
                  </p>
                  <p className="text-yellow-600 text-xs">
                    💡 Se muestran todas las variaciones solo cuando son 10,000 o menos.
                  </p>
                </div>
              )}

              {/* Ejemplos si no se muestran todas */}
              {!resultado.mostrarLista && resultado.total <= 100000 && (
                <div className="bg-cyan-50 p-5 rounded-xl border-2 border-cyan-200">
                  <h3 className="font-semibold text-cyan-700 mb-3">
                    🔍 Primeras 12 variaciones de ejemplo:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {generarVariaciones(resultado.elementos.split(', '), resultado.k).slice(0, 12).map((variacion, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-3 rounded-lg shadow-sm font-mono text-gray-700 text-center"
                      >
                        <span className="text-cyan-600 font-semibold text-xs block mb-1">
                          #{index + 1}
                        </span>
                        <span className="text-lg tracking-wider font-bold">
                          {variacion.join('')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-cyan-600 mt-3 text-center">
                    ... y {resultado.total - 12} variaciones más
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center text-white text-sm opacity-90 space-y-1">
          <p>📚 <strong>Diferencia clave:</strong> En variaciones CON repetición se puede usar el mismo elemento varias veces</p>
          <p>🎲 Ejemplo: Lanzar 2 dados = 6² = 36 resultados posibles</p>
        </div>
      </div>
  );
};

export default VariacionComponent;