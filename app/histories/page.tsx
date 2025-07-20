'use client'
import { Button } from '@/components/ui/button'
import { Globe, MapPin, Sun, Trees } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { SearchResult } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { fetchSearchResults } from '../actions'
import MinLoader from '@/components/MinLoader'
import Link from 'next/link'

const PAGE_SIZE = 10
const Page = () => {
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [pageIndex, setPageIndex] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setPageIndex(0)
        setResults([])
        loadMoreResults()
    }, [query])

    const debouncedSearch = debounce((value: string) => {
        setQuery(value)
    }, 400)

    const loadMoreResults = async () => {
        setLoading(true)
        try {
            const newResults = await fetchSearchResults({
                query: query,
                page: pageIndex,
                pageSize: PAGE_SIZE
            })

            setResults(prev => [...prev, ...newResults])
            setPageIndex(prev => prev + 1)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <main className='min-h-screen bg-background dark:bg-zinc-900 text-gray-900 dark:text-gray-100'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-4">Histoires du HeritageVerse</h1>
                <p className="text-lg text-gray-700">
                    Explorez les riches histoires et récits du patrimoine africain.
                </p>
            </div>

            <div className='w-full flex-col gap-2 flex items-center justify-center my-2'>
                <Input
                    className='w-full max-w-md rounded-full p-2 h-10'
                    type='text'
                    placeholder='Rechercher une histoire...'
                    onChange={(e) => debouncedSearch(e.target.value)}
                />

                <div className="flex items-center justify-center w-full mt-4 gap-2 flex-wrap">
                    {["Tout", "Afrique de l'ouest", "Magrèbe", "Afrique australe"].map((type) => {
                        const iconMap = {
                            "Tout": <Globe className='w-5 h-5' />,
                            "Afrique de l'ouest": <MapPin className='w-5 h-5' />,
                            "Magrèbe": <Sun className='w-5 h-5' />,
                            "Afrique australe": <Trees className='w-5 h-5' />
                        }

                        function updateResultType(type: string): void {
                            if (type === "Tout") {
                                setQuery("");
                            } else {
                                setQuery(type);
                            }
                        }

                        return (
                            <Button
                                key={type}
                                variant={query.includes(type) ? 'default' : 'outline'}
                                onClick={() => updateResultType(type)}
                            >
                                {iconMap[type as keyof typeof iconMap]}
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Button>
                        )
                    })}
                </div>
            </div>

            {
                loading && (
                    <div className="flex items-center justify-center w-full mt-4">
                        <MinLoader />
                    </div>
                )
            }
            {
                results.length === 0 && !loading && query.trim() !== '' && (
                    <div className="flex items-center justify-center w-full mt-6">
                        <p className="text-gray-500">Aucun résultat trouvé pour &quot;{query}&quot;</p>
                    </div>
                )
            }

            {
                results.length > 0 && !loading && query.trim() !== '' && (
                    <div className="w-full flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <p className="text-gray-500">Resultat: {results.length} histoires trouvées</p>
                    </div>
                )
            }

            {
                results.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <ul className="space-y-4">
                            {results.map((result) => (
                                <li key={result.id} className="p-6 border rounded-lg shadow-md transition-transform transform hover:scale-102 dark:border-zinc-800 dark:bg-zinc-800 bg-white">
                                    <Link href={`/histories/${result.id}`} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="col-span-1 md:col-span-2">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{result.title}</h3>
                                            <p className="text-gray-700 dark:text-gray-400 line-clamp-3 mt-2">{result.summary}</p>
                                            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                                <Globe className="w-4 h-4" />
                                                <span>Auteur: {result.author} ({result.authorEmail})</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <MapPin className="w-4 h-4" />
                                                <span>Région: {result.region}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Sun className="w-4 h-4" />
                                                <span>{result.updatedAt ? new Date(result.updatedAt).toLocaleDateString() : 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center">
                                            <img src={result.imageUrl || 'heroSection.png'} alt={result.title} className="rounded-md w-full h-40 object-cover shadow-md" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </main>
    )
}

export default Page