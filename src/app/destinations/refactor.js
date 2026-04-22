const fs = require('fs');

let content = fs.readFileSync('AnuradhapuraDestinationPage.tsx', 'utf8');

content = content.replace(/const baseDark = '#090A09';/, "const baseDark = '#FAFAFA';");
content = content.replace(/const muted = '#939A95';/, "const muted = '#555555';");
content = content.replace(/const gold = '#C9A96E';/, "const gold = '#A67B40';");
content = content.replace(/const subtleBorder = 'rgba\\(255, 255, 255, 0\\.04\\)';/, "const subtleBorder = 'rgba(0, 0, 0, 0.08)';");
content = content.replace(/const glassBg = 'rgba\\(255, 255, 255, 0\\.02\\)';/, "const glassBg = 'rgba(255, 255, 255, 0.6)';");
content = content.replace(/export default function GenericDestinationPage\\(\\{ destinationId \\}: \\{ destinationId\\?: string \\}\\) \\{/, "export default function AnuradhapuraDestinationPage() {\n    const destinationId = 'anuradhapura';");

content = content.replace(/color: 'white'/g, "color: '#111518'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.7\\)'/g, "color: 'rgba(0,0,0,0.6)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.6\\)'/g, "color: 'rgba(0,0,0,0.6)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.55\\)'/g, "color: 'rgba(0,0,0,0.55)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.65\\)'/g, "color: 'rgba(0,0,0,0.65)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.8\\)'/g, "color: 'rgba(0,0,0,0.75)'");
content = content.replace(/color: 'rgba\\(255, 255, 255, 0\\.05\\)'/g, "color: 'rgba(0,0,0,0.05)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.02\\)'/g, "color: 'rgba(0,0,0,0.02)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.03\\)'/g, "color: 'rgba(0,0,0,0.03)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.015\\)'/g, "color: 'rgba(0,0,0,0.015)'");

content = content.replace(/background: 'rgba\\(255,255,255,0\\.1\\)'/g, "background: 'rgba(0,0,0,0.1)'");
content = content.replace(/background: 'rgba\\(255,255,255,0\\.05\\)'/g, "background: '#FFFFFF'");
content = content.replace(/background: '#050505'/g, "background: '#F0F0F0'");

content = content.replace(/background: rgba\\(255, 255, 255, 0\\.015\\);/g, "background: #FFFFFF;");
content = content.replace(/border: 1px solid rgba\\(255, 255, 255, 0\\.04\\);/g, "border: 1px solid rgba(0,0,0,0.04);");
content = content.replace(/background: rgba\\(255, 255, 255, 0\\.035\\);/g, "background: #F8F8F8;");
content = content.replace(/rgba\\(255, 255, 255, 0\\.05\\)/g, "rgba(0,0,0,0.05)");
content = content.replace(/rgba\\(255,255,255,0\\.015\\)/g, "rgba(0,0,0,0.015)");
content = content.replace(/rgba\\(255,255,255,0\\.03\\)/g, "rgba(0,0,0,0.03)");
content = content.replace(/rgba\\(255,255,255,0\\.025\\)/g, "rgba(0,0,0,0.025)");
content = content.replace(/rgba\\(255,255,255,0\\.06\\)/g, "rgba(0,0,0,0.06)");
content = content.replace(/rgba\\(255,255,255,0\\.1\\)/g, "rgba(0,0,0,0.05)");

content = content.replace(/textShadow: '0 20px 40px rgba\\(0,0,0,0\\.5\\)'/g, "textShadow: '0 10px 20px rgba(0,0,0,0.1)'");
content = content.replace(/textShadow: '0 0 20px rgba\\(201, 169, 110, 0\\.5\\)'/g, "textShadow: '0 0 20px rgba(176, 141, 87, 0.2)'");
content = content.replace(/textShadow: '0 0 20px rgba\\(201, 169, 110, 0\\.2\\)'/g, "textShadow: 'none'");

content = content.replace(/rgba\\(0,0,0,0\\.2\\)/g, "rgba(0,0,0,0.05)");
content = content.replace(/linear-gradient\\(180deg, transparent 50%, rgba\\(0,0,0,0\\.4\\) 100%\\)/g, "linear-gradient(180deg, transparent 50%, rgba(200,200,200,0.4) 100%)");

content = content.replace(/background: `\\$\\{gold\\}11`/g, "background: 'rgba(176, 141, 87, 0.05)'");
content = content.replace(/background: 'rgba\\(30,50,40,0\\.25\\)'/g, "background: 'rgba(230,240,235,0.8)'");
content = content.replace(/background: `\\$\\{gold\\}08`/g, "background: 'rgba(176, 141, 87, 0.03)'");

content = content.replace("willChange: 'transform'\\r\\n                }} />", `willChange: 'transform'
                }} />
                {/* Bright Overlay for white theme */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(250,250,250,0.3) 0%, #FAFAFA 100%)' }} />`);
content = content.replace("willChange: 'transform'\\n                }} />", `willChange: 'transform'
                }} />
                {/* Bright Overlay for white theme */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(250,250,250,0.3) 0%, #FAFAFA 100%)' }} />`);

fs.writeFileSync('AnuradhapuraDestinationPage.tsx', content);
