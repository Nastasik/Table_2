export const setPaginationType = ({lastPage, page}: any)  => {
    if(lastPage < 5) {
        return Array.from(Array(lastPage), (_, i) => i+1)
    }
    if(page>3 && page<=(lastPage-3)) {
        return [1, '...', page-1, page, page+1, '...', lastPage ]
    } 
    if(page<=3) {
        return [1, 2, 3, '...', lastPage]
    }
    if(page>(lastPage-3)) {
        return [1, '...',lastPage-2, lastPage-1 ,lastPage]
    }
    return [];
}