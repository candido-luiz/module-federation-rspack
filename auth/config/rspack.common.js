export default {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            // 💡 CHAVE 1: Configuração do Preset-Env
            // Isso habilita as transformações de sintaxe modernas para atingir navegadores específicos (targets)
            // e lida com polyfills se necessário (embora o Rspack prefira polyfills via 'core-js' importado manualmente)
            env: { 
              targets: "defaults", // ou a string/array de navegadores que você usava, ex: ['last 2 versions', 'ie 11']
            },
            
            // 💡 CHAVE 2: Configuração do Plugin Transform-Runtime
            // Isso previne a duplicação de helpers do SWC/Babel em vários arquivos
            transform: {
              // Note: No SWC, o transform.runtime é uma configuração de alto nível, não dentro de 'jsc'
              runtime: true, 
              // A opção 'regenerator' é necessária se você usa async/await ou generators
              regenerator: true, 
            },
            
            // CHAVE 3: Configuração do React e Parser (Você já acertou essa parte!)
            jsc: {
              parser: {
                syntax: "ecmascript",
                // Habilita a sintaxe JSX
                jsx: true, 
              },
              transform: {
                react: {
                  runtime: "automatic",
                  // Mantenha "development: false" para builds de produção
                  development: false, 
                  // Você provavelmente vai querer 'refresh: true' se estiver usando o Hot Module Replacement (HMR) 
                  // do Rspack/React Fast Refresh
                  refresh: false, 
                },
              },
            },
          },
        },
      },
    ],
  },
};