import React, { useState } from 'react';
import { Calculator, Brain, Shuffle, Layers } from 'lucide-react';
import ResolverConIA from './components/ResolverConIA';
import PermutacionComponent from './components/PermutacionComponent';
import VariacionComponent from './components/VariacionComponent';

const App = () => {
  const [activeTab, setActiveTab] = useState('ia');

  return (
    <div className="min-h-screen bg-gray-600 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Combinatoria IA</h1>
          </div>
          <p className="text-white text-sm sm:text-base md:text-lg px-2">Resuelve problemas con Claude AI o calcula manualmente</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-1.5 sm:p-2 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setActiveTab('ia')}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                activeTab === 'ia'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Resolver con IA</span>
              <span className="sm:hidden">IA</span>
            </button>
            <button
              onClick={() => setActiveTab('permutacion')}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                activeTab === 'permutacion'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
              Permutaciones
            </button>
            <button
              onClick={() => setActiveTab('variacion')}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                activeTab === 'variacion'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              Variaciones
            </button>
          </div>
        </div>

        {activeTab === 'ia' && <ResolverConIA />}
        {activeTab === 'permutacion' && <PermutacionComponent />}
        {activeTab === 'variacion' && <VariacionComponent />}
      </div>
    </div>
  );
};

export default App;