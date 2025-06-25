export interface WikiRawPreview  {
    ns: number,
    pageid: number,
    index: number, 
    title: string, 
    description: string
    thumbnail: {
      source: string,
      width: number,
      height: number
    }
    missing?: string
}

export interface WikiPreviewResponse {
  query: {
    pages: WikiRawPreview[]
  }
}

export const wikiHeaders = new Headers({
    "Api-User-Agent": "six-degrees-of-wiki-adventure/1.1 "
});

export type WikiSuggestion = {
    index: number,
    id: string// number as string
    title: string,
    description: string,
    thumbnail: {
        source: string,
        width: number,
        height: number
    }
  }