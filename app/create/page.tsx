'use client'
import TextInputComponent from '@/components/TextInputComponent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateSectionImage, summarizeAndSplitStory } from '@/lib/historyUtils';
import { GeminiHistorySplit } from '@/lib/types';
import { BookOpen, ImageIcon, Mic, Speaker, TurtleIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import MinLoader from '@/components/MinLoader';
import SaveHistory from '@/components/SaveHistory';

const Page = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [historyText, setHistoryText] = useState<string>('');
    const [historySplit, setHistorySplit] = useState<GeminiHistorySplit | null>(null);

    const handleHistoryCreating = async () => {
        try {
            if (!historyText.trim()) {
                toast.error('Veuillez entrer une histoire avant de continuer.');
                return;
            }
            setIsCreating(true);
            const response = await summarizeAndSplitStory(historyText);
            setHistorySplit(response);
            setIsCreated(true);
        } catch (error) {
            toast.error('Une erreur est survenue lors de la création de l’histoire.\n' + error);
        } finally {
            setIsCreating(false)
        }
    }

    // const handleGenerateImage = async () => {
    //     try {
    //         if (!historySplit) {
    //             toast.error('Veuillez créer une histoire avant de générer des images.');
    //             return;
    //         }
    //         setIsGeneratingImage(true);
    //         historySplit.sections.forEach(async (section) => {
    //             const { fileName, fileData } = await generateSectionImage(section.content, section.title);
    //             section.image = Buffer.from(fileData)
    //         });
    //     } catch (error) {
    //         toast.error('Une erreur est survenue lors de la génération de l’image.');
    //     } finally {
    //         setIsGeneratingImage(false);
    //     }
    // }

    const tryAgain = () => {
        setIsCreated(false);
        setHistoryText('');
        setHistorySplit(null);
    };

    if (!isCreated) {
        return (
            <main className='flex items-center justify-center h-screen bg-background dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-2'>
                <div className='w-full flex flex-col md:flex-row items-center justify-center gap-6 cursor-pointer'>
                    <TextInputComponent
                        setHistoryText={setHistoryText}
                        isCreating={isCreating}
                        handleHistoryCreating={handleHistoryCreating}
                    >
                        <div className="group hover:-translate-y-2 transition-all duration-300">
                            <Card className="p-4 text-center h-full max-w-sm hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                                        Créer à partir de texte
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                                        Transformez vos récits en histoires audio et visuelles captivantes.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </TextInputComponent>

                    <div className="group hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <Card className="p-4 text-center h-full max-w-sm hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Mic className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                                    Créer à partir d&apos;audio
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                                    Enregistrez vos histoires et transformez-les en récits audio enrichis.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='min-h-screen bg-background dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-2'>

            {historySplit && (
                <div className='mt-6 mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold mb-4'>{historySplit.title}</h2>
                    <div className='w-full flex items-center justify-center gap-4'>
                        <Button className='text-white bg-orange-500 hover:bg-orange-600'>
                            <Speaker className='w-5 h-5 mr-2' />
                            Écouter l&apos;histoire
                        </Button>

                        <Button variant={"outline"} className=''
                            disabled={isGeneratingImage}>
                            <ImageIcon className='w-5 h-5 mr-2' />
                            Générer des images de l&apos;histoire
                        </Button>

                    </div>
                    <div className='pl-5 space-y-2'>
                        {historySplit.sections.map((section, index) => (
                            <div className='mb-6' key={index}>
                                <div>
                                    <h3 className='text-xl font-semibold mt-4'>{section.title}</h3>
                                    <p className='text-gray-700 dark:text-gray-300'>{section.content}</p>
                                </div>

                                <div className='my-4 flex items-center justify-center'>
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-lg opacity-20"></div>
                                        {
                                            isGeneratingImage ? (
                                                <MinLoader />
                                            ) : (
                                                <div>
                                                    <Image
                                                        src={section.image ? `data:image/png;base64,${section.image.toString()}` : '/heroSection.png'}
                                                        alt={section.title}
                                                        width={300}
                                                        height={200}
                                                        className="rounded-lg shadow-md"
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='mt-6'>
                            <h3 className='text-xl font-semibold'>Résumé</h3>
                            <p className='text-gray-700 dark:text-gray-300'>{historySplit.summary}</p>
                        </div>
                    </div>

                    <div className='mt-6 flex items-center justify-center'>
                        <Button variant={"outline"} className='text-primary mr-4'
                            onClick={tryAgain}
                        >
                            <TurtleIcon className='w-5 h-5 mr-2' />
                            Reprendre
                        </Button>

                        <SaveHistory
                            historySplit={historySplit}
                        >
                            <Button className='text-white bg-orange-500 hover:bg-orange-600'>
                                <BookOpen className='w-5 h-5 mr-2' />
                                Enregistrer l&apos;histoire
                            </Button>
                        </SaveHistory>
                    </div>
                </div>)}
        </main>
    );
};

export default Page;