export interface Movie {
    id: number;
    titre: string;
    realisateur: string;
    description: string;
    eN_Description: string;
    duree: number;
    date_de_sortie: string;
    affiche: string;
    video: string | null;
    genres: string[];
    status: number;
}

export interface AllMovies {
    id: number;
    affiche: string;
    titre: string;
    realisateur: string;
}
