interface AverageColor {
    rgb: string;
    hex: string;
    r: number;
    g: number;
    b: number;
}

export function getAvgRGB(src: string): Promise<AverageColor> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const context = canvas.getContext('2d');

        if (!context) {
            reject(new Error('Failed to get canvas context'));
            return;
        }

        const img = new Image();
        // Omogucava citanje piksela ako slika dolazi sa drugog domena (CORS)
        img.crossOrigin = 'Anonymous';
        img.src = src;

        img.onload = () => {
            context.imageSmoothingEnabled = true;
            // Iscrtava celu sliku sabijenu u 1x1 piksel (ovo automatski racuna prosecnu boju)
            context.drawImage(img, 0, 0, 1, 1);

            // Uzimanje podataka o jednom pikselu
            const pixel = context.getImageData(0, 0, 1, 1).data;
            const r = pixel[0];
            const g = pixel[1];
            const b = pixel[2];

            //Pretvaranje u Hex format (hash)
            const toHex = (c: number) => c.toString(16).padStart(2, '0');
            const hex = `#${toHex(r!)}${toHex(g!)}${toHex(b!)}`;

            resolve({ 
                rgb: `rgb(${r}, ${g}, ${b})`,
                hex: hex,
                r: r!,
                g: g!,
                b: b!
            });
        };

        img.onerror = (err) => {
            reject(new Error('Failed to load image: ' + err));
        }
    });
}