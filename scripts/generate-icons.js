const fs = require('fs');
const path = require('path');

// مسیرهای ورودی و خروجی
const SVG_DIR = path.join(__dirname, '../src/assets/icons');
const OUTPUT_DIR = path.join(__dirname, '../src/components/shared/icons');
const INDEX_FILE = path.join(OUTPUT_DIR, 'index.ts');

// اطمینان از وجود پوشه خروجی
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// تابع برای تبدیل نام فایل به نام کامپوننت
function toComponentName(filename) {
    // حذف پسوند .svg
    const name = filename.replace(/\.svg$/i, '');
    
    // تبدیل به PascalCase
    return name
        .split(/[-_\s]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('') + 'Icon';
}

// تابع برای تبدیل kebab-case به camelCase
function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// تابع برای تبدیل attribute های SVG به camelCase
function convertAttributesToCamelCase(content) {
    // تبدیل همه attribute های با خط تیره به camelCase
    // این regex attribute های مثل fill-rule, clip-rule, stop-color, stroke-miterlimit و غیره را پیدا می‌کند
    return content.replace(/(\w+(?:-\w+)+)=/g, (match) => {
        return kebabToCamel(match);
    });
}

// تابع برای parse کردن SVG
function parseSVG(svgContent) {
    // استخراج viewBox
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
    
    // استخراج width و height (اختیاری)
    const widthMatch = svgContent.match(/width=["']([^"']+)["']/i);
    const heightMatch = svgContent.match(/height=["']([^"']+)["']/i);
    const width = widthMatch ? widthMatch[1] : null;
    const height = heightMatch ? heightMatch[1] : null;
    
    // استخراج محتوای داخلی SVG (بدون تگ <svg>)
    let innerContent = svgContent
        .replace(/<svg[^>]*>/i, '')
        .replace(/<\/svg>/i, '')
        .trim();
    
    // تبدیل attribute های kebab-case به camelCase
    innerContent = convertAttributesToCamelCase(innerContent);
    
    // تبدیل fill به currentColor
    let processedContent = innerContent.replace(/fill=["'][^"']*["']/gi, 'fill="currentColor"');
    
    // اگر fill وجود نداشت، به path ها اضافه کنیم
    if (!processedContent.includes('fill=') && processedContent.includes('<path')) {
        processedContent = processedContent.replace(/<path/gi, '<path fill="currentColor"');
    }
    
    // تبدیل stroke به currentColor اگر وجود داشت
    processedContent = processedContent.replace(/stroke=["'][^"']*["']/gi, 'stroke="currentColor"');
    
    return {
        viewBox,
        width,
        height,
        content: processedContent
    };
}

// تابع برای تولید کامپوننت TSX
function generateComponent(componentName, svgData) {
    const { viewBox, width, height, content } = svgData;
    
    const widthAttr = width ? `width="${width}"` : '';
    const heightAttr = height ? `height="${height}"` : '';
    
    return `import type { SVGProps } from 'react';

export const ${componentName} = (props: SVGProps<SVGSVGElement>) => (
    <svg
        ${widthAttr}
        ${heightAttr}
        viewBox="${viewBox}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        ${content.split('\n').map(line => '        ' + line.trim()).join('\n')}
    </svg>
);
`;
}

// تابع اصلی
function generateIcons() {
    console.log('🔄 شروع تبدیل SVG ها به کامپوننت‌های TSX...\n');
    
    // خواندن فایل‌های SVG
    if (!fs.existsSync(SVG_DIR)) {
        console.error(`❌ پوشه ${SVG_DIR} وجود ندارد!`);
        process.exit(1);
    }
    
    const files = fs.readdirSync(SVG_DIR).filter(file => file.endsWith('.svg'));
    
    if (files.length === 0) {
        console.log('⚠️  هیچ فایل SVG یافت نشد!');
        return;
    }
    
    console.log(`📁 ${files.length} فایل SVG پیدا شد:\n`);
    
    const exports = [];
    
    // پردازش هر فایل
    files.forEach(file => {
        const svgPath = path.join(SVG_DIR, file);
        const svgContent = fs.readFileSync(svgPath, 'utf-8');
        const componentName = toComponentName(file);
        const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
        
        try {
            const svgData = parseSVG(svgContent);
            const componentCode = generateComponent(componentName, svgData);
            
            fs.writeFileSync(outputPath, componentCode, 'utf-8');
            exports.push(componentName);
            
            console.log(`✅ ${file} → ${componentName}.tsx`);
        } catch (error) {
            console.error(`❌ خطا در تبدیل ${file}:`, error.message);
        }
    });
    
    // جمع‌آوری همه فایل‌های TSX موجود (شامل فایل‌های دستی و تولید شده)
    const allTsxFiles = fs.readdirSync(OUTPUT_DIR)
        .filter(file => file.endsWith('.tsx') && file !== 'index.ts')
        .map(file => {
            const name = file.replace(/\.tsx$/, '');
            return name;
        });
    
    // ترکیب فایل‌های موجود و جدید
    const allExports = [...new Set([...allTsxFiles, ...exports])].sort();
    
    // تولید فایل index.ts
    const indexContent = allExports
        .map(name => `export { ${name} } from "./${name}";`)
        .join('\n') + '\n';
    
    fs.writeFileSync(INDEX_FILE, indexContent, 'utf-8');
    
    console.log(`\n✨ ${exports.length} کامپوننت جدید ایجاد شد!`);
    console.log(`📝 فایل index.ts به‌روزرسانی شد (${allExports.length} کامپوننت در مجموع).\n`);
}

// اجرای اسکریپت
generateIcons();

