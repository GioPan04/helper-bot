import * as youtubeSearch from "youtube-search";

const searchOptions: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 10,
    key: process.env.GOOGLE_API_KEY,
};

export default function search(query: string) {
    return new Promise<youtubeSearch.YouTubeSearchResults[]|undefined>((resolve, rej) => {
        youtubeSearch.default(query, searchOptions, (err, data) => {
            if(err) {
                rej(err);
                return;
            }
            resolve(data);
        })
    })
}