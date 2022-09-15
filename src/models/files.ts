interface SrcSetItem {
    size: [number, number]
    src: string
}

export interface SrcsetImage {
    image: {
        path: string
        srcset: Array<SrcSetItem>
    }
}