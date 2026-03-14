const https = require('https');
https.get('https://lavadental.lv/en', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => { 
    console.log("Got data length:", data.length);
    
    // Look for GSAP, ScrollTrigger, Framer Motion
    console.log("Contains GSAP:", data.toLowerCase().includes('gsap'));
    console.log("Contains ScrollTrigger:", data.toLowerCase().includes('scrolltrigger'));
    
    // Extract unique classes
    const classMatches = data.match(/class="([^"]+)"/g) || [];
    const classNames = classMatches.map(c => c.replace('class="', '').replace('"', '').split(' ')).flat();
    const uniqueClasses = [...new Set(classNames)];
    
    console.log('\nRelevant animation classes:');
    uniqueClasses.forEach(c => {
      if(c.includes('fade') || c.includes('parallax') || c.includes('reveal') || c.includes('anim') || c.includes('scroll')) {
        console.log(c);
      }
    });

    console.log('\nData attributes:');
    const dataAttrs = data.match(/data-[a-zA-Z-]+="[^"]+"/g) || [];
    const uniqueDataAttrs = [...new Set(dataAttrs.map(a => a.split('=')[0]))];
    console.log(uniqueDataAttrs.filter(a => a.includes('anim') || a.includes('scroll') || a.includes('reveal')));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
