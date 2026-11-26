'use client';

import { useState } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { movies } from '@/lib/movies';
import MovieCard from '@/components/MovieCard';
import { useLists } from '@/store/store';

export default function Favorites() {
    const [tab, setTab] = useState<'favorites' | 'watchlist'>('favorites');
    const lists = useLists();

    // Фильтруем фильмы в зависимости от выбранной вкладки
    const selected = movies.filter((m) => lists[tab].includes(m.id));

    return (
        <div className="container page">
            <div className="page-intro">
                <span className="eyebrow">ТВОЯ КОЛЛЕКЦИЯ</span>
                <h1>Мои <em>списки</em></h1>
                <p>
                    Сохраняй фильмы, чтобы вернуться к ним в любой момент. Всё хранится в
                    этом браузере.
                </p>
            </div>

            <div className="tabs">
                <button
                    className={tab === 'favorites' ? 'tab active-tab' : 'tab'}
                    onClick={() => setTab('favorites')}
                >
                    <Heart size={18} /> Избранное ({lists.favorites.length})
                </button>

                <button
                    className={tab === 'watchlist' ? 'tab active-tab' : 'tab'}
                    onClick={() => setTab('watchlist')}
                >
                    <Bookmark size={18} /> Хочу посмотреть ({lists.watchlist.length})
                </button>
            </div>

            {selected.length ? (
                <div className="movie-grid">
                    {selected.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <div className="empty-icon">{tab === 'favorites' ? '♡' : '▤'}</div>
                    <h2>Пока здесь пусто</h2>
                    <p>Добавь фильмы из каталога — они появятся здесь.</p>
                    <a className="btn primary" href="/">
                        Перейти к каталогу
                    </a>
                </div>
            )}
        </div>
    );
}