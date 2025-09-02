#!/bin/bash

echo "🚀 Iniciando Golden Raspberry Awards Frontend..."
echo ""

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js versão 16 ou superior."
    echo "Download: https://nodejs.org/"
    exit 1
fi

# Verifica se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm."
    exit 1
fi

echo "✅ Node.js e npm encontrados."
echo ""

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo ""
fi

echo "🔧 Iniciando servidor de desenvolvimento..."
echo ""
echo "📱 A aplicação estará disponível em: http://localhost:5173"
echo "🛑 Para parar o servidor, pressione Ctrl+C"
echo ""

npm run dev
