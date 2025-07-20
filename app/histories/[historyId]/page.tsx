'use client'
import { getHistoryById } from '@/app/actions'
import MinLoader from '@/components/MinLoader'
import { Story } from '@/lib/types'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, LanguagesIcon, Loader, Mic, Share, Speaker } from 'lucide-react'
import { GeminiTranslateToWolof } from '@/lib/historyUtils'

const Page = () => {
  const params = useParams()
  const historyId = params.historyId
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)

  const fetchStory = async () => {
    try {
      setLoading(true)
      const response = await getHistoryById(historyId as string)
      setStory(response)
    } catch {
      console.error('Erreur lors de la récupération de l\'histoire')
      toast.error('Erreur lors de la récupération de l\'histoire')
    } finally {
      setLoading(false)
    }
  }

  const translateToWolof = async (text: string) => {
    console.log('Traduction en Wolof pour le texte:', text)
    try {
      setIsTranslating(true)
      story?.subStories.forEach(async (section) => {
        const translatedText = await GeminiTranslateToWolof(section.content)
        section.content = translatedText
      });
    } catch {
      toast.error('Erreur lors de la traduction en Wolof')
    } finally {
      setIsTranslating(false)
    }
  }

  useEffect(() => {
    fetchStory()
  }, [historyId])

  if (!story && !loading) {
    return (
      <main className='min-h-screen bg-background dark:bg-zinc-900 text-gray-900 dark:text-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Chargement de lhistoire...</h2>
          <MinLoader />
        </div>
      </main>
    )
  }
  return (
    <main className='min-h-screen bg-background dark:bg-zinc-900 text-gray-900 dark:text-gray-100'>
      <div className='max-w-6xl mt-6 mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md'>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3">
            <Speaker className="mr-2 w-5 h-5" />
            Ecouter
          </Button>

          <Button className="text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3"
            onClick={() => translateToWolof}
          >
            {
              isTranslating ? <Loader className="w-5 h-5 animate-spin" /> : (
                <>
                  <LanguagesIcon className="mr-2 w-5 h-5" />
                  Wolof
                </>
              )
            }
          </Button>

          <Button variant="outline" className="border border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950 transition-all duration-300 text-lg px-8 py-3">
            <Share className="mr-2 w-5 h-5" />
            Partager
          </Button>
        </div>

        <div className='pl-5 space-y-2'>
          {story?.subStories.map((section, index) => (
            <div className='mb-6' key={index}>
              <div>
                <h4 className='text-xl font-semibold mt-4'>{section.title}</h4>
                <p className='text-gray-700 dark:text-gray-300'>{section.content}</p>
              </div>

              <div className='my-4 flex items-center justify-center'>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-lg opacity-20"></div>
                  <div>
                    <Image
                      src={section.imageUrl ? `data:image/png;base64,${section.imageUrl.toString()}` : '/heroSection.png'}
                      alt={section.title}
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className='my-6'>
            <h3 className='text-xl font-semibold'>Résumé</h3>
            <p className='text-gray-700 dark:text-gray-300'>{story?.summary}</p>
          </div>

          <div className='my-6'>
            <h3 className='text-xl font-semibold'>Auteur</h3>
            <p className='text-gray-700 dark:text-gray-300'>{story?.author} ({story?.authorEmail})</p>
            <p className='text-gray-700 dark:text-gray-300'>{story?.region}</p>
            <p className='text-gray-700 dark:text-gray-300'>Mis à jour le : {story?.updatedAt ? new Date(story.updatedAt).toLocaleDateString() : 'N/A'}</p>
          </div>


          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3">
              <Link href="/histories">
                <BookOpen className="mr-2 w-5 h-5" />
                Découvrir d&apos;autres histoires
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950 transition-all duration-300 text-lg px-8 py-3">
              <Link href="/create">
                <Mic className="mr-2 w-5 h-5" />
                Créer votre conte
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page