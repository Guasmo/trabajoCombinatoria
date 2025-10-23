import { useState } from 'react';
import { Brain, Sparkles, Settings } from 'lucide-react';

type ModelProvider = 'ollama';

const ResolverConIA = () => {
  const [provider, setProvider] = useState<ModelProvider>('ollama');
  const [apiUrl, setApiUrl] = useState('http://localhost:11434');
  const [modelName, setModelName] = useState('mistral');
  const [problema, setProblema] = useState('');
  type Resultado = {
    problema: string;
    solucion: string;
  } | null;
  
  const [resultado, setResultado] = useState<Resultado>(null);
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const resolverProblema = async () => {
    if (!problema.trim()) {
      alert('Por favor, describe el problema a resolver');
      return;
    }

    setLoading(true);
    setResultado(null);

    const prompt = `Eres un experto en combinatoria y matemáticas discretas. Analiza el siguiente 
    problema y resuélvelo paso a paso:

${problema}

Por favor:
1. Identifica qué tipo de problema es (permutaciones, variaciones, combinaciones, etc.)
2. Explica qué fórmula se debe usar y por qué
3. Realiza los cálculos paso a paso
4. Presenta la respuesta final de manera clara
5. Muestra todos los ejemplos de las combinaciones,  No importa la cantidad de resultados que haya 
muestralos todos no importa que sean excesivos, MUESTRA UNA PARTE DE UNOS 20 resultados


Responde de manera clara, educativa y detallada.`;

    try {
      let respuesta = '';

      if (provider === 'ollama') {
        // Ollama API
        const response = await fetch(`${apiUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: modelName,
            prompt: prompt,
            stream: false
          })
        });

        if (!response.ok) throw new Error('Error al conectar con Ollama. Asegúrate de que está corriendo.');
        const data = await response.json();
        respuesta = data.response;

      }

      setResultado({
        problema: problema,
        solucion: respuesta
      });
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 rounded-xl">
                <Brain className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Resolver con Ollama</h2>
              </div>
            </div>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Configuración"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {showConfig && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-4 border-2 border-gray-200">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Proveedor de IA:
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as ModelProvider)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                >
                  <option value="ollama">🖥️ Ollama (Local - Gratis)</option>
                </select>
              </div>

              {provider === 'ollama' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      URL de Ollama:
                    </label>
                    <input
                      type="text"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="http://localhost:11434"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Modelo:
                    </label>
                    <input
                      type="text"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      placeholder="llama2, mistral, llama3, codellama..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Describe tu problema de combinatoria:
              </label>
              <textarea
                value={problema}
                onChange={(e) => setProblema(e.target.value)}
                placeholder="Ejemplos:&#10;• ¿De cuántas formas se pueden ordenar las letras de la palabra CASA?&#10;• ¿Cuántos números de 3 dígitos se pueden formar con 1, 2, 3, 4 si se pueden repetir?&#10;• ¿De cuántas maneras se pueden elegir 3 personas de un grupo de 10?"
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all resize-none"
              />
            </div>
          </div>

          <button
            onClick={resolverProblema}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analizando con IA...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Resolver con IA
              </>
            )}
          </button>

          {resultado && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl border-l-4 border-pink-500">
                <h3 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
                  📝 Problema:
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">{resultado.problema}</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <Brain className="w-6 h-6 text-pink-600" />
                  Solución:
                </h3>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed prose prose-sm max-w-none">
                  {resultado.solucion}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default ResolverConIA;