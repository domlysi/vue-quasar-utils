export interface SrcSetItem {
    size: [number, number];
    src: string;
}
export interface SrcsetImage {
    path: string;
    srcset: Array<SrcSetItem>;
    webp?: string;
}
