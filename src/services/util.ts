export const util= {
    formatBooks: (items: any[], totalItemsPerPage: number) => {
        return items.map((book: any) => ({
            id: book.id,
            img: book.volumeInfo?.imageLinks?.thumbnail,
            title: book.volumeInfo?.title,
            authors: String(book.volumeInfo?.authors).replaceAll(",", " "),
            publisher: book.volumeInfo?.publisher,
            description: book.volumeInfo?.description,
            pageCount: book.volumeInfo?.pageCount,
            publishDate: book.volumeInfo?.publishedDate,
        }));
    },

}
