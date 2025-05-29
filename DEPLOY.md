# Guia de Deploy - CRUD Produtos

## Deploy Local

### Servidor de Desenvolvimento
```bash
npm start
# Acesse: http://localhost:3000
```

### Build de Produção
```bash
npm run build
npm install -g serve
serve -s build
# Acesse: http://localhost:3000
```

## Deploy em Plataformas

### Vercel (Recomendado)
1. Instale a CLI do Vercel:
```bash
npm i -g vercel
```

2. Faça login e deploy:
```bash
vercel login
vercel --prod
```

3. Configure domínio personalizado (opcional):
```bash
vercel domains add seudominio.com
```

### Netlify
1. Conecte seu repositório GitHub ao Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Deploy automático a cada push

### GitHub Pages
1. Instale gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Adicione ao package.json:
```json
{
  "homepage": "https://seuusuario.github.io/crud-produtos",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Firebase Hosting
1. Instale Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Inicialize projeto:
```bash
firebase login
firebase init hosting
```

3. Configure firebase.json:
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:
```bash
npm run build
firebase deploy
```

## Configurações de Produção

### Variáveis de Ambiente
Crie arquivo `.env.production`:
```env
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=https://api.exemplo.com
GENERATE_SOURCEMAP=false
```

### Otimizações
- ✅ Code splitting automático
- ✅ Tree shaking
- ✅ Minificação CSS/JS
- ✅ Compressão gzip
- ✅ Cache busting

### Performance
- Bundle size: ~107KB (gzipped)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

## Monitoramento

### Analytics (Opcional)
Adicione Google Analytics:
```typescript
// src/utils/analytics.ts
export const trackEvent = (action: string, category: string) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
    });
  }
};
```

### Error Tracking
Integre Sentry para monitoramento de erros:
```bash
npm install @sentry/react
```

## Checklist de Deploy

- [ ] Build sem erros
- [ ] Testes passando
- [ ] Validação de acessibilidade
- [ ] Performance otimizada
- [ ] SEO básico configurado
- [ ] Favicon personalizado
- [ ] Meta tags apropriadas
- [ ] HTTPS habilitado
- [ ] Compressão gzip ativa
- [ ] Cache headers configurados

## Troubleshooting

### Build falha?
- Verifique versões do Node.js (16+)
- Limpe cache: `npm ci`
- Verifique imports/exports

### Deploy não funciona?
- Confirme build local funciona
- Verifique configurações da plataforma
- Teste com `serve -s build`

### Performance lenta?
- Analise bundle: `npm run build -- --analyze`
- Otimize imagens
- Implemente lazy loading 