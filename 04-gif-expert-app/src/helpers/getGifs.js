export const getGifs = async(category) => {
    const url = 'https://api.giphy.com/v1/gifs/search';
    const apiKey = 'dZ57QsWCPgRynsb2TvZeW2FvDP8JfeHw';

    const urlFormed = `${url}?api_key=${apiKey}&q=${category}&limit=20`;

    const resp = await fetch( urlFormed );
    const { data = []} = await resp.json(); 
    const gifs = data.map( img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }))

    console.log(gifs);
    return gifs;
}