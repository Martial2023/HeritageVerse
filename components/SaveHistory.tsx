'use client'
import { Loader, Handshake, Globe, MapPin, Sun, Trees } from 'lucide-react'
import React, { useState } from 'react'
import { Credenza, CredenzaTrigger, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaDescription, CredenzaBody, CredenzaFooter, CredenzaClose } from './CredenzaModal'
import { Button } from './ui/button'
import { GeminiHistorySplit } from '@/lib/types'
import { saveHistoryToDb } from '@/app/actions'
import { toast } from 'sonner'
import { generateReactHelpers } from '@uploadthing/react';
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'

const { uploadFiles } = generateReactHelpers();

type Props = {
    children: React.ReactNode,
    historySplit: GeminiHistorySplit
}
const SaveHistory = ({ children, historySplit }: Props) => {
    const router = useRouter()
    const [region, setRegion] = useState<string>('')
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [authorName, setAuthorName] = useState<string>('')
    const [authorEmail, setAuthorEmail] = useState<string>('')
    const [imageUrls, setImageUrls] = useState<string[]>([])

    const handleSaveHistory = async () => {
        try {
            if (!authorName.trim() || !authorEmail.trim() || !historySplit || !historySplit.title || !historySplit.summary || !historySplit.sections || historySplit.sections.length === 0) {
                toast.error("L'histoire est incomplète. Veuillez vérifier les informations fournies.");
                return;
            }
            if (region.length === 0) {
                toast.error("Veuillez sélectionner une région pour l'histoire.");
                return;
            }
            setIsSaving(true);
            const images = [];
            for (const section of historySplit.sections) {
                if (section.image) {
                    images.push(section.image);
                }
            }
            if (images.length > 0) {
                const files = images.map((image, index) => {
                    const blob = new Blob([image], { type: 'image/jpeg' }); // Adjust MIME type if necessary
                    return new File([blob], `image_${index}.jpg`, { type: 'image/jpeg' });
                });
                const uploadedFiles = await uploadFiles('image', { files });
                setImageUrls(uploadedFiles.map(file => file.ufsUrl || file.url || ''));
            }

            // Associer les images aux sections
            const sectionsWithImages = historySplit.sections.map((section, index) => ({
                ...section,
                image: imageUrls[index] || '' // Utiliser l'URL de l'image uploadée ou l'image existante
            }));

            await saveHistoryToDb({
                authorName: authorName.trim(),
                authorEmail: authorEmail.trim(),
                title: historySplit.title,
                summary: historySplit.summary,
                sections: sectionsWithImages.map(section => ({
                    title: section.title,
                    content: section.content,
                    image: section.image
                })),
                region: region
            })

            toast.success("Histoire enregistrée avec succès !");
            router.push('/histories');
        } catch (error) {
            console.error("Error saving history:", error);
        } finally {
            setIsSaving(false);
        }
    }
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                {children}
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle asChild>
                        <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                            <Handshake className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                            <span className="group-hover: transition-colors duration-300">Heritage</span>
                            <span className="text-primary">Verse</span>
                        </h2>
                    </CredenzaTitle>
                    <CredenzaDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Enregistrez votre histoire pour la partager avec la communauté.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                    <div>
                        <Input
                            type='text'
                            placeholder="Nom de l'auteur"
                            className="mt-2 w-full"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />

                        <Input
                            type='email'
                            placeholder="Email de l'auteur"
                            className="mt-2 w-full"
                            value={authorEmail}
                            onChange={(e) => setAuthorEmail(e.target.value)}
                        />
                    </div>
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
                                    setRegion('');
                                } else {
                                    setRegion(type);
                                }
                            }

                            return (
                                <Button
                                    key={type}
                                    variant={region.includes(type) ? 'default' : 'outline'}
                                    onClick={() => updateResultType(type)}
                                >
                                    {iconMap[type as keyof typeof iconMap]}
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Button>
                            )
                        })}
                    </div>
                </CredenzaBody>
                <CredenzaFooter className='w-full flex items-center justify-between'>
                    <CredenzaClose asChild>
                        <Button id="audio-import-close" variant="outline">
                            Annuler
                        </Button>
                    </CredenzaClose>

                    <Button
                        disabled={isSaving || region.length === 0}
                        className="text-white"
                        onClick={handleSaveHistory}
                    >
                        {isSaving ? <Loader className="w-6 h-6 animate-spin" /> : 'Créer l’histoire'}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default SaveHistory