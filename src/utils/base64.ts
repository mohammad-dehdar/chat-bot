function toBase64Browser(input: string): string {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        let binary = "";
        for (const byte of bytes) {
                binary += String.fromCharCode(byte);
        }
        return btoa(binary);
}

function toBase64Node(input: string): string {
        return Buffer.from(input, "utf-8").toString("base64");
}

export function bToA(value: unknown): string {
        try {
                const json = JSON.stringify(value ?? {});
                if (typeof window === "undefined") {
                        return toBase64Node(json);
                }
                return toBase64Browser(json);
        } catch {
                return "";
        }
}
