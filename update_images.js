const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const images = fs.readdirSync(publicImagesDir).filter(f => f.endsWith('.jpeg') && f !== 'logo.jpeg');

const filesToUpdate = [
    'components/Navbar.tsx',
    'components/Footer.tsx',
    'lib/data.ts',
    'components/CollectionCTA.tsx',
    'components/Hero.tsx',
    'components/CategorySplit.tsx',
    'components/BrandStory.tsx',
    'components/BrandIntro.tsx',
    'components/Craftsmanship.tsx',
    'app/about/page.tsx'
];

let imageIndex = 0;
const getImage = () => {
    const img = '/images/' + images[imageIndex % images.length];
    imageIndex++;
    return img;
};

// Map old images to new ones to keep consistency if the same old image is used multiple times
const imageMap = {};

for (const file of filesToUpdate) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace logo specifically
    content = content.replace(/\/WhatsApp Image 2026-09-25 at 10\.53\.17 PM \(1\)\.jpeg/g, '/images/logo.jpeg');
    
    // Replace other WhatsApp images
    const regex = /\/WhatsApp Image 2026-09-25 at [^"]+/g;
    content = content.replace(regex, (match) => {
        if (!imageMap[match]) {
            imageMap[match] = getImage();
        }
        return imageMap[match];
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
}
