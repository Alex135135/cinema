'use client';

import { useState, useMemo } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { movies, moods } from '@/lib/movies';
import MovieCard from '@/components/MovieCard';

export default function Discover() {
    const [mood, setMood] = useState<'Удиви меня' | string>('Удиви меня');
    const [minRating, setMinRating] = useState('0');
    const [seed, setSeed] = useState(0);

    const results = useMemo(() => {
        const filtered = movies.filter(
            (m) =>
                (mood === 'Удиви меня' || m.vibe.includes(mood)) &&
                m.rating >= Number(minRating)
        );

        // Детерминированная «случайная» сортировка на основе seed
        return [...filtered]
            .sort((a, b) => {
                const x = (a.id * 7919 + seed * 104729) % 997;
                const y = (b.id * 7919 + seed * 104729) % 997;
                return x - y;
            })
            .slice(0, 6);
    }, [mood, minRating, seed]);

    return (
        <div className="container page">
            <div className="page-intro">
                <span className="eyebrow">
                    <Sparkles size={15} /> ПЕРСОНАЛЬНЫЙ ПОДБОР
                </span>
                <h1>Что хочется <em>почувствовать?</em></h1>
                <p>Выбери настроение, и CineMatch найдёт фильмы, которые тебе подойдут.</p>
            </div>

            <div className="recommend-panel">
                <h2>Какое у тебя сегодня настроение?</h2>

                <div className="mood-grid">
                    {moods.map((m) => (
                        <button
                            key={m}
                            className={mood === m ? 'mood selected-mood' : 'mood'}
                            onClick={() => setMood(m)}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                <div className="recommend-bottom">
                    <label>
                        Минимальный рейтинг{' '}
                        <select
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                        >
                            <option value="0">Любой</option>
                            <option value="8">От 8.0</option>
                            <option value="8.5">От 8.5</option>
                        </select>
                    </label>

                    <button className="btn primary" onClick={() => setSeed((s) => s + 1)}>
                        <RefreshCw size={17} /> Другая подборка
                    </button>
                </div>
            </div>

            <div className="section-heading">
                <div>
                    <span className="eyebrow">СПЕЦИАЛЬНО ДЛЯ ТЕБЯ</span>
                    <h2>Рекомендуем посмотреть</h2>
                </div>
                <span className="count">{results.length} фильмов</span>
            </div>

            {results.length ? (
                <div className="movie-grid">
                    {results.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    Для этих условий фильмов пока нет. Попробуй снизить минимальный рейтинг.
                </div>
            )}
        </div>
    );
}