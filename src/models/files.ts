interface SrcSetItem {
    size: [number, number]
    src: string
}

export interface SrcsetImage {
    uuid: string
    image: {
        path: string
        srcset: Array<SrcSetItem>
    }
}