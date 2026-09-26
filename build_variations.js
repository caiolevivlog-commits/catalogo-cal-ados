import fs from 'fs';

const links = JSON.parse(fs.readFileSync('shopee_raw_links.json', 'utf8'));

// Build families
// Model types:
// 1. "Viviane": Salto Bloco Tira Dedinho (Prata, Doce de Leite, Metalizada Dourada)
// 2. "Gisele": Salto Bloco Verniz (Vermelho Marsala, Off-White, Preto)
// 3. "Laço": Salto Bloco Quadrado Laço (Off-White, Rose Rosado, Café Chocolate)
// 4. "Madrid Pedraria": Salto Bloco Pedraria (Preto, Off-White, etc.)
// 5. "Nathália": Salto Bloco Cabedal em X (3 cores)
// 6. "Tiras Cruzadas Dedinho": Salto Bloco (Amêndoa, Marsala, Marinho)
// 7. "Paolla": Tênis Cadarço (Off-White e Preto, Preto e Off-White, Rosado / Rose Gold, Namorados)
// 8. "Carol": Tênis Cadarço Couro Legítimo (Branco Dourado Solado Caramelo, Branco)
// 9. "Via Bella Cadarço Básico": (Branco Dourado, Branco e Preto, Branco e Rosa, Azul Jeans)
// 10. "Canoa": (Preto Camurça, Palha e Off-White, Off White, Marrom, Camurça Marrom)
// 11. "Botinha Inverno Zíper": (Camurça Café, Camurça Caqui, Couro Preto, Couro Caramelo, Couro Café)
// 12. "Mary Jane / Velcro": (Preto, Dourado, Marrom Café, Nude Rosado, Off White)
// 13. "Slip On Tradicional / Lona": (Branco, Preto, Caramelo, Azul Jeans)
// 14. "Slip On Vazado": (Dourado Metalizado, Nude Rosado, Branco, Preto, Marrom Café, Caramelo)
// 15. "Rasteirinha": (Couro Legítimo, Couro Alternativo)
// 16. "Tênis Elástico Via LaBella": (Calce Fácil)

console.log('Mapping product families...');
